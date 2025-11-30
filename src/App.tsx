import { useState } from 'react';
import Navbar from './components/Navbar';
import Documentation from './components/Documentation';
import Quizzes from './components/Quizzes';
import CodeEditor from './components/CodeEditor';
import Problems from './components/Problems';
import ProblemSolver from './components/ProblemSolver';
import Leaderboard from './components/Leaderboard';
import { CodingProblem } from './lib/supabase';

function App() {
  const [activeView, setActiveView] = useState<'docs' | 'quizzes' | 'editor' | 'problems' | 'leaderboard'>('docs');
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem | null>(null);

  const handleSelectProblem = (problem: CodingProblem) => {
    setSelectedProblem(problem);
  };

  const handleBackToProblems = () => {
    setSelectedProblem(null);
  };

  return (
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
      </main>
    </div>
  );
}

export default App;
