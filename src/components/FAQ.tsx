import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  items: FAQItem[];
}

interface FAQSectionWithColor extends FAQSection {
  gradient: string;
  borderColor: string;
  hoverBorder: string;
  iconColor: string;
  accentColor: string;
}

const faqData: FAQSectionWithColor[] = [
  {
    title: 'Platform & Content',
    gradient: 'from-blue-900/30 via-blue-800/20 to-blue-900/30',
    borderColor: 'border-blue-500/40',
    hoverBorder: 'hover:border-blue-400/70',
    iconColor: 'text-blue-400',
    accentColor: '#60a5fa',
    items: [
      {
        question: 'What makes CodeMaster Academy different from standard tutorials?',
        answer: 'CodeMaster Academy goes beyond basic tutorials by offering a comprehensive learning ecosystem. We provide The Vault with curated documentation and learning resources, interactive Quizzes to test your knowledge, and The Forge with real Coding Problems to practice your skills. Our platform combines theory, assessment, and hands-on practice in one integrated environment.',
      },
      {
        question: 'What difficulty levels are available for coding problems?',
        answer: 'Our coding problems are categorized into three difficulty levels: Easy, Medium, and Hard. This progressive difficulty system allows beginners to build confidence with foundational problems while challenging advanced users with complex algorithmic challenges. Each problem is carefully curated to match industry-standard interview questions.',
      },
      {
        question: 'Which programming languages are supported?',
        answer: 'Currently, The Forge supports Python for solving coding problems, with real-time code execution powered by secure serverless functions. We are actively planning to expand language support to include Java, C++, and JavaScript to accommodate diverse learning preferences and career paths.',
      },
    ],
  },
  {
    title: 'The AI & Mock Interviews',
    gradient: 'from-emerald-900/30 via-emerald-800/20 to-emerald-900/30',
    borderColor: 'border-emerald-500/40',
    hoverBorder: 'hover:border-emerald-400/70',
    iconColor: 'text-emerald-400',
    accentColor: '#34d399',
    items: [
      {
        question: 'How do the Mock Interviews work?',
        answer: 'Our Mock Interview system uses advanced AI to generate personalized interview questions based on your selected job role and experience level. After you submit your answers, the AI provides detailed feedback analysis covering technical accuracy, problem-solving approach, communication clarity, and areas for improvement. This simulates real interview scenarios to prepare you effectively.',
      },
      {
        question: 'What career paths are covered in the platform?',
        answer: 'CodeMaster Academy supports multiple high-demand career paths including Software Engineer, Data Scientist, Machine Learning Engineer, and AI Engineer. Each path has tailored content, problems, and interview questions that align with industry expectations and real-world job requirements.',
      },
      {
        question: 'How accurate is the AI feedback?',
        answer: 'Our AI-driven feedback system is designed to simulate real interview evaluation criteria used by top tech companies. While it provides highly valuable insights on technical accuracy, problem-solving methodology, and communication skills, we recommend using it as a comprehensive practice tool to supplement your interview preparation journey.',
      },
    ],
  },
  {
    title: 'Technology & Security',
    gradient: 'from-amber-900/30 via-amber-800/20 to-amber-900/30',
    borderColor: 'border-amber-500/40',
    hoverBorder: 'hover:border-amber-400/70',
    iconColor: 'text-amber-400',
    accentColor: '#fbbf24',
    items: [
      {
        question: 'Where is my code executed?',
        answer: 'All code execution happens securely on Supabase Edge Functions powered by the Deno Runtime. This serverless architecture ensures real-time, isolated, and secure code execution without compromising performance. Your code runs in a sandboxed environment, protecting both your work and our infrastructure.',
      },
      {
        question: 'How is my data kept private and secure?',
        answer: 'We implement Row Level Security (RLS) on our PostgreSQL database through Supabase, ensuring that your user progress, quiz scores, problem submissions, and personal data are completely isolated and accessible only to you. Every database query is protected by authentication and ownership checks, making unauthorized access impossible.',
      },
      {
        question: 'What technology stack powers CodeMaster Academy?',
        answer: 'Our platform is built with modern, production-grade technologies: React for the dynamic user interface, TypeScript for type-safe code and enhanced developer experience, and Supabase for backend services including authentication, PostgreSQL database, real-time subscriptions, and serverless Edge Functions.',
      },
    ],
  },
  {
    title: 'Account & Progress',
    gradient: 'from-rose-900/30 via-rose-800/20 to-rose-900/30',
    borderColor: 'border-rose-500/40',
    hoverBorder: 'hover:border-rose-400/70',
    iconColor: 'text-rose-400',
    accentColor: '#fb7185',
    items: [
      {
        question: 'How can I track my learning progress?',
        answer: 'Your User Profile provides a comprehensive dashboard showing all solved problems, quiz scores, mock interview history, and overall progress statistics. Additionally, the Leaderboard feature lets you see how you rank against other learners, creating a motivating competitive environment to track your improvement over time.',
      },
      {
        question: 'How does authentication work?',
        answer: 'We use Supabase Auth with secure email/password login for user authentication. All routes containing personal data and progress are protected, ensuring only authenticated users can access their own information. Your session is managed securely with JWT tokens and automatic refresh capabilities.',
      },
      {
        question: 'Can I contribute to the platform or report issues?',
        answer: 'Absolutely! CodeMaster Academy welcomes community contributions. You can report bugs, suggest new features, or contribute improvements via our GitHub repository. We value user feedback and continuously work to enhance the platform based on community input.',
      },
    ],
  },
];

export default function FAQ() {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    const key = `${sectionIndex}-${itemIndex}`;
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }

    setExpandedItems(newExpanded);
  };

  const isExpanded = (sectionIndex: number, itemIndex: number) => {
    return expandedItems.has(`${sectionIndex}-${itemIndex}`);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 via-emerald-500/20 to-amber-500/20 rounded-2xl mb-4 border border-blue-500/30 animate-pulse">
            <HelpCircle className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-300 text-lg font-medium">
            Everything you need to know about CodeMaster Academy
          </p>
        </div>

        <div className="space-y-12">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <div className="flex items-center gap-3 mb-6 bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border-l-4" style={{borderLeftColor: section.accentColor}}>
                <div className={`w-2 h-10 rounded-full bg-gradient-to-b ${section.gradient}`}></div>
                <h3 className={`text-2xl md:text-3xl font-bold text-white drop-shadow-md`}>
                  {section.title}
                </h3>
              </div>

              <div className="space-y-3">
                {section.items.map((item, itemIndex) => {
                  const expanded = isExpanded(sectionIndex, itemIndex);

                  return (
                    <div
                      key={itemIndex}
                      className={`bg-gradient-to-br ${section.gradient} backdrop-blur-sm border ${section.borderColor} rounded-xl overflow-hidden transition-all duration-300 ${section.hoverBorder} hover:shadow-lg hover:scale-[1.01]`}
                    >
                      <button
                        onClick={() => toggleItem(sectionIndex, itemIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left group"
                      >
                        <span className={`text-lg font-semibold text-white group-hover:${section.iconColor} transition-colors pr-4`}>
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 ${section.iconColor} flex-shrink-0 transition-transform duration-300 ${
                            expanded ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className={`px-6 pb-4 text-gray-300 leading-relaxed border-t ${section.borderColor} pt-4`}>
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gradient-to-br from-blue-900/30 via-emerald-900/20 to-rose-900/30 backdrop-blur-sm border border-cyan-500/40 rounded-xl text-center hover:border-cyan-400/60 transition-all duration-300">
          <p className="text-gray-200 mb-2 font-semibold">Still have questions?</p>
          <p className="text-gray-400 text-sm">
            Feel free to reach out through our Contact page or open an issue on our GitHub repository.
          </p>
        </div>
      </div>
    </div>
  );
}
