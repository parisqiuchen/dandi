import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required', valid: false },
        { status: 400 }
      );
    }

    // Check if the API key exists in the database
    const { data: keyData, error } = await supabaseAdmin
      .from('api_keys')
      .select('id, name, type, created_at, user_id')
      .eq('key', apiKey)
      .single();

    if (error || !keyData) {
      return NextResponse.json(
        { 
          error: 'Invalid API key', 
          valid: false,
          message: 'The provided API key does not exist or is invalid.'
        },
        { status: 401 }
      );
    }

    // Update last_used timestamp
    await supabaseAdmin
      .from('api_keys')
      .update({ last_used: new Date().toISOString() })
      .eq('key', apiKey);

    return NextResponse.json({
      valid: true,
      message: 'API key is valid',
      keyInfo: {
        id: keyData.id,
        name: keyData.name,
        type: keyData.type,
        createdAt: keyData.created_at
      }
    });

  } catch (error) {
    console.error('API key validation error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        valid: false,
        message: 'An error occurred while validating the API key.'
      },
      { status: 500 }
    );
  }
} 