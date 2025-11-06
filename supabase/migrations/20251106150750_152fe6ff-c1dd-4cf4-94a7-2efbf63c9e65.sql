-- Criar tabelas para armazenar conteúdo educacional gerado por IA
CREATE TABLE IF NOT EXISTS public.mapas_mentais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  materia TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.resumos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  materia TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  materia TEXT NOT NULL,
  conteudo JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.mapas_mentais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slides ENABLE ROW LEVEL SECURITY;

-- Criar políticas para conteúdo público
CREATE POLICY "Todos podem visualizar mapas mentais"
  ON public.mapas_mentais FOR SELECT
  USING (true);

CREATE POLICY "Todos podem visualizar resumos"
  ON public.resumos FOR SELECT
  USING (true);

CREATE POLICY "Todos podem visualizar slides"
  ON public.slides FOR SELECT
  USING (true);

-- Criar índices para performance
CREATE INDEX idx_mapas_mentais_materia ON public.mapas_mentais(materia);
CREATE INDEX idx_resumos_materia ON public.resumos(materia);
CREATE INDEX idx_slides_materia ON public.slides(materia);