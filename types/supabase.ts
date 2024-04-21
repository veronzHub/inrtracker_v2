export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      days_of_week: {
        Row: {
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      inrs: {
        Row: {
          auth_uid: string
          created_at: string
          date: string
          id: number
          inr: number
          note: string | null
          updated_at: string | null
        }
        Insert: {
          auth_uid?: string
          created_at?: string
          date: string
          id?: number
          inr: number
          note?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_uid?: string
          created_at?: string
          date?: string
          id?: number
          inr?: number
          note?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_inr_auth_uid_fkey"
            columns: ["auth_uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      warfarin: {
        Row: {
          color: string | null
          created_at: string
          hex: string | null
          id: number
          image: string | null
          strength: string | null
          unit: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          hex?: string | null
          id?: number
          image?: string | null
          strength?: string | null
          unit?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          hex?: string | null
          id?: number
          image?: string | null
          strength?: string | null
          unit?: string | null
        }
        Relationships: []
      }
      warfarin_accidents: {
        Row: {
          auth_uid: string
          created_at: string
          date: string
          id: number
          incorrect: boolean
          missed: boolean
          note: string | null
          updated_at: string | null
        }
        Insert: {
          auth_uid?: string
          created_at?: string
          date: string
          id?: number
          incorrect?: boolean
          missed?: boolean
          note?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_uid?: string
          created_at?: string
          date?: string
          id?: number
          incorrect?: boolean
          missed?: boolean
          note?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_warfarin_missed_dosages_auth_uid_fkey"
            columns: ["auth_uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      warfarin_dosages: {
        Row: {
          auth_uid: string
          created_at: string
          day_of_week: number
          dose: number
          id: number
          start_date: number
          strength: number
          updated_at: string | null
        }
        Insert: {
          auth_uid?: string
          created_at?: string
          day_of_week: number
          dose: number
          id?: number
          start_date: number
          strength: number
          updated_at?: string | null
        }
        Update: {
          auth_uid?: string
          created_at?: string
          day_of_week?: number
          dose?: number
          id?: number
          start_date?: number
          strength?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_warfarin_dosages_auth_uid_fkey"
            columns: ["auth_uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_warfarin_dosages_day_of_week_fkey"
            columns: ["day_of_week"]
            isOneToOne: false
            referencedRelation: "days_of_week"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_warfarin_dosages_start_date_fkey"
            columns: ["start_date"]
            isOneToOne: false
            referencedRelation: "query_warfarin_schedules_and_doses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_warfarin_dosages_start_date_fkey"
            columns: ["start_date"]
            isOneToOne: false
            referencedRelation: "warfarin_schedules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_warfarin_dosages_strength_fkey"
            columns: ["strength"]
            isOneToOne: false
            referencedRelation: "warfarin"
            referencedColumns: ["id"]
          },
        ]
      }
      warfarin_preferences: {
        Row: {
          auth_uid: string
          created_at: string
          id: number
          pill_strength: number
          updated_at: string | null
        }
        Insert: {
          auth_uid?: string
          created_at?: string
          id?: number
          pill_strength: number
          updated_at?: string | null
        }
        Update: {
          auth_uid?: string
          created_at?: string
          id?: number
          pill_strength?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_warfarin_preferences_auth_uid_fkey"
            columns: ["auth_uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_warfarin_preferences_pill_strength_fkey"
            columns: ["pill_strength"]
            isOneToOne: false
            referencedRelation: "warfarin"
            referencedColumns: ["id"]
          },
        ]
      }
      warfarin_schedules: {
        Row: {
          auth_uid: string
          created_at: string
          id: number
          start_date: string
          updated_at: string | null
        }
        Insert: {
          auth_uid?: string
          created_at?: string
          id?: number
          start_date: string
          updated_at?: string | null
        }
        Update: {
          auth_uid?: string
          created_at?: string
          id?: number
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_warfarin_schedule_auth_uuid_fkey"
            columns: ["auth_uid"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      query_warfarin_schedules_and_doses: {
        Row: {
          friday: Json | null
          id: number | null
          monday: Json | null
          saturday: Json | null
          start_date: string | null
          sunday: Json | null
          thursday: Json | null
          tuesday: Json | null
          wednesday: Json | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
