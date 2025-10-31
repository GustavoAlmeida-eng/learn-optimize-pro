export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analises_ia: {
        Row: {
          analise: string
          created_at: string
          id: string
          simulado_id: string
          user_id: string
        }
        Insert: {
          analise: string
          created_at?: string
          id?: string
          simulado_id: string
          user_id: string
        }
        Update: {
          analise?: string
          created_at?: string
          id?: string
          simulado_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "analises_ia_simulado_id_fkey"
            columns: ["simulado_id"]
            isOneToOne: false
            referencedRelation: "simulados"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          plan_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          plan_type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          plan_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      questoes_geradas: {
        Row: {
          conteudos: Json
          created_at: string
          id: string
          materias: Json
          observacoes_adicionais: string | null
          questoes: Json
          serie_ou_vestibular: string
          tipo: string
          user_id: string
        }
        Insert: {
          conteudos: Json
          created_at?: string
          id?: string
          materias: Json
          observacoes_adicionais?: string | null
          questoes: Json
          serie_ou_vestibular: string
          tipo: string
          user_id: string
        }
        Update: {
          conteudos?: Json
          created_at?: string
          id?: string
          materias?: Json
          observacoes_adicionais?: string | null
          questoes?: Json
          serie_ou_vestibular?: string
          tipo?: string
          user_id?: string
        }
        Relationships: []
      }
      questoes_simulado: {
        Row: {
          alternativas: Json
          conteudo: string
          correta: boolean | null
          created_at: string
          enunciado: string
          id: string
          materia: string
          numero: number
          resposta_correta: number
          resposta_usuario: number | null
          simulado_id: string
        }
        Insert: {
          alternativas: Json
          conteudo: string
          correta?: boolean | null
          created_at?: string
          enunciado: string
          id?: string
          materia: string
          numero: number
          resposta_correta: number
          resposta_usuario?: number | null
          simulado_id: string
        }
        Update: {
          alternativas?: Json
          conteudo?: string
          correta?: boolean | null
          created_at?: string
          enunciado?: string
          id?: string
          materia?: string
          numero?: number
          resposta_correta?: number
          resposta_usuario?: number | null
          simulado_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "questoes_simulado_simulado_id_fkey"
            columns: ["simulado_id"]
            isOneToOne: false
            referencedRelation: "simulados"
            referencedColumns: ["id"]
          },
        ]
      }
      simulados: {
        Row: {
          acertos: number
          completed_at: string | null
          conteudos: Json
          created_at: string
          duracao_minutos: number | null
          id: string
          materias: Json
          nota: number | null
          observacoes_adicionais: string | null
          questoes_respondidas: number
          serie_ou_vestibular: string
          status: string
          tipo: string
          titulo: string
          total_questoes: number
          user_id: string
        }
        Insert: {
          acertos?: number
          completed_at?: string | null
          conteudos: Json
          created_at?: string
          duracao_minutos?: number | null
          id?: string
          materias: Json
          nota?: number | null
          observacoes_adicionais?: string | null
          questoes_respondidas?: number
          serie_ou_vestibular: string
          status?: string
          tipo: string
          titulo: string
          total_questoes?: number
          user_id: string
        }
        Update: {
          acertos?: number
          completed_at?: string | null
          conteudos?: Json
          created_at?: string
          duracao_minutos?: number | null
          id?: string
          materias?: Json
          nota?: number | null
          observacoes_adicionais?: string | null
          questoes_respondidas?: number
          serie_ou_vestibular?: string
          status?: string
          tipo?: string
          titulo?: string
          total_questoes?: number
          user_id?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          payment_method: string | null
          plan_name: string
          plan_price: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          payment_method?: string | null
          plan_name: string
          plan_price: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          payment_method?: string | null
          plan_name?: string
          plan_price?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
