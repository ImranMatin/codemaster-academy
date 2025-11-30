import { useState, useEffect } from 'react';
import { Play, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { supabase, CodingProblem } from '../lib/supabase';

type Language = 'python' | 'javascript';

interface ProblemSolverProps {
  problem: CodingProblem;
  onBack: () => void;
}

export default function ProblemSolver({ problem, onBack }: ProblemSolverProps) {
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('Click "Run Code" to execute your solution...');
  const [isRunning, setIsRunning] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    if (language === 'python') {
      setCode(problem.starter_code_python);
    } else {
      setCode(problem.starter_code_javascript);
    }
    setOutput('Click "Run Code" to execute your solution...');
  }, [language, problem]);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Executing code...');

    try {
      if (language === 'javascript') {
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(
            args
              .map((arg) =>
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
              )
              .join(' ')
          );
        };

        try {
          const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
          const fn = new AsyncFunction(code);
          await fn();
          console.log = originalLog;
          const outputText = logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)';
          setOutput(outputText);
          await recordSubmission('success', outputText);
        } catch (error) {
          console.log = originalLog;
          const errorText = `Error: ${error instanceof Error ? error.message : String(error)}`;
          setOutput(errorText);
          await recordSubmission('error', errorText);
        }
      } else if (language === 'python') {
        try {
          const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/execute-python`;

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ code }),
          });

          const result = await response.json();

          if (result.error) {
            const errorText = `Error:\n${result.error}`;
            setOutput(errorText);
            await recordSubmission('error', errorText);
          } else {
            const outputText = result.output || 'Code executed successfully (no output)';
            setOutput(outputText);
            await recordSubmission('success', outputText);
          }
        } catch (error) {
          const errorText = `Network Error: ${error instanceof Error ? error.message : String(error)}\n\nPlease ensure the server is running and accessible.`;
          setOutput(errorText);
          await recordSubmission('error', errorText);
        }
      }
    } catch (error) {
      const errorText = `Error: ${error instanceof Error ? error.message : String(error)}`;
      setOutput(errorText);
      await recordSubmission('error', errorText);
    } finally {
      setIsRunning(false);
    }
  };

  const recordSubmission = async (status: 'success' | 'error' | 'timeout', outputText: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || null;

      await supabase.from('user_problem_submissions').insert({
        user_id: userId,
        problem_id: problem.id,
        language,
        code,
        status,
        output: outputText,
      });

      const { data: existingProgress } = await supabase
        .from('user_problem_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('problem_id', problem.id)
        .maybeSingle();

      if (existingProgress) {
        const updateData: any = {
          attempts: existingProgress.attempts + 1,
          last_attempted_at: new Date().toISOString(),
        };

        if (status === 'success' && !existingProgress.is_solved) {
          updateData.is_solved = true;
          updateData.first_solved_at = new Date().toISOString();
          setIsSolved(true);

          if (user) {
            await updateUserProfile(user.id, problem.difficulty);
          }
        }

        await supabase
          .from('user_problem_progress')
          .update(updateData)
          .eq('id', existingProgress.id);
      } else {
        const isSuccess = status === 'success';
        await supabase.from('user_problem_progress').insert({
          user_id: userId,
          problem_id: problem.id,
          is_solved: isSuccess,
          attempts: 1,
          last_attempted_at: new Date().toISOString(),
          first_solved_at: isSuccess ? new Date().toISOString() : null,
        });

        if (isSuccess) {
          setIsSolved(true);
          if (user) {
            await updateUserProfile(user.id, problem.difficulty);
          }
        }
      }
    } catch (error) {
      console.error('Error recording submission:', error);
    }
  };

  const updateUserProfile = async (userId: string, difficulty: string) => {
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (profile) {
      const updates: any = {
        total_solved: profile.total_solved + 1,
        updated_at: new Date().toISOString(),
      };

      if (difficulty === 'Easy') {
        updates.easy_solved = profile.easy_solved + 1;
      } else if (difficulty === 'Medium') {
        updates.medium_solved = profile.medium_solved + 1;
      } else if (difficulty === 'Hard') {
        updates.hard_solved = profile.hard_solved + 1;
      }

      await supabase.from('user_profiles').update(updates).eq('id', userId);
    }
  };

  const handleClear = () => {
    if (language === 'python') {
      setCode(problem.starter_code_python);
    } else {
      setCode(problem.starter_code_javascript);
    }
    setOutput('Click "Run Code" to execute your solution...');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-500/20 border-red-500/30';
      default:
        return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Problems</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 overflow-auto">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{problem.title}</h2>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-lg border text-sm font-semibold ${getDifficultyBgColor(
                      problem.difficulty
                    )} ${getDifficultyColor(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                  {isSolved && (
                    <div className="flex items-center gap-1 text-green-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">Solved</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {problem.description}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
              <div className="space-y-4">
                {problem.example_cases.map((example, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="mb-2">
                      <span className="text-purple-400 font-semibold">Example {index + 1}:</span>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400 text-sm">Input:</span>
                      <pre className="text-gray-300 font-mono text-sm mt-1">{example.input}</pre>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-400 text-sm">Output:</span>
                      <pre className="text-gray-300 font-mono text-sm mt-1">{example.output}</pre>
                    </div>
                    {example.explanation && (
                      <div>
                        <span className="text-gray-400 text-sm">Explanation:</span>
                        <p className="text-gray-300 text-sm mt-1">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {problem.topic_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 overflow-hidden flex flex-col">
          <div className="bg-gray-800 px-4 md:px-6 py-4 border-b border-purple-900/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleLanguageChange('python')}
                  className={`px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base ${
                    language === 'python'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  🐍 Python
                </button>
                <button
                  onClick={() => handleLanguageChange('javascript')}
                  className={`px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base ${
                    language === 'javascript'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  ⚡ JavaScript
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-semibold transition-all text-sm md:text-base"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 text-white rounded-lg font-semibold transition-all disabled:opacity-50 text-sm md:text-base"
                >
                  <Play className="w-4 h-4" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto relative">
              <div className="absolute top-3 left-4 text-xs md:text-sm font-semibold text-purple-400 z-10">
                Code Editor
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 pt-12 bg-gray-950 text-gray-300 font-mono text-sm md:text-base leading-relaxed resize-none focus:outline-none"
                spellCheck={false}
                style={{ tabSize: 2 }}
              />
            </div>

            <div className="flex-1 overflow-auto relative bg-gray-950 border-t border-gray-800">
              <div className="absolute top-3 left-4 text-xs md:text-sm font-semibold text-green-400 z-10">
                Output
              </div>
              <div className="h-full p-4 pt-12 overflow-auto">
                <pre className="text-gray-300 font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                  {output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
