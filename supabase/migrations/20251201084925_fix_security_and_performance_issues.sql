/*
  # Fix Security and Performance Issues

  ## Changes
  
  ### 1. Add Missing Indexes for Foreign Keys
    - Add index on `questions.language_id` (foreign key questions_language_id_fkey)
    - Add index on `user_quiz_attempts.language_id` (foreign key user_quiz_attempts_language_id_fkey)
  
  ### 2. Optimize RLS Policies
    - Replace all `auth.uid()` calls with `(select auth.uid())` for better performance
    - This prevents re-evaluation of auth functions for each row
  
  ### 3. Remove Duplicate RLS Policies
    - Remove duplicate permissive policies that cause conflicts
    - Keep only one policy per action per table
  
  ### 4. Security Enhancements
    - Ensure all policies follow best practices
    - Maintain data privacy and security
*/

-- =====================================================
-- PART 1: Add Missing Indexes for Foreign Keys
-- =====================================================

-- Index for questions.language_id foreign key
CREATE INDEX IF NOT EXISTS idx_questions_language_id ON questions(language_id);

-- Index for user_quiz_attempts.language_id foreign key
CREATE INDEX IF NOT EXISTS idx_user_quiz_attempts_language_id ON user_quiz_attempts(language_id);

-- =====================================================
-- PART 2: Remove Duplicate RLS Policies
-- =====================================================

-- Drop duplicate policies on coding_problems
DROP POLICY IF EXISTS "Anyone can view coding problems" ON coding_problems;

-- Drop duplicate policies on languages
DROP POLICY IF EXISTS "Anyone can view languages" ON languages;

-- Drop duplicate policies on question_options
DROP POLICY IF EXISTS "Anyone can view question options" ON question_options;

-- Drop duplicate policies on questions
DROP POLICY IF EXISTS "Anyone can view questions" ON questions;

-- Drop duplicate policies on user_quiz_attempts
DROP POLICY IF EXISTS "Users can insert their own quiz attempts" ON user_quiz_attempts;
DROP POLICY IF EXISTS "Users can read their own quiz attempts" ON user_quiz_attempts;

-- Drop duplicate policies on user_problem_submissions
DROP POLICY IF EXISTS "Users can insert their own submissions" ON user_problem_submissions;
DROP POLICY IF EXISTS "Users can read their own submissions" ON user_problem_submissions;

-- Drop duplicate policies on user_problem_progress
DROP POLICY IF EXISTS "Users can insert their own progress" ON user_problem_progress;
DROP POLICY IF EXISTS "Users can read their own progress" ON user_problem_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON user_problem_progress;

-- Drop duplicate policies on user_profiles
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Drop duplicate policies on interview_sessions
DROP POLICY IF EXISTS "Users can insert their own sessions" ON interview_sessions;
DROP POLICY IF EXISTS "Users can read their own sessions" ON interview_sessions;
DROP POLICY IF EXISTS "Users can update their own sessions" ON interview_sessions;

-- Drop duplicate policies on interview_questions
DROP POLICY IF EXISTS "Users can insert questions in their sessions" ON interview_questions;
DROP POLICY IF EXISTS "Users can read questions from their sessions" ON interview_questions;
DROP POLICY IF EXISTS "Users can update questions in their sessions" ON interview_questions;

-- =====================================================
-- PART 3: Recreate Optimized RLS Policies
-- =====================================================

-- user_quiz_attempts policies (optimized)
DROP POLICY IF EXISTS "Users can create own quiz attempts" ON user_quiz_attempts;
DROP POLICY IF EXISTS "Users can view own quiz attempts" ON user_quiz_attempts;
DROP POLICY IF EXISTS "Users can update own quiz attempts" ON user_quiz_attempts;

CREATE POLICY "Users can create own quiz attempts"
  ON user_quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can view own quiz attempts"
  ON user_quiz_attempts
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own quiz attempts"
  ON user_quiz_attempts
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- user_problem_submissions policies (optimized)
DROP POLICY IF EXISTS "Users can create own problem submissions" ON user_problem_submissions;
DROP POLICY IF EXISTS "Users can view own problem submissions" ON user_problem_submissions;

CREATE POLICY "Users can create own problem submissions"
  ON user_problem_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can view own problem submissions"
  ON user_problem_submissions
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- user_problem_progress policies (optimized)
DROP POLICY IF EXISTS "Users can create own problem progress" ON user_problem_progress;
DROP POLICY IF EXISTS "Users can view own problem progress" ON user_problem_progress;
DROP POLICY IF EXISTS "Users can update own problem progress" ON user_problem_progress;

CREATE POLICY "Users can create own problem progress"
  ON user_problem_progress
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can view own problem progress"
  ON user_problem_progress
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own problem progress"
  ON user_problem_progress
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- user_profiles policies (optimized)
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- interview_sessions policies (optimized)
DROP POLICY IF EXISTS "Users can create own interview sessions" ON interview_sessions;
DROP POLICY IF EXISTS "Users can view own interview sessions" ON interview_sessions;
DROP POLICY IF EXISTS "Users can update own interview sessions" ON interview_sessions;

CREATE POLICY "Users can create own interview sessions"
  ON interview_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can view own interview sessions"
  ON interview_sessions
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own interview sessions"
  ON interview_sessions
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- interview_questions policies (optimized)
DROP POLICY IF EXISTS "Users can create interview questions for own sessions" ON interview_questions;
DROP POLICY IF EXISTS "Users can view own interview questions" ON interview_questions;
DROP POLICY IF EXISTS "Users can update own interview questions" ON interview_questions;

CREATE POLICY "Users can create interview questions for own sessions"
  ON interview_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = (select auth.uid())
    )
  );

CREATE POLICY "Users can view own interview questions"
  ON interview_questions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = (select auth.uid())
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
      AND interview_sessions.user_id = (select auth.uid())
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM interview_sessions
      WHERE interview_sessions.id = interview_questions.session_id
      AND interview_sessions.user_id = (select auth.uid())
    )
  );
