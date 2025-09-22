import React, { useState } from 'react';

interface StudentProfileData {
  rollNumber: string;
  registrationNumber: string;
  course: string;
  semester: number;
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  parents?: string;
  lastLogin?: string;
}

interface MyProfileProps {
  darkMode: boolean;
  profileData?: StudentProfileData;
  onProfileUpdate?: (profile: StudentProfileData) => void;
}

export default function MyProfile({
  darkMode,
  profileData = {
    rollNumber: '2025CSE098',
    registrationNumber: 'REG20250999',
    course: 'B.Tech Information Technology',
    semester: 7,
    name: 'Ankit Sharma',
    email: 'ankit.sharma@univ.edu.in',
    contactNumber: '+91 9302048572',
    address: '88, Residency Road, Indore, Madhya Pradesh, India',
    parents: 'Mr. Ramesh Sharma & Mrs. Seema Sharma',
    lastLogin: 'just now',
  },
  onProfileUpdate,
}: MyProfileProps) {
  const [editing, setEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(profileData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = () => {
    setEditProfile(profileData);
    setEditing(true);
  };

  const handleCancel = () => setEditing(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditProfile({
      ...editProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEditing(false);
      onProfileUpdate && onProfileUpdate(editProfile);
    }, 1000);
  };

  return (
    <section
      className={`${darkMode ? 'dark' : ''} `}
      style={{ minHeight: "78vh" }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 justify-center pt-8">
        {/* Profile Card */}
        <div className="md:w-1/3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-12 pt-14 pb-12 flex flex-col items-center min-w-[340px]">
          <div className="w-36 h-36 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center mb-6 shadow">
            <svg viewBox="0 0 64 64" className="w-28 h-28 text-blue-200 dark:text-blue-500">
              <circle cx="32" cy="26" r="13" fill="currentColor" />
              <rect x="17" y="40" width="30" height="18" rx="9" fill="currentColor" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-100 mb-1">{profileData.name}</h3>
          <div className="text-gray-600 dark:text-gray-300 mb-3">{profileData.email}</div>
          <button
            className="w-full mt-7 px-7 py-3 rounded font-semibold bg-blue-600 text-white hover:bg-blue-700 transition text-lg"
            onClick={handleEdit}
            disabled={editing}
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Details or Edit Form */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-12 pt-10 pb-12 min-w-[400px]">
          {!editing ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-100">Academic Information</h2>
              <dl className="grid grid-cols-2 gap-x-10 gap-y-3 mb-8 text-[17px]">
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Roll Number</dt>
                <dd>{profileData.rollNumber}</dd>
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Registration No.</dt>
                <dd>{profileData.registrationNumber}</dd>
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Course</dt>
                <dd>{profileData.course}</dd>
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Semester</dt>
                <dd>{profileData.semester}</dd>
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Last Login</dt>
                <dd>{profileData.lastLogin}</dd>
              </dl>
              <h2 className="text-2xl font-bold mb-3 text-blue-700 dark:text-blue-100">Personal Information</h2>
              <dl className="grid grid-cols-2 gap-x-10 gap-y-3 mb-8 text-[17px]">
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Name</dt>
                <dd>{profileData.name}</dd>
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Email</dt>
                <dd>{profileData.email}</dd>
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Contact</dt>
                <dd>{profileData.contactNumber}</dd>
                <dt className="font-semibold text-blue-700 dark:text-blue-300">Parents</dt>
                <dd>{profileData.parents}</dd>
              </dl>
              <h2 className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-100">Address</h2>
              <div className="bg-blue-50 dark:bg-gray-700 rounded px-4 py-2 text-[17px]">{profileData.address}</div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7 w-full">
              <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-100">Edit Profile</h2>
              <div className="grid grid-cols-2 gap-x-7 gap-y-4">
                <div>
                  <label className="block font-semibold mb-2 text-blue-700 dark:text-blue-300">
                    Name
                  </label>
                  <input
                    className="w-full rounded border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-900 text-lg text-blue-900 dark:text-white px-4 py-3"
                    name="name"
                    value={editProfile.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-blue-700 dark:text-blue-300">
                    Contact
                  </label>
                  <input
                    className="w-full rounded border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-900 text-lg text-blue-900 dark:text-white px-4 py-3"
                    name="contactNumber"
                    value={editProfile.contactNumber}
                    onChange={handleChange}
                    required
                    pattern="^[0-9+\-() ]{7,20}$"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  Email
                </label>
                <input
                  className="w-full rounded border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-900 text-lg text-blue-900 dark:text-white px-4 py-3"
                  name="email"
                  value={editProfile.email}
                  onChange={handleChange}
                  required
                  type="email"
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2 text-blue-700 dark:text-blue-300">
                  Address
                </label>
                <textarea
                  className="w-full rounded border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-gray-900 text-lg text-blue-900 dark:text-white px-4 py-3 resize-none"
                  name="address"
                  value={editProfile.address}
                  onChange={handleChange}
                  required
                  rows={2}
                />
              </div>
              <div className="flex gap-5 mt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-3 rounded text-blue-900 bg-gray-200 text-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-3 rounded bg-blue-600 text-white text-lg font-semibold shadow hover:bg-blue-700"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
