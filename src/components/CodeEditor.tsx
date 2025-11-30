import { useState } from 'react';
import { Play, Trash2 } from 'lucide-react';

type Language = 'python' | 'javascript';

const defaultCode = {
  python: `# Welcome to The Forge - Python Editor
# Write your Python code here

def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`,
  javascript: `// Welcome to The Forge - JavaScript Editor
// Write your JavaScript code here

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));`
};

export default function CodeEditor() {
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(defaultCode[language]);
  const [output, setOutput] = useState('Click "Run Code" to execute your code...');
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(defaultCode[lang]);
    setOutput('Click "Run Code" to execute your code...');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Executing code...');

    try {
      if (language === 'javascript') {
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(arg =>
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        try {
          const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
          const fn = new AsyncFunction(code);
          await fn();
          console.log = originalLog;
          setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)');
        } catch (error) {
          console.log = originalLog;
          setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
        }
      } else if (language === 'python') {
        try {
          const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/execute-python`;

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ code }),
          });

          const result = await response.json();

          if (result.error) {
            setOutput(`Error:\n${result.error}`);
          } else {
            setOutput(result.output || 'Code executed successfully (no output)');
          }
        } catch (error) {
          setOutput(`Network Error: ${error instanceof Error ? error.message : String(error)}\n\nPlease ensure the server is running and accessible.`);
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClear = () => {
    setCode(defaultCode[language]);
    setOutput('Click "Run Code" to execute your code...');
  };

  const highlightSyntax = (code: string, lang: Language): string => {
    let highlighted = code;

    if (lang === 'python') {
      highlighted = highlighted
        .replace(/\b(def|class|if|else|elif|for|while|return|import|from|as|try|except|finally|with|lambda|yield|pass|break|continue|raise|True|False|None)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
        .replace(/\b(print|len|range|str|int|float|list|dict|set|tuple|open|input)\b/g, '<span class="text-blue-400">$1</span>')
        .replace(/(#.*$)/gm, '<span class="text-green-500 italic">$1</span>')
        .replace(/(".*?"|'.*?')/g, '<span class="text-amber-400">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>');
    } else if (lang === 'javascript') {
      highlighted = highlighted
        .replace(/\b(function|const|let|var|if|else|for|while|return|import|export|from|as|try|catch|finally|async|await|class|new|this|typeof|instanceof|true|false|null|undefined)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
        .replace(/\b(console|document|window|Array|Object|String|Number|Boolean|Math|Date|JSON)\b/g, '<span class="text-blue-400">$1</span>')
        .replace(/(\/\/.*$)/gm, '<span class="text-green-500 italic">$1</span>')
        .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-green-500 italic">$1</span>')
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-amber-400">$1</span>')
        .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>');
    }

    return highlighted;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          The Forge
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Practice your coding skills with our interactive editor
        </p>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 overflow-hidden">
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
                <span className="hidden sm:inline">Clear</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-800">
          <div className="relative">
            <div className="absolute top-3 left-4 text-xs md:text-sm font-semibold text-purple-400 z-10">
              Editor
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 md:h-96 lg:h-[600px] p-4 pt-12 bg-gray-950 text-gray-300 font-mono text-sm md:text-base leading-relaxed resize-none focus:outline-none"
              spellCheck={false}
              style={{ tabSize: 2 }}
            />
          </div>

          <div className="relative bg-gray-950">
            <div className="absolute top-3 left-4 text-xs md:text-sm font-semibold text-green-400 z-10">
              Output
            </div>
            <div className="h-64 md:h-96 lg:h-[600px] p-4 pt-12 overflow-auto">
              <pre className="text-gray-300 font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                {output}
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 bg-gray-900 rounded-xl p-4 md:p-6 border border-purple-900/30">
        <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
          Quick Tips
        </h3>
        <ul className="space-y-2 text-gray-400 text-sm md:text-base">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>JavaScript code runs directly in your browser</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Python code executes securely using Piston API in a sandboxed environment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Use console.log() in JavaScript or print() in Python to see output</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Maximum code length is 10,000 characters for security</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
