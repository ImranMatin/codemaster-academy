import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GenerateQuestionsRequest {
  role: string;
}

const questionBank: Record<string, Array<{question: string; type: 'technical' | 'behavioral'}>> = {
  "AI Engineer": [
    { question: "Explain the difference between deep learning and traditional machine learning. When would you use each approach?", type: "technical" },
    { question: "How would you approach building a natural language processing system? What models and techniques would you consider?", type: "technical" },
    { question: "Describe your experience with transformer architectures. How do they differ from RNNs and CNNs?", type: "technical" },
    { question: "Tell me about a time when you had to optimize an AI model for production deployment. What challenges did you face?", type: "behavioral" },
    { question: "Describe a situation where your AI solution didn't perform as expected. How did you troubleshoot and improve it?", type: "behavioral" }
  ],
  "ML Engineer": [
    { question: "Explain the entire ML lifecycle from data collection to model deployment. What are the critical steps?", type: "technical" },
    { question: "How do you approach feature engineering? What techniques do you use to identify important features?", type: "technical" },
    { question: "Describe your experience with MLOps. How do you ensure model monitoring and retraining in production?", type: "technical" },
    { question: "Tell me about a time when you had to improve model performance. What strategies did you implement?", type: "behavioral" },
    { question: "Describe a project where you successfully deployed a machine learning model at scale.", type: "behavioral" }
  ],
  "Data Scientist": [
    { question: "Explain the difference between supervised and unsupervised learning. Give examples of when you'd use each.", type: "technical" },
    { question: "How do you handle missing data in a dataset? What techniques do you use?", type: "technical" },
    { question: "What is overfitting in machine learning and how do you prevent it?", type: "technical" },
    { question: "Tell me about a time when your data analysis led to an important business decision.", type: "behavioral" },
    { question: "Describe a situation where you had to explain complex technical concepts to non-technical stakeholders.", type: "behavioral" }
  ],
  "Data Analyst": [
    { question: "How do you approach exploratory data analysis? What tools and techniques do you use?", type: "technical" },
    { question: "Explain the difference between different types of joins in SQL. When would you use each?", type: "technical" },
    { question: "What data visualization techniques do you use to communicate insights effectively?", type: "technical" },
    { question: "Tell me about a time when you discovered an important insight from data that changed business strategy.", type: "behavioral" },
    { question: "Describe a situation where you had to work with messy or incomplete data. How did you handle it?", type: "behavioral" }
  ],
  "Data Engineer": [
    { question: "Explain the difference between ETL and ELT. When would you choose one approach over the other?", type: "technical" },
    { question: "How do you design data pipelines for scalability and reliability? What patterns do you follow?", type: "technical" },
    { question: "Describe your experience with big data technologies like Spark or Kafka. What use cases are they best suited for?", type: "technical" },
    { question: "Tell me about a time when you had to optimize a slow data pipeline. What was your approach?", type: "behavioral" },
    { question: "Describe a project where you built data infrastructure from scratch. What challenges did you face?", type: "behavioral" }
  ],
  "Software Engineer": [
    { question: "Explain the principles of object-oriented programming. How do you apply them in your code?", type: "technical" },
    { question: "How would you design a URL shortening service like bit.ly? Walk me through your system design.", type: "technical" },
    { question: "What is your approach to writing clean, maintainable code? What design patterns do you commonly use?", type: "technical" },
    { question: "Tell me about the most complex technical problem you've solved. What was your approach?", type: "behavioral" },
    { question: "Describe a time when you had to refactor legacy code. How did you ensure you didn't break existing functionality?", type: "behavioral" }
  ],
  "Software Developer": [
    { question: "Explain the difference between synchronous and asynchronous programming. When would you use each?", type: "technical" },
    { question: "How do you approach debugging a complex issue in production? Walk me through your process.", type: "technical" },
    { question: "What testing strategies do you use to ensure code quality? Describe your experience with unit and integration testing.", type: "technical" },
    { question: "Tell me about a time when you had to learn a new programming language or framework quickly.", type: "behavioral" },
    { question: "Describe a situation where you disagreed with a technical decision. How did you handle it?", type: "behavioral" }
  ],
  "Front-End Developer": [
    { question: "Explain the difference between var, let, and const in JavaScript. When would you use each?", type: "technical" },
    { question: "What is the Virtual DOM in React and how does it improve performance?", type: "technical" },
    { question: "How would you implement responsive design? Describe your approach and tools you'd use.", type: "technical" },
    { question: "Tell me about a time when you had to optimize the performance of a web application. What was your approach?", type: "behavioral" },
    { question: "Describe a situation where you had to work with a difficult team member. How did you handle it?", type: "behavioral" }
  ],
  "Back-End Developer": [
    { question: "Explain the difference between SQL and NoSQL databases. When would you choose one over the other?", type: "technical" },
    { question: "What is RESTful API design? What are the key principles you follow when designing APIs?", type: "technical" },
    { question: "How do you handle database transactions and ensure data consistency?", type: "technical" },
    { question: "Tell me about a time when you had to debug a critical production issue. What was your process?", type: "behavioral" },
    { question: "Describe a project where you had to make important architectural decisions. How did you approach it?", type: "behavioral" }
  ],
  "Full-Stack Developer": [
    { question: "Explain how authentication and authorization work in a web application. What security measures do you implement?", type: "technical" },
    { question: "What is your approach to building scalable applications? Describe the architecture you'd use.", type: "technical" },
    { question: "How do you ensure code quality across both frontend and backend?", type: "technical" },
    { question: "Tell me about the most challenging full-stack project you've worked on. What made it challenging?", type: "behavioral" },
    { question: "Describe a time when you had to learn a new technology quickly to complete a project.", type: "behavioral" }
  ],
  "DevOps Engineer": [
    { question: "Explain the concept of Infrastructure as Code. What tools have you used for this?", type: "technical" },
    { question: "How do you implement CI/CD pipelines? What are the key stages?", type: "technical" },
    { question: "What monitoring and alerting strategies do you use for production systems?", type: "technical" },
    { question: "Tell me about a time when you had to handle a major system outage. What was your response?", type: "behavioral" },
    { question: "Describe how you've improved deployment processes in a previous role.", type: "behavioral" }
  ],
  "Product Manager": [
    { question: "How do you prioritize features in a product roadmap? What framework do you use?", type: "technical" },
    { question: "Explain your process for gathering and analyzing user feedback.", type: "technical" },
    { question: "How do you measure product success? What metrics do you track?", type: "technical" },
    { question: "Tell me about a time when you had to make a difficult product decision with incomplete information.", type: "behavioral" },
    { question: "Describe a situation where you had to manage conflicting stakeholder priorities.", type: "behavioral" }
  ]
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { role }: GenerateQuestionsRequest = await req.json();

    if (!role || typeof role !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid role provided' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    if (questionBank[role]) {
      const questions = questionBank[role].map((q, idx) => ({
        question: q.question,
        type: q.type,
        number: idx + 1
      }));

      return new Response(
        JSON.stringify({ questions }),
        {
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
        JSON.stringify({ error: 'AI service not configured and no fallback questions available for this role' }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const prompt = `You are an experienced technical interviewer. Generate exactly 5 interview questions for a ${role} position.

Requirements:
- Generate 3 technical questions and 2 behavioral questions
- Technical questions should test core knowledge and problem-solving
- Behavioral questions should assess soft skills and past experiences
- Questions should be realistic and commonly asked in real interviews
- Each question should be clear and specific

Return ONLY a valid JSON array with this exact structure:
[
  {
    "question": "question text here",
    "type": "technical" or "behavioral",
    "number": 1
  },
  ... (5 questions total)
]

Do not include any other text, explanations, or markdown formatting. Just the JSON array.`;

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
          maxOutputTokens: 2000,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to generate questions' }),
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
    
    let questions;
    try {
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      questions = JSON.parse(cleanedContent);
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
      JSON.stringify({ questions }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error generating questions:', error);
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
