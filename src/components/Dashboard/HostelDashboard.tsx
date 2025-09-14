import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import DashboardCard from './DashboardCard';
import { Hotel, Users, Boxes, BedDouble, CheckCircle, Hash } from 'lucide-react';

const HostelDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Summary metrics
  const cardData = [
    { title: 'Total Occupancy', value: '85%', change: '+3.2%', trend: 'up' as const, icon: Hotel, color: 'bg-blue-500' },
    { title: 'Hostel Students', value: '1,456', change: '+28', trend: 'up' as const, icon: Users, color: 'bg-green-500' },
    { title: 'Total Blocks', value: '6', change: '+1', trend: 'up' as const, icon: Boxes, color: 'bg-indigo-500' },
    { title: 'Total Rooms', value: '610', change: '+12', trend: 'up' as const, icon: BedDouble, color: 'bg-purple-500' },
    { title: 'Available Rooms', value: '92', change: '+7', trend: 'up' as const, icon: CheckCircle, color: 'bg-teal-500' },
    { title: 'Hostels', value: '4', change: '—', trend: 'up' as const, icon: Hash, color: 'bg-amber-500' }
  ];

  // Charts data
  const occupancyData = [
    { hostel: 'Boys Hostel A', occupied: 145, capacity: 160, percentage: 90.6 },
    { hostel: 'Boys Hostel B', occupied: 132, capacity: 150, percentage: 88.0 },
    { hostel: 'Girls Hostel A', occupied: 98, capacity: 120, percentage: 81.7 },
    { hostel: 'Girls Hostel B', occupied: 156, capacity: 180, percentage: 86.7 }
  ];

  const feeStatusData = [
    { status: 'Paid', count: 1245, color: '#10B981' },
    { status: 'Pending', count: 156, color: '#F59E0B' },
    { status: 'Overdue', count: 55, color: '#EF4444' }
  ];

  const inOutData = [
    { time: '6:00', in: 12, out: 145 },
    { time: '8:00', in: 234, out: 89 },
    { time: '10:00', in: 45, out: 23 },
    { time: '12:00', in: 67, out: 78 },
    { time: '14:00', in: 89, out: 56 },
    { time: '16:00', in: 123, out: 34 },
    { time: '18:00', in: 178, out: 12 },
    { time: '20:00', in: 234, out: 8 },
    { time: '22:00', in: 89, out: 3 }
  ];

  // CSV helpers
  const toCSV = (rows: Record<string, any>[]) => {
    if (!rows.length) return '';
    const headers = Object.keys(rows);
    const cell = (v: any) => {
      const s = v == null ? '' : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return [headers.join(','), ...rows.map(r => headers.map(h => cell(r[h])).join(','))].join('\n');
  };

  const download = (filename: string, data: string, mime = 'text/csv;charset=utf-8;') => {
    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
  };

  const downloadReport = () => {
    // Build a simple multi-section CSV
    const summaryRows = [
      { metric: 'Total Occupancy', value: '85%' },
      { metric: 'Hostel Students', value: '1456' },
      { metric: 'Total Blocks', value: '6' },
      { metric: 'Total Rooms', value: '610' },
      { metric: 'Available Rooms', value: '92' },
      { metric: 'Hostels', value: '4' },
    ];
    const occupancyRows = occupancyData.map(d => ({
      hostel: d.hostel,
      occupied: d.occupied,
      capacity: d.capacity,
      percentage: d.percentage
    }));
    const feeRows = feeStatusData.map(d => ({ status: d.status, count: d.count }));
    const ioRows = inOutData.map(d => ({ time: d.time, in: d.in, out: d.out }));

    const parts = [
      'Summary',
      toCSV(summaryRows),
      '',
      'Occupancy',
      toCSV(occupancyRows),
      '',
      'Fee Status',
      toCSV(feeRows),
      '',
      'Daily In/Out',
      toCSV(ioRows),
    ];
    const csv = parts.join('\n');
    download(`hostel_report_${new Date().toISOString().slice(0,19).replace(/[:T]/g,'-')}.csv`, csv);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Hostel Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor hostel operations and student accommodation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/hostel/rooms/allotment')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            aria-label="Go to room allocation"
          >
            Room Allocation
          </button>
          
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {cardData.map((card, index) => (
          <DashboardCard key={index} data={card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hostel Occupancy */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Hostel Occupancy Details
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hostel" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Bar dataKey="occupied" name="Occupied" fill="#3B82F6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="capacity" name="Capacity" fill="#9CA3AF" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Fee Payment Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feeStatusData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="count"
                label={({ status, count }) => `${status}: ${count}`}
              >
                {feeStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#E5E7EB' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* In/Out Register */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Daily In/Out Register
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inOutData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#111827',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Line type="monotone" name="In" dataKey="in" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 4 }} />
              <Line type="monotone" name="Out" dataKey="out" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HostelDashboard;
