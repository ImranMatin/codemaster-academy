import { useState, useEffect } from 'react';
import { supabase, UserProfile } from '../lib/supabase';
import { Trophy, Medal, Award } from 'lucide-react';

export default function Leaderboard() {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('total_solved', { ascending: false })
        .order('updated_at', { ascending: true })
        .limit(50);

      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-gray-400 font-semibold">{rank}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4">
          Leaderboard
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Top problem solvers on The Dev Vault
        </p>
      </div>

      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-purple-900/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Rank
                </th>
                <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-300">
                  Username
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-sm font-semibold text-gray-300">
                  Total
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-sm font-semibold text-green-400 hidden sm:table-cell">
                  Easy
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-sm font-semibold text-yellow-400 hidden sm:table-cell">
                  Medium
                </th>
                <th className="px-4 md:px-6 py-4 text-center text-sm font-semibold text-red-400 hidden sm:table-cell">
                  Hard
                </th>
              </tr>
            </thead>
            <tbody>
              {profiles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No users on the leaderboard yet. Be the first to solve a problem!
                  </td>
                </tr>
              ) : (
                profiles.map((profile, index) => (
                  <tr
                    key={profile.id}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center justify-center w-10">
                        {getRankIcon(index + 1)}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm md:text-base">
                          {profile.username.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-semibold text-sm md:text-base">
                          {profile.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center">
                      <span className="text-purple-400 font-bold text-lg md:text-xl">
                        {profile.total_solved}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center text-green-400 font-semibold hidden sm:table-cell">
                      {profile.easy_solved}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center text-yellow-400 font-semibold hidden sm:table-cell">
                      {profile.medium_solved}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-center text-red-400 font-semibold hidden sm:table-cell">
                      {profile.hard_solved}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-purple-900/30">
        <h3 className="text-xl font-bold text-white mb-4">How Rankings Work</h3>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Rankings are based on total problems solved</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>In case of a tie, the user who solved problems earlier ranks higher</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>
              Only successfully executed solutions count towards your total
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-400 mt-1">•</span>
            <span>Create a profile to appear on the leaderboard</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
