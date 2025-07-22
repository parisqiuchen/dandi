-- Migration: Add user_id to api_keys table
-- Run this SQL in your Supabase SQL editor

-- Step 1: Add user_id column to api_keys table
ALTER TABLE api_keys 
ADD COLUMN user_id uuid REFERENCES users(id) ON DELETE CASCADE;

-- Step 2: Create an index on user_id for fast lookups
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);

-- Step 3: Update existing API keys to have a default user (optional)
-- This assigns all existing keys to the first user in the database
-- Remove this if you want to keep existing keys unassigned
UPDATE api_keys 
SET user_id = (SELECT id FROM users ORDER BY created_at ASC LIMIT 1)
WHERE user_id IS NULL;

-- Step 4: Make user_id NOT NULL after assigning existing keys (optional)
-- ALTER TABLE api_keys ALTER COLUMN user_id SET NOT NULL;

-- Step 5: Add RLS policy for user-scoped access
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own API keys
CREATE POLICY "Users can view their own API keys" 
ON api_keys FOR ALL 
USING (user_id = auth.uid()::uuid);

-- Note: The auth.uid() function works with Supabase RLS
-- For our API routes, we'll manually check user_id since we're using supabaseAdmin 