import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, image, sessionId } = await req.json();
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    let userId = null;

    if (authHeader) {
      const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
      userId = user?.id;
    }

    console.log('Processing AI Vision request:', { hasImage: !!image, message, userId, sessionId });

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a specialized AI Vision Assistant for retinal health analysis. You are designed to:

1. Analyze retinal fundus images for medical conditions including:
   - Diabetic retinopathy (mild, moderate, severe, proliferative)
   - Choroidal neovascularization (CNV)
   - Drusen (hard and soft)
   - Diabetic macular edema (DME)
   - Age-related macular degeneration (AMD)
   - Glaucomatous changes
   - Normal retinal appearance

2. Provide educational information about eye health conditions

3. Answer questions about retinal health, symptoms, and prevention

IMPORTANT MEDICAL DISCLAIMER: Always include this disclaimer in your responses:
"⚠️ Medical Disclaimer: This AI analysis is for educational purposes only and should not be used as a substitute for professional medical diagnosis. Always consult with a qualified ophthalmologist or healthcare provider for medical advice, diagnosis, and treatment decisions."

When analyzing images:
- Provide detailed observations of retinal structures
- Identify any abnormalities or pathological changes
- Suggest confidence levels for findings
- Recommend appropriate follow-up care
- Use medical terminology but explain it clearly

When answering general questions:
- Provide accurate, evidence-based information
- Include preventive measures and lifestyle recommendations
- Explain medical concepts in accessible language
- Encourage regular eye examinations`
      }
    ];

    // Add user message
    if (image) {
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: message || 'Please analyze this retinal image for any abnormalities or conditions.'
          },
          {
            type: 'image_url',
            image_url: {
              url: image
            }
          }
        ]
      });
    } else {
      messages.push({
        role: 'user',
        content: message
      });
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: messages,
        max_completion_tokens: 1500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('AI response generated successfully');

    // Store conversation if user is authenticated
    if (userId && sessionId) {
      try {
        // Get existing conversation or create new one
        const { data: existingConversation } = await supabase
          .from('conversations')
          .select('*')
          .eq('user_id', userId)
          .eq('session_id', sessionId)
          .single();

        const newMessage = {
          id: Date.now().toString(),
          role: 'user',
          content: message,
          image: image || null,
          timestamp: new Date().toISOString()
        };

        const aiMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString()
        };

        if (existingConversation) {
          // Update existing conversation
          const updatedMessages = [...existingConversation.messages, newMessage, aiMessage];
          await supabase
            .from('conversations')
            .update({ messages: updatedMessages })
            .eq('id', existingConversation.id);
        } else {
          // Create new conversation
          await supabase
            .from('conversations')
            .insert({
              user_id: userId,
              session_id: sessionId,
              messages: [newMessage, aiMessage]
            });
        }

        // If image analysis, also store in ai_analyses table
        if (image) {
          await supabase
            .from('ai_analyses')
            .insert({
              user_id: userId,
              image_url: image,
              analysis_result: { response: aiResponse },
              findings: aiResponse.substring(0, 500),
              confidence_score: 0.85
            });
        }

        console.log('Conversation stored successfully');
      } catch (error) {
        console.error('Error storing conversation:', error);
        // Don't fail the request if storage fails
      }
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      sessionId: sessionId || Date.now().toString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-vision-assistant function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'An error occurred processing your request' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});