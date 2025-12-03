import { Target, Eye, Quote, Heart, Users, Zap } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">About CodeMaster Academy</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Empowering developers worldwide to master coding interviews and accelerate their programming careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-800/50 rounded-2xl p-8 hover:border-blue-700/70 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              Our mission is to <span className="text-blue-400 font-semibold">democratize access to elite-level technical preparation</span> by providing a comprehensive, integrated, and accessible platform. We aim to equip every developer—from students to seasoned professionals—with the knowledge, practical skills, and confidence required to <span className="text-blue-400 font-semibold">master coding interviews and accelerate their programming careers.</span>
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-800/50 rounded-2xl p-8 hover:border-purple-700/70 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              To be the <span className="text-purple-400 font-semibold">global leader in career-focused Computer Science education</span>, evolving alongside the tech industry to deliver the most current, effective, and personalized learning pathways. We envision a future where every motivated developer has the tools to secure their dream role at top tech companies.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-10 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Quote className="w-9 h-9 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Founder's Message</h2>
                <p className="text-blue-400 font-semibold text-lg">Imran Matin, Founder</p>
              </div>
            </div>

            <div className="pl-0 md:pl-22">
              <blockquote className="text-gray-300 text-lg leading-relaxed italic border-l-4 border-blue-600 pl-6">
                "I founded CodeMaster Academy on a simple principle: <span className="text-white font-semibold">Interview preparation shouldn't be fragmented.</span> Developers waste too much time hopping between documentation, separate coding editors, and expensive mock interview services. I built CodeMaster Academy to be the single, complete solution. Our integration of the <span className="text-blue-400 font-semibold">AI-powered Mock Interview</span> and the <span className="text-blue-400 font-semibold">real-time code executor</span> wasn't just a technical challenge; it was about creating a seamless, realistic environment where practice truly translates into performance. We're here to turn ambition into a career."
              </blockquote>
              <p className="text-gray-400 text-right mt-4 font-semibold">— Imran Matin</p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white text-center mb-10">Why CodeMaster Academy?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-emerald-800/70 transition-all">
              <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Integrated Practice</h3>
              <p className="text-gray-400 leading-relaxed">
                We replace disconnected tools with our all-in-one platform featuring The Vault (Documentation), The Forge (Code Editor), and The Test (Quizzes).
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-800/70 transition-all">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Career-Driven Structure</h3>
              <p className="text-gray-400 leading-relaxed">
                Our Career Roadmaps are structured learning paths for specific roles (e.g., Software Engineer, Data Scientist), ensuring every hour spent practicing directly contributes to your professional goal.
              </p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-purple-800/70 transition-all">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-World Readiness</h3>
              <p className="text-gray-400 leading-relaxed">
                Our AI-powered Mock Interviews provide instant, objective feedback, simulating the pressure and rigor of top-tier technical evaluations.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-purple-900/30 rounded-2xl p-8 text-center">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Join thousands of developers who are transforming their careers with CodeMaster Academy. Whether you're preparing for your first interview or aiming for a senior role at a top tech company, we're here to support your journey every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
}
