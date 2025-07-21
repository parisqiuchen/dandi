-- Create the users table in Supabase
-- Run this SQL in your Supabase SQL editor after running supabase-schema.sql

CREATE TABLE users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  image text,
  provider text DEFAULT 'google',
  provider_id text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_login timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider_id ON users(provider_id);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Add a trigger to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Optional: Enable Row Level Security (RLS)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Optional: Create a policy for user access (users can only see their own data)
-- CREATE POLICY "Users can view their own data" ON users
--   FOR ALL USING (auth.uid()::text = id::text);

-- Sample comment about the schema
-- This table stores user information from OAuth providers
-- Fields:
-- - id: Primary key (UUID)
-- - email: User's email (unique, required)
-- - name: User's display name
-- - image: Profile picture URL
-- - provider: OAuth provider (google, github, etc.)
-- - provider_id: Unique ID from the OAuth provider
-- - created_at: When the user first signed up
-- - updated_at: When the user data was last modified
-- - last_login: When the user last logged in 