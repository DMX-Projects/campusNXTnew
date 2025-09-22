import React, { useState } from 'react';

interface Notification {
  id: number;
  sender: string;
  subject: string;
  body: string;
  dateReceived: string; // ISO or formatted date string
  read: boolean;
}

const dummyNotifications: Notification[] = [
  {
    id: 1,
    sender: 'Examination Dept',
    subject: 'Exam Timetable Released',
    body: 'Dear students, the exam timetable for the upcoming semester is now available on the student portal. Please check and prepare accordingly.',
    dateReceived: '2025-08-20T09:15:00',
    read: false,
  },
  {
    id: 2,
    sender: 'Library',
    subject: 'Library Fine Due',
    body: 'Your library account shows an overdue fine. Please clear it at the earliest to avoid suspension of borrowing privileges.',
    dateReceived: '2025-08-18T14:30:00',
    read: true,
  },
  {
    id: 3,
    sender: 'Hostel Office',
    subject: 'Hostel Room Allotment',
    body: 'The hostel room allotment list is published. Check your allotment and report any issues within 3 days.',
    dateReceived: '2025-08-22T11:00:00',
    read: false,
  },
  {
    id: 4,
    sender: 'Placement Cell',
    subject: 'Placement Drive Announcement',
    body: 'We are pleased to announce new placement opportunities starting next month. Register and prepare your resumes.',
    dateReceived: '2025-08-15T10:45:00',
    read: true,
  },
  {
    id: 5,
    sender: 'Finance Department',
    subject: 'Fee Payment Reminder',
    body: 'Please note the upcoming deadline for semester fee payment. Late payments will attract fines.',
    dateReceived: '2025-08-19T08:00:00',
    read: false,
  },
];

interface NotificationsProps {
  darkMode: boolean;
}

export default function Notifications({ darkMode }: NotificationsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (id: number) => {
    setSelectedId(id === selectedId ? null : id);
  };

  const selectedNotification = dummyNotifications.find((n) => n.id === selectedId);

  return (
    <section
      className={`min-h-screen p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500`}
    >
      {/* Notifications List */}
      <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-auto max-h-[700px]">
        <h2 className="font-bold text-xl px-6 py-4 border-b border-gray-300 dark:border-gray-700">
          Notifications
        </h2>
        {dummyNotifications.length === 0 ? (
          <p className="p-6 text-center text-gray-600 dark:text-gray-400">No notifications found.</p>
        ) : (
          <ul>
            {dummyNotifications.map((notification) => {
              const isSelected = notification.id === selectedId;
              return (
                <li
                  key={notification.id}
                  onClick={() => handleSelect(notification.id)}
                  className={`cursor-pointer px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col ${
                    isSelected ? 'bg-blue-100 dark:bg-blue-800 font-semibold' : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelect(notification.id);
                    }
                  }}
                  aria-selected={isSelected}
                  role="option"
                >
                  <div className="flex justify-between items-center">
                    <p className="truncate max-w-[60%] text-lg">{notification.subject}</p>
                    <time
                      dateTime={notification.dateReceived}
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {new Date(notification.dateReceived).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 dark:text-gray-300 truncate max-w-[80%]">
                    {notification.sender}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Notification Details */}
      <div className="md:flex-grow bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 max-h-[700px] overflow-auto">
        {!selectedNotification ? (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-20">
            Select a notification to read details.
          </p>
        ) : (
          <>
            <h3 className="text-2xl font-semibold mb-4">{selectedNotification.subject}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              <strong>From:</strong> {selectedNotification.sender}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
              <strong>Date:</strong>{' '}
              {new Date(selectedNotification.dateReceived).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <div className="whitespace-pre-line text-gray-800 dark:text-gray-200">{selectedNotification.body}</div>
          </>
        )}
      </div>
    </section>
  );
}
