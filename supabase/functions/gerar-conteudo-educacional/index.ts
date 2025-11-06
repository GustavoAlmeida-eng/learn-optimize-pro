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
    const { tipo, materia, titulo } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY not configured');

    let prompt = '';
    let tableName = '';

    if (tipo === 'mapa') {
      tableName = 'mapas_mentais';
      prompt = `Crie um mapa mental COMPLETO e DETALHADO sobre "${titulo}" da matéria ${materia}.
      
      O mapa mental deve incluir:
      - Conceito central claramente definido
      - 5-8 ramos principais com subtópicos detalhados
      - Conexões entre conceitos
      - Exemplos práticos
      - Fórmulas ou definições importantes (quando aplicável)
      
      Retorne em formato Markdown com emojis para melhor visualização.`;
    } else if (tipo === 'resumo') {
      tableName = 'resumos';
      prompt = `Crie um resumo COMPLETO e EDUCATIVO sobre "${titulo}" da matéria ${materia}.
      
      O resumo deve incluir:
      - Introdução ao tema
      - Conceitos principais explicados de forma clara
      - Exemplos práticos e aplicações
      - Dicas de estudo e pontos importantes
      - Resumo final com os principais pontos
      
      Use Markdown para formatação, com títulos, listas e negrito quando necessário.
      Tamanho: 800-1200 palavras.`;
    } else if (tipo === 'slide') {
      tableName = 'slides';
      prompt = `Crie uma apresentação em slides sobre "${titulo}" da matéria ${materia}.
      
      Retorne APENAS um JSON array com 8-12 slides no seguinte formato:
      [
        {
          "numero": 1,
          "titulo": "Título do Slide",
          "conteudo": "Conteúdo do slide com bullets points",
          "notas": "Notas para o apresentador (opcional)"
        }
      ]
      
      Estrutura sugerida:
      - Slide 1: Título e introdução
      - Slides 2-3: Conceitos fundamentais
      - Slides 4-8: Desenvolvimento do tema com exemplos
      - Slide 9-10: Aplicações práticas
      - Último slide: Resumo e conclusão`;
    }

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'Você é um professor experiente que cria conteúdo educacional de alta qualidade.' },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!aiResponse.ok) {
      throw new Error('Failed to generate content');
    }

    const aiData = await aiResponse.json();
    let conteudo = aiData.choices[0].message.content;

    let insertData: any = {
      titulo,
      materia,
    };

    if (tipo === 'slide') {
      conteudo = conteudo.trim().replace(/```json\n?|```\n?/g, '');
      insertData.conteudo = JSON.parse(conteudo);
    } else {
      insertData.conteudo = conteudo;
    }

    const { data, error } = await supabaseClient
      .from(tableName)
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
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
