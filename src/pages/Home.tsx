import { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import PortalCards from '../components/home/PortalCards';
import AchievementsSection from '../components/home/AchievementsSection';
import DepartmentsSection from '../components/home/DepartmentsSection';
import VirtualTour from '../components/home/VirtualTour';
import EventsCalendar from '../components/home/EventsCalendar';
import Modal from '../components/common/Modal';
import AppointmentBooking from '../components/patient/AppointmentBooking';
import AppointmentTracking from '../components/patient/AppointmentTracking';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <>
      <HeroSection
        onBookAppointment={() => setBookingOpen(true)}
        onTrackAppointment={() => setTrackingOpen(true)}
        onVirtualTour={() => setTourOpen(true)}
      />
      <PortalCards onNavigate={onNavigate} onBookAppointment={() => setBookingOpen(true)} />
      <AchievementsSection />
      <DepartmentsSection />
      <VirtualTour />
      <EventsCalendar />

      <Modal isOpen={bookingOpen} onClose={() => setBookingOpen(false)}>
        <AppointmentBooking onClose={() => setBookingOpen(false)} />
      </Modal>

      <Modal isOpen={trackingOpen} onClose={() => setTrackingOpen(false)}>
        <AppointmentTracking onClose={() => setTrackingOpen(false)} />
      </Modal>

      <Modal isOpen={tourOpen} onClose={() => setTourOpen(false)} maxWidth="max-w-3xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="aspect-video">
            <img
              src="https://images.pexels.com/photos/3845625/pexels-photo-3845625.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Virtual Tour"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="font-bold text-gray-900 text-lg mb-2">RRDCH Virtual Tour</h3>
            <p className="text-gray-500 text-sm">Scroll down to explore our campus in detail using the Virtual Tour section below.</p>
            <button onClick={() => setTourOpen(false)} className="mt-4 px-5 py-2 bg-maroon-800 text-white rounded-xl text-sm font-medium hover:bg-maroon-700 transition-colors">Close</button>
          </div>
        </div>
      </Modal>
    </>
  );
}
