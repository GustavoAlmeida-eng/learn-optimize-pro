-- Create simulados table
CREATE TABLE public.simulados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL, -- 'enem' or 'regular'
  serie_ou_vestibular TEXT NOT NULL,
  materias JSONB NOT NULL,
  conteudos JSONB NOT NULL,
  observacoes_adicionais TEXT,
  status TEXT NOT NULL DEFAULT 'incompleto', -- 'incompleto' or 'concluido'
  total_questoes INTEGER NOT NULL DEFAULT 0,
  questoes_respondidas INTEGER NOT NULL DEFAULT 0,
  acertos INTEGER NOT NULL DEFAULT 0,
  nota DECIMAL,
  duracao_minutos INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create questoes_simulado table
CREATE TABLE public.questoes_simulado (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  simulado_id UUID NOT NULL REFERENCES public.simulados(id) ON DELETE CASCADE,
  numero INTEGER NOT NULL,
  materia TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  enunciado TEXT NOT NULL,
  alternativas JSONB NOT NULL,
  resposta_correta INTEGER NOT NULL,
  resposta_usuario INTEGER,
  correta BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create questoes_geradas table (para buscar questões)
CREATE TABLE public.questoes_geradas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL, -- 'enem' or 'regular'
  serie_ou_vestibular TEXT NOT NULL,
  materias JSONB NOT NULL,
  conteudos JSONB NOT NULL,
  observacoes_adicionais TEXT,
  questoes JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create analises_ia table
CREATE TABLE public.analises_ia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  simulado_id UUID NOT NULL REFERENCES public.simulados(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  analise TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.simulados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questoes_simulado ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questoes_geradas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analises_ia ENABLE ROW LEVEL SECURITY;

-- RLS Policies for simulados
CREATE POLICY "Users can view their own simulados"
  ON public.simulados FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own simulados"
  ON public.simulados FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own simulados"
  ON public.simulados FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own simulados"
  ON public.simulados FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for questoes_simulado
CREATE POLICY "Users can view questions from their simulados"
  ON public.questoes_simulado FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.simulados
    WHERE simulados.id = questoes_simulado.simulado_id
    AND simulados.user_id = auth.uid()
  ));

CREATE POLICY "Users can create questions for their simulados"
  ON public.questoes_simulado FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.simulados
    WHERE simulados.id = questoes_simulado.simulado_id
    AND simulados.user_id = auth.uid()
  ));

CREATE POLICY "Users can update questions from their simulados"
  ON public.questoes_simulado FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.simulados
    WHERE simulados.id = questoes_simulado.simulado_id
    AND simulados.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete questions from their simulados"
  ON public.questoes_simulado FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.simulados
    WHERE simulados.id = questoes_simulado.simulado_id
    AND simulados.user_id = auth.uid()
  ));

-- RLS Policies for questoes_geradas
CREATE POLICY "Users can view their own generated questions"
  ON public.questoes_geradas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own generated questions"
  ON public.questoes_geradas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated questions"
  ON public.questoes_geradas FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for analises_ia
CREATE POLICY "Users can view their own AI analyses"
  ON public.analises_ia FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own AI analyses"
  ON public.analises_ia FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_simulados_user_id ON public.simulados(user_id);
CREATE INDEX idx_questoes_simulado_simulado_id ON public.questoes_simulado(simulado_id);
CREATE INDEX idx_questoes_geradas_user_id ON public.questoes_geradas(user_id);
CREATE INDEX idx_analises_ia_simulado_id ON public.analises_ia(simulado_id);