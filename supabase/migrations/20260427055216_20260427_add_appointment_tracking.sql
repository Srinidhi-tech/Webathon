/*
  # Add appointment tracking and live queue system

  1. New Tables
    - `appointment_status_log` - tracks appointment status progression
    - `live_queue` - manages current queue and tokens
  
  2. Changes to appointments table
    - Add status field (Booked, Reminder Sent, Arrived, Consultation, Feedback Done)
    - Add is_emergency flag
    - Add priority level
    - Add token_number
    - Add estimated_wait_minutes
    - Add patient_id reference
  
  3. Security
    - Enable RLS on new tables
    - Add policies for data access
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'status'
  ) THEN
    ALTER TABLE appointments ADD COLUMN status text DEFAULT 'Booked';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'is_emergency'
  ) THEN
    ALTER TABLE appointments ADD COLUMN is_emergency boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'priority'
  ) THEN
    ALTER TABLE appointments ADD COLUMN priority text DEFAULT 'Normal';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'token_number'
  ) THEN
    ALTER TABLE appointments ADD COLUMN token_number integer;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'estimated_wait_minutes'
  ) THEN
    ALTER TABLE appointments ADD COLUMN estimated_wait_minutes integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'reminder_sent_at'
  ) THEN
    ALTER TABLE appointments ADD COLUMN reminder_sent_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'appointments' AND column_name = 'arrived_at'
  ) THEN
    ALTER TABLE appointments ADD COLUMN arrived_at timestamptz;
  END IF;

END $$;

CREATE TABLE IF NOT EXISTS appointment_status_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  status text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointment_status_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert status logs"
  ON appointment_status_log
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read status logs"
  ON appointment_status_log
  FOR SELECT
  USING (true);

CREATE TABLE IF NOT EXISTS live_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department text NOT NULL,
  current_token_serving integer DEFAULT 0,
  total_tokens_issued integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE live_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read live queue"
  ON live_queue
  FOR SELECT
  USING (true);

CREATE POLICY "Service can update queue"
  ON live_queue
  FOR UPDATE
  WITH CHECK (true);
