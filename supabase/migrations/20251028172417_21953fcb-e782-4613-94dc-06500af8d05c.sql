-- Adicionar tipo de plano na tabela profiles
ALTER TABLE public.profiles
ADD COLUMN plan_type text CHECK (plan_type IN ('enem', 'regular'));

-- Atualizar registros existentes com valor padrão
UPDATE public.profiles
SET plan_type = 'enem'
WHERE plan_type IS NULL;

-- Tornar o campo obrigatório
ALTER TABLE public.profiles
ALTER COLUMN plan_type SET NOT NULL;

-- Adicionar valor padrão para novos registros
ALTER TABLE public.profiles
ALTER COLUMN plan_type SET DEFAULT 'enem';

-- Atualizar a função handle_new_user para incluir o plan_type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, plan_type)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'plan_type', 'enem')
  );
  RETURN NEW;
END;
$function$;