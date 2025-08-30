import React, { useState } from 'react';
import { Plus, Search, Grid, List, Download, Users, MapPin } from 'lucide-react';
import Modal from '../components/Modal';
import SeatingPlanForm from '../components/SeatingPlanForm';

const SeatingPlan: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [selectedRoom, setSelectedRoom] = useState('Room 101');

  const rooms = [
    { id: 'room101', name: 'Room 101', capacity: 60, layout: '6x10' },
    { id: 'room102', name: 'Room 102', capacity: 45, layout: '5x9' },
    { id: 'room103', name: 'Room 103', capacity: 80, layout: '8x10' }
  ];

  const seatingArrangement = [
    { seatNo: 'A1', studentId: 'CSE001', studentName: 'John Doe', rollNo: '20CS001' },
    { seatNo: 'A2', studentId: 'CSE002', studentName: 'Jane Smith', rollNo: '20CS002' },
    { seatNo: 'A3', studentId: '', studentName: '', rollNo: '' },
    { seatNo: 'A4', studentId: 'CSE004', studentName: 'Mike Johnson', rollNo: '20CS004' },
    { seatNo: 'B1', studentId: 'CSE005', studentName: 'Sarah Wilson', rollNo: '20CS005' },
    { seatNo: 'B2', studentId: '', studentName: '', rollNo: '' },
  ];

  const GridView = () => (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Room Layout - {selectedRoom}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded border-2 border-dashed border-gray-400"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-6 gap-2 max-w-2xl">
        {Array.from({ length: 36 }, (_, i) => {
          const seatNo = String.fromCharCode(65 + Math.floor(i / 6)) + (i % 6 + 1);
          const isOccupied = Math.random() > 0.3;
          return (
            <div
              key={seatNo}
              className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium cursor-pointer transition-all ${
                isOccupied 
                  ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600' 
                  : 'bg-gray-50 text-gray-400 border-dashed border-gray-300 hover:bg-gray-100'
              }`}
            >
              {seatNo}
            </div>
          );
        })}
      </div>
    </div>
  );

  const ListView = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Seat No</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Student ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Student Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Roll No</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {seatingArrangement.map((seat) => (
            <tr key={seat.seatNo} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm font-medium text-gray-900">{seat.seatNo}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{seat.studentId || '-'}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{seat.studentName || '-'}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{seat.rollNo || '-'}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                  seat.studentId 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {seat.studentId ? 'Assigned' : 'Available'}
                </span>
              </td>
              <td className="py-3 px-4">
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  {seat.studentId ? 'Reassign' : 'Assign'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEATING PLAN</h1>
          <p className="text-gray-600">Manage examination seating arrangements</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Generate Plan</span>
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Room Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Capacity</span>
                <span className="text-sm font-medium">60</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Assigned</span>
                <span className="text-sm font-medium text-green-600">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available</span>
                <span className="text-sm font-medium text-blue-600">18</span>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Utilization</span>
                  <span className="text-sm font-medium">70%</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <select 
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {rooms.map(room => (
                      <option key={room.id} value={room.name}>{room.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded-md ${viewType === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded-md ${viewType === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {viewType === 'grid' ? <GridView /> : <ListView />}
            </div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Generate Seating Plan"
      >
        <SeatingPlanForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default SeatingPlan;