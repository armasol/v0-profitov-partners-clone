-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('shiller', 'project')),
  wallet_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create campaigns table for coin projects
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token_name TEXT NOT NULL,
  token_symbol TEXT NOT NULL,
  description TEXT NOT NULL,
  budget NUMERIC NOT NULL,
  rate_per_1k_views NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

-- Projects can see their own campaigns
CREATE POLICY "campaigns_select_own"
  ON public.campaigns FOR SELECT
  USING (auth.uid() = project_id);

-- Shillers can see all active campaigns
CREATE POLICY "campaigns_select_active"
  ON public.campaigns FOR SELECT
  USING (status = 'active');

CREATE POLICY "campaigns_insert_own"
  ON public.campaigns FOR INSERT
  WITH CHECK (auth.uid() = project_id);

CREATE POLICY "campaigns_update_own"
  ON public.campaigns FOR UPDATE
  USING (auth.uid() = project_id);

-- Create applications table for shillers applying to campaigns
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  shiller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'under_review' CHECK (status IN ('under_review', 'approved', 'rejected')),
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'instagram', 'twitter')),
  content_url TEXT,
  views INTEGER DEFAULT 0,
  earnings NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, shiller_id)
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Shillers can see their own applications
CREATE POLICY "applications_select_own"
  ON public.applications FOR SELECT
  USING (auth.uid() = shiller_id);

-- Projects can see applications for their campaigns
CREATE POLICY "applications_select_campaign_owner"
  ON public.applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE campaigns.id = applications.campaign_id
      AND campaigns.project_id = auth.uid()
    )
  );

CREATE POLICY "applications_insert_own"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = shiller_id);

CREATE POLICY "applications_update_own"
  ON public.applications FOR UPDATE
  USING (auth.uid() = shiller_id);

-- Create withdrawals table
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL,
  wallet_address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "withdrawals_select_own"
  ON public.withdrawals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "withdrawals_insert_own"
  ON public.withdrawals FOR INSERT
  WITH CHECK (auth.uid() = user_id);
