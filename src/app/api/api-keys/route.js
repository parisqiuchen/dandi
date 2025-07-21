import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

// GET - Fetch all API keys
export async function GET() {
  try {
    const { data: apiKeys, error } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch API keys' },
        { status: 500 }
      );
    }

    return NextResponse.json(apiKeys);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new API key
export async function POST(request) {
  try {
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
      usageCount: data.usage_count
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