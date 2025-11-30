import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QuestionAnswer {
  question: string;
  answer: string;
  type: 'technical' | 'behavioral';
}

interface GenerateFeedbackRequest {
  role: string;
  questionsAndAnswers: QuestionAnswer[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { role, questionsAndAnswers }: GenerateFeedbackRequest = await req.json();

    if (!role || !questionsAndAnswers || !Array.isArray(questionsAndAnswers)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const qaText = questionsAndAnswers
      .map((qa, idx) => `\nQuestion ${idx + 1} (${qa.type}):\n${qa.question}\n\nCandidate's Answer:\n${qa.answer}`)
      .join('\n\n---\n');

    const prompt = `You are an experienced technical interviewer evaluating a candidate for a ${role} position. Review the following interview questions and answers, then provide detailed feedback.

${qaText}

Provide a comprehensive evaluation in the following JSON format:
{
  "overallScore": <number 1-10>,
  "feedbackSummary": "<2-3 sentence overall assessment>",
  "questionFeedback": [
    {
      "questionNumber": 1,
      "score": <number 1-10>,
      "feedback": "<specific feedback for this answer>",
      "keyTopicsMissed": ["<topic1>", "<topic2>"] (for technical questions) or [],
      "starAnalysis": "<STAR framework analysis>" (for behavioral questions only, otherwise empty string)
    },
    ... (one entry for each question)
  ]
}

Guidelines:
- For technical questions: Assess accuracy, completeness, and depth. Identify missing key concepts.
- For behavioral questions: Check if they used the STAR method (Situation, Task, Action, Result). Provide specific coaching on how to improve the narrative structure.
- Be constructive and specific in your feedback
- Scores should reflect the quality of the answer relative to what's expected for the role

Return ONLY valid JSON. No markdown, no extra text.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate feedback' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!content) {
      console.error('No content in Gemini response:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI service' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    let feedback;
    try {
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      feedback = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI service' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ feedback }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error generating feedback:', error);
    return new Response(
      JSON.stringify({
        error: `Server error: ${error instanceof Error ? error.message : String(error)}`,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});