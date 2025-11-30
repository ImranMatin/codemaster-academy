import { useState, useEffect } from 'react';
import { supabase, CodingProblem } from '../lib/supabase';
import { Search, Filter, Code2, CheckCircle2 } from 'lucide-react';

interface ProblemsProps {
  onSelectProblem: (problem: CodingProblem) => void;
}

export default function Problems({ onSelectProblem }: ProblemsProps) {
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<CodingProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [allTopics, setAllTopics] = useState<string[]>([]);

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    filterProblems();
  }, [problems, searchQuery, selectedDifficulty, selectedTopic]);

  const fetchProblems = async () => {
    try {
      const { data, error } = await supabase
        .from('coding_problems')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      setProblems(data || []);

      const topics = new Set<string>();
      data?.forEach((problem) => {
        problem.topic_tags.forEach((tag: string) => topics.add(tag));
      });
      setAllTopics(Array.from(topics).sort());
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProblems = () => {
    let filtered = [...problems];

    if (searchQuery) {
      filtered = filtered.filter((problem) =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter((problem) => problem.difficulty === selectedDifficulty);
    }

    if (selectedTopic !== 'All') {
      filtered = filtered.filter((problem) =>
        problem.topic_tags.includes(selectedTopic)
      );
    }

    setFilteredProblems(filtered);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getDifficultyBgColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-500/20 border-green-500/30';
      case 'Medium':
        return 'bg-yellow-500/20 border-yellow-500/30';
      case 'Hard':
        return 'bg-red-500/20 border-red-500/30';
      default:
        return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          Problem Set
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Practice coding problems from easy to hard
        </p>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
            >
              <option value="All">All Topics</option>
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <span>
            Showing {filteredProblems.length} of {problems.length} problems
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {filteredProblems.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center border border-gray-800">
            <Code2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No problems found matching your criteria</p>
          </div>
        ) : (
          filteredProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => onSelectProblem(problem)}
              className="w-full bg-gray-900 hover:bg-gray-800 rounded-xl p-4 md:p-6 border border-gray-800 hover:border-purple-500/50 transition-all text-left group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                      {problem.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm md:text-base line-clamp-2 mb-3">
                    {problem.description.split('\n')[0]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {problem.topic_tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <span
                    className={`px-4 py-2 rounded-lg border ${getDifficultyBgColor(
                      problem.difficulty
                    )} ${getDifficultyColor(problem.difficulty)} font-semibold text-sm`}
                  >
                    {problem.difficulty}
                  </span>
                  <Code2 className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
