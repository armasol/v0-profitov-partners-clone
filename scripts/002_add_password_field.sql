-- Add password field to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS telegram TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS project_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS token_contract TEXT;
