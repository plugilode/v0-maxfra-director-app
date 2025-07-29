import { createClient } from "@supabase/supabase-js"

// Check if we're in the browser and if Supabase environment variables are available
const supabaseUrl = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined
const supabaseAnonKey = typeof window !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined

// Only create Supabase client if we're in the browser and environment variables are available
export const supabase =
  typeof window !== "undefined" && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null

export const isSupabaseConfigured = !!(typeof window !== "undefined" && supabaseUrl && supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      instructors: {
        Row: {
          id: string
          name: string
          specialties: string[]
          phone: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          specialties: string[]
          phone: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          specialties?: string[]
          phone?: string
          email?: string
          created_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string
          phone: string
          manager_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          phone: string
          manager_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          phone?: string
          manager_id?: string
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          duration_hours: number
          price: number
          category: "course" | "service" | "consultation"
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          duration_hours: number
          price: number
          category: "course" | "service" | "consultation"
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          duration_hours?: number
          price?: number
          category?: "course" | "service" | "consultation"
          description?: string
          created_at?: string
        }
      }
      students: {
        Row: {
          id: string
          full_name: string
          phone: string
          email: string | null
          program_id: string
          enrollment_date: string
          progress_percentage: number
          status: "active" | "graduated" | "suspended"
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone: string
          email?: string | null
          program_id: string
          enrollment_date: string
          progress_percentage?: number
          status?: "active" | "graduated" | "suspended"
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone?: string
          email?: string | null
          program_id?: string
          enrollment_date?: string
          progress_percentage?: number
          status?: "active" | "graduated" | "suspended"
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          student_id: string
          instructor_id: string
          service_id: string
          location_id: string
          appointment_date: string
          start_time: string
          end_time: string
          status: "pending" | "confirmed" | "completed" | "cancelled"
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          instructor_id: string
          service_id: string
          location_id: string
          appointment_date: string
          start_time: string
          end_time: string
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          instructor_id?: string
          service_id?: string
          location_id?: string
          appointment_date?: string
          start_time?: string
          end_time?: string
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          notes?: string | null
          created_at?: string
        }
      }
      receipts: {
        Row: {
          id: string
          receipt_number: string
          student_id: string
          service_id: string
          amount: number
          payment_status: "pending" | "paid" | "refunded"
          payment_method: "cash" | "card" | "transfer"
          issued_date: string
          created_at: string
        }
        Insert: {
          id?: string
          receipt_number: string
          student_id: string
          service_id: string
          amount: number
          payment_status?: "pending" | "paid" | "refunded"
          payment_method: "cash" | "card" | "transfer"
          issued_date: string
          created_at?: string
        }
        Update: {
          id?: string
          receipt_number?: string
          student_id?: string
          service_id?: string
          amount?: number
          payment_status?: "pending" | "paid" | "refunded"
          payment_method?: "cash" | "card" | "transfer"
          issued_date?: string
          created_at?: string
        }
      }
    }
  }
}
