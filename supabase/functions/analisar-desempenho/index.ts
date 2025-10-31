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
    const { simuladoId } = await req.json();
    
    const authHeader = req.headers.get('Authorization')!;
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) throw new Error('Unauthorized');

    // Buscar simulado e questões
    const { data: simulado, error: simuladoError } = await supabaseClient
      .from('simulados')
      .select('*')
      .eq('id', simuladoId)
      .eq('user_id', user.id)
      .single();

    if (simuladoError || !simulado) throw new Error('Simulado not found');

    const { data: questoes } = await supabaseClient
      .from('questoes_simulado')
      .select('*')
      .eq('simulado_id', simuladoId)
      .order('numero');

    // Gerar análise com IA
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    const acertosPorMateria: Record<string, { acertos: number, total: number }> = {};
    questoes?.forEach((q: any) => {
      if (!acertosPorMateria[q.materia]) {
        acertosPorMateria[q.materia] = { acertos: 0, total: 0 };
      }
      acertosPorMateria[q.materia].total++;
      if (q.correta) acertosPorMateria[q.materia].acertos++;
    });

    const prompt = `Analise o desempenho do aluno no seguinte simulado:

Título: ${simulado.titulo}
Total de questões: ${simulado.total_questoes}
Questões respondidas: ${simulado.questoes_respondidas}
Acertos: ${simulado.acertos}
Taxa de acerto: ${((simulado.acertos / simulado.questoes_respondidas) * 100).toFixed(1)}%

Desempenho por matéria:
${Object.entries(acertosPorMateria).map(([materia, dados]) => 
  `- ${materia}: ${dados.acertos}/${dados.total} (${((dados.acertos / dados.total) * 100).toFixed(1)}%)`
).join('\n')}

Forneça uma análise detalhada e personalizada incluindo:
1. Pontos fortes (matérias com melhor desempenho)
2. Pontos de melhoria (matérias que precisam de mais atenção)
3. Recomendações específicas de estudo
4. Dicas para melhorar o desempenho geral`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'Você é um professor experiente que analisa o desempenho de alunos e fornece feedback construtivo.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      throw new Error('Failed to generate analysis');
    }

    const aiData = await aiResponse.json();
    const analise = aiData.choices[0].message.content;

    // Salvar análise
    const { data, error } = await supabaseClient
      .from('analises_ia')
      .insert({
        simulado_id: simuladoId,
        user_id: user.id,
        analise,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ analise }), {
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