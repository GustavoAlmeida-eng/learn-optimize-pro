import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { tipo, serieOuVestibular, materias, conteudos, observacoesAdicionais } = await req.json();
    
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Gerar questões usando IA
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const prompt = `Gere 10 questões de múltipla escolha para um simulado ${tipo === 'enem' ? 'de ENEM' : 'de ensino regular'} sobre:
    - ${tipo === 'enem' ? 'Vestibular' : 'Série'}: ${serieOuVestibular}
    - Matérias: ${materias.join(', ')}
    - Conteúdos: ${JSON.stringify(conteudos)}
    ${observacoesAdicionais ? `- Observações adicionais: ${observacoesAdicionais}` : ''}
    
    Retorne APENAS um JSON array com o seguinte formato:
    [
      {
        "numero": 1,
        "materia": "Matemática",
        "conteudo": "Álgebra",
        "enunciado": "Texto da questão...",
        "alternativas": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
        "respostaCorreta": 0
      }
    ]`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'Você é um gerador de questões educacionais. Retorne APENAS JSON válido, sem texto adicional.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      throw new Error('Failed to generate questions');
    }

    const aiData = await aiResponse.json();
    const questoesText = aiData.choices[0].message.content.trim();
    const questoes = JSON.parse(questoesText.replace(/```json\n?|```\n?/g, ''));

    // Criar simulado no banco
    const { data: simulado, error: simuladoError } = await supabaseClient
      .from('simulados')
      .insert({
        user_id: user.id,
        titulo: `Simulado ${tipo === 'enem' ? serieOuVestibular : `${serieOuVestibular} ano`} - ${new Date().toLocaleDateString('pt-BR')}`,
        tipo,
        serie_ou_vestibular: serieOuVestibular,
        materias: JSON.stringify(materias),
        conteudos: JSON.stringify(conteudos),
        observacoes_adicionais: observacoesAdicionais,
        total_questoes: questoes.length,
      })
      .select()
      .single();

    if (simuladoError) throw simuladoError;

    // Inserir questões
    const questoesInsert = questoes.map((q: any) => ({
      simulado_id: simulado.id,
      numero: q.numero,
      materia: q.materia,
      conteudo: q.conteudo,
      enunciado: q.enunciado,
      alternativas: JSON.stringify(q.alternativas),
      resposta_correta: q.respostaCorreta,
    }));

    const { error: questoesError } = await supabaseClient
      .from('questoes_simulado')
      .insert(questoesInsert);

    if (questoesError) throw questoesError;

    return new Response(JSON.stringify({ simuladoId: simulado.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});