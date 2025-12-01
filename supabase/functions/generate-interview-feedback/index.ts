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

function generateFallbackFeedback(questionsAndAnswers: QuestionAnswer[]) {
  const questionFeedback = questionsAndAnswers.map((qa, idx) => {
    const answerLength = qa.answer.length;
    let score = 5;
    let feedback = '';
    
    if (answerLength < 50) {
      score = 3;
      feedback = 'Your answer is quite brief. Try to provide more detail and specific examples to demonstrate your knowledge and experience.';
    } else if (answerLength < 150) {
      score = 5;
      feedback = 'Your answer shows some understanding, but could benefit from more depth. Consider adding specific examples or more technical details.';
    } else if (answerLength < 300) {
      score = 7;
      feedback = 'Good answer with reasonable detail. You covered the main points well. Consider adding more specific examples or discussing edge cases to strengthen your response.';
    } else {
      score = 8;
      feedback = 'Excellent, detailed answer. You demonstrated strong knowledge and provided good depth. Keep up the great work in structuring your responses.';
    }
    
    const keyTopicsMissed = qa.type === 'technical' ? [
      'Consider discussing implementation details',
      'Mention relevant tools or frameworks',
      'Discuss trade-offs or best practices'
    ] : [];
    
    const starAnalysis = qa.type === 'behavioral' 
      ? 'For behavioral questions, try to structure your answer using the STAR method: Situation (set the context), Task (describe what needed to be done), Action (explain what you did), and Result (share the outcome). This helps create a compelling narrative that showcases your skills and decision-making process.'
      : '';
    
    return {
      questionNumber: idx + 1,
      score,
      feedback,
      keyTopicsMissed,
      starAnalysis
    };
  });
  
  const avgScore = Math.round(questionFeedback.reduce((sum, qf) => sum + qf.score, 0) / questionFeedback.length);
  
  return {
    overallScore: avgScore,
    feedbackSummary: `You scored ${avgScore}/10 overall. Your responses show effort and understanding. To improve, focus on providing more specific examples, using structured approaches like STAR for behavioral questions, and diving deeper into technical concepts. Keep practicing!`,
    questionFeedback
  };
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
      const feedback = generateFallbackFeedback(questionsAndAnswers);
      return new Response(
        JSON.stringify({ feedback }),
        {
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
      const feedback = generateFallbackFeedback(questionsAndAnswers);
      return new Response(
        JSON.stringify({ feedback }),
        {
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
      const feedback = generateFallbackFeedback(questionsAndAnswers);
      return new Response(
        JSON.stringify({ feedback }),
        {
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
      feedback = generateFallbackFeedback(questionsAndAnswers);
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