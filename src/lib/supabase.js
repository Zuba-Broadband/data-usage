import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ensure variables are defined before creating the client
if (!supabaseUrl || !supabaseAnonKey) {
   console.error('Supabase URL and Anon key are required for environment variables!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database schema types for TypeScript-like documentation
/*
Tables:
1. clients
   - id (uuid, primary key)
   - name (text)
   - email (text)
   - created_at (timestamp)
   - updated_at (timestamp)

2. data_usage
   - id (uuid, primary key)
   - client_id (uuid, foreign key to clients.id)
   - date (date)
   - kit_1_usage (numeric) - in GB
   - kit_2_usage (numeric) - in GB
   - total_usage (numeric) - computed field
   - created_at (timestamp)
   - updated_at (timestamp)

3. users (handled by Supabase Auth)
   - id (uuid, primary key)
   - email (text)
   - created_at (timestamp)
*/

