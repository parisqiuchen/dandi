import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../lib/supabase';
import { authenticateUserSession } from '../../../../lib/session-auth';

// GET - Fetch specific API key for authenticated user
export async function GET(request, { params }) {
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
    const { id } = await params;
    
    // Fetch API key only if it belongs to the authenticated user
    const { data: apiKey, error } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id) // User-scoped access
      .single();
    
    if (error || !apiKey) {
      return NextResponse.json(
        { error: 'API key not found or access denied' },
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
      usageCount: apiKey.usage_count,
      userId: apiKey.user_id
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

// PUT - Update API key for authenticated user
export async function PUT(request, { params }) {
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

    // Update only if the key belongs to the authenticated user
    const { data: updatedKey, error } = await supabaseAdmin
      .from('api_keys')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id) // User-scoped access
      .select()
      .single();
    
    if (error || !updatedKey) {
      return NextResponse.json(
        { error: 'API key not found, access denied, or update failed' },
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
      usageCount: updatedKey.usage_count,
      userId: updatedKey.user_id
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

// DELETE - Delete API key for authenticated user
export async function DELETE(request, { params }) {
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
    const { id } = await params;
    
    // Delete only if the key belongs to the authenticated user
    const { data, error } = await supabaseAdmin
      .from('api_keys')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id) // User-scoped access
      .select(); // This returns the deleted rows

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete API key' },
        { status: 500 }
      );
    }

    // Check if any rows were actually deleted
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'API key not found or access denied' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'API key deleted successfully',
      deletedCount: data.length
    });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 