import { useState } from 'react';
import { ExternalLink, Youtube, BookOpen } from 'lucide-react';

type Concept = 'oops' | 'dsa' | 'sdlc' | 'agile' | 'cloud' | 'ai' | 'ml';

interface Resource {
  title: string;
  url: string;
  type: 'video' | 'blog';
}

interface ConceptContent {
  title: string;
  icon: string;
  summary: string[];
  resources: Resource[];
}

const conceptData: Record<Concept, ConceptContent> = {
  oops: {
    title: 'Object-Oriented Programming',
    icon: '🏛️',
    summary: [
      "Object-Oriented Programming (OOP) is a programming paradigm centered on objects and classes. It emphasizes organizing code around real-world entities, each with properties (attributes) and behaviors (methods). OOP principles include encapsulation, inheritance, polymorphism, and abstraction, making code more modular, reusable, and maintainable.",
      "OOP enables developers to model complex systems by breaking them into smaller, manageable components. This approach is particularly powerful for large-scale applications where multiple developers need to work on different parts simultaneously. Languages like Java, C++, Python, and C# are built on OOP principles.",
      "Mastering OOP concepts is essential for building professional-grade software. Understanding design patterns, SOLID principles, and proper class hierarchies helps create flexible and extensible codebases that can adapt to changing requirements without major refactoring."
    ],
    resources: [
      { title: 'OOP Concepts Explained - Academind', url: 'https://www.youtube.com/watch?v=pTB0EiLXUC8', type: 'video' },
      { title: 'Object-Oriented Programming in Java - freeCodeCamp', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo', type: 'video' },
      { title: 'OOP Design Patterns - Christopher Okhravi', url: 'https://www.youtube.com/playlist?list=PLrhzvIcii6GNjpARdnO4LFVQ6rZQJKzun', type: 'video' },
      { title: 'SOLID Principles in Software Design', url: 'https://www.baeldung.com/solid-principles', type: 'blog' },
      { title: 'OOP vs Functional Programming', url: 'https://www.freecodecamp.org/news/object-oriented-programming-concepts/', type: 'blog' },
      { title: 'Design Patterns for Beginners', url: 'https://refactoring.guru/design-patterns', type: 'blog' }
    ]
  },
  dsa: {
    title: 'Data Structures & Algorithms',
    icon: '📊',
    summary: [
      "Data Structures and Algorithms (DSA) are fundamental to computer science and software development. Data structures organize and store data efficiently (arrays, linked lists, trees, graphs), while algorithms define step-by-step procedures to solve problems (sorting, searching, dynamic programming). Proficiency in DSA is crucial for writing efficient code and passing technical interviews.",
      "Understanding time and space complexity through Big O notation allows developers to analyze and optimize their code. Different data structures suit different use cases; choosing the right structure can dramatically improve performance. Common algorithms like quicksort, merge sort, binary search, and graph traversals form the foundation of problem-solving.",
      "DSA knowledge is essential for competitive programming, technical interviews at FAANG companies, and building scalable systems. Regular practice with coding challenges on platforms like LeetCode and HackerRank strengthens problem-solving skills and algorithmic thinking."
    ],
    resources: [
      { title: 'Data Structures Complete Course - Abdul Bari', url: 'https://www.youtube.com/watch?v=0IAPZzGSbME', type: 'video' },
      { title: 'Algorithms Explained - TechWith Tim', url: 'https://www.youtube.com/watch?v=09XW-o8Gq-Q', type: 'video' },
      { title: 'Big O Notation Explained', url: 'https://www.youtube.com/watch?v=v4cd1O4zkGw', type: 'video' },
      { title: 'LeetCode - Interactive DSA Problems', url: 'https://leetcode.com/', type: 'blog' },
      { title: 'GeeksforGeeks DSA Tutorials', url: 'https://www.geeksforgeeks.org/data-structures/', type: 'blog' },
      { title: 'Visualgo - Algorithm Visualizer', url: 'https://visualgo.net/en', type: 'blog' }
    ]
  },
  sdlc: {
    title: 'Software Development Life Cycle',
    icon: '🔄',
    summary: [
      "The Software Development Life Cycle (SDLC) is a structured process that guides the creation of software from initial concept to deployment and maintenance. It encompasses phases like planning, analysis, design, development, testing, deployment, and maintenance. Different SDLC models (Waterfall, V-Model, Spiral, Agile) offer different approaches to managing these phases based on project requirements.",
      "Understanding SDLC helps teams work collaboratively and efficiently. It establishes clear roles, responsibilities, and communication channels. SDLC best practices reduce bugs, improve code quality, ensure timely delivery, and minimize costs. Teams must choose the right model based on project scope, timeline, and stakeholder requirements.",
      "Modern software development emphasizes iterative and incremental approaches (like Agile), continuous integration/continuous deployment (CI/CD), and DevOps practices. Knowledge of SDLC methodologies is essential for project managers, developers, and QA engineers to deliver high-quality software products consistently."
    ],
    resources: [
      { title: 'SDLC Explained - edureka!', url: 'https://www.youtube.com/watch?v=i6-NxJHXdQE', type: 'video' },
      { title: 'Waterfall vs Agile - TechWith Tim', url: 'https://www.youtube.com/watch?v=Y4lBE2zR-rM', type: 'video' },
      { title: 'Software Development Models - Coursera', url: 'https://www.youtube.com/watch?v=WQjJQk7xPUA', type: 'video' },
      { title: 'SDLC Complete Guide - Atlassian', url: 'https://www.atlassian.com/agile/software-development', type: 'blog' },
      { title: 'DevOps and SDLC Integration', url: 'https://www.redhat.com/en/topics/devops/what-is-devops', type: 'blog' },
      { title: 'CI/CD Pipelines Explained', url: 'https://www.digitalocean.com/community/tutorials/ci-cd-tools-comparison-jenkins-gitlab-ci-github-actions', type: 'blog' }
    ]
  },
  agile: {
    title: 'Agile Methodologies',
    icon: '⚡',
    summary: [
      "Agile is a modern software development approach that prioritizes flexibility, collaboration, and rapid delivery. Unlike traditional waterfall methods, Agile works in short iterations called sprints, typically lasting 1-4 weeks. Popular Agile frameworks include Scrum, Kanban, XP (Extreme Programming), and Lean. Agile emphasizes responding to change over following a fixed plan.",
      "Key Agile principles include customer collaboration, working software delivery, individual and team interactions, and continuous feedback. Daily standups, sprint planning, code reviews, and retrospectives foster communication and improvement. Agile methodologies have become industry standard for companies ranging from startups to enterprises.",
      "Agile practices like test-driven development (TDD), pair programming, and continuous integration lead to higher code quality and faster time-to-market. Teams adopting Agile report improved employee satisfaction, better product quality, and increased customer satisfaction. Understanding Agile is essential for modern software professionals."
    ],
    resources: [
      { title: 'Agile Methodology Explained - Coursera', url: 'https://www.youtube.com/watch?v=8eVXTSCoWxc', type: 'video' },
      { title: 'Scrum Framework - SimpliLearn', url: 'https://www.youtube.com/watch?v=9TYkaBbHHg8', type: 'video' },
      { title: 'Kanban vs Scrum - TechWorld with Nana', url: 'https://www.youtube.com/watch?v=R9OWIOgH01M', type: 'video' },
      { title: 'The Agile Manifesto', url: 'https://agilemanifesto.org/', type: 'blog' },
      { title: 'Agile Best Practices Guide - Atlassian', url: 'https://www.atlassian.com/agile', type: 'blog' },
      { title: 'Jira and Agile Project Management', url: 'https://www.atlassian.com/software/jira', type: 'blog' }
    ]
  },
  cloud: {
    title: 'Cloud Computing (AWS, GCP, Azure)',
    icon: '☁️',
    summary: [
      "Cloud computing enables businesses to access computing resources (servers, storage, databases, software) over the internet on a pay-as-you-go basis. Major cloud providers include Amazon Web Services (AWS), Google Cloud Platform (GCP), and Microsoft Azure. Each offers a comprehensive suite of services for infrastructure, platforms, and software as a service (IaaS, PaaS, SaaS).",
      "AWS is the market leader with the largest service portfolio and global reach. GCP excels in data analytics and machine learning capabilities. Azure integrates seamlessly with Microsoft enterprise products and offers strong hybrid cloud solutions. Cloud adoption has become essential for scalability, reliability, cost-efficiency, and innovation.",
      "Cloud skills are highly in-demand in the job market. Learning cloud services enables developers to build globally distributed applications, implement serverless architectures, utilize managed databases, and leverage pre-built AI/ML services. Cloud certifications (AWS Solutions Architect, GCP Associate, Azure Administrator) validate expertise and career advancement."
    ],
    resources: [
      { title: 'AWS Basics for Beginners - freeCodeCamp', url: 'https://www.youtube.com/watch?v=ulprqHUTF2E', type: 'video' },
      { title: 'Google Cloud Platform Tutorial - Coursera', url: 'https://www.youtube.com/watch?v=sTjW3IqgM8I', type: 'video' },
      { title: 'Azure Fundamentals - Microsoft', url: 'https://www.youtube.com/watch?v=NKEFWGpHUhk', type: 'video' },
      { title: 'AWS Services Overview', url: 'https://docs.aws.amazon.com/index.html', type: 'blog' },
      { title: 'GCP Documentation and Guides', url: 'https://cloud.google.com/docs', type: 'blog' },
      { title: 'Azure Learning Paths', url: 'https://learn.microsoft.com/en-us/training/browse/', type: 'blog' }
    ]
  },
  ai: {
    title: 'Artificial Intelligence',
    icon: '🤖',
    summary: [
      "Artificial Intelligence (AI) is the simulation of human intelligence by machines, enabling systems to learn from data, recognize patterns, and make decisions. AI encompasses machine learning, deep learning, natural language processing, computer vision, and robotics. AI applications range from chatbots and recommendation systems to autonomous vehicles and medical diagnosis.",
      "AI has transformed industries including healthcare, finance, retail, manufacturing, and entertainment. Machine learning algorithms like neural networks, decision trees, and support vector machines power AI applications. Deep learning with convolutional and recurrent neural networks achieves state-of-the-art results in image recognition and language understanding.",
      "AI development requires understanding linear algebra, statistics, probability, and algorithms. Frameworks like TensorFlow, PyTorch, and Keras simplify model building. The field continues to evolve with breakthroughs in transformer models, large language models (like ChatGPT), and multimodal AI. AI skills are increasingly valuable for developers and data scientists."
    ],
    resources: [
      { title: 'AI Fundamentals - Coursera', url: 'https://www.youtube.com/watch?v=mwRZLZtg7l8', type: 'video' },
      { title: 'Introduction to AI - MIT OpenCourseWare', url: 'https://www.youtube.com/watch?v=TJlAxW-P8PY', type: 'video' },
      { title: '3Blue1Brown - Neural Networks Explained', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_LFPM5gQa', type: 'video' },
      { title: 'TensorFlow Official Documentation', url: 'https://www.tensorflow.org/learn', type: 'blog' },
      { title: 'Fast.ai - Practical Deep Learning', url: 'https://www.fast.ai/', type: 'blog' },
      { title: 'DeepLearning.AI Courses', url: 'https://www.deeplearning.ai/', type: 'blog' }
    ]
  },
  ml: {
    title: 'Machine Learning',
    icon: '🧠',
    summary: [
      "Machine Learning (ML) is a subset of AI focused on enabling computers to learn from data without explicit programming. ML involves training algorithms on historical data to make predictions or decisions on new data. Common ML categories include supervised learning (classification, regression), unsupervised learning (clustering, dimensionality reduction), and reinforcement learning.",
      "ML applications power recommendation engines (Netflix, Spotify), fraud detection, natural language processing, image recognition, and predictive analytics. Popular ML algorithms include logistic regression, random forests, gradient boosting, k-means clustering, and neural networks. Libraries like scikit-learn, pandas, and numpy simplify ML development in Python.",
      "ML professionals must understand feature engineering, model evaluation metrics, cross-validation, and hyperparameter tuning. Data quality and quantity significantly impact model performance. The ML workflow involves data collection, exploration, preprocessing, model training, evaluation, and deployment. Continuous learning is essential as ML techniques and tools evolve rapidly."
    ],
    resources: [
      { title: 'Machine Learning A-Z - Udemy (Free Preview)', url: 'https://www.youtube.com/watch?v=JxgmkSSMLvM', type: 'video' },
      { title: 'Andrew Ng Machine Learning Course - Coursera', url: 'https://www.youtube.com/watch?v=PPLop4L2eGk', type: 'video' },
      { title: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/c/joshstarmer', type: 'video' },
      { title: 'Scikit-learn Official Documentation', url: 'https://scikit-learn.org/stable/', type: 'blog' },
      { title: 'Kaggle Learn - Free ML Courses', url: 'https://www.kaggle.com/learn', type: 'blog' },
      { title: 'Towards Data Science - ML Articles', url: 'https://towardsdatascience.com/', type: 'blog' }
    ]
  }
};

export default function Concepts() {
  const [selectedConcept, setSelectedConcept] = useState<Concept>('oops');
  const content = conceptData[selectedConcept];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          Core Concepts
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Master essential software development and technology concepts
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3 mb-8 md:mb-12">
        {(Object.keys(conceptData) as Concept[]).map((concept) => (
          <button
            key={concept}
            onClick={() => setSelectedConcept(concept)}
            className={`p-3 md:p-4 rounded-lg font-semibold transition-all text-sm md:text-base ${
              selectedConcept === concept
                ? 'bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:scale-105'
            }`}
          >
            <div className="text-xl md:text-2xl mb-1">{conceptData[concept].icon}</div>
            <div className="text-xs md:text-sm truncate">{conceptData[concept].title.split(' ')[0]}</div>
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-cyan-900/30">
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

        <div className="border-t border-cyan-900/30 pt-6 md:pt-8">
          <h4 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">
            Learning Resources
          </h4>

          {/* Video Tutorials */}
          <div className="mb-6">
            <h5 className="text-lg font-semibold text-red-300 mb-3 flex items-center gap-2">
              <Youtube className="w-5 h-5" />
              Video Tutorials
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {content.resources
                .filter((r) => r.type === 'video')
                .map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 transition-all group"
                  >
                    <span className="text-gray-300 group-hover:text-white font-medium text-sm">
                      {resource.title}
                    </span>
                    <Youtube className="w-4 h-4 text-red-400 group-hover:text-white" />
                  </a>
                ))}
            </div>
          </div>

          {/* Blogs & Articles */}
          <div>
            <h5 className="text-lg font-semibold text-green-300 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Articles & Documentation
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {content.resources
                .filter((r) => r.type === 'blog')
                .map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-600 transition-all group"
                  >
                    <span className="text-gray-300 group-hover:text-white font-medium text-sm">
                      {resource.title}
                    </span>
                    <BookOpen className="w-4 h-4 text-green-400 group-hover:text-white" />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
