import { useState } from 'react';
import { Menu, X, Cpu, Database, Code, Brain, ExternalLink, Youtube, BookOpen, BarChart3, Cloud, Layers, Workflow } from 'lucide-react';

type CareerPath = 'ml' | 'data-science' | 'software-engineering' | 'ai' | 'data-analyst' | 'devops' | 'software-developer' | 'fullstack' | 'data-engineer';

export default function CareerRoadmap() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePath, setActivePath] = useState<CareerPath>('ml');

  const navItems: { id: CareerPath; label: string; icon: typeof Brain; bgColor: string }[] = [
    { id: 'ml', label: 'ML Engineer', icon: Brain, bgColor: 'bg-emerald-600 hover:bg-emerald-700' },
    { id: 'ai', label: 'AI Engineer', icon: Cpu, bgColor: 'bg-rose-600 hover:bg-rose-700' },
    { id: 'data-science', label: 'Data Scientist', icon: Database, bgColor: 'bg-blue-600 hover:bg-blue-700' },
    { id: 'data-analyst', label: 'Data Analyst', icon: BarChart3, bgColor: 'bg-cyan-600 hover:bg-cyan-700' },
    { id: 'data-engineer', label: 'Data Engineer', icon: Workflow, bgColor: 'bg-teal-600 hover:bg-teal-700' },
    { id: 'software-engineering', label: 'Software Engineer', icon: Code, bgColor: 'bg-orange-600 hover:bg-orange-700' },
    { id: 'software-developer', label: 'Software Developer', icon: Code, bgColor: 'bg-amber-600 hover:bg-amber-700' },
    { id: 'fullstack', label: 'Full-Stack Developer', icon: Layers, bgColor: 'bg-sky-600 hover:bg-sky-700' },
    { id: 'devops', label: 'DevOps Engineer', icon: Cloud, bgColor: 'bg-violet-600 hover:bg-violet-700' },
  ];

  const roadmapContent: Record<CareerPath, {
    title: string;
    description: string;
    diagram: string;
    phases: { title: string; skills: string[]; duration: string }[];
    resources: { name: string; url: string; type: 'article' | 'video' | 'course' }[];
  }> = {
    'ml': {
      title: 'ML Engineer',
      description: 'Machine Learning Engineers design, build, and deploy ML models that solve real-world problems. This path combines software engineering with statistical modeling and data analysis.',
      diagram: 'Image of Machine Learning roadmap diagram showing progression from foundations to advanced ML topics',
      phases: [
        {
          title: 'Foundation (3-6 months)',
          skills: ['Python Programming', 'Mathematics (Linear Algebra, Calculus, Statistics)', 'Data Structures & Algorithms', 'NumPy & Pandas'],
          duration: '3-6 months'
        },
        {
          title: 'Core ML Concepts (6-9 months)',
          skills: ['Supervised Learning (Regression, Classification)', 'Unsupervised Learning (Clustering, Dimensionality Reduction)', 'Model Evaluation & Validation', 'Feature Engineering', 'Scikit-learn'],
          duration: '6-9 months'
        },
        {
          title: 'Advanced Topics (6-12 months)',
          skills: ['Deep Learning (Neural Networks, CNNs, RNNs)', 'TensorFlow/PyTorch', 'Natural Language Processing', 'Computer Vision', 'Model Optimization & Deployment'],
          duration: '6-12 months'
        },
        {
          title: 'Professional Practice',
          skills: ['MLOps & Model Deployment', 'Cloud Platforms (AWS SageMaker, Google AI Platform)', 'Production ML Systems', 'A/B Testing', 'Model Monitoring'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks ML Tutorial', url: 'https://www.geeksforgeeks.org/machine-learning/', type: 'article' },
        { name: 'Andrew Ng - Machine Learning Course', url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I', type: 'video' },
        { name: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/c/joshstarmer', type: 'video' },
        { name: 'TutorialsPoint ML Guide', url: 'https://www.tutorialspoint.com/machine_learning/index.htm', type: 'article' },
        { name: 'Sentdex - Python ML Tutorials', url: 'https://www.youtube.com/c/sentdex', type: 'video' },
      ]
    },
    'data-science': {
      title: 'Data Scientist',
      description: 'Data Scientists extract insights from complex data using statistical methods, machine learning, and visualization. They bridge the gap between technical analysis and business strategy.',
      diagram: 'Image of Data Science career path showing journey from data analysis to advanced analytics and business intelligence',
      phases: [
        {
          title: 'Fundamentals (3-6 months)',
          skills: ['Python/R Programming', 'Statistics & Probability', 'SQL & Databases', 'Data Wrangling (Pandas)', 'Excel & Spreadsheets'],
          duration: '3-6 months'
        },
        {
          title: 'Data Analysis (6-9 months)',
          skills: ['Exploratory Data Analysis', 'Data Visualization (Matplotlib, Seaborn, Plotly)', 'Statistical Hypothesis Testing', 'Data Cleaning & Preprocessing', 'Business Intelligence Tools'],
          duration: '6-9 months'
        },
        {
          title: 'Advanced Analytics (6-12 months)',
          skills: ['Machine Learning Algorithms', 'Predictive Modeling', 'Time Series Analysis', 'A/B Testing', 'Big Data Tools (Spark, Hadoop)'],
          duration: '6-12 months'
        },
        {
          title: 'Specialization',
          skills: ['Deep Learning for Analytics', 'Natural Language Processing', 'Recommendation Systems', 'Cloud Data Platforms', 'Data Ethics & Privacy'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks Data Science', url: 'https://www.geeksforgeeks.org/data-science-tutorial/', type: 'article' },
        { name: 'Ken Jee - Data Science', url: 'https://www.youtube.com/c/KenJee1', type: 'video' },
        { name: 'TutorialsPoint Data Science', url: 'https://www.tutorialspoint.com/data_science/index.htm', type: 'article' },
        { name: 'Krish Naik', url: 'https://www.youtube.com/user/krishnaik06', type: 'video' },
        { name: 'DataCamp Community', url: 'https://www.datacamp.com/community/tutorials', type: 'course' },
      ]
    },
    'software-engineering': {
      title: 'Software Engineer',
      description: 'Software Engineers design, develop, and maintain software systems. This versatile career path spans web development, mobile apps, systems programming, and more.',
      diagram: 'Image of Software Engineering career path diagram showing progression from junior to senior engineer with different specializations',
      phases: [
        {
          title: 'Programming Basics (3-6 months)',
          skills: ['Programming Language (Python, JavaScript, Java, or C++)', 'Data Structures & Algorithms', 'Object-Oriented Programming', 'Git & Version Control', 'Command Line'],
          duration: '3-6 months'
        },
        {
          title: 'Core Development (6-12 months)',
          skills: ['Web Development (HTML, CSS, JavaScript)', 'Backend Development (Node.js, Django, Spring)', 'Databases (SQL, NoSQL)', 'RESTful APIs', 'Testing & Debugging'],
          duration: '6-12 months'
        },
        {
          title: 'Advanced Engineering (12-18 months)',
          skills: ['System Design & Architecture', 'Cloud Computing (AWS, Azure, GCP)', 'DevOps & CI/CD', 'Microservices', 'Performance Optimization', 'Security Best Practices'],
          duration: '12-18 months'
        },
        {
          title: 'Specialization Tracks',
          skills: ['Frontend (React, Vue, Angular)', 'Backend (Distributed Systems)', 'Mobile (iOS, Android, React Native)', 'Full-Stack Development', 'Cloud Native Development'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks DSA', url: 'https://www.geeksforgeeks.org/data-structures/', type: 'article' },
        { name: 'Traversy Media', url: 'https://www.youtube.com/c/TraversyMedia', type: 'video' },
        { name: 'FreeCodeCamp', url: 'https://www.youtube.com/c/Freecodecamp', type: 'video' },
        { name: 'TutorialsPoint Programming', url: 'https://www.tutorialspoint.com/computer_programming/index.htm', type: 'article' },
        { name: 'The Net Ninja', url: 'https://www.youtube.com/c/TheNetNinja', type: 'video' },
      ]
    },
    'ai': {
      title: 'AI Engineer',
      description: 'AI Engineers develop intelligent systems that can perceive, learn, reason, and act. This cutting-edge field combines ML, deep learning, robotics, and cognitive computing.',
      diagram: 'Image of AI career roadmap showing evolution from ML basics to advanced AI systems and research',
      phases: [
        {
          title: 'AI Foundations (6-9 months)',
          skills: ['Python Programming', 'Mathematics (Linear Algebra, Calculus, Probability)', 'Machine Learning Fundamentals', 'Neural Networks Basics', 'Data Processing'],
          duration: '6-9 months'
        },
        {
          title: 'Deep Learning (6-12 months)',
          skills: ['Deep Neural Networks', 'Convolutional Neural Networks (CNNs)', 'Recurrent Neural Networks (RNNs)', 'Transformers & Attention Mechanisms', 'TensorFlow/PyTorch'],
          duration: '6-12 months'
        },
        {
          title: 'AI Specializations (12+ months)',
          skills: ['Natural Language Processing (NLP)', 'Computer Vision', 'Reinforcement Learning', 'Generative AI (GANs, VAEs)', 'Large Language Models', 'AI Ethics'],
          duration: '12+ months'
        },
        {
          title: 'Advanced AI Systems',
          skills: ['Multi-Modal AI', 'AI Safety & Alignment', 'Autonomous Systems', 'AI Research & Publications', 'Edge AI & Model Optimization'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks AI', url: 'https://www.geeksforgeeks.org/artificial-intelligence/', type: 'article' },
        { name: 'DeepLearning.AI', url: 'https://www.youtube.com/@Deeplearningai', type: 'video' },
        { name: 'Two Minute Papers', url: 'https://www.youtube.com/c/K%C3%A1rolyZsolnai', type: 'video' },
        { name: 'TutorialsPoint AI', url: 'https://www.tutorialspoint.com/artificial_intelligence/index.htm', type: 'article' },
        { name: 'Yannic Kilcher', url: 'https://www.youtube.com/c/YannicKilcher', type: 'video' },
      ]
    },
    'data-analyst': {
      title: 'Data Analyst',
      description: 'Data Analysts transform raw data into actionable insights that drive business decisions. They work with stakeholders to understand needs, analyze data, and create compelling visualizations and reports.',
      diagram: 'Image of Data Analyst career path showing progression from basic analysis to advanced analytics and business intelligence',
      phases: [
        {
          title: 'Fundamentals (2-4 months)',
          skills: ['Excel & Spreadsheets (Advanced Functions, Pivot Tables)', 'SQL & Database Queries', 'Basic Statistics', 'Data Cleaning & Preparation', 'Business Acumen'],
          duration: '2-4 months'
        },
        {
          title: 'Visualization & Reporting (3-6 months)',
          skills: ['Data Visualization Tools (Tableau, Power BI)', 'Dashboard Design', 'Chart Selection & Best Practices', 'Report Writing', 'Storytelling with Data'],
          duration: '3-6 months'
        },
        {
          title: 'Advanced Analysis (6-9 months)',
          skills: ['Python/R for Analysis', 'Statistical Analysis & Testing', 'Predictive Analytics Basics', 'Data Mining', 'Google Analytics & Web Analytics', 'ETL Processes'],
          duration: '6-9 months'
        },
        {
          title: 'Business Intelligence',
          skills: ['Advanced BI Tools', 'Data Warehouse Concepts', 'KPI Development', 'Stakeholder Management', 'Domain-Specific Analytics', 'Automation & Scripting'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks Data Analytics', url: 'https://www.geeksforgeeks.org/what-is-data-analytics/', type: 'article' },
        { name: 'Alex The Analyst', url: 'https://www.youtube.com/c/AlexTheAnalyst', type: 'video' },
        { name: 'Power BI Tutorial by SQLBI', url: 'https://www.youtube.com/c/SQLBI', type: 'video' },
        { name: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'article' },
        { name: 'Tableau Tim', url: 'https://www.youtube.com/c/TableauTim', type: 'video' },
        { name: 'Data School', url: 'https://www.youtube.com/c/dataschool', type: 'video' },
      ]
    },
    'devops': {
      title: 'DevOps Engineer',
      description: 'DevOps Engineers bridge the gap between development and operations, automating and streamlining software delivery. They focus on CI/CD, infrastructure as code, monitoring, and creating reliable, scalable systems.',
      diagram: 'Image of DevOps career path showing evolution from system administration to cloud architecture and site reliability engineering',
      phases: [
        {
          title: 'Foundation (3-6 months)',
          skills: ['Linux System Administration', 'Networking Basics', 'Programming (Python, Bash, Go)', 'Git & Version Control', 'Command Line Mastery'],
          duration: '3-6 months'
        },
        {
          title: 'Core DevOps (6-9 months)',
          skills: ['CI/CD (Jenkins, GitLab CI, GitHub Actions)', 'Containerization (Docker)', 'Configuration Management (Ansible, Puppet, Chef)', 'Infrastructure as Code (Terraform, CloudFormation)', 'Monitoring & Logging (Prometheus, Grafana, ELK Stack)'],
          duration: '6-9 months'
        },
        {
          title: 'Cloud & Orchestration (9-12 months)',
          skills: ['Cloud Platforms (AWS, Azure, GCP)', 'Container Orchestration (Kubernetes)', 'Service Mesh (Istio)', 'Serverless Architecture', 'Security & Compliance', 'Cost Optimization'],
          duration: '9-12 months'
        },
        {
          title: 'Advanced Practice',
          skills: ['Site Reliability Engineering (SRE)', 'Chaos Engineering', 'GitOps & ArgoCD', 'Platform Engineering', 'Multi-Cloud Strategy', 'Incident Management'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks DevOps', url: 'https://www.geeksforgeeks.org/devops-tutorial/', type: 'article' },
        { name: 'TechWorld with Nana', url: 'https://www.youtube.com/c/TechWorldwithNana', type: 'video' },
        { name: 'DevOps Toolkit by Viktor Farcic', url: 'https://www.youtube.com/c/DevOpsToolkit', type: 'video' },
        { name: 'KodeKloud', url: 'https://kodekloud.com/', type: 'course' },
        { name: 'AWS DevOps Blog', url: 'https://aws.amazon.com/blogs/devops/', type: 'article' },
        { name: 'DevOps Roadmap', url: 'https://roadmap.sh/devops', type: 'article' },
      ]
    },
    'software-developer': {
      title: 'Software Developer',
      description: 'Software Developers write, test, and maintain code to create software applications. They work on implementing features, fixing bugs, and collaborating with teams to deliver quality software products.',
      diagram: 'Image of Software Developer career path showing progression from coding basics to professional development practices',
      phases: [
        {
          title: 'Coding Fundamentals (2-4 months)',
          skills: ['Programming Language (Python, Java, C#, or JavaScript)', 'Basic Syntax & Logic', 'Variables, Data Types & Operators', 'Control Flow (If/Else, Loops)', 'Functions & Methods'],
          duration: '2-4 months'
        },
        {
          title: 'Development Essentials (4-6 months)',
          skills: ['Object-Oriented Programming', 'Data Structures (Arrays, Lists, Maps)', 'File I/O & Exception Handling', 'Basic Algorithms', 'Git & Version Control', 'IDE Proficiency'],
          duration: '4-6 months'
        },
        {
          title: 'Application Development (6-12 months)',
          skills: ['Web Development Basics', 'Database Fundamentals (SQL)', 'API Integration', 'Testing & Debugging', 'Code Documentation', 'Agile Methodologies'],
          duration: '6-12 months'
        },
        {
          title: 'Professional Skills',
          skills: ['Code Reviews & Best Practices', 'Design Patterns', 'Collaborative Development', 'Continuous Learning', 'Problem-Solving', 'Communication Skills'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks Programming', url: 'https://www.geeksforgeeks.org/fundamentals-of-programming/', type: 'article' },
        { name: 'Corey Schafer', url: 'https://www.youtube.com/c/Coreyms', type: 'video' },
        { name: 'Programming with Mosh', url: 'https://www.youtube.com/c/programmingwithmosh', type: 'video' },
        { name: 'W3Schools', url: 'https://www.w3schools.com/', type: 'article' },
        { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', type: 'course' },
        { name: 'The Coding Train', url: 'https://www.youtube.com/c/TheCodingTrain', type: 'video' },
      ]
    },
    'fullstack': {
      title: 'Full-Stack Developer',
      description: 'Full-Stack Developers work on both frontend and backend, building complete web applications from user interface to server and database. They bridge design and functionality with end-to-end development skills.',
      diagram: 'Image of Full-Stack Developer roadmap showing integration of frontend, backend, and database technologies',
      phases: [
        {
          title: 'Frontend Foundations (3-6 months)',
          skills: ['HTML, CSS & JavaScript', 'Responsive Design', 'CSS Frameworks (Tailwind, Bootstrap)', 'DOM Manipulation', 'Frontend Tooling (npm, Webpack)'],
          duration: '3-6 months'
        },
        {
          title: 'Frontend Frameworks (4-6 months)',
          skills: ['React, Vue, or Angular', 'State Management (Redux, Zustand)', 'Component Architecture', 'Routing', 'API Consumption', 'TypeScript'],
          duration: '4-6 months'
        },
        {
          title: 'Backend Development (6-9 months)',
          skills: ['Node.js/Express or Python/Django', 'RESTful API Design', 'Database Design (SQL & NoSQL)', 'Authentication & Authorization', 'Server Architecture', 'ORMs & Query Optimization'],
          duration: '6-9 months'
        },
        {
          title: 'Full-Stack Mastery',
          skills: ['Deployment & Hosting', 'Docker & Containerization', 'CI/CD Pipelines', 'Cloud Services (AWS, Vercel)', 'Testing (Unit, Integration, E2E)', 'Performance Optimization', 'Security Best Practices'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks Full Stack', url: 'https://www.geeksforgeeks.org/full-stack-development/', type: 'article' },
        { name: 'Traversy Media', url: 'https://www.youtube.com/c/TraversyMedia', type: 'video' },
        { name: 'Web Dev Simplified', url: 'https://www.youtube.com/c/WebDevSimplified', type: 'video' },
        { name: 'FullStack Open', url: 'https://fullstackopen.com/', type: 'course' },
        { name: 'The Odin Project', url: 'https://www.theodinproject.com/', type: 'course' },
        { name: 'Fireship', url: 'https://www.youtube.com/c/Fireship', type: 'video' },
      ]
    },
    'data-engineer': {
      title: 'Data Engineer',
      description: 'Data Engineers build and maintain the infrastructure and pipelines that enable data collection, storage, and processing at scale. They create the foundation that allows data scientists and analysts to extract insights.',
      diagram: 'Image of Data Engineer roadmap showing progression from database fundamentals to big data systems and real-time processing',
      phases: [
        {
          title: 'Foundations (3-6 months)',
          skills: ['SQL & Database Design', 'Python/Scala Programming', 'Linux & Command Line', 'Data Modeling', 'ETL Concepts', 'Version Control (Git)'],
          duration: '3-6 months'
        },
        {
          title: 'Data Warehousing (6-9 months)',
          skills: ['Data Warehouse Architecture', 'Star & Snowflake Schema', 'SQL Optimization', 'NoSQL Databases (MongoDB, Cassandra)', 'Data Quality & Validation', 'Batch Processing'],
          duration: '6-9 months'
        },
        {
          title: 'Big Data & Streaming (9-12 months)',
          skills: ['Apache Spark', 'Apache Kafka', 'Airflow & Orchestration', 'Hadoop Ecosystem', 'Stream Processing', 'Data Lakes', 'Distributed Systems'],
          duration: '9-12 months'
        },
        {
          title: 'Cloud & Advanced',
          skills: ['Cloud Data Platforms (AWS, GCP, Azure)', 'Infrastructure as Code (Terraform)', 'Data Pipeline Monitoring', 'DataOps', 'Real-Time Analytics', 'Data Governance & Security'],
          duration: 'Ongoing'
        }
      ],
      resources: [
        { name: 'GeeksforGeeks Data Engineering', url: 'https://www.geeksforgeeks.org/what-is-data-engineering/', type: 'article' },
        { name: 'Seattle Data Guy', url: 'https://www.youtube.com/c/SeattleDataGuy', type: 'video' },
        { name: 'Data Engineering Zoomcamp', url: 'https://github.com/DataTalksClub/data-engineering-zoomcamp', type: 'course' },
        { name: 'Confluent (Kafka)', url: 'https://www.youtube.com/c/Confluent', type: 'video' },
        { name: 'Databricks Academy', url: 'https://www.databricks.com/learn', type: 'course' },
        { name: 'Data Engineering Wiki', url: 'https://dataengineering.wiki/', type: 'article' },
      ]
    }
  };

  const currentContent = roadmapContent[activePath];
  const IconComponent = navItems.find(item => item.id === activePath)?.icon || Brain;

  return (
    <div className="flex h-[calc(100vh-200px)] bg-gray-950">
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 overflow-hidden bg-gray-900 border-r border-gray-800`}
      >
        <div className="p-4 space-y-2">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-500" />
            Career Paths
          </h2>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePath(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  item.bgColor
                } text-white ${
                  activePath === item.id ? 'ring-2 ring-white shadow-lg' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 z-10 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
          <div className="flex items-center gap-3">
            <IconComponent className="w-8 h-8 text-purple-500" />
            <h1 className="text-2xl font-bold text-white">{currentContent.title}</h1>
          </div>
        </div>

        <div className="p-6 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-purple-900/30 rounded-2xl p-6 mb-8">
            <p className="text-gray-300 text-lg leading-relaxed">{currentContent.description}</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
              Career Roadmap Visualization
            </h2>
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <div className="text-gray-400 italic mb-2">{currentContent.diagram}</div>
              <div className="w-full h-64 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700">
                <div className="text-center">
                  <IconComponent className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <p className="text-gray-500">Roadmap Diagram Placeholder</p>
                  <p className="text-gray-600 text-sm mt-2">Visual representation of {currentContent.title} path</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Brain className="w-7 h-7 text-emerald-500" />
              Learning Path & Phases
            </h2>
            <div className="space-y-6">
              {currentContent.phases.map((phase, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-900/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                        <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm font-semibold">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {phase.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm border border-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ExternalLink className="w-7 h-7 text-blue-500" />
              Learning Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentContent.resources.map((resource, index) => {
                const ResourceIcon = resource.type === 'video' ? Youtube : resource.type === 'course' ? BookOpen : ExternalLink;
                const typeColors = {
                  video: 'border-red-900/30 bg-red-900/10',
                  article: 'border-blue-900/30 bg-blue-900/10',
                  course: 'border-emerald-900/30 bg-emerald-900/10'
                };
                return (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 rounded-lg border ${typeColors[resource.type]} hover:scale-105 transition-all group`}
                  >
                    <ResourceIcon className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                    <div className="flex-1">
                      <div className="text-white font-semibold group-hover:text-purple-300 transition-colors">
                        {resource.name}
                      </div>
                      <div className="text-gray-500 text-xs capitalize">{resource.type}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-purple-900/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-3">Pro Tips</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Focus on building projects to apply your knowledge practically</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Join online communities and contribute to open-source projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Stay updated with the latest trends and research in your field</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 mt-1">•</span>
                <span>Network with professionals through LinkedIn, conferences, and meetups</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
