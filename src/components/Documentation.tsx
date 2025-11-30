import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

type Language = 'python' | 'javascript' | 'java' | 'cpp';

interface LanguageContent {
  title: string;
  icon: string;
  summary: string[];
  resources: { title: string; url: string }[];
}

const languageData: Record<Language, LanguageContent> = {
  python: {
    title: 'Python',
    icon: '🐍',
    summary: [
      "Python is a high-level, interpreted programming language known for its simplicity and readability. Created by Guido van Rossum in 1991, Python emphasizes code readability with significant whitespace and a clear, expressive syntax. It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
      "Python's extensive standard library and vast ecosystem of third-party packages make it incredibly versatile. It's widely used in web development, data science, artificial intelligence, scientific computing, automation, and scripting. The language's gentle learning curve makes it an excellent choice for beginners, while its powerful features satisfy experienced developers.",
      "With dynamic typing and automatic memory management, Python allows developers to focus on problem-solving rather than low-level details. The language's philosophy, outlined in 'The Zen of Python,' emphasizes beautiful, explicit, and simple code that's easy to understand and maintain."
    ],
    resources: [
      { title: 'Official Python Documentation', url: 'https://docs.python.org/3/' },
      { title: 'Real Python Tutorials', url: 'https://realpython.com/' },
      { title: 'Python Package Index (PyPI)', url: 'https://pypi.org/' }
    ]
  },
  javascript: {
    title: 'JavaScript',
    icon: '⚡',
    summary: [
      "JavaScript is a dynamic, high-level programming language that powers the interactive web. Originally created by Brendan Eich in 1995 for Netscape Navigator, JavaScript has evolved into one of the most popular and versatile programming languages in the world. It's the cornerstone of modern web development, running in every web browser without requiring any plugins.",
      "JavaScript excels at creating interactive user interfaces and dynamic web content. With the advent of Node.js, JavaScript expanded beyond the browser to become a full-stack language capable of server-side development, mobile app creation, desktop applications, and even IoT devices. Its event-driven, non-blocking architecture makes it particularly well-suited for real-time applications.",
      "The language supports multiple programming paradigms including object-oriented, functional, and imperative styles. Modern JavaScript (ES6+) includes powerful features like arrow functions, promises, async/await, destructuring, and modules, making it more expressive and maintainable than ever before."
    ],
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { title: 'JavaScript.info', url: 'https://javascript.info/' },
      { title: 'Node.js Documentation', url: 'https://nodejs.org/docs/latest/api/' }
    ]
  },
  java: {
    title: 'Java',
    icon: '☕',
    summary: [
      "Java is a robust, object-oriented programming language developed by Sun Microsystems (now Oracle) in 1995. Built on the principle of 'Write Once, Run Anywhere' (WORA), Java code compiles to bytecode that runs on the Java Virtual Machine (JVM), enabling platform independence. This makes Java applications highly portable across different operating systems and devices.",
      "Java is renowned for its strong typing, automatic memory management through garbage collection, and comprehensive security features. It's extensively used in enterprise applications, Android mobile development, web servers, scientific applications, and big data technologies. The language's maturity, stability, and extensive ecosystem of frameworks (like Spring, Hibernate) make it a top choice for large-scale applications.",
      "With features like multithreading, exception handling, and a rich standard library (Java API), Java provides developers with powerful tools for building scalable, maintainable applications. The language continues to evolve with modern features while maintaining backward compatibility, ensuring long-term viability for enterprise systems."
    ],
    resources: [
      { title: 'Official Java Documentation', url: 'https://docs.oracle.com/en/java/' },
      { title: 'Java Tutorials (Oracle)', url: 'https://docs.oracle.com/javase/tutorial/' },
      { title: 'Baeldung Java Guides', url: 'https://www.baeldung.com/' }
    ]
  },
  cpp: {
    title: 'C++',
    icon: '⚙️',
    summary: [
      "C++ is a powerful, high-performance programming language created by Bjarne Stroustrup in 1979 as an extension of the C language. It combines low-level memory manipulation capabilities with high-level abstractions, offering programmers fine-grained control over system resources while supporting object-oriented, generic, and functional programming paradigms.",
      "C++ is the language of choice for performance-critical applications where efficiency and speed are paramount. It's widely used in game development, system software, embedded systems, real-time simulations, high-frequency trading platforms, and graphics engines. The language's zero-overhead principle ensures that you only pay for features you use, making it ideal for resource-constrained environments.",
      "Modern C++ (C++11 and beyond) has evolved significantly with features like smart pointers, lambda expressions, move semantics, and a powerful standard library including the Standard Template Library (STL). These additions make C++ more safe and expressive while maintaining its reputation for performance and control over hardware resources."
    ],
    resources: [
      { title: 'C++ Reference', url: 'https://en.cppreference.com/' },
      { title: 'ISO C++ Official', url: 'https://isocpp.org/' },
      { title: 'Learn C++', url: 'https://www.learncpp.com/' }
    ]
  }
};

export default function Documentation() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('python');
  const content = languageData[selectedLanguage];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          The Vault
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Explore comprehensive documentation for popular programming languages
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
        {(Object.keys(languageData) as Language[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={`p-4 md:p-6 rounded-xl font-semibold transition-all ${
              selectedLanguage === lang
                ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/30 scale-105'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
            }`}
          >
            <div className="text-3xl md:text-4xl mb-2">{languageData[lang].icon}</div>
            <div className="text-sm md:text-base">{languageData[lang].title}</div>
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-purple-900/30">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl md:text-5xl">{content.icon}</span>
          <h3 className="text-2xl md:text-4xl font-bold text-white">{content.title}</h3>
        </div>

        <div className="space-y-4 md:space-y-6 mb-8">
          {content.summary.map((paragraph, index) => (
            <p key={index} className="text-gray-300 text-sm md:text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="border-t border-purple-900/30 pt-6 md:pt-8">
          <h4 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
            Useful Resources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {content.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all group"
              >
                <span className="text-gray-300 group-hover:text-white font-medium text-sm md:text-base">
                  {resource.title}
                </span>
                <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-purple-400 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
