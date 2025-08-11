// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Type definition that EXACTLY matches your database schema
export interface WaitlistSubmission {
  id?: string;
  name: string;
  email: string;
  platform: 'instagram' | 'youtube' | 'both';
  instagram_username?: string | null;
  instagram_followers?: number | null;
  youtube_channel_name?: string | null;
  youtube_subscribers?: number | null;
  created_at?: string;
  updated_at?: string;
}
