import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Briefcase, Clock, PlayCircle, MessageSquare, Video, ArrowRight } from 'lucide-react';

interface InterviewQuestion {
  question: string;
  type: 'technical' | 'behavioral';
  number: number;
}

interface SessionData {
  sessionId: string;
  role: string;
  questions: InterviewQuestion[];
  answers: string[];
  startTime: number;
}

export default function MockInterview() {
  const [sessionState, setSessionState] = useState<'select' | 'active' | 'feedback'>('select');
  const [selectedRole, setSelectedRole] = useState('');
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>(null);

  const roles = [
    {
      id: 'frontend-developer',
      title: 'Front-End Developer',
      description: 'React, JavaScript, HTML/CSS, UI/UX',
      icon: '💻',
    },
    {
      id: 'backend-developer',
      title: 'Back-End Developer',
      description: 'Node.js, APIs, Databases, System Design',
      icon: '⚙️',
    },
    {
      id: 'fullstack-developer',
      title: 'Full-Stack Developer',
      description: 'End-to-end web development skills',
      icon: '🚀',
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      description: 'Python, ML, Statistics, Data Analysis',
      icon: '📊',
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      description: 'CI/CD, Cloud, Docker, Kubernetes',
      icon: '☁️',
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      description: 'Strategy, Roadmaps, Stakeholder Management',
      icon: '📋',
    },
  ];

  const startInterview = async (roleId: string) => {
    setLoading(true);
    try {
      const role = roles.find((r) => r.id === roleId);
      if (!role) return;

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-interview-questions`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ role: role.title }),
      });

      const result = await response.json();

      if (result.error || !result.questions) {
        console.error('API Error:', result.error);
        console.error('Full response:', result);
        alert(`Failed to generate questions: ${result.error || 'Unknown error'}. Please check the console for details.`);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || null;

      const { data: session, error } = await supabase
        .from('interview_sessions')
        .insert({
          user_id: userId,
          role: role.title,
          status: 'in_progress',
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error || !session) {
        alert('Failed to create session. Please try again.');
        return;
      }

      const questions = result.questions.map((q: any, idx: number) => ({
        question: q.question,
        type: q.type,
        number: idx + 1,
      }));

      for (const q of questions) {
        await supabase.from('interview_questions').insert({
          session_id: session.id,
          question_number: q.number,
          question_text: q.question,
          question_type: q.type,
        });
      }

      setSessionData({
        sessionId: session.id,
        role: role.title,
        questions,
        answers: Array(5).fill(''),
        startTime: Date.now(),
      });
      setSessionState('active');
      setCurrentQuestionIndex(0);
      setCurrentAnswer('');
    } catch (error) {
      console.error('Error starting interview:', error);
      alert(`An error occurred: ${error instanceof Error ? error.message : String(error)}. Please check the console for details.`);
    } finally {
      setLoading(false);
    }
  };

  const handleNextQuestion = () => {
    if (!sessionData) return;

    const newAnswers = [...sessionData.answers];
    newAnswers[currentQuestionIndex] = currentAnswer;
    setSessionData({ ...sessionData, answers: newAnswers });

    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(newAnswers[currentQuestionIndex + 1] || '');
    } else {
      submitInterview(newAnswers);
    }
  };

  const submitInterview = async (answers: string[]) => {
    if (!sessionData) return;

    setLoading(true);
    try {
      const totalTimeSeconds = Math.floor((Date.now() - sessionData.startTime) / 1000);

      const questionsAndAnswers = sessionData.questions.map((q, idx) => ({
        question: q.question,
        answer: answers[idx] || 'No answer provided',
        type: q.type,
      }));

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-interview-feedback`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          role: sessionData.role,
          questionsAndAnswers,
        }),
      });

      const result = await response.json();

      if (result.error || !result.feedback) {
        alert('Failed to generate feedback. Please try again.');
        return;
      }

      const feedback = result.feedback;

      await supabase
        .from('interview_sessions')
        .update({
          status: 'completed',
          total_time_seconds: totalTimeSeconds,
          overall_score: feedback.overallScore,
          feedback_summary: feedback.feedbackSummary,
          completed_at: new Date().toISOString(),
        })
        .eq('id', sessionData.sessionId);

      const { data: questions } = await supabase
        .from('interview_questions')
        .select('*')
        .eq('session_id', sessionData.sessionId)
        .order('question_number');

      if (questions) {
        for (let i = 0; i < questions.length; i++) {
          const questionFeedback = feedback.questionFeedback[i];
          await supabase
            .from('interview_questions')
            .update({
              user_answer: answers[i] || 'No answer provided',
              ai_feedback: questionFeedback.feedback,
              score: questionFeedback.score,
              key_topics_missed: questionFeedback.keyTopicsMissed || [],
              answered_at: new Date().toISOString(),
            })
            .eq('id', questions[i].id);
        }
      }

      setFeedbackData({
        ...feedback,
        totalTimeSeconds,
        role: sessionData.role,
        questions: sessionData.questions,
        answers,
      });
      setSessionState('feedback');
    } catch (error) {
      console.error('Error submitting interview:', error);
      alert('An error occurred while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const restartInterview = () => {
    setSessionState('select');
    setSessionData(null);
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    setFeedbackData(null);
  };

  if (sessionState === 'feedback' && feedbackData) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Interview Complete!
          </h2>
          <p className="text-gray-400 text-lg">
            Here's your detailed performance feedback
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 p-6 md:p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className={`text-4xl font-bold mb-2 ${getScoreColor(feedbackData.overallScore)}`}>
                {feedbackData.overallScore}/10
              </div>
              <div className="text-gray-400 text-sm">Overall Score</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {formatTime(feedbackData.totalTimeSeconds)}
              </div>
              <div className="text-gray-400 text-sm">Total Time</div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">5/5</div>
              <div className="text-gray-400 text-sm">Questions Answered</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Overall Assessment</h3>
            <p className="text-gray-300 leading-relaxed">{feedbackData.feedbackSummary}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Question-by-Question Feedback</h3>
            <div className="space-y-6">
              {feedbackData.questionFeedback.map((qf: any, idx: number) => (
                <div key={idx} className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-purple-400 font-semibold">
                          Question {qf.questionNumber}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            feedbackData.questions[idx].type === 'technical'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}
                        >
                          {feedbackData.questions[idx].type}
                        </span>
                        <span className={`text-lg font-bold ${getScoreColor(qf.score)}`}>
                          {qf.score}/10
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{feedbackData.questions[idx].question}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Your Answer:</div>
                    <div className="bg-gray-900 rounded-lg p-4 text-gray-300 text-sm">
                      {feedbackData.answers[idx] || 'No answer provided'}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Feedback:</div>
                    <div className="text-gray-300 text-sm leading-relaxed">{qf.feedback}</div>
                  </div>

                  {qf.keyTopicsMissed && qf.keyTopicsMissed.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-2">Key Topics You Missed:</div>
                      <div className="flex flex-wrap gap-2">
                        {qf.keyTopicsMissed.map((topic: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {qf.starAnalysis && (
                    <div>
                      <div className="text-sm text-gray-400 mb-2">STAR Method Analysis:</div>
                      <div className="bg-gray-900 rounded-lg p-4 text-gray-300 text-sm leading-relaxed">
                        {qf.starAnalysis}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={restartInterview}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 text-white rounded-lg font-semibold transition-all"
          >
            Start New Interview
          </button>
        </div>
      </div>
    );
  }

  if (sessionState === 'active' && sessionData) {
    const currentQuestion = sessionData.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / 5) * 100;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 overflow-hidden">
          <div className="bg-gray-800 px-6 py-4 border-b border-purple-900/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{sessionData.role}</h3>
                <p className="text-gray-400 text-sm">Mock Interview Session</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-400">
                  {currentQuestionIndex + 1}/5
                </div>
                <div className="text-gray-400 text-sm">Questions</div>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    currentQuestion.type === 'technical'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}
                >
                  {currentQuestion.type === 'technical' ? 'Technical Question' : 'Behavioral Question'}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{currentQuestion.question}</h3>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <label className="text-gray-300 font-semibold">Your Answer</label>
              </div>
              <textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full h-64 p-4 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 resize-none"
              />
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Video className="w-4 h-4" />
                <span>Future: Voice/Video response option coming soon</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNextQuestion}
                disabled={loading || !currentAnswer.trim()}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  'Processing...'
                ) : currentQuestionIndex < 4 ? (
                  <>
                    Next Question
                    <ArrowRight className="w-5 h-5" />
                  </>
                ) : (
                  'Submit Interview'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          Mock Interview
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Practice your interview skills with AI-powered feedback
        </p>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Choose Your Role</h4>
            <p className="text-gray-400 text-sm">
              Select the position you're interviewing for to get relevant questions
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Answer 5 Questions</h4>
            <p className="text-gray-400 text-sm">
              Mix of technical and behavioral questions, just like a real interview
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Get AI Feedback</h4>
            <p className="text-gray-400 text-sm">
              Receive detailed analysis with scores and improvement suggestions
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Select Interview Role</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => startInterview(role.id)}
              disabled={loading}
              className="bg-gray-900 hover:bg-gray-800 rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-4xl mb-3">{role.icon}</div>
              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {role.title}
              </h4>
              <p className="text-gray-400 text-sm mb-4">{role.description}</p>
              <div className="flex items-center gap-2 text-purple-400 font-semibold">
                <PlayCircle className="w-5 h-5" />
                <span>Start Interview</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
