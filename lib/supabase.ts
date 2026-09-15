import { createClient } from '@supabase/supabase-js'

// Agar env vars nahi hain to build na toote isliye fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check karo agar khali hai to bhi client ban jaye
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
