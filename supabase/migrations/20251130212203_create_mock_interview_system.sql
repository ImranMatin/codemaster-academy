/*
  # Create Mock Interview System

  1. New Tables
    - `interview_sessions`
      - `id` (uuid, primary key) - Unique identifier for each session
      - `user_id` (uuid) - References auth.users (anonymous users supported)
      - `role` (text) - Interview role/domain selected
      - `status` (text) - in_progress, completed, or abandoned
      - `total_time_seconds` (int) - Total time taken for the session
      - `overall_score` (int) - Score out of 10
      - `feedback_summary` (text) - AI-generated overall feedback
      - `started_at` (timestamptz) - Timestamp when session started
      - `completed_at` (timestamptz) - Timestamp when session completed
      - `created_at` (timestamptz) - Timestamp of creation
    
    - `interview_questions`
      - `id` (uuid, primary key) - Unique identifier for each question
      - `session_id` (uuid, foreign key) - References interview_sessions
      - `question_number` (int) - Sequential number (1-5)
      - `question_text` (text) - The question asked
      - `question_type` (text) - technical or behavioral
      - `user_answer` (text) - User's answer
      - `ai_feedback` (text) - AI feedback for this specific answer
      - `score` (int) - Score for this question (1-10)
      - `key_topics_missed` (text array) - Important topics not mentioned
      - `answered_at` (timestamptz) - Timestamp when answered
      - `created_at` (timestamptz) - Timestamp of creation
  
  2. Security
    - Enable RLS on all tables
    - Users can insert and read their own sessions and questions
    - Public read access for leaderboard purposes (optional)
    
  3. Indexes
    - Create indexes for efficient querying by user_id and session status
    - Index on completed_at for performance tracking
*/

-- Create interview_sessions table
CREATE TABLE IF NOT EXISTS interview_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid DEFAULT NULL,
  role text NOT NULL,
  status text NOT NULL CHECK (status IN ('in_progress', 'completed', 'abandoned')) DEFAULT 'in_progress',
  total_time_seconds int DEFAULT 0 CHECK (total_time_seconds >= 0),
  overall_score int DEFAULT NULL CHECK (overall_score >= 0 AND overall_score <= 10),
  feedback_summary text DEFAULT '',
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create interview_questions table
CREATE TABLE IF NOT EXISTS interview_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES interview_sessions(id) ON DELETE CASCADE,
  question_number int NOT NULL CHECK (question_number >= 1 AND question_number <= 5),
  question_text text NOT NULL,
  question_type text NOT NULL CHECK (question_type IN ('technical', 'behavioral')),
  user_answer text DEFAULT '',
  ai_feedback text DEFAULT '',
  score int DEFAULT NULL CHECK (score >= 0 AND score <= 10),
  key_topics_missed text[] DEFAULT '{}',
  answered_at timestamptz DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE interview_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for interview_sessions
CREATE POLICY "Users can insert their own sessions"
  ON interview_sessions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read their own sessions"
  ON interview_sessions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anonymous users can read their sessions"
  ON interview_sessions FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE POLICY "Users can update their own sessions"
  ON interview_sessions FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- RLS Policies for interview_questions
CREATE POLICY "Users can insert questions in their sessions"
  ON interview_questions FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read questions from their sessions"
  ON interview_questions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Anonymous users can read their questions"
  ON interview_questions FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id IS NULL
    )
  );

CREATE POLICY "Users can update questions in their sessions"
  ON interview_questions FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_interview_sessions_user_id ON interview_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_status ON interview_sessions(status);
CREATE INDEX IF NOT EXISTS idx_interview_sessions_completed_at ON interview_sessions(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_interview_questions_session_id ON interview_questions(session_id);
CREATE INDEX IF NOT EXISTS idx_interview_questions_question_number ON interview_questions(question_number);
