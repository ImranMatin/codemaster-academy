import { useState } from 'react';
import { Book, Brain, Code2, ListChecks, Trophy, MessageSquare, User, LogOut, LogIn } from 'lucide-react';
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
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Code2 className="w-8 h-8 text-purple-500 mr-3" />
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                The Dev Vault
              </h1>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
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

              {user ? (
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base hidden sm:inline">Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/50 hover:shadow-xl"
                >
                  <LogIn className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-sm md:text-base">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

    {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  );
}
