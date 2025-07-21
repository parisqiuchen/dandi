import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase';

// GET - Fetch specific API key
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const { data: apiKey, error } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !apiKey) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      );
    }
    
    // Convert snake_case to camelCase for frontend
    const responseData = {
      id: apiKey.id,
      name: apiKey.name,
      type: apiKey.type,
      limitMonthlyUsage: apiKey.limit_monthly_usage,
      monthlyLimit: apiKey.monthly_limit,
      key: apiKey.key,
      createdAt: apiKey.created_at,
      lastUsed: apiKey.last_used,
      usageCount: apiKey.usage_count
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update API key
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, type, limitMonthlyUsage, monthlyLimit } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const updateData = {
      name,
      ...(type && { type }),
      ...(limitMonthlyUsage !== undefined && { limit_monthly_usage: limitMonthlyUsage }),
      ...(monthlyLimit !== undefined && { monthly_limit: monthlyLimit }),
    };

    const { data: updatedKey, error } = await supabaseAdmin
      .from('api_keys')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error || !updatedKey) {
      return NextResponse.json(
        { error: 'API key not found or update failed' },
        { status: 404 }
      );
    }

    // Convert snake_case to camelCase for frontend
    const responseData = {
      id: updatedKey.id,
      name: updatedKey.name,
      type: updatedKey.type,
      limitMonthlyUsage: updatedKey.limit_monthly_usage,
      monthlyLimit: updatedKey.monthly_limit,
      key: updatedKey.key,
      createdAt: updatedKey.created_at,
      lastUsed: updatedKey.last_used,
      usageCount: updatedKey.usage_count
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 400 }
    );
  }
}

// DELETE - Delete API key
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const { error } = await supabaseAdmin
      .from('api_keys')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete API key' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ message: 'API key deleted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 