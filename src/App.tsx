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
import { CodingProblem } from './lib/supabase';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'docs' | 'quizzes' | 'editor' | 'problems' | 'leaderboard' | 'interview' | 'profile' | 'roadmap'>('home');
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
        <main className={activeView === 'roadmap' ? '' : 'container mx-auto px-4 py-8'}>
          {activeView === 'home' && (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-6">
                CodeMaster Academy
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 text-center max-w-2xl">
                Learn, Code, & Test - Your complete platform for mastering coding interviews
              </p>
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
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
