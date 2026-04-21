import { createClient } from "@supabase/supabase-js";

// server-only Supabase client for API routes
export const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY
);