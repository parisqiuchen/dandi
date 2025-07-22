import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';
import { authenticateUserSession } from '../../../lib/session-auth';

// GET - Fetch all API keys for authenticated user
export async function GET(request) {
  try {
    // Authenticate user session
    const authResult = await authenticateUserSession(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        {
          error: authResult.error,
          message: authResult.message
        },
        { status: authResult.status }
      );
    }

    const { user } = authResult;

    // Fetch API keys only for this user
    const { data: apiKeys, error } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch API keys' },
        { status: 500 }
      );
    }

    // Convert snake_case to camelCase for frontend consistency
    const formattedKeys = apiKeys.map(key => ({
      id: key.id,
      name: key.name,
      type: key.type,
      limitMonthlyUsage: key.limit_monthly_usage,
      monthlyLimit: key.monthly_limit,
      key: key.key,
      createdAt: key.created_at,
      lastUsed: key.last_used,
      usageCount: key.usage_count,
      userId: key.user_id
    }));

    return NextResponse.json(formattedKeys);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new API key for authenticated user
export async function POST(request) {
  try {
    // Authenticate user session
    const authResult = await authenticateUserSession(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        {
          error: authResult.error,
          message: authResult.message
        },
        { status: authResult.status }
      );
    }

    const { user } = authResult;

    const body = await request.json();
    const { name, type = 'development', limitMonthlyUsage = false, monthlyLimit = 1000 } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const newApiKey = {
      name,
      type,
      limit_monthly_usage: limitMonthlyUsage,
      monthly_limit: monthlyLimit,
      key: 'ak_' + Math.random().toString(36).substr(2, 32),
      user_id: user.id, // Associate with authenticated user
      created_at: new Date().toISOString(),
      last_used: null,
      usage_count: 0
    };

    const { data, error } = await supabaseAdmin
      .from('api_keys')
      .insert([newApiKey])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create API key' },
        { status: 500 }
      );
    }

    // Convert snake_case back to camelCase for frontend
    const responseData = {
      id: data.id,
      name: data.name,
      type: data.type,
      limitMonthlyUsage: data.limit_monthly_usage,
      monthlyLimit: data.monthly_limit,
      key: data.key,
      createdAt: data.created_at,
      lastUsed: data.last_used,
      usageCount: data.usage_count,
      userId: data.user_id
    };

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 400 }
    );
  }
} 