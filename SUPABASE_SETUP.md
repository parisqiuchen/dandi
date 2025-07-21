# Supabase Setup Instructions

Your API has been successfully converted to use Supabase! Follow these steps to complete the setup:

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Sign in to your account
3. Click "New Project"
4. Choose your organization and create a new project
5. Wait for the project to be ready

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (something like `https://your-project.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...` - keep this secret!)

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **Important**: Never commit your service role key to version control!

## 4. Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create the table

## 5. Test Your Setup

1. Restart your development server: `npm run dev`
2. Visit `/dashboards` in your browser
3. Try creating, editing, and deleting API keys
4. Check your Supabase dashboard **Table Editor** to see the data

## 6. Verify Everything Works

Your API now supports:
- ✅ Create API keys with type (development/production)
- ✅ Monthly usage limits
- ✅ Persistent storage in PostgreSQL
- ✅ Real-time data updates
- ✅ Proper error handling

## Database Schema

The `api_keys` table includes:
- `id` (UUID, auto-generated)
- `name` (text, required)
- `type` (development/production)
- `limit_monthly_usage` (boolean)
- `monthly_limit` (integer)
- `key` (unique API key string)
- `created_at` (timestamp)
- `last_used` (timestamp, nullable)
- `usage_count` (integer, default 0)

## Security Notes

- The service role key has admin privileges - keep it secure
- Consider enabling Row Level Security (RLS) for production
- API keys are stored as plain text - consider encryption for production use

## Next Steps

Consider adding:
- User authentication
- API key rate limiting
- Usage analytics
- Key expiration dates 