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
      
      Retorne um JSON com a seguinte estrutura:
      {
        "conceito_central": "Conceito principal",
        "descricao_imagem": "Descrição detalhada para gerar uma imagem de mapa mental visual com o conceito central no meio e ramos ao redor",
        "ramos": [
          {
            "titulo": "Ramo Principal",
            "subtopicos": ["subtópico 1", "subtópico 2"],
            "exemplos": "Exemplos práticos",
            "destaque": "Ponto importante"
          }
        ],
        "conexoes": ["Relação entre conceitos"],
        "dicas_estudo": ["Dica 1", "Dica 2"]
      }`;
    } else if (tipo === 'resumo') {
      tableName = 'resumos';
      prompt = `Crie um resumo COMPLETO e EDUCATIVO sobre "${titulo}" da matéria ${materia}.
      
      Retorne um JSON com a seguinte estrutura:
      {
        "introducao": "Texto introdutório envolvente",
        "imagem_destaque": "Descrição para gerar imagem ilustrativa do tema",
        "secoes": [
          {
            "titulo": "Título da Seção",
            "conteudo": "Conteúdo detalhado",
            "exemplos": ["Exemplo 1", "Exemplo 2"],
            "destaque": "Ponto importante"
          }
        ],
        "resumo_final": "Síntese dos pontos principais",
        "dicas_estudo": ["Dica 1", "Dica 2"],
        "questoes_pratica": ["Questão reflexiva 1", "Questão reflexiva 2"]
      }`;
    } else if (tipo === 'slide') {
      tableName = 'slides';
      prompt = `Crie uma apresentação em slides sobre "${titulo}" da matéria ${materia}.
      
      Retorne APENAS um JSON array com 10-15 slides no seguinte formato:
      [
        {
          "numero": 1,
          "titulo": "Título do Slide",
          "conteudo": "Conteúdo do slide com bullets points",
          "imagem_descricao": "Descrição para gerar imagem ilustrativa (opcional)",
          "notas": "Notas para o apresentador (opcional)"
        }
      ]
      
      Estrutura:
      - Slide 1: Título e introdução com imagem de capa
      - Slides 2-4: Conceitos fundamentais com ilustrações
      - Slides 5-10: Desenvolvimento com exemplos e diagramas
      - Slides 11-13: Aplicações práticas com casos reais
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
    let conteudo = aiData.choices[0].message.content.trim().replace(/```json\n?|```\n?/g, '');
    
    const parsedContent = JSON.parse(conteudo);

    // Gerar imagem ilustrativa baseada no conteúdo
    let imageUrl = null;
    try {
      let imagePrompt = '';
      
      if (tipo === 'mapa' && parsedContent.descricao_imagem) {
        imagePrompt = `Educational mind map diagram: ${parsedContent.descricao_imagem}. Style: clean, colorful, professional educational illustration`;
      } else if (tipo === 'resumo' && parsedContent.imagem_destaque) {
        imagePrompt = `Educational illustration: ${parsedContent.imagem_destaque}. Style: clean, modern, educational`;
      } else if (tipo === 'slide' && parsedContent[0]?.imagem_descricao) {
        imagePrompt = `Educational illustration: ${parsedContent[0].imagem_descricao}. Style: professional presentation graphic`;
      }

      if (imagePrompt) {
        const imageResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash-image-preview',
            messages: [{ role: 'user', content: imagePrompt }],
            modalities: ['image', 'text']
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        }
      }
    } catch (imgError) {
      console.error('Error generating image:', imgError);
    }

    let insertData: any = {
      titulo,
      materia,
      conteudo: tipo === 'slide' ? parsedContent : JSON.stringify({ ...parsedContent, imagem_principal: imageUrl }),
    };

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
