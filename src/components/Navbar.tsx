import { useState } from 'react';
import { Book, Brain, Code2, ListChecks, Trophy, MessageSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Auth from './Auth';

interface NavbarProps {
  activeView: 'docs' | 'quizzes' | 'editor' | 'problems' | 'leaderboard' | 'interview' | 'profile';
  setActiveView: (view: 'docs' | 'quizzes' | 'editor' | 'problems' | 'leaderboard' | 'interview' | 'profile') => void;
}

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
  const { user, signOut } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <nav className="bg-gray-900 border-b border-purple-900/30 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4">
            <div className="flex items-center justify-between mb-4 md:mb-0">
              <div className="flex items-center">
                <Code2 className="w-8 h-8 text-purple-500 mr-3" />
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  The Dev Vault
                </h1>
              </div>

              <div className="md:hidden flex items-center gap-2">
                {user ? (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <button
                      onClick={signOut}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAuth(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>

          <div className="flex flex-wrap justify-center md:justify-between items-center gap-2 md:gap-4 w-full md:flex-1">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              <button
                onClick={() => setActiveView('docs')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'docs'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Book className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">The Vault</span>
              </button>

              <button
                onClick={() => setActiveView('quizzes')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'quizzes'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Brain className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">The Test</span>
              </button>

              <button
                onClick={() => setActiveView('editor')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'editor'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">The Forge</span>
              </button>

              <button
                onClick={() => setActiveView('problems')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'problems'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <ListChecks className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Problems</span>
              </button>

              <button
                onClick={() => setActiveView('leaderboard')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'leaderboard'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Leaderboard</span>
              </button>

              <button
                onClick={() => setActiveView('interview')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'interview'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Interview</span>
              </button>

              <button
                onClick={() => setActiveView('profile')}
                className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all ${
                  activeView === 'profile'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <User className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-sm md:text-base">Profile</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm">{user.email}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50 text-white rounded-lg font-semibold transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>

    {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  );
}
