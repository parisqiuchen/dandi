import { supabaseAdmin } from '../../lib/supabase';
import { auth } from '../../lib/auth';
import { getUserByEmail } from '../../lib/userManager';
import ClientDashboard from '../../components/ClientDashboard';
import { redirect } from 'next/navigation';

// Server Component - runs on server, no 'use client' directive
export default async function Dashboard() {
  // Fetch data server-side during build/request
  let apiKeys = [];
  let error = null;

  try {
    // Get authenticated session
    const session = await auth();
    
    if (!session?.user?.email) {
      redirect('/auth/signin');
    }

    // Get user from database
    const dbUser = await getUserByEmail(session.user.email);
    
    if (!dbUser) {
      redirect('/auth/signin');
    }

    // Fetch API keys only for this user
    const { data, error: fetchError } = await supabaseAdmin
      .from('api_keys')
      .select('*')
      .eq('user_id', dbUser.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      throw fetchError;
    }

    // Convert snake_case to camelCase for frontend consistency
    apiKeys = data.map(key => ({
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
  } catch (err) {
    console.error('Error fetching API keys server-side:', err);
    error = 'Failed to load API keys';
  }

  // Pass server-fetched data to client component
  return <ClientDashboard initialApiKeys={apiKeys} initialError={error} />;
} 