/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `name` (text) - Name of the person contacting
      - `email` (text) - Email address for response
      - `subject` (text) - Subject category of the inquiry
      - `message` (text) - Detailed message content
      - `created_at` (timestamptz) - Timestamp of submission
      - `status` (text) - Status of the inquiry (default: 'new')
      - `user_id` (uuid, nullable) - Optional link to authenticated user

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anyone to insert submissions (including unauthenticated users)
    - Add policy for authenticated users to view their own submissions
    - Admin access will be handled separately through service role

  3. Indexes
    - Index on created_at for efficient sorting
    - Index on status for filtering
    - Index on email for lookups
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert contact submissions (even unauthenticated users)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Authenticated users can view their own submissions
CREATE POLICY "Users can view own submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);

-- Add check constraint for valid status values
ALTER TABLE contact_submissions 
  ADD CONSTRAINT valid_status 
  CHECK (status IN ('new', 'in_progress', 'resolved', 'closed'));

-- Add check constraint for valid subject values
ALTER TABLE contact_submissions 
  ADD CONSTRAINT valid_subject 
  CHECK (subject IN ('General Inquiry', 'Technical Support', 'Partnership Opportunity', 'Feedback/Suggestion'));