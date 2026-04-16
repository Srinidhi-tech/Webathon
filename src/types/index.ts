export type Language = 'en' | 'kn';

export type Page = 'home' | 'about' | 'students' | 'admissions' | 'research' | 'feedback';

export interface Appointment {
  id: string;
  tracking_id: string;
  patient_name: string;
  phone: string;
  email: string;
  department: string;
  preferred_date: string;
  preferred_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes: string;
  created_at: string;
}

export interface Department {
  id: string;
  name: string;
  name_kn: string;
  description: string;
  head_name: string;
  phone: string;
  room: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  title_kn: string;
  description: string;
  event_date: string;
  event_type: 'conference' | 'camp' | 'academic' | 'exam' | 'cultural' | 'general';
}

export interface LiveUpdate {
  id: string;
  message: string;
  message_kn: string;
  update_type: string;
  is_active: boolean;
}

export interface HostelComplaint {
  student_name: string;
  room_number: string;
  complaint_type: string;
  description: string;
}

export interface FeedbackForm {
  name: string;
  email: string;
  role: string;
  message: string;
  rating: number;
}
