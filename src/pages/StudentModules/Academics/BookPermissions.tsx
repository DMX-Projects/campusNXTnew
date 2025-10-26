 import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, X, AlertCircle, Book, CheckCircle, MapPin } from 'lucide-react';
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
  warning: '#f59e0b',
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
  warning: '#ff9800',
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
  location?: string;
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
  createdAt: string;
  bookedBy: string;
  numMembers?: number;
  rejectionReason?: string;
};

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

const BookPermissions = () => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'book' | 'my-bookings'>('book');
  const [notification, setNotification] = useState<Notification | null>(null);

  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [numMembers, setNumMembers] = useState('');

  // Simulated logged-in user (replace with actual auth)
  const currentUser = {
    id: 'user123',
    name: 'Dr. Rajesh Kumar',
    role: 'faculty',
  };

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('facilityBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Save bookings to localStorage
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('facilityBookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  const facilities: Facility[] = [
    {
      id: 'sh1',
      name: 'Main Seminar Hall',
      type: 'seminar_hall',
      capacity: 150,
      facilities: ['Projector', 'Audio System', 'AC', 'Whiteboard'],
      available: true,
      location: 'Block A, 2nd Floor',
    },
    {
      id: 'lab1',
      name: 'Computer Lab A',
      type: 'lab',
      capacity: 60,
      facilities: ['60 Computers', 'Projector', 'AC', 'Internet'],
      available: true,
      location: 'Block B, 1st Floor',
    },
    {
      id: 'lab2',
      name: 'Physics Lab',
      type: 'lab',
      capacity: 40,
      facilities: ['Equipment', 'Safety Gear', 'AC'],
      available: true,
      location: 'Block C, Ground Floor',
    },
    {
      id: 'cr1',
      name: 'Conference Room 1',
      type: 'conference_room',
      capacity: 30,
      facilities: ['Video Conferencing', 'Projector', 'AC', 'Whiteboard'],
      available: true,
      location: 'Admin Block, 3rd Floor',
    },
    {
      id: 'aud1',
      name: 'Main Auditorium',
      type: 'auditorium',
      capacity: 500,
      facilities: ['Stage', 'Sound System', 'Lighting', 'AC', 'Green Room'],
      available: true,
      location: 'Main Block',
    },
  ];

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString();
    setNotification({ id, message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleBooking = () => {
    if (selectedFacility && bookingDate && startTime && endTime && purpose && numMembers) {
      if (startTime >= endTime) {
        showNotification('End time must be after start time', 'error');
        return;
      }

      const membersCount = parseInt(numMembers);
      if (isNaN(membersCount) || membersCount < 1) {
        showNotification('Please enter a valid number of members', 'error');
        return;
      }

      const newBooking: Booking = {
        id: Date.now().toString(),
        facilityId: selectedFacility.id,
        facilityName: selectedFacility.name,
        date: bookingDate,
        startTime,
        endTime,
        purpose,
        numMembers: membersCount,
        status: 'pending',
        createdAt: new Date().toISOString(),
        bookedBy: currentUser.name,
      };

      setBookings([...bookings, newBooking]);
      showNotification(
        `Booking request submitted! Waiting for HOD approval.`,
        'info'
      );
      setActiveTab('my-bookings');
      closeModal();
    } else {
      showNotification('Please fill all required fields', 'error');
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
    setNumMembers('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return theme.success;
      case 'rejected':
        return theme.error;
      default:
        return theme.warning;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approved ✓';
      case 'rejected':
        return 'Rejected ✗';
      default:
        return 'Pending Approval ⏳';
    }
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking?.status !== 'pending') {
      showNotification('Only pending bookings can be cancelled', 'error');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.filter((b) => b.id !== bookingId));
      showNotification('Booking cancelled successfully', 'success');
    }
  };

  const getFacilityIcon = (type: string) => {
    switch (type) {
      case 'seminar_hall':
        return '🏫';
      case 'lab':
        return '🔬';
      case 'conference_room':
        return '💼';
      case 'auditorium':
        return '🎭';
      default:
        return '🏢';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Filter bookings for current user
  const myBookings = bookings.filter((b) => b.bookedBy === currentUser.name);

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
      {/* Notification Toast */}
      {notification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 2000,
            background:
              notification.type === 'success'
                ? theme.success
                : notification.type === 'error'
                ? theme.error
                : theme.primary,
            color: '#fff',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            animation: 'slideInRight 0.3s ease',
            maxWidth: '400px',
          }}
        >
          {notification.type === 'success' && <CheckCircle size={24} />}
          {notification.type === 'error' && <AlertCircle size={24} />}
          {notification.type === 'info' && <Book size={24} />}
          <span style={{ fontSize: '14px', fontWeight: 500 }}>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

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
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Book style={{ width: '28px', height: '28px', color: theme.primary }} />
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>
              Facility Booking System
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: theme.textSecondary,
                marginTop: '4px',
              }}
            >
              Logged in as: {currentUser.name}
            </p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div
        style={{
          background: theme.card,
          borderBottom: `1px solid ${theme.border}`,
          padding: '0 24px',
          borderRadius: '12px',
          boxShadow: theme.shadow,
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
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {tab === 'book' ? (
                <>
                  <Calendar size={18} />
                  Book Facility
                </>
              ) : (
                <>
                  <Book size={18} />
                  My Bookings
                  {myBookings.length > 0 && (
                    <span
                      style={{
                        background: theme.primary,
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '2px 8px',
                        fontSize: '12px',
                        fontWeight: 700,
                      }}
                    >
                      {myBookings.length}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '24px 0', maxWidth: '1400px', margin: '0 auto' }}>
        {activeTab === 'book' ? (
          <>
            <div
              style={{
                marginBottom: '24px',
                background: theme.card,
                padding: '20px',
                borderRadius: '12px',
                border: `1px solid ${theme.border}`,
              }}
            >
              <h2
                style={{
                  color: theme.text,
                  fontSize: '28px',
                  fontWeight: 700,
                  marginBottom: '8px',
                  margin: 0,
                }}
              >
                Available Facilities
              </h2>
              <p
                style={{
                  color: theme.textSecondary,
                  fontSize: '16px',
                  marginBottom: '0',
                  marginTop: '8px',
                }}
              >
                Browse and book facilities for your events, classes, or meetings
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '20px',
              }}
            >
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  style={{
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: theme.shadow,
                    cursor: facility.available ? 'pointer' : 'not-allowed',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    opacity: facility.available ? 1 : 0.6,
                  }}
                  onMouseEnter={(e) => {
                    if (facility.available) {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = theme.shadow;
                  }}
                  onClick={() => facility.available && openBookingModal(facility)}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ fontSize: '32px' }}>
                      {getFacilityIcon(facility.type)}
                    </span>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          color: theme.text,
                          fontSize: '18px',
                          fontWeight: 600,
                          margin: 0,
                        }}
                      >
                        {facility.name}
                      </h3>
                      {facility.location && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            marginTop: '4px',
                          }}
                        >
                          <MapPin size={14} style={{ color: theme.textSecondary }} />
                          <span
                            style={{
                              color: theme.textSecondary,
                              fontSize: '12px',
                            }}
                          >
                            {facility.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <Users size={16} style={{ color: theme.textSecondary }} />
                    <span style={{ color: theme.textSecondary, fontSize: '14px' }}>
                      Capacity: {facility.capacity} persons
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '16px',
                    }}
                  >
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
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (facility.available) {
                        e.currentTarget.style.background = theme.primaryHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (facility.available) {
                        e.currentTarget.style.background = theme.primary;
                      }
                    }}
                  >
                    {facility.available ? '📅 Book Now' : '🔒 Currently Occupied'}
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                marginBottom: '24px',
                background: theme.card,
                padding: '20px',
                borderRadius: '12px',
                border: `1px solid ${theme.border}`,
              }}
            >
              <h2
                style={{
                  color: theme.text,
                  fontSize: '28px',
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                My Bookings
              </h2>
              <p
                style={{
                  color: theme.textSecondary,
                  fontSize: '16px',
                  marginTop: '8px',
                  marginBottom: 0,
                }}
              >
                View and manage your facility reservations
              </p>
            </div>

            {myBookings.length === 0 ? (
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
                <AlertCircle
                  size={64}
                  style={{ color: theme.textSecondary, marginBottom: '16px' }}
                />
                <h3 style={{ color: theme.text, fontSize: '20px', marginBottom: '8px' }}>
                  No bookings yet
                </h3>
                <p style={{ color: theme.textSecondary, marginBottom: '24px' }}>
                  Start by booking a facility for your event
                </p>
                <button
                  onClick={() => setActiveTab('book')}
                  style={{
                    padding: '12px 24px',
                    background: theme.primary,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Browse Facilities
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '16px' }}>
                {myBookings
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((b) => (
                    <div
                      key={b.id}
                      style={{
                        background: theme.card,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '12px',
                        padding: '20px',
                        boxShadow: theme.shadow,
                        transition: 'transform 0.2s',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '16px',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              color: theme.text,
                              fontSize: '20px',
                              fontWeight: 600,
                              margin: 0,
                              marginBottom: '8px',
                            }}
                          >
                            {b.facilityName}
                          </h3>
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '16px',
                              color: theme.textSecondary,
                              fontSize: '14px',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Calendar size={16} />
                              <span>{formatDate(b.date)}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Clock size={16} />
                              <span>
                                {b.startTime} - {b.endTime}
                              </span>
                            </div>
                            {b.numMembers && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Users size={16} />
                                <span>{b.numMembers} attendees</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <span
                          style={{
                            background: getStatusColor(b.status),
                            color: '#fff',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {getStatusText(b.status)}
                        </span>
                      </div>

                      <div
                        style={{
                          background: theme.bgSecondary,
                          padding: '12px',
                          borderRadius: '8px',
                          marginBottom: '12px',
                        }}
                      >
                        <p
                          style={{
                            color: theme.textSecondary,
                            fontSize: '12px',
                            margin: 0,
                            marginBottom: '4px',
                            fontWeight: 600,
                          }}
                        >
                          Purpose:
                        </p>
                        <p style={{ color: theme.text, fontSize: '14px', margin: 0 }}>
                          {b.purpose}
                        </p>
                      </div>

                      {b.status === 'rejected' && b.rejectionReason && (
                        <div
                          style={{
                            background: `${theme.error}22`,
                            padding: '12px',
                            borderRadius: '8px',
                            marginBottom: '12px',
                            border: `1px solid ${theme.error}`,
                          }}
                        >
                          <p
                            style={{
                              color: theme.error,
                              fontSize: '12px',
                              margin: 0,
                              marginBottom: '4px',
                              fontWeight: 600,
                            }}
                          >
                            Rejection Reason:
                          </p>
                          <p style={{ color: theme.error, fontSize: '14px', margin: 0 }}>
                            {b.rejectionReason}
                          </p>
                        </div>
                      )}

                      {b.status === 'pending' && (
                        <button
                          onClick={() => cancelBooking(b.id)}
                          style={{
                            padding: '8px 16px',
                            background: 'transparent',
                            color: theme.error,
                            border: `1px solid ${theme.error}`,
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = theme.error;
                            e.currentTarget.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = theme.error;
                          }}
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  ))}
              </div>
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
          onClick={closeModal}
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
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ color: theme.text, margin: 0, fontSize: '22px' }}>
                  Book {selectedFacility.name}
                </h2>
                <p style={{ color: theme.textSecondary, fontSize: '14px', marginTop: '4px' }}>
                  Request will be sent to HOD for approval
                </p>
              </div>
              <button
                onClick={closeModal}
                style={{
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '6px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} style={{ color: theme.text }} />
              </button>
            </div>

            <div>
              <label
                style={{
                  color: theme.text,
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Date *
              </label>
              <input
                type="date"
                value={bookingDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setBookingDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '16px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  fontSize: '14px',
                }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label
                    style={{
                      color: theme.text,
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '16px',
                      borderRadius: '8px',
                      border: `1px solid ${theme.border}`,
                      background: theme.bgSecondary,
                      color: theme.text,
                      fontSize: '14px',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      color: theme.text,
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginBottom: '16px',
                      borderRadius: '8px',
                      border: `1px solid ${theme.border}`,
                      background: theme.bgSecondary,
                      color: theme.text,
                      fontSize: '14px',
                    }}
                  />
                </div>
              </div>

              <label
                style={{
                  color: theme.text,
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Number of Attendees *
              </label>
              <input
                type="number"
                value={numMembers}
                onChange={(e) => setNumMembers(e.target.value)}
                placeholder="Enter number of attendees"
                min="1"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '16px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  fontSize: '14px',
                }}
              />

              <label
                style={{
                  color: theme.text,
                  fontSize: '14px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                Purpose *
              </label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Describe the purpose of this booking..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`,
                  background: theme.bgSecondary,
                  color: theme.text,
                  fontSize: '14px',
                  resize: 'vertical',
                  marginBottom: '20px',
                }}
              />

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'transparent',
                    color: theme.textSecondary,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!bookingDate || !startTime || !endTime || !purpose || !numMembers}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background:
                      bookingDate && startTime && endTime && purpose && numMembers
                        ? theme.primary
                        : theme.bgSecondary,
                    color:
                      bookingDate && startTime && endTime && purpose && numMembers
                        ? '#fff'
                        : theme.textSecondary,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor:
                      bookingDate && startTime && endTime && purpose && numMembers
                        ? 'pointer'
                        : 'not-allowed',
                  }}
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BookPermissions;
