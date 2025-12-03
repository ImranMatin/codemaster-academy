# CodeMaster Academy

**Learn, Code, & Test** - Your complete platform for mastering coding interviews and advancing your programming career.

## 📖 About

CodeMaster Academy is a comprehensive web-based learning platform designed to help developers prepare for technical interviews and advance their careers in Computer Science. The platform combines interactive tutorials, hands-on coding practice, knowledge assessments, and AI-powered mock interviews to provide a complete learning experience.

Whether you're a beginner starting your coding journey or an experienced developer preparing for technical interviews at top tech companies, CodeMaster Academy provides the tools, resources, and structured learning paths you need to succeed.

## ✨ Features

### 🏠 Landing Page
- Beautiful, immersive home page with dynamic background
- Animated gradient effects with pulsing orbs
- Interactive feature cards showcasing Learn, Code, & Test pillars
- Glassmorphism design with smooth animations
- Professional tech-inspired aesthetic
- Fully responsive layout

### 📚 The Vault (Documentation)
- Comprehensive programming tutorials and documentation
- Structured learning materials covering fundamental to advanced topics
- Best practices and code examples
- Quick reference guides

### 🧠 The Test (Quizzes)
- Interactive quizzes to test your knowledge
- Multiple difficulty levels (Easy, Medium, Hard)
- Track your quiz scores and performance
- Instant feedback and explanations

### ⚒️ The Forge (Code Editor)
- Built-in code editor with Python support
- Real-time code execution using Supabase Edge Functions
- Practice coding without leaving the platform
- Syntax highlighting and error feedback

### 🎯 Coding Problems
- Curated collection of algorithmic challenges
- Problems categorized by difficulty and topic
- Detailed problem descriptions with examples
- Track solved problems and submission history

### 🎤 Mock Interviews
- AI-powered technical interview practice
- 12 specialized interview roles:
  - AI Engineer
  - ML Engineer
  - Data Scientist
  - Data Analyst
  - Data Engineer
  - Software Engineer
  - Software Developer
  - Front-End Developer
  - Back-End Developer
  - Full-Stack Developer
  - DevOps Engineer
  - Product Manager
- 5 curated questions per role (3 technical + 2 behavioral)
- Real-world interview scenarios
- Receive detailed feedback on your answers
- Build confidence for real interviews

### 🗺️ Career Roadmap
- Detailed career paths for:
  - ML Engineer
  - AI Engineer
  - Data Scientist
  - Data Analyst
  - Data Engineer
  - Software Engineer
  - Software Developer
  - Frontend Engineer
  - Backend Engineer
  - Full-Stack Developer
  - DevOps Engineer
  - Product Manager
- Phase-by-phase learning progression
- Curated learning resources and links
- Skill requirements and timelines
- Industry-relevant skill breakdowns

### 🏆 Leaderboard
- Track your progress and rankings
- Compete with other learners
- View top performers across categories
- Motivate yourself to improve

### 👤 User Profile
- Personal dashboard with progress tracking
- View your quiz attempts and scores
- Track completed problems
- Monitor your learning journey

### 🔐 Authentication
- Secure user authentication with Supabase
- Email/password registration and login
- Password reset functionality
- Protected routes and user sessions

### ℹ️ About Us
- Mission statement and vision
- Founder's message from Imran Matin
- Why choose CodeMaster Academy
- Three key pillars: Integrated Practice, Career-Driven Structure, and Real-World Readiness
- Community and support information

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Supabase** - Open-source Firebase alternative
  - PostgreSQL database
  - Row Level Security (RLS)
  - Real-time subscriptions
  - Authentication
  - Edge Functions (Deno)

### Code Execution
- **Supabase Edge Functions** - Serverless functions for Python code execution
- **Deno Runtime** - Secure JavaScript/TypeScript runtime

### AI Integration
- **Interview Question Generation** - AI-powered question creation
- **Feedback Analysis** - Automated interview response evaluation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codemaster-academy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations:
The Supabase migrations are located in `supabase/migrations/`. Apply them through your Supabase dashboard or CLI.

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
codemaster-academy/
├── src/
│   ├── components/          # React components
│   │   ├── Auth.tsx         # Authentication modal
│   │   ├── CareerRoadmap.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── Documentation.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── MockInterview.tsx
│   │   ├── Navbar.tsx
│   │   ├── Problems.tsx
│   │   ├── ProblemSolver.tsx
│   │   ├── Profile.tsx
│   │   └── Quizzes.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication context
│   ├── lib/                 # Utility libraries
│   │   └── supabase.ts      # Supabase client
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── supabase/
│   ├── functions/           # Edge Functions
│   │   ├── execute-python/
│   │   ├── generate-interview-feedback/
│   │   └── generate-interview-questions/
│   └── migrations/          # Database migrations
├── public/                  # Static assets
├── index.html               # HTML entry point
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🗄️ Database Schema

### Tables
- **quiz_questions** - Question bank for quizzes
- **quiz_attempts** - User quiz attempt tracking
- **user_progress** - Progress tracking for users
- **interview_sessions** - Mock interview records
- **interview_questions** - Generated interview questions
- **interview_responses** - User interview answers

All tables are protected with Row Level Security (RLS) policies to ensure data privacy and security.

## 🤝 Contributing

We welcome contributions to CodeMaster Academy! Here's how you can help:

### Ways to Contribute
1. **Report Bugs** - Open an issue describing the bug
2. **Suggest Features** - Share ideas for new features
3. **Submit Pull Requests** - Fix bugs or implement features
4. **Improve Documentation** - Help make docs clearer
5. **Share Feedback** - Tell us about your experience

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

3. Make your changes following these guidelines:
   - Write clean, readable code
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Test your changes thoroughly
   - Update documentation as needed

4. Commit your changes:
```bash
git commit -m "Add: description of your changes"
```

5. Push to your fork:
```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request with a clear description of your changes

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## 📄 License

This project is licensed under the **MIT License**.

### MIT License

```
MIT License

Copyright (c) 2024 CodeMaster Academy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

- **Supabase** - For providing an excellent backend platform
- **React Team** - For the amazing UI library
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide Icons** - For beautiful, consistent icons
- **Open Source Community** - For inspiration and resources

## 📞 Support

If you need help or have questions:
- Open an issue on GitHub
- Check existing documentation
- Review closed issues for solutions

## 🎯 Future Roadmap

- [ ] Add more programming languages to code editor (Java, C++, JavaScript)
- [ ] Implement peer code review system
- [ ] Create mobile app version
- [ ] Add collaborative coding sessions
- [ ] Integrate video tutorials
- [ ] Expand quiz question bank
- [ ] Implement achievement badges and rewards
- [ ] Create company-specific interview prep tracks
- [ ] Add live coding interview simulations
- [ ] Integrate AI-powered code review and suggestions

---

**Built with ❤️ for developers, by developers**

*Learn, Code, & Test - Master your coding journey with CodeMaster Academy*
