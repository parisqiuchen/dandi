// API Authentication service for validating API keys and managing usage

import { supabaseAdmin } from './supabase';

/**
 * Validates an API key and returns key information
 * @param {string} apiKey - The API key to validate
 * @returns {Promise<Object>} - Validation result with key data or error
 */
export async function validateApiKey(apiKey) {
  try {
    if (!apiKey) {
      return {
        valid: false,
        error: 'API key is required',
        message: 'Please provide an API key in the x-api-key header.',
        status: 400
      };
    }

    // Check if the API key exists in the database
    const { data: keyData, error } = await supabaseAdmin
      .from('api_keys')
      .select('id, name, type, created_at, usage_count, monthly_limit, limit_monthly_usage')
      .eq('key', apiKey)
      .single();

    if (error || !keyData) {
      return {
        valid: false,
        error: 'Invalid API key',
        message: 'The provided API key does not exist or is invalid.',
        status: 401
      };
    }

    return {
      valid: true,
      keyData
    };

  } catch (error) {
    console.error('API key validation error:', error);
    return {
      valid: false,
      error: 'Validation failed',
      message: 'An error occurred while validating the API key.',
      status: 500
    };
  }
}

/**
 * Checks if an API key has exceeded its usage limit
 * @param {Object} keyData - The API key data from the database
 * @returns {Object} - Usage limit check result
 */
export function checkUsageLimit(keyData) {
  if (keyData.limit_monthly_usage && keyData.usage_count >= keyData.monthly_limit) {
    return {
      exceeded: true,
      error: 'Usage limit exceeded',
      message: `Monthly usage limit of ${keyData.monthly_limit} requests exceeded.`,
      status: 429
    };
  }

  return {
    exceeded: false,
    remainingUsage: keyData.limit_monthly_usage 
      ? keyData.monthly_limit - keyData.usage_count
      : 'unlimited'
  };
}

/**
 * Updates API key usage statistics
 * @param {string} apiKey - The API key to update
 * @param {Object} keyData - Current key data
 * @returns {Promise<Object>} - Update result
 */
export async function updateApiKeyUsage(apiKey, keyData) {
  try {
    await supabaseAdmin
      .from('api_keys')
      .update({ 
        last_used: new Date().toISOString(),
        usage_count: keyData.usage_count + 1
      })
      .eq('key', apiKey);

    return {
      success: true,
      newUsageCount: keyData.usage_count + 1
    };

  } catch (error) {
    console.error('Error updating API key usage:', error);
    return {
      success: false,
      error: 'Failed to update usage'
    };
  }
}

/**
 * Complete API key authentication flow
 * @param {string} apiKey - The API key to authenticate
 * @returns {Promise<Object>} - Complete authentication result
 */
export async function authenticateApiKey(apiKey) {
  // Validate the API key
  const validation = await validateApiKey(apiKey);
  if (!validation.valid) {
    return validation;
  }

  // Check usage limits
  const usageCheck = checkUsageLimit(validation.keyData);
  if (usageCheck.exceeded) {
    return usageCheck;
  }

  // Update usage statistics
  const usageUpdate = await updateApiKeyUsage(apiKey, validation.keyData);
  if (!usageUpdate.success) {
    console.warn('Failed to update API key usage, but continuing...');
  }

  return {
    valid: true,
    keyData: validation.keyData,
    usageInfo: {
      currentUsage: usageUpdate.newUsageCount || validation.keyData.usage_count + 1,
      remainingUsage: usageCheck.remainingUsage
    }
  };
} 