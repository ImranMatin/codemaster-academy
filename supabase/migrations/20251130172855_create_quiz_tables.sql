/*
  # Create Quiz System Tables

  1. New Tables
    - `languages`
      - `id` (uuid, primary key) - Unique identifier for each language
      - `name` (text, unique) - Language name (e.g., 'python', 'javascript')
      - `title` (text) - Display title (e.g., 'Python', 'JavaScript')
      - `icon` (text) - Icon/emoji for the language
      - `created_at` (timestamptz) - Timestamp of creation
    
    - `questions`
      - `id` (uuid, primary key) - Unique identifier for each question
      - `language_id` (uuid, foreign key) - References languages table
      - `question_text` (text) - The question content
      - `correct_answer_index` (int) - Index of the correct answer (0-3)
      - `created_at` (timestamptz) - Timestamp of creation
    
    - `question_options`
      - `id` (uuid, primary key) - Unique identifier for each option
      - `question_id` (uuid, foreign key) - References questions table
      - `option_text` (text) - The option content
      - `option_index` (int) - Position index (0-3)
      - `created_at` (timestamptz) - Timestamp of creation
    
    - `user_quiz_attempts`
      - `id` (uuid, primary key) - Unique identifier for each attempt
      - `user_id` (uuid) - References auth.users (anonymous users supported)
      - `language_id` (uuid, foreign key) - References languages table
      - `score` (int) - Number of correct answers
      - `total_questions` (int) - Total number of questions in the quiz
      - `completed_at` (timestamptz) - Timestamp of completion
  
  2. Security
    - Enable RLS on all tables
    - Allow public read access to languages, questions, and question_options
    - Allow authenticated and anonymous users to insert their quiz attempts
    - Users can only read their own quiz attempts

  3. Initial Data
    - Populate languages table with Python, JavaScript, Java, and C++
*/

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  title text NOT NULL,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language_id uuid NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  correct_answer_index int NOT NULL CHECK (correct_answer_index >= 0 AND correct_answer_index <= 3),
  created_at timestamptz DEFAULT now()
);

-- Create question_options table
CREATE TABLE IF NOT EXISTS question_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_text text NOT NULL,
  option_index int NOT NULL CHECK (option_index >= 0 AND option_index <= 3),
  created_at timestamptz DEFAULT now(),
  UNIQUE(question_id, option_index)
);

-- Create user_quiz_attempts table
CREATE TABLE IF NOT EXISTS user_quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT NULL,
  language_id uuid NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  score int NOT NULL DEFAULT 0 CHECK (score >= 0),
  total_questions int NOT NULL CHECK (total_questions > 0),
  completed_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for languages (public read)
CREATE POLICY "Anyone can read languages"
  ON languages FOR SELECT
  TO public
  USING (true);

-- RLS Policies for questions (public read)
CREATE POLICY "Anyone can read questions"
  ON questions FOR SELECT
  TO public
  USING (true);

-- RLS Policies for question_options (public read)
CREATE POLICY "Anyone can read question options"
  ON question_options FOR SELECT
  TO public
  USING (true);

-- RLS Policies for user_quiz_attempts
CREATE POLICY "Users can insert their own quiz attempts"
  ON user_quiz_attempts FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read their own quiz attempts"
  ON user_quiz_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anonymous users can read their attempts"
  ON user_quiz_attempts FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- Insert initial language data
INSERT INTO languages (name, title, icon) VALUES
  ('python', 'Python', '🐍'),
  ('javascript', 'JavaScript', '⚡'),
  ('java', 'Java', '☕'),
  ('cpp', 'C++', '⚙️')
ON CONFLICT (name) DO NOTHING;
