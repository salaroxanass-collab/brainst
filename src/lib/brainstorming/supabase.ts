import { createClient } from "@supabase/supabase-js";
import type { BrainstormingDatabase } from "./database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasPublicSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);
export const hasServiceSupabaseConfig = Boolean(supabaseUrl && supabaseServiceRoleKey);

export function createPublicBrainstormingClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  return createClient<BrainstormingDatabase>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }).schema("brainstorming");
}

export function createServiceBrainstormingClient() {
  if (!supabaseUrl || !supabaseServiceRoleKey) return null;

  return createClient<BrainstormingDatabase>(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }).schema("brainstorming");
}
