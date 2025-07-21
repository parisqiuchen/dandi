-- Create the api_keys table in Supabase
-- Run this SQL in your Supabase SQL editor

CREATE TABLE api_keys (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  type text NOT NULL DEFAULT 'development',
  limit_monthly_usage boolean DEFAULT false,
  monthly_limit integer DEFAULT 1000,x
  key text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_used timestamp with time zone,
  usage_count integer DEFAULT 0
);

-- Create an index on the key field for fast lookups
CREATE INDEX idx_api_keys_key ON api_keys(key);

-- Create an index on created_at for ordering
CREATE INDEX idx_api_keys_created_at ON api_keys(created_at);

-- Optional: Add Row Level Security (RLS) if needed
-- ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Optional: Create a policy for authenticated users (adjust as needed)
-- CREATE POLICY "Users can view their own API keys" ON api_keys
--   FOR ALL USING (auth.uid() = user_id);

-- Insert some sample data (optional)
INSERT INTO api_keys (name, type, key, limit_monthly_usage, monthly_limit) VALUES
  ('Development Key', 'development', 'ak_dev_' || replace(gen_random_uuid()::text, '-', ''), false, 1000),
  ('Production Key', 'production', 'ak_prod_' || replace(gen_random_uuid()::text, '-', ''), true, 5000); 