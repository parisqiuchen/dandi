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

## 4. Create the Database Tables

### Step 1: Create API Keys Table
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create the api_keys table

### Step 2: Create Users Table  
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-users-schema.sql`
3. Click **Run** to create the users table

## 5. Test Your Setup

1. Restart your development server: `npm run dev`
2. Visit `/dashboards` in your browser
3. Try creating, editing, and deleting API keys
4. Test Google authentication - new users will be automatically saved to the database
5. Check your Supabase dashboard **Table Editor** to see the data in both tables

## 6. Verify Everything Works

Your application now supports:
- ✅ Create API keys with type (development/production)
- ✅ Monthly usage limits
- ✅ Persistent storage in PostgreSQL
- ✅ Real-time data updates
- ✅ Proper error handling
- ✅ **User authentication with Google OAuth**
- ✅ **Automatic user registration in database**
- ✅ **User session management**

## Database Schema

### `api_keys` Table
- `id` (UUID, auto-generated)
- `name` (text, required)
- `type` (development/production)
- `limit_monthly_usage` (boolean)
- `monthly_limit` (integer)
- `key` (unique API key string)
- `created_at` (timestamp)
- `last_used` (timestamp, nullable)
- `usage_count` (integer, default 0)

### `users` Table ✨ **NEW**
- `id` (UUID, auto-generated primary key)
- `email` (text, unique, required)
- `name` (text, user's display name)
- `image` (text, profile picture URL)
- `provider` (text, OAuth provider - google, github, etc.)
- `provider_id` (text, unique ID from OAuth provider)
- `created_at` (timestamp, when user first signed up)
- `updated_at` (timestamp, auto-updated on changes)
- `last_login` (timestamp, updated on each login)

## Authentication Flow ✨ **NEW**

When a user signs in with Google:

1. **First-time users**: 
   - User details are automatically saved to the `users` table
   - `created_at`, `updated_at`, and `last_login` are set to current timestamp

2. **Returning users**:
   - `last_login` timestamp is updated
   - Profile information (name, image) is refreshed from Google
   - `updated_at` timestamp is automatically updated

3. **Session Management**:
   - User ID from database is stored in JWT token
   - Session includes database user ID for linking to other data

## Security Notes

- The service role key has admin privileges - keep it secure
- Consider enabling Row Level Security (RLS) for production
- API keys are stored as plain text - consider encryption for production use
- User data is automatically managed through NextAuth callbacks

## Next Steps

Consider adding:
- User-specific API key management (link API keys to users)
- User roles and permissions
- API key rate limiting per user
- Usage analytics per user
- Key expiration dates
- **User dashboard with personal analytics** 