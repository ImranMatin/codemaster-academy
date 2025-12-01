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
import { CodingProblem } from './lib/supabase';

function App() {
  const [activeView, setActiveView] = useState<'docs' | 'quizzes' | 'editor' | 'problems' | 'leaderboard' | 'interview' | 'profile'>('docs');
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
        <main className="container mx-auto px-4 py-8">
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
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
