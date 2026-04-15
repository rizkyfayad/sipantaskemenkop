import { createClient } from '@supabase/supabase-js'

// Menambahkan fallback (placeholder) sementara agar Vercel tidak gagal sewaktu proses Build (mengecek rute API).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key';

export const supabase = createClient(supabaseUrl, supabaseKey);
