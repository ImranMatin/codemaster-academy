import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { User, Trophy, Code, MessageSquare, Calendar, TrendingUp, Mail } from 'lucide-react';

interface InterviewSession {
  id: string;
  role: string;
  overall_score: number;
  total_time_seconds: number;
  completed_at: string;
  feedback_summary: string;
}

interface UserStats {
  totalProblems: number;
  easyProblems: number;
  mediumProblems: number;
  hardProblems: number;
  totalInterviews: number;
  averageScore: number;
}

export default function Profile() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalProblems: 0,
    easyProblems: 0,
    mediumProblems: 0,
    hardProblems: 0,
    totalInterviews: 0,
    averageScore: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfileData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchProfileData = async () => {
    if (!user) return;

    try {

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      const { data: interviewSessions } = await supabase
        .from('interview_sessions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('completed_at', { ascending: false })
        .limit(10);

      setSessions(interviewSessions || []);

      const averageScore =
        interviewSessions && interviewSessions.length > 0
          ? Math.round(
              interviewSessions.reduce((sum, s) => sum + (s.overall_score || 0), 0) /
                interviewSessions.length
            )
          : 0;

      setStats({
        totalProblems: profile?.total_solved || 0,
        easyProblems: profile?.easy_solved || 0,
        mediumProblems: profile?.medium_solved || 0,
        hardProblems: profile?.hard_solved || 0,
        totalInterviews: interviewSessions?.length || 0,
        averageScore,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 p-8 text-center">
          <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Authentication Required</h3>
          <p className="text-gray-400 mb-6">
            Please sign in to view your profile and track your progress
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 text-white rounded-lg font-semibold transition-all"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">Your Profile</h2>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <Mail className="w-5 h-5" />
          <p className="text-base md:text-lg">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.totalProblems}</div>
              <div className="text-gray-400 text-sm">Problems Solved</div>
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="text-green-400 font-semibold">{stats.easyProblems}</span>
              <span className="text-gray-500"> Easy</span>
            </div>
            <div>
              <span className="text-yellow-400 font-semibold">{stats.mediumProblems}</span>
              <span className="text-gray-500"> Med</span>
            </div>
            <div>
              <span className="text-red-400 font-semibold">{stats.hardProblems}</span>
              <span className="text-gray-500"> Hard</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.totalInterviews}</div>
              <div className="text-gray-400 text-sm">Mock Interviews</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className={`text-3xl font-bold ${getScoreColor(stats.averageScore)}`}>
                {stats.averageScore}/10
              </div>
              <div className="text-gray-400 text-sm">Avg Interview Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-xl font-bold text-white">Interview History</h3>
        </div>

        {sessions.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No interviews completed yet</p>
            <p className="text-gray-500 text-sm mt-2">
              Complete a mock interview to see your performance history
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {sessions.map((session) => (
              <div key={session.id} className="p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{session.role}</h4>
                      <span
                        className={`text-2xl font-bold ${getScoreColor(session.overall_score)}`}
                      >
                        {session.overall_score}/10
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{session.feedback_summary}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(session.completed_at)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        <span>{formatTime(session.total_time_seconds)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
