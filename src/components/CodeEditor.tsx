import { useState } from 'react';
import { Play, Trash2, ChevronDown } from 'lucide-react';

type Language = 'python' | 'javascript' | 'java' | 'cpp';

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

console.log(greet("Developer"));`,
  java: `// Welcome to The Forge - Java Editor
// Write your Java code here

public class Main {
    public static void main(String[] args) {
        String name = "Developer";
        System.out.println("Hello, " + name + "!");
    }
}`,
  cpp: `// Welcome to The Forge - C++ Editor
// Write your C++ code here

#include <iostream>
#include <string>
using namespace std;

int main() {
    string name = "Developer";
    cout << "Hello, " << name << "!" << endl;
    return 0;
}`
};

const languageLabels = {
  python: { icon: '🐍', name: 'Python' },
  javascript: { icon: '⚡', name: 'JavaScript' },
  java: { icon: '☕', name: 'Java' },
  cpp: { icon: '⚙️', name: 'C++' }
};

export default function CodeEditor() {
  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState(defaultCode[language]);
  const [output, setOutput] = useState('Click "Run Code" to execute your code...');
  const [isRunning, setIsRunning] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      } else {
        try {
          const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/execute-python`;

          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ code, language }),
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
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 md:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold transition-all text-sm md:text-base hover:shadow-lg hover:shadow-purple-500/50"
              >
                <span>{languageLabels[language].icon}</span>
                <span>{languageLabels[language].name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-20 overflow-hidden">
                  {(Object.keys(languageLabels) as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        handleLanguageChange(lang);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-3 text-left transition-colors ${
                        language === lang
                          ? 'bg-purple-900/30 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <span>{languageLabels[lang].icon}</span>
                      <span className="font-medium">{languageLabels[lang].name}</span>
                    </button>
                  ))}
                </div>
              )}
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
            <span>Python, Java, and C++ code executes securely using Piston API in a sandboxed environment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Use console.log() in JavaScript, print() in Python, System.out.println() in Java, or cout in C++</span>
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
