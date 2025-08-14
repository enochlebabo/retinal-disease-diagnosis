import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qaeorurdxfnfuowyrvpv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhZW9ydXJkeGZuZnVvd3lydnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODIyNDgsImV4cCI6MjA2ODY1ODI0OH0.A23wffLG_9YoEQk9T0HXINgOu_qrO4PY9KwdytbCbk8'

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