/*
  # Add Authentication and RLS Policies

  1. Changes
    - Add RLS policies for authenticated users on all tables
    - Users can only access their own data
    - Anonymous users can view public data (questions, problems)
    
  2. Security
    - Restrict interview_sessions to authenticated users only
    - Restrict interview_questions to authenticated users only
    - Restrict user_profiles to authenticated users only
    - Allow public read access to quiz tables and coding problems
*/

-- Interview Sessions: Users can only access their own sessions
CREATE POLICY "Users can view own interview sessions"
  ON interview_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own interview sessions"
  ON interview_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interview sessions"
  ON interview_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Interview Questions: Users can only access questions from their sessions
CREATE POLICY "Users can view own interview questions"
  ON interview_questions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create interview questions for own sessions"
  ON interview_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own interview questions"
  ON interview_questions
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = auth.uid()
    )
  );

-- User Profiles: Users can only access their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Quiz Questions: Public read access
CREATE POLICY "Anyone can view questions"
  ON questions
  FOR SELECT
  TO public
  USING (true);

-- Quiz Attempts: Users can only access their own attempts
CREATE POLICY "Users can view own quiz attempts"
  ON user_quiz_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own quiz attempts"
  ON user_quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz attempts"
  ON user_quiz_attempts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Languages: Public read access
CREATE POLICY "Anyone can view languages"
  ON languages
  FOR SELECT
  TO public
  USING (true);

-- Question Options: Public read access
CREATE POLICY "Anyone can view question options"
  ON question_options
  FOR SELECT
  TO public
  USING (true);

-- Coding Problems: Public read access
CREATE POLICY "Anyone can view coding problems"
  ON coding_problems
  FOR SELECT
  TO public
  USING (true);

-- User Problem Progress: Users can only access their own progress
CREATE POLICY "Users can view own problem progress"
  ON user_problem_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own problem progress"
  ON user_problem_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own problem progress"
  ON user_problem_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User Problem Submissions: Users can only access their own submissions
CREATE POLICY "Users can view own problem submissions"
  ON user_problem_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own problem submissions"
  ON user_problem_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
