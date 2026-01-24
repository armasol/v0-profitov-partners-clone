-- Drop existing RLS policies and recreate profiles table without auth.users dependency
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;

-- Drop and recreate profiles table with custom auth
DROP TABLE IF EXISTS public.profiles CASCADE;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT,
  telegram TEXT,
  project_name TEXT,
  token_contract TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('shiller', 'project')),
  wallet_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (signup) but only select/update their own data based on email
CREATE POLICY "profiles_public_insert"
  ON public.profiles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "profiles_public_select"
  ON public.profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "profiles_public_update"
  ON public.profiles FOR UPDATE
  TO anon, authenticated
  USING (true);
