


import { useState } from 'react';
import { Calendar, Clock, Users, X, AlertCircle, Book,  } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';


const darkTheme = {
  bg: '#1f2937',            
  bgSecondary: '#374151',    
  text: '#f9fafb',           
  textSecondary: '#d1d5db',  
  primary: '#3b82f6',        
  primaryHover: '#2563eb',   
  border: '#4b5563',        
  success: '#10b981',       
  error: '#ef4444',          
  card: '#1f2937',          
  shadow: '0 2px 8px rgba(0,0,0,0.4)',
};


const lightTheme = {
  bg: '#f8f9fa',
  bgSecondary: '#ffffff',
  text: '#111111',
  textSecondary: '#555555',
  primary: '#007bff',
  primaryHover: '#0056b3',
  border: '#dddddd',
  success: '#198754',
  error: '#dc3545',
  card: '#ffffff',
  shadow: '0 2px 8px rgba(0,0,0,0.1)',
};

type Facility = {
  id: string;
  name: string;
  type: 'seminar_hall' | 'lab' | 'conference_room' | 'auditorium';
  capacity: number;
  facilities: string[];
  available: boolean;
};

type Booking = {
  id: string;
  facilityId: string;
  facilityName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
};

const BookPermissions = () => {
  const { isDark, toggleTheme } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'book' | 'my-bookings'>('book');

  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('');

  const facilities: Facility[] = [
    {
      id: 'sh1',
      name: 'Main Seminar Hall',
      type: 'seminar_hall',
      capacity: 150,
      facilities: ['Projector', 'Audio System', 'AC', 'Whiteboard'],
      available: true,
    },
    {
      id: 'lab1',
      name: 'Computer Lab A',
      type: 'lab',
      capacity: 60,
      facilities: ['60 Computers', 'Projector', 'AC', 'Internet'],
      available: true,
    },
    {
      id: 'lab2',
      name: 'Physics Lab',
      type: 'lab',
      capacity: 40,
      facilities: ['Equipment', 'Safety Gear', 'AC'],
      available: true,
    },
    {
      id: 'cr1',
      name: 'Conference Room 1',
      type: 'conference_room',
      capacity: 30,
      facilities: ['Video Conferencing', 'Projector', 'AC', 'Whiteboard'],
      available: true,
    },
    {
      id: 'aud1',
      name: 'Main Auditorium',
      type: 'auditorium',
      capacity: 500,
      facilities: ['Stage', 'Sound System', 'Lighting', 'AC', 'Green Room'],
      available: true,
    },
  ];

  const handleBooking = () => {
    if (selectedFacility && bookingDate && startTime && endTime && purpose) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        facilityId: selectedFacility.id,
        facilityName: selectedFacility.name,
        date: bookingDate,
        startTime,
        endTime,
        purpose,
        status: 'pending',
      };
      setBookings([...bookings, newBooking]);
      closeModal();
    }
  };

  const openBookingModal = (facility: Facility) => {
    setSelectedFacility(facility);
    setShowBookingModal(true);
  };

  const closeModal = () => {
    setShowBookingModal(false);
    setSelectedFacility(null);
    setBookingDate('');
    setStartTime('');
    setEndTime('');
    setPurpose('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return theme.success;
      case 'rejected':
        return theme.error;
      default:
        return theme.primary;
    }
  };

  return (
    <div
      style={{
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '32px',
        background: theme.bg,
        color: theme.text,
        minHeight: '100vh',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: theme.card,
          borderBottom: `1px solid ${theme.border}`,
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: theme.shadow,
          color: theme.text,
          borderRadius: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Book style={{ width: '28px', height: '28px', color: theme.primary }} />
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>Facility Booking System</h1>
        </div>

        {/* Theme Toggle */}
        
 
       
      </header>

      {/* Tabs */}
      <div
        style={{
          background: theme.card,
          borderBottom: `1px solid ${theme.border}`,
          padding: '0 24px',
          marginTop: '20px',
          borderRadius: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '32px' }}>
          {['book', 'my-bookings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'book' | 'my-bookings')}
              style={{
                padding: '16px 0',
                background: 'none',
                border: 'none',
                color: activeTab === tab ? theme.primary : theme.textSecondary,
                borderBottom:
                  activeTab === tab
                    ? `3px solid ${theme.primary}`
                    : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              {tab === 'book' ? 'Book Facility' : `My Bookings (${bookings.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {activeTab === 'book' ? (
          <>
            <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
              Available Facilities
            </h2>
            <p style={{ color: theme.textSecondary, fontSize: '16px', marginBottom: '16px' }}>
              Browse and book facilities for your events
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  style={{
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: theme.shadow,
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                  }}
                  onClick={() => facility.available && openBookingModal(facility)}
                >
                  <h3 style={{ color: theme.text, fontSize: '18px', fontWeight: 600 }}>{facility.name}</h3>
                  <p style={{ color: theme.textSecondary, fontSize: '14px' }}>
                    Capacity: {facility.capacity}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {facility.facilities.map((f) => (
                      <span
                        key={f}
                        style={{
                          padding: '4px 10px',
                          background: theme.bgSecondary,
                          color: theme.text,
                          border: `1px solid ${theme.border}`,
                          borderRadius: '6px',
                          fontSize: '12px',
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <button
                    disabled={!facility.available}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: facility.available ? theme.primary : theme.bgSecondary,
                      color: facility.available ? '#fff' : theme.textSecondary,
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: facility.available ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {facility.available ? 'Book Now' : 'Occupied'}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 style={{ color: theme.text, fontSize: '28px', fontWeight: 700 }}>My Bookings</h2>
            {bookings.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: theme.card,
                  borderRadius: '12px',
                  border: `1px solid ${theme.border}`,
                  boxShadow: theme.shadow,
                }}
              >
                <AlertCircle size={64} style={{ color: theme.textSecondary, marginBottom: '16px' }} />
                <h3 style={{ color: theme.text }}>No bookings yet</h3>
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '12px',
                  }}
                >
                  <h3 style={{ color: theme.text }}>{b.facilityName}</h3>
                  <p style={{ color: theme.textSecondary }}>{b.date} | {b.startTime} - {b.endTime}</p>
                  <p style={{ color: theme.text }}>{b.purpose}</p>
                  <span
                    style={{
                      background: getStatusColor(b.status),
                      color: '#fff',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {b.status}
                  </span>
                </div>
              ))
            )}
          </>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedFacility && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: theme.card,
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '500px',
              width: '100%',
              border: `1px solid ${theme.border}`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ color: theme.text }}>Book {selectedFacility.name}</h2>
              <button
                onClick={closeModal}
                style={{
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  padding: '4px',
                }}
              >
                <X size={20} style={{ color: theme.text }} />
              </button>
            </div>

            <div>
              <label style={{ color: theme.text }}>Date</label>
              <input
                type="date"
                value={bookingDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBookingDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                }}
              />
              <label style={{ color: theme.text }}>Start Time</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                }}
              />
              <label style={{ color: theme.text }}>End Time</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                }}
              />
              <label style={{ color: theme.text }}>Purpose</label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  resize: 'vertical',
                }}
              />
              <button
                onClick={handleBooking}
                disabled={!bookingDate || !startTime || !endTime || !purpose}
                style={{
                  width: '100%',
                  marginTop: '12px',
                  padding: '12px',
                  background:
                    bookingDate && startTime && endTime && purpose
                      ? theme.primary
                      : theme.bgSecondary,
                  color:
                    bookingDate && startTime && endTime && purpose
                      ? '#fff'
                      : theme.textSecondary,
                  border: 'none',
                  borderRadius: '8px',
                  cursor:
                    bookingDate && startTime && endTime && purpose
                      ? 'pointer'
                      : 'not-allowed',
                }}
              >
                Submit Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPermissions;
