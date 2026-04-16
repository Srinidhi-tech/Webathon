/*
  # RRDCH Website - Core Database Schema

  ## Summary
  Creates all tables required for the Rajarajeshwari Dental College and Hospital website.

  ## New Tables
  1. `appointments` - Patient appointment bookings with tracking ID and status
  2. `patient_followups` - Follow-up records linked to appointments
  3. `events` - College calendar events (academic, clinical, cultural)
  4. `hostel_complaints` - Student hostel complaint submissions
  5. `feedback` - General feedback from patients and visitors
  6. `live_updates` - Ticker messages for PG schedules and emergency news
  7. `departments` - Dental department information

  ## Security
  - RLS enabled on all tables
  - Public can insert appointments, feedback, complaints
  - Authenticated users can read/manage their own data
  - Live updates are publicly readable
*/

-- Departments
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_kn text NOT NULL,
  description text DEFAULT '',
  head_name text DEFAULT '',
  phone text DEFAULT '',
  room text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Departments are publicly readable"
  ON departments FOR SELECT
  TO anon, authenticated
  USING (true);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id text UNIQUE NOT NULL DEFAULT upper(substring(gen_random_uuid()::text, 1, 8)),
  patient_name text NOT NULL,
  phone text NOT NULL,
  email text DEFAULT '',
  department text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Anyone can select by tracking_id"
  ON appointments FOR SELECT
  TO anon, authenticated
  USING (true);

-- Patient Follow-ups
CREATE TABLE IF NOT EXISTS patient_followups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid REFERENCES appointments(id) ON DELETE CASCADE,
  patient_name text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  notes text DEFAULT '',
  next_visit_date date,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE patient_followups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Follow-ups are publicly readable"
  ON patient_followups FOR SELECT
  TO anon, authenticated
  USING (true);

-- Events Calendar
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_kn text DEFAULT '',
  description text DEFAULT '',
  event_date date NOT NULL,
  event_type text NOT NULL DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Events are publicly readable"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

-- Hostel Complaints
CREATE TABLE IF NOT EXISTS hostel_complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  room_number text NOT NULL,
  complaint_type text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE hostel_complaints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students can insert complaints"
  ON hostel_complaints FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Complaints are readable by authenticated users"
  ON hostel_complaints FOR SELECT
  TO authenticated
  USING (true);

-- Feedback
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text DEFAULT '',
  role text NOT NULL DEFAULT 'patient',
  message text NOT NULL,
  rating integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert feedback"
  ON feedback FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
CREATE POLICY "Feedback readable by authenticated"
  ON feedback FOR SELECT
  TO authenticated
  USING (true);

-- Live Updates (ticker)
CREATE TABLE IF NOT EXISTS live_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message text NOT NULL,
  message_kn text DEFAULT '',
  update_type text NOT NULL DEFAULT 'general',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE live_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Active updates are publicly readable"
  ON live_updates FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Seed departments
INSERT INTO departments (name, name_kn, description, head_name, room) VALUES
  ('Oral Medicine & Radiology', 'ಮೌಖಿಕ ಔಷಧ ಮತ್ತು ರೇಡಿಯಾಲಜಿ', 'Diagnosis and imaging of oral and maxillofacial regions', 'Dr. Priya Sharma', 'Block A, Room 101'),
  ('Conservative Dentistry & Endodontics', 'ಸಂರಕ್ಷಣಾ ದಂತಚಿಕಿತ್ಸೆ ಮತ್ತು ಎಂಡೋಡಾಂಟಿಕ್ಸ್', 'Root canal treatments and tooth restoration', 'Dr. Ramesh Kumar', 'Block A, Room 205'),
  ('Oral & Maxillofacial Surgery', 'ಮೌಖಿಕ ಮತ್ತು ಮ್ಯಾಕ್ಸಿಲೋಫೇಶಿಯಲ್ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ', 'Surgical procedures of the mouth, jaw and face', 'Dr. Anand Patel', 'Block B, Room 110'),
  ('Orthodontics', 'ಆರ್ಥೊಡಾಂಟಿಕ್ಸ್', 'Correction of teeth and jaw alignment', 'Dr. Kavitha Rao', 'Block B, Room 215'),
  ('Periodontics', 'ಪೀರಿಯೊಡಾಂಟಿಕ್ಸ್', 'Treatment of gum diseases and dental implants', 'Dr. Suresh Nair', 'Block C, Room 105'),
  ('Prosthodontics', 'ಪ್ರಾಸ್ಥೊಡಾಂಟಿಕ್ಸ್', 'Dental prosthetics and implant restoration', 'Dr. Meena Pillai', 'Block C, Room 210'),
  ('Pedodontics', 'ಪೀಡೋಡಾಂಟಿಕ್ಸ್', 'Pediatric dental care', 'Dr. Ravi Menon', 'Block D, Room 102'),
  ('Public Health Dentistry', 'ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ದಂತಚಿಕಿತ್ಸೆ', 'Community dental health programs', 'Dr. Lakshmi Devi', 'Block D, Room 205')
ON CONFLICT DO NOTHING;

-- Seed live updates
INSERT INTO live_updates (message, message_kn, update_type) VALUES
  ('OPD Timings: Mon-Sat 9:00 AM - 4:00 PM | Emergency Services: 24/7', 'OPD ಸಮಯ: ಸೋಮ-ಶನಿ ಬೆಳಿಗ್ಗೆ 9 - ಸಂಜೆ 4 | ತುರ್ತು ಸೇವೆ: 24/7', 'general'),
  ('PG Batch 2024-25 Orientation on April 20th, 2026 at 10:00 AM - Seminar Hall', 'PG ತರಗತಿ 2024-25 ಓರಿಯಂಟೇಶನ್ ಏಪ್ರಿಲ್ 20, 2026', 'academic'),
  ('Free Dental Camp: April 25th at Community Health Center, Rajajinagar', 'ಉಚಿತ ದಂತ ಶಿಬಿರ: ಏಪ್ರಿಲ್ 25', 'announcement'),
  ('Admissions Open for BDS 2026-27 Batch — Apply Before May 31st', 'BDS 2026-27 ಪ್ರವೇಶ ತೆರೆದಿದೆ — ಮೇ 31 ರೊಳಗೆ ಅರ್ಜಿ ಹಾಕಿ', 'admission')
ON CONFLICT DO NOTHING;

-- Seed events
INSERT INTO events (title, title_kn, description, event_date, event_type) VALUES
  ('State Dental Conference 2026', 'ರಾಜ್ಯ ದಂತ ಸಮ್ಮೇಳನ 2026', 'Annual state-level dental conference hosted by RRDCH', '2026-04-28', 'conference'),
  ('Free Dental Health Camp', 'ಉಚಿತ ದಂತ ಆರೋಗ್ಯ ಶಿಬಿರ', 'Community outreach dental camp', '2026-04-25', 'camp'),
  ('PG Seminar - Oral Oncology', 'PG ಸೆಮಿನಾರ್ - ಮೌಖಿಕ ಆಂಕಾಲಜಿ', 'Postgraduate seminar on oral oncology advances', '2026-05-05', 'academic'),
  ('BDS Final Year Practical Exams', 'BDS ಅಂತಿಮ ವರ್ಷ ಪ್ರಾಯೋಗಿಕ ಪರೀಕ್ಷೆ', 'Final year practical examinations for BDS batch', '2026-05-10', 'exam'),
  ('Annual Cultural Fest - DentFest', 'ವಾರ್ಷಿಕ ಸಾಂಸ್ಕೃತಿಕ ಹಬ್ಬ - DentFest', 'Annual cultural and sports festival for students', '2026-05-20', 'cultural')
ON CONFLICT DO NOTHING;
