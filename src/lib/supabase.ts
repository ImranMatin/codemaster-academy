import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CodingProblem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic_tags: string[];
  example_cases: ExampleCase[];
  starter_code_python: string;
  starter_code_javascript: string;
  created_at: string;
}

export interface ExampleCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface UserProblemProgress {
  id: string;
  user_id: string | null;
  problem_id: string;
  is_solved: boolean;
  attempts: number;
  last_attempted_at: string;
  first_solved_at: string | null;
}

export interface UserProfile {
  id: string;
  username: string;
  total_solved: number;
  easy_solved: number;
  medium_solved: number;
  hard_solved: number;
  created_at: string;
  updated_at: string;
}
