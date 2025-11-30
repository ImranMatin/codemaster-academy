import { useState } from 'react';
import { Check, X } from 'lucide-react';

type Language = 'python' | 'javascript' | 'java' | 'cpp';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  title: string;
  icon: string;
  questions: Question[];
}

const quizData: Record<Language, QuizData> = {
  python: {
    title: 'Python',
    icon: '🐍',
    questions: [
      {
        question: 'What is the main philosophy behind Python?',
        options: ['Speed over readability', 'Readability and simplicity', 'Complex is better than simple', 'Implicit is better than explicit'],
        correctAnswer: 1
      },
      {
        question: 'Which year was Python created?',
        options: ['1985', '1991', '1995', '2000'],
        correctAnswer: 1
      },
      {
        question: 'What is Python primarily known for?',
        options: ['Low-level memory management', 'High performance gaming', 'Simplicity and readability', 'Hardware programming'],
        correctAnswer: 2
      },
      {
        question: 'Which of these is NOT a common use case for Python?',
        options: ['Data Science', 'Web Development', 'Device Drivers', 'Automation'],
        correctAnswer: 2
      },
      {
        question: 'What type of language is Python?',
        options: ['Compiled only', 'Interpreted', 'Assembly', 'Machine code'],
        correctAnswer: 1
      }
    ]
  },
  javascript: {
    title: 'JavaScript',
    icon: '⚡',
    questions: [
      {
        question: 'Who created JavaScript?',
        options: ['James Gosling', 'Brendan Eich', 'Guido van Rossum', 'Dennis Ritchie'],
        correctAnswer: 1
      },
      {
        question: 'What year was JavaScript created?',
        options: ['1991', '1993', '1995', '1997'],
        correctAnswer: 2
      },
      {
        question: 'What is Node.js?',
        options: ['A JavaScript framework', 'A runtime for server-side JavaScript', 'A database', 'A CSS preprocessor'],
        correctAnswer: 1
      },
      {
        question: 'Which of these is a modern JavaScript feature?',
        options: ['Arrow functions', 'GOTO statements', 'Pointers', 'Manual memory management'],
        correctAnswer: 0
      },
      {
        question: 'Where does JavaScript primarily run?',
        options: ['Only on servers', 'Only in web browsers', 'In browsers and servers', 'Only on mobile devices'],
        correctAnswer: 2
      }
    ]
  },
  java: {
    title: 'Java',
    icon: '☕',
    questions: [
      {
        question: 'What does WORA stand for in Java?',
        options: ['Write Once, Read Anywhere', 'Write Once, Run Anywhere', 'Write Often, Run Always', 'Work Once, Repeat Always'],
        correctAnswer: 1
      },
      {
        question: 'What is the JVM?',
        options: ['Java Variable Manager', 'Java Virtual Machine', 'Java Version Manager', 'Java Visual Module'],
        correctAnswer: 1
      },
      {
        question: 'Which company originally developed Java?',
        options: ['Microsoft', 'Apple', 'Sun Microsystems', 'IBM'],
        correctAnswer: 2
      },
      {
        question: 'What is a key feature of Java?',
        options: ['Manual memory management', 'Platform dependence', 'Automatic garbage collection', 'No type safety'],
        correctAnswer: 2
      },
      {
        question: 'What is Java primarily used for?',
        options: ['Only web development', 'Enterprise applications and Android', 'Only gaming', 'System drivers'],
        correctAnswer: 1
      }
    ]
  },
  cpp: {
    title: 'C++',
    icon: '⚙️',
    questions: [
      {
        question: 'Who created C++?',
        options: ['Dennis Ritchie', 'Bjarne Stroustrup', 'Linus Torvalds', 'Ken Thompson'],
        correctAnswer: 1
      },
      {
        question: 'What year was C++ created?',
        options: ['1972', '1979', '1985', '1991'],
        correctAnswer: 1
      },
      {
        question: 'What is C++ an extension of?',
        options: ['Python', 'Java', 'C', 'Assembly'],
        correctAnswer: 2
      },
      {
        question: 'What is C++ primarily known for?',
        options: ['Simplicity', 'High performance and control', 'Web development', 'Automatic memory management'],
        correctAnswer: 1
      },
      {
        question: 'Which library is part of modern C++?',
        options: ['jQuery', 'React', 'STL (Standard Template Library)', 'Django'],
        correctAnswer: 2
      }
    ]
  }
};

export default function Quizzes() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const quiz = quizData[selectedLanguage];

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    if (!showResults) {
      setAnswers({ ...answers, [questionIndex]: optionIndex });
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    setAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getOptionClassName = (questionIndex: number, optionIndex: number) => {
    const isSelected = answers[questionIndex] === optionIndex;
    const isCorrect = quiz.questions[questionIndex].correctAnswer === optionIndex;

    if (!showResults) {
      return isSelected
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700';
    }

    if (isCorrect) {
      return 'bg-green-600 text-white border-green-500 shadow-lg shadow-green-500/30';
    }

    if (isSelected && !isCorrect) {
      return 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/30';
    }

    return 'bg-gray-800 text-gray-400 border-gray-700';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          The Test
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Test your knowledge with interactive quizzes
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        {(Object.keys(quizData) as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`p-4 md:p-6 rounded-xl font-semibold transition-all ${
              selectedLanguage === lang
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/30 scale-105'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
            }`}
          >
            <div className="text-3xl md:text-4xl mb-2">{quizData[lang].icon}</div>
            <div className="text-sm md:text-base">{quizData[lang].title}</div>
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-purple-900/30">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl">{quiz.icon}</span>
            <h3 className="text-xl md:text-3xl font-bold text-white">{quiz.title} Quiz</h3>
          </div>
          {showResults && (
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-purple-400">
                {calculateScore()}/{quiz.questions.length}
              </div>
              <div className="text-xs md:text-sm text-gray-400">Score</div>
            </div>
          )}
        </div>

        <div className="space-y-6 md:space-y-8">
          {quiz.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="border-b border-gray-800 pb-6 md:pb-8 last:border-b-0">
              <h4 className="text-base md:text-lg font-semibold text-white mb-4">
                {questionIndex + 1}. {question.question}
              </h4>
              <div className="space-y-2 md:space-y-3">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                    disabled={showResults}
                    className={`w-full text-left p-3 md:p-4 rounded-lg border-2 transition-all text-sm md:text-base ${getOptionClassName(
                      questionIndex,
                      optionIndex
                    )} ${!showResults ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResults && (
                        <>
                          {question.correctAnswer === optionIndex && (
                            <Check className="w-5 h-5 md:w-6 md:h-6" />
                          )}
                          {answers[questionIndex] === optionIndex &&
                            question.correctAnswer !== optionIndex && (
                              <X className="w-5 h-5 md:w-6 md:h-6" />
                            )}
                        </>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.questions.length}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 md:py-4 px-6 md:px-8 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm md:text-base"
            >
              Retake Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
