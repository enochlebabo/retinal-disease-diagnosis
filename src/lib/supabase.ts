import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string
          user_id: string
          messages: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          messages: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          messages?: any[]
          updated_at?: string
        }
      }
      user_learning: {
        Row: {
          id: string
          user_id: string
          question: string
          response: string
          context: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          question: string
          response: string
          context?: any
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          question?: string
          response?: string
          context?: any
        }
      }
    }
  }
}