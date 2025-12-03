import { Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Platform */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#forge"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  The Forge
                </a>
              </li>
              <li>
                <a
                  href="#test"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  The Test
                </a>
              </li>
              <li>
                <a
                  href="#problems"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Coding Problems
                </a>
              </li>
              <li>
                <a
                  href="#interview"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Mock Interviews
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Career & Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#vault"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  The Vault
                </a>
              </li>
              <li>
                <a
                  href="#roadmap"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Career Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#leaderboard"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Leaderboard
                </a>
              </li>
              <li>
                <a
                  href="#profile"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  User Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#license"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  License (MIT)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/yourusername/codemaster-academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>Contribute on GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} CodeMaster Academy. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Built with <span className="text-red-500">❤️</span> for developers worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
