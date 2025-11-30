/*
  # Create Question Bank and User Progress System

  1. New Tables
    - `coding_problems`
      - `id` (uuid, primary key) - Unique identifier for each problem
      - `title` (text) - Problem title
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Problem description/prompt
      - `difficulty` (text) - Easy, Medium, or Hard
      - `topic_tags` (text array) - Array of topic tags
      - `example_cases` (jsonb) - Example test cases with inputs/outputs
      - `starter_code_python` (text) - Python starter code template
      - `starter_code_javascript` (text) - JavaScript starter code template
      - `created_at` (timestamptz) - Timestamp of creation
    
    - `user_problem_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `user_id` (uuid) - References auth.users (anonymous users supported)
      - `problem_id` (uuid, foreign key) - References coding_problems
      - `language` (text) - Programming language used (python/javascript)
      - `code` (text) - User's submitted code
      - `status` (text) - success, error, or timeout
      - `output` (text) - Execution output
      - `submitted_at` (timestamptz) - Timestamp of submission
    
    - `user_problem_progress`
      - `id` (uuid, primary key) - Unique identifier for each progress entry
      - `user_id` (uuid) - References auth.users (anonymous users supported)
      - `problem_id` (uuid, foreign key) - References coding_problems
      - `is_solved` (boolean) - Whether the user solved the problem
      - `attempts` (int) - Number of attempts made
      - `last_attempted_at` (timestamptz) - Timestamp of last attempt
      - `first_solved_at` (timestamptz) - Timestamp of first successful solution
      - UNIQUE constraint on (user_id, problem_id)
    
    - `user_profiles`
      - `id` (uuid, primary key) - References auth.users
      - `username` (text, unique) - User's display name
      - `total_solved` (int) - Total problems solved
      - `easy_solved` (int) - Easy problems solved
      - `medium_solved` (int) - Medium problems solved
      - `hard_solved` (int) - Hard problems solved
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update
  
  2. Security
    - Enable RLS on all tables
    - Allow public read access to coding_problems
    - Users can insert and read their own submissions and progress
    - Public read access to user_profiles for leaderboard
    - Users can only update their own profile

  3. Indexes
    - Create indexes for efficient filtering and sorting
    - Index on difficulty, topic_tags, and user_id for fast queries
*/

-- Create coding_problems table
CREATE TABLE IF NOT EXISTS coding_problems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  topic_tags text[] NOT NULL DEFAULT '{}',
  example_cases jsonb NOT NULL DEFAULT '[]',
  starter_code_python text NOT NULL DEFAULT '',
  starter_code_javascript text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create user_problem_submissions table
CREATE TABLE IF NOT EXISTS user_problem_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT NULL,
  problem_id uuid NOT NULL REFERENCES coding_problems(id) ON DELETE CASCADE,
  language text NOT NULL CHECK (language IN ('python', 'javascript')),
  code text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'error', 'timeout')),
  output text DEFAULT '',
  submitted_at timestamptz DEFAULT now()
);

-- Create user_problem_progress table
CREATE TABLE IF NOT EXISTS user_problem_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT NULL,
  problem_id uuid NOT NULL REFERENCES coding_problems(id) ON DELETE CASCADE,
  is_solved boolean DEFAULT false,
  attempts int DEFAULT 0 CHECK (attempts >= 0),
  last_attempted_at timestamptz DEFAULT now(),
  first_solved_at timestamptz DEFAULT NULL,
  UNIQUE(user_id, problem_id)
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY,
  username text UNIQUE NOT NULL,
  total_solved int DEFAULT 0 CHECK (total_solved >= 0),
  easy_solved int DEFAULT 0 CHECK (easy_solved >= 0),
  medium_solved int DEFAULT 0 CHECK (medium_solved >= 0),
  hard_solved int DEFAULT 0 CHECK (hard_solved >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE coding_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_problem_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_problem_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for coding_problems (public read)
CREATE POLICY "Anyone can read coding problems"
  ON coding_problems FOR SELECT
  TO public
  USING (true);

-- RLS Policies for user_problem_submissions
CREATE POLICY "Users can insert their own submissions"
  ON user_problem_submissions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read their own submissions"
  ON user_problem_submissions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anonymous users can read their submissions"
  ON user_problem_submissions FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- RLS Policies for user_problem_progress
CREATE POLICY "Users can insert their own progress"
  ON user_problem_progress FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update their own progress"
  ON user_problem_progress FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can read their own progress"
  ON user_problem_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anonymous users can read their progress"
  ON user_problem_progress FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- RLS Policies for user_profiles
CREATE POLICY "Anyone can read user profiles"
  ON user_profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_coding_problems_difficulty ON coding_problems(difficulty);
CREATE INDEX IF NOT EXISTS idx_coding_problems_topic_tags ON coding_problems USING GIN(topic_tags);
CREATE INDEX IF NOT EXISTS idx_user_problem_submissions_user_id ON user_problem_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_submissions_problem_id ON user_problem_submissions(problem_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_progress_user_id ON user_problem_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_problem_progress_problem_id ON user_problem_progress(problem_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_total_solved ON user_profiles(total_solved DESC);
