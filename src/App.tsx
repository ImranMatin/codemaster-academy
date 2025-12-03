import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Documentation from './components/Documentation';
import Quizzes from './components/Quizzes';
import CodeEditor from './components/CodeEditor';
import Problems from './components/Problems';
import ProblemSolver from './components/ProblemSolver';
import Leaderboard from './components/Leaderboard';
import MockInterview from './components/MockInterview';
import Profile from './components/Profile';
import CareerRoadmap from './components/CareerRoadmap';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import FAQ from './components/FAQ';
import { CodingProblem } from './lib/supabase';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'docs' | 'quizzes' | 'editor' | 'problems' | 'leaderboard' | 'interview' | 'profile' | 'roadmap' | 'about' | 'contact'>('home');
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem | null>(null);

  const handleSelectProblem = (problem: CodingProblem) => {
    setSelectedProblem(problem);
  };

  const handleBackToProblems = () => {
    setSelectedProblem(null);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-950">
        <Navbar activeView={activeView} setActiveView={setActiveView} />
        <main className={activeView === 'roadmap' || activeView === 'about' || activeView === 'contact' ? '' : 'container mx-auto px-4 py-8'}>
          {activeView === 'home' && (
            <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-200px)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-gray-950 to-teal-950/50">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-2xl opacity-50 animate-pulse"></div>
                  <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl">
                    CodeMaster Academy
                  </h1>
                </div>

                <p className="text-xl md:text-2xl text-gray-300 text-center max-w-2xl mb-12 px-4">
                  Learn, Code, & Test - Your complete platform for mastering coding interviews
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl px-4">
                  <div className="group bg-gradient-to-br from-blue-900/40 to-blue-950/40 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">📚</div>
                    <h3 className="text-lg font-bold text-blue-300 mb-2">Learn</h3>
                    <p className="text-sm text-gray-400">Master concepts with comprehensive tutorials and documentation</p>
                  </div>

                  <div className="group bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">⚒️</div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-2">Code</h3>
                    <p className="text-sm text-gray-400">Practice with real coding challenges and problems</p>
                  </div>

                  <div className="group bg-gradient-to-br from-teal-900/40 to-teal-950/40 backdrop-blur-sm border border-teal-500/30 rounded-xl p-6 hover:border-teal-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-teal-500/20">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">🎯</div>
                    <h3 className="text-lg font-bold text-teal-300 mb-2">Test</h3>
                    <p className="text-sm text-gray-400">Evaluate your skills with quizzes and mock interviews</p>
                  </div>
                </div>
              </div>

              <FAQ />
            </div>
          )}
          {activeView === 'docs' && <Documentation />}
          {activeView === 'quizzes' && <Quizzes />}
          {activeView === 'editor' && <CodeEditor />}
          {activeView === 'problems' && (
            selectedProblem ? (
              <ProblemSolver problem={selectedProblem} onBack={handleBackToProblems} />
            ) : (
              <Problems onSelectProblem={handleSelectProblem} />
            )
          )}
          {activeView === 'leaderboard' && <Leaderboard />}
          {activeView === 'interview' && <MockInterview />}
          {activeView === 'profile' && <Profile />}
          {activeView === 'roadmap' && <CareerRoadmap />}
          {activeView === 'about' && <AboutUs />}
          {activeView === 'contact' && <ContactUs />}
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
