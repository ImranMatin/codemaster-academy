import { useState } from 'react';
import Navbar from './components/Navbar';
import Documentation from './components/Documentation';
import Quizzes from './components/Quizzes';
import CodeEditor from './components/CodeEditor';

function App() {
  const [activeView, setActiveView] = useState<'docs' | 'quizzes' | 'editor'>('docs');

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto px-4 py-8">
        {activeView === 'docs' && <Documentation />}
        {activeView === 'quizzes' && <Quizzes />}
        {activeView === 'editor' && <CodeEditor />}
      </main>
    </div>
  );
}

export default App;
