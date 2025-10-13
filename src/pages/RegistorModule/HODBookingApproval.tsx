 import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle, Book, AlertCircle, Filter, Search, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

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
  rejectionReason?: string;
};

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

const HODBookingApproval = () => {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<Notification | null>(null);
  const [rejectionModal, setRejectionModal] = useState<{
    show: boolean;
    bookingId: string;
    reason: string;
  }>({ show: false, bookingId: '', reason: '' });

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem('facilityBookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('facilityBookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now().toString();
    setNotification({ id, message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const approveBooking = (bookingId: string) => {
    setBookings(
      bookings.map((b) =>
        b.id === bookingId ? { ...b, status: 'approved' as const } : b
      )
    );
    showNotification('Booking approved successfully!', 'success');
  };

  const openRejectionModal = (bookingId: string) => {
    setRejectionModal({ show: true, bookingId, reason: '' });
  };

  const rejectBooking = () => {
    if (!rejectionModal.reason.trim()) {
      showNotification('Please provide a reason for rejection', 'error');
      return;
    }

    setBookings(
      bookings.map((b) =>
        b.id === rejectionModal.bookingId
          ? { ...b, status: 'rejected' as const, rejectionReason: rejectionModal.reason }
          : b
      )
    );
    showNotification('Booking rejected', 'info');
    setRejectionModal({ show: false, bookingId: '', reason: '' });
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

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === 'all' || b.status === filter;
    const matchesSearch =
      searchTerm === '' ||
      b.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;
  const approvedCount = bookings.filter((b) => b.status === 'approved').length;
  const rejectedCount = bookings.filter((b) => b.status === 'rejected').length;

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
        </div>
      )}

      {/* Header */}
      <header
        style={{
          background: theme.card,
          borderBottom: `1px solid ${theme.border}`,
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: theme.shadow,
          borderRadius: '12px',
          marginBottom: '24px',
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 700, color: theme.text }}>
          HOD Booking Approval 
          </h1>
          <p style={{ margin: 0, marginTop: '8px', fontSize: '14px', color: theme.textSecondary }}>
            Review and manage facility booking requests
          </p>
        </div>
      </header>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: theme.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>Pending Approvals</p>
              <p style={{ color: theme.text, fontSize: '32px', fontWeight: 700, margin: 0 }}>{pendingCount}</p>
            </div>
            <div style={{ background: `${theme.warning}22`, padding: '12px', borderRadius: '12px' }}>
              <Clock size={32} style={{ color: theme.warning }} />
            </div>
          </div>
        </div>

        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: theme.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>Approved</p>
              <p style={{ color: theme.text, fontSize: '32px', fontWeight: 700, margin: 0 }}>{approvedCount}</p>
            </div>
            <div style={{ background: `${theme.success}22`, padding: '12px', borderRadius: '12px' }}>
              <CheckCircle size={32} style={{ color: theme.success }} />
            </div>
          </div>
        </div>

        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: theme.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>Rejected</p>
              <p style={{ color: theme.text, fontSize: '32px', fontWeight: 700, margin: 0 }}>{rejectedCount}</p>
            </div>
            <div style={{ background: `${theme.error}22`, padding: '12px', borderRadius: '12px' }}>
              <XCircle size={32} style={{ color: theme.error }} />
            </div>
          </div>
        </div>

        <div
          style={{
            background: theme.card,
            border: `1px solid ${theme.border}`,
            borderRadius: '12px',
            padding: '20px',
            boxShadow: theme.shadow,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: theme.textSecondary, fontSize: '14px', margin: 0 }}>Total Requests</p>
              <p style={{ color: theme.text, fontSize: '32px', fontWeight: 700, margin: 0 }}>{bookings.length}</p>
            </div>
            <div style={{ background: `${theme.primary}22`, padding: '12px', borderRadius: '12px' }}>
              <Book size={32} style={{ color: theme.primary }} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div
        style={{
          background: theme.card,
          border: `1px solid ${theme.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: theme.shadow,
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {['all', 'pending', 'approved', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              style={{
                padding: '8px 16px',
                background: filter === f ? theme.primary : 'transparent',
                color: filter === f ? '#fff' : theme.textSecondary,
                border: `1px solid ${filter === f ? theme.primary : theme.border}`,
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {f} {f !== 'all' && `(${
                f === 'pending' ? pendingCount : f === 'approved' ? approvedCount : rejectedCount
              })`}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.textSecondary,
            }}
          />
          <input
            type="text"
            placeholder="Search by facility, requester, or purpose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 12px 12px 42px',
              background: theme.bgSecondary,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              color: theme.text,
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
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
          <h3 style={{ color: theme.text, fontSize: '20px', marginBottom: '8px' }}>
            No bookings found
          </h3>
          <p style={{ color: theme.textSecondary }}>
            {filter === 'pending'
              ? 'No pending approvals at the moment'
              : `No ${filter} bookings to display`}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {filteredBookings
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((booking) => (
              <div
                key={booking.id}
                style={{
                  background: theme.card,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '12px',
                  padding: '24px',
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
                      {booking.facilityName}
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
                        <User size={16} />
                        <span>{booking.bookedBy}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} />
                        <span>
                          {booking.startTime} - {booking.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      background: getStatusColor(booking.status),
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {booking.status}
                  </span>
                </div>

                <div
                  style={{
                    background: theme.bgSecondary,
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: booking.status === 'pending' ? '16px' : '0',
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
                    {booking.purpose}
                  </p>
                </div>

                {booking.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                    <button
                      onClick={() => approveBooking(booking.id)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: theme.success,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '0.9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '1';
                      }}
                    >
                      <CheckCircle size={18} />
                      Approve
                    </button>
                    <button
                      onClick={() => openRejectionModal(booking.id)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: 'transparent',
                        color: theme.error,
                        border: `1px solid ${theme.error}`,
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
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
                      <XCircle size={18} />
                      Reject
                    </button>
                  </div>
                )}

                {booking.status === 'rejected' && booking.rejectionReason && (
                  <div
                    style={{
                      background: `${theme.error}22`,
                      padding: '12px',
                      borderRadius: '8px',
                      marginTop: '16px',
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
                      {booking.rejectionReason}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Rejection Modal */}
      {rejectionModal.show && (
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
          onClick={() => setRejectionModal({ show: false, bookingId: '', reason: '' })}
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
            <h2 style={{ color: theme.text, margin: 0, marginBottom: '16px', fontSize: '22px' }}>
              Reject Booking Request
            </h2>
            <p style={{ color: theme.textSecondary, fontSize: '14px', marginBottom: '16px' }}>
              Please provide a reason for rejecting this booking request:
            </p>

            <textarea
              value={rejectionModal.reason}
              onChange={(e) =>
                setRejectionModal({ ...rejectionModal, reason: e.target.value })
              }
              placeholder="Enter rejection reason..."
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
                onClick={() => setRejectionModal({ show: false, bookingId: '', reason: '' })}
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
                onClick={rejectBooking}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: theme.error,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Confirm Rejection
              </button>
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

export default HODBookingApproval;
