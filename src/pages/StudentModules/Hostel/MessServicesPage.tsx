// import React, { useState } from 'react';
// import { 
//   Utensils, Calendar, Clock, Star, MessageCircle, 
//   Download, AlertCircle, CheckCircle, Users, 
//   Search, Filter, TrendingUp, Bell, Award,
//   BarChart3, Activity, ChefHat
// } from 'lucide-react';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
//   CartesianGrid, Legend
// } from 'recharts';

// interface DayMenu {
//   day: string;
//   breakfast: string[];
//   lunch: string[];
//   snacks: string[];
//   dinner: string[];
// }

// interface MessAttendance {
//   date: string;
//   breakfast: boolean;
//   lunch: boolean;
//   snacks: boolean;
//   dinner: boolean;
//   totalMealsConsumed: number;
// }

// interface MessBill {
//   id: string;
//   month: string;
//   year: number;
//   totalAmount: number;
//   paidAmount: number;
//   balanceAmount: number;
//   mealsTaken: {
//     breakfast: number;
//     lunch: number;
//     snacks: number;
//     dinner: number;
//   };
//   dueDate: string;
//   status: 'Paid' | 'Pending' | 'Overdue';
// }

// export const MessServicesPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<'menu' | 'attendance' | 'feedback' | 'bills' | 'rebate'>('menu');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [showFeedbackModal, setShowFeedbackModal] = useState(false);

//   // Current student info
//   const currentStudent = {
//     name: 'Rahul Kumar',
//     rollNumber: '2023CSE001',
//     messCardNumber: 'MC2023001',
//     messType: 'Full Mess',
//     dietaryPreference: 'Vegetarian'
//   };

//   // Weekly menu data
//   const weeklyMenu: DayMenu[] = [
//     {
//       day: 'Monday',
//       breakfast: ['Idli (4 pcs)', 'Sambar', 'Coconut Chutney', 'Filter Coffee'],
//       lunch: ['Rice', 'Sambar', 'Cabbage Curry', 'Potato Fry', 'Curd', 'Pickle'],
//       snacks: ['Masala Tea', 'Vada (2 pcs)', 'Banana'],
//       dinner: ['Chapati (3 pcs)', 'Dal Tadka', 'Mixed Veg Curry', 'Jeera Rice']
//     },
//     {
//       day: 'Tuesday',
//       breakfast: ['Masala Dosa', 'Sambar', 'Tomato Chutney', 'Tea'],
//       lunch: ['Vegetable Biryani', 'Raita', 'Papad', 'Pickle', 'Sweet'],
//       snacks: ['Filter Coffee', 'Bonda (3 pcs)', 'Chutney'],
//       dinner: ['Rice', 'Rasam', 'Beans Curry', 'Chapati (2 pcs)', 'Curd']
//     },
//     {
//       day: 'Wednesday',
//       breakfast: ['Upma', 'Coconut Chutney', 'Sambar', 'Masala Tea'],
//       lunch: ['Lemon Rice', 'Chickpea Curry', 'Vegetable Salad', 'Buttermilk'],
//       snacks: ['Tea', 'Samosa (2 pcs)', 'Green Chutney'],
//       dinner: ['Chapati (3 pcs)', 'Paneer Butter Masala', 'Dal', 'Rice']
//     },
//     {
//       day: 'Thursday',
//       breakfast: ['Ven Pongal', 'Sambar', 'Ginger Chutney', 'Coffee'],
//       lunch: ['Curd Rice', 'Vegetable Curry', 'Rasam', 'Pickle', 'Papad'],
//       snacks: ['Masala Tea', 'Pakoda', 'Sauce'],
//       dinner: ['Rice', 'Tomato Dal', 'Okra Curry', 'Chapati (2 pcs)']
//     },
//     {
//       day: 'Friday',
//       breakfast: ['Poha', 'Banana', 'Tea', 'Boiled Eggs (Non-Veg)'],
//       lunch: ['Fried Rice', 'Gobi Manchurian', 'Sweet Corn Soup', 'Pickle'],
//       snacks: ['Coffee', 'Bread Pakoda (2 pcs)', 'Chutney'],
//       dinner: ['Chapati (3 pcs)', 'Rajma Curry', 'Rice', 'Salad']
//     },
//     {
//       day: 'Saturday',
//       breakfast: ['Medu Vada (3 pcs)', 'Sambar', 'Coconut Chutney', 'Filter Coffee'],
//       lunch: ['Special Thali: Rice, Dal, 2 Curries, Curd, Pickle, Sweet', 'Papad'],
//       snacks: ['Tea', 'Cake Slice', 'Mixture'],
//       dinner: ['Rice', 'Sambar', 'Cabbage Stir-fry', 'Chapati (2 pcs)', 'Curd']
//     },
//     {
//       day: 'Sunday',
//       breakfast: ['Chapati (2 pcs)', 'Curd', 'Pickle', 'Aloo Curry', 'Tea'],
//       lunch: ['Chicken Biryani (Non-Veg)', 'Veg Biryani', 'Raita', 'Boiled Egg', 'Sweet'],
//       snacks: ['Filter Coffee', 'Mysore Pak', 'Banana'],
//       dinner: ['Rice', 'Dal Fry', 'Mixed Vegetable Curry', 'Chapati (2 pcs)']
//     }
//   ];

//   // Sample Attendance Data
//   const messAttendance: MessAttendance[] = [
//     { date: '2025-09-01', breakfast: true, lunch: true, snacks: false, dinner: true, totalMealsConsumed: 3 },
//     { date: '2025-09-02', breakfast: true, lunch: true, snacks: true, dinner: true, totalMealsConsumed: 4 },
//     { date: '2025-09-03', breakfast: false, lunch: true, snacks: false, dinner: true, totalMealsConsumed: 2 }
//   ];

//   // Sample Bill Data
//   const messBills: MessBill[] = [
//     {
//       id: 'MB001',
//       month: 'September',
//       year: 2025,
//       totalAmount: 3500,
//       paidAmount: 3500,
//       balanceAmount: 0,
//       mealsTaken: { breakfast: 25, lunch: 28, snacks: 15, dinner: 27 },
//       dueDate: '2025-10-05',
//       status: 'Paid'
//     },
//     {
//       id: 'MB002',
//       month: 'October',
//       year: 2025,
//       totalAmount: 3200,
//       paidAmount: 0,
//       balanceAmount: 3200,
//       mealsTaken: { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 },
//       dueDate: '2025-11-05',
//       status: 'Pending'
//     }
//   ];

//   // Monthly attendance analytics
//   const monthlyAttendanceData = [
//     { month: 'Jan', breakfast: 22, lunch: 28, snacks: 12, dinner: 26, total: 88 },
//     { month: 'Feb', breakfast: 20, lunch: 26, snacks: 10, dinner: 24, total: 80 },
//     { month: 'Mar', breakfast: 18, lunch: 24, snacks: 8, dinner: 22, total: 72 },
//     { month: 'Apr', breakfast: 25, lunch: 28, snacks: 15, dinner: 27, total: 95 },
//     { month: 'May', breakfast: 15, lunch: 18, snacks: 5, dinner: 16, total: 54 },
//     { month: 'Jun', breakfast: 28, lunch: 30, snacks: 18, dinner: 29, total: 105 },
//     { month: 'Jul', breakfast: 26, lunch: 29, snacks: 16, dinner: 28, total: 99 },
//     { month: 'Aug', breakfast: 25, lunch: 28, snacks: 15, dinner: 27, total: 95 }
//   ];

//   const feedbackSummary = [
//     { aspect: 'Taste', rating: 4.2, reviews: 156 },
//     { aspect: 'Quality', rating: 4.0, reviews: 142 },
//     { aspect: 'Quantity', rating: 4.5, reviews: 138 },
//     { aspect: 'Hygiene', rating: 4.3, reviews: 161 },
//     { aspect: 'Service', rating: 3.8, reviews: 134 },
//     { aspect: 'Variety', rating: 3.9, reviews: 128 }
//   ];

//   // Get current day and meal timing
//   const getCurrentDayAndMeal = () => {
//     const now = new Date();
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     const currentDay = days[now.getDay()];
//     const hour = now.getHours();
    
//     let currentMeal = '';
//     if (hour >= 7 && hour < 10) currentMeal = 'breakfast';
//     else if (hour >= 12 && hour < 15) currentMeal = 'lunch';
//     else if (hour >= 16 && hour < 18) currentMeal = 'snacks';
//     else if (hour >= 19 && hour < 22) currentMeal = 'dinner';
    
//     return { currentDay, currentMeal, hour };
//   };

//   const { currentDay, currentMeal } = getCurrentDayAndMeal();
//   const currentTime = new Date().toLocaleTimeString('en-IN', { 
//     hour: '2-digit', 
//     minute: '2-digit',
//     hour12: true 
//   });
  
// interface Bill {
//   id: string;
//   status: string;
//   balanceAmount: number;
// }

// interface Props {
//   bill: Bill;
//   handleDownloadBill: (id: string) => void;
//   handlePayBill: (id: string) => void;
// }

// const BillActions: React.FC<Props> = ({ bill, handleDownloadBill, handlePayBill }) => {
//   const onDownloadClick = (id: string) => {
//     handleDownloadBill(id);
//   };

//   const onPayClick = (id: string) => {
//     handlePayBill(id);
//   };

//   // Get meal timing display
//   const getMealTiming = (meal: string) => {
//     switch(meal) {
//       case 'breakfast': return '7:30 AM - 9:30 AM';
//       case 'lunch': return '12:00 PM - 2:30 PM';
//       case 'snacks': return '4:00 PM - 6:00 PM';
//       case 'dinner': return '7:30 PM - 9:30 PM';
//       default: return '';
//     }
//   };

//   const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mx-auto">
        

//         {/* Student Info Card */}
//         <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-full">
//                 <Utensils className="w-6 h-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-800">{currentStudent.name}</h3>
//                 <p className="text-sm text-gray-600">Mess Card: {currentStudent.messCardNumber} • {currentStudent.messType}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className="text-sm text-gray-600">Diet Preference</p>
//               <p className="font-medium text-green-600">{currentStudent.dietaryPreference}</p>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
//           <nav className="-mb-px flex gap-1">
//             {[
//               { key: 'menu', label: 'Weekly Menu', icon: Utensils },
//               { key: 'attendance', label: 'My Attendance', icon: CheckCircle },
//               { key: 'feedback', label: 'Feedback', icon: MessageCircle },
//               { key: 'bills', label: 'Mess Bills', icon: Download },
//               { key: 'rebate', label: 'Mess Rebate', icon: Calendar }
//             ].map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.key}
//                   className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
//                     activeTab === tab.key
//                       ? 'bg-blue-600 text-white shadow-lg'
//                       : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
//                   }`}
//                   onClick={() => setActiveTab(tab.key as any)}
//                 >
//                   <Icon className="w-4 h-4" />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Weekly Menu Tab */}
//         {activeTab === 'menu' && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               {/* Header with current status */}
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center gap-3">
//                     <ChefHat className="w-8 h-8 text-blue-600" />
//                     <div>
//                       <h2 className="text-2xl font-bold text-gray-800">Weekly Mess Menu</h2>
//                       <p className="text-gray-600">Complete meal schedule for the week</p>
//                     </div>
//                   </div>
                  
//                   <div className="text-right">
//                     <div className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-1">
//                       <Calendar className="w-5 h-5" />
//                       {currentDay}
//                     </div>
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <Clock className="w-4 h-4" />
//                       {currentTime}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Current meal status */}
//                 {currentMeal && (
//                   <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
//                     <div className="flex items-center gap-2">
//                       <Star className="w-5 h-5 text-green-600" />
//                       <span className="font-semibold text-green-800">
//                         {currentMeal.charAt(0).toUpperCase() + currentMeal.slice(1)} is being served now! 
//                       </span>
//                       <span className="text-green-700">
//                         ({getMealTiming(currentMeal)})
//                       </span>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Weekly Menu Table */}
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse border border-gray-300 text-sm">
//                   <thead>
//                     <tr className="bg-blue-600 text-white">
//                       <th className="border border-gray-300 px-3 py-4 text-left font-semibold">
//                         <div className="flex items-center gap-2">
//                           <Calendar className="w-4 h-4" />
//                           Day
//                         </div>
//                       </th>
//                       <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[200px]">
//                         <div className="text-center">
//                           🌅 Breakfast
//                           <div className="text-xs font-normal opacity-90">7:30 AM - 9:30 AM</div>
//                         </div>
//                       </th>
//                       <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[200px]">
//                         <div className="text-center">
//                           🍽️ Lunch
//                           <div className="text-xs font-normal opacity-90">12:00 PM - 2:30 PM</div>
//                         </div>
//                       </th>
//                       <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[180px]">
//                         <div className="text-center">
//                           ☕ Snacks
//                           <div className="text-xs font-normal opacity-90">4:00 PM - 6:00 PM</div>
//                         </div>
//                       </th>
//                       <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[200px]">
//                         <div className="text-center">
//                           🌙 Dinner
//                           <div className="text-xs font-normal opacity-90">7:30 PM - 9:30 PM</div>
//                         </div>
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {weeklyMenu.map((menu, index) => {
//                       const isCurrentDay = menu.day === currentDay;
                      
//                       return (
//                         <tr 
//                           key={menu.day} 
//                           className={`${isCurrentDay ? 'bg-yellow-50 border-l-4 border-l-yellow-400' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
//                         >
//                           {/* Day Column */}
//                           <td className={`border border-gray-300 px-3 py-4 font-semibold ${isCurrentDay ? 'text-yellow-800 bg-yellow-100' : 'text-gray-700'}`}>
//                             <div className="flex items-center gap-2">
//                               {isCurrentDay && <Star className="w-4 h-4 text-yellow-600" />}
//                               {menu.day}
//                               {isCurrentDay && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Today</span>}
//                             </div>
//                           </td>

//                           {/* Breakfast Column */}
//                           <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'breakfast' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
//                             <ul className="space-y-1">
//                               {menu.breakfast.map((item, idx) => (
//                                 <li key={idx} className="flex items-start gap-1">
//                                   <span className="text-green-600 text-xs mt-1">•</span>
//                                   <span className={isCurrentDay && currentMeal === 'breakfast' ? 'font-medium text-green-800' : 'text-gray-700'}>
//                                     {item}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                             {isCurrentDay && currentMeal === 'breakfast' && (
//                               <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
//                                 ⏰ Being served now!
//                               </div>
//                             )}
//                           </td>

//                           {/* Lunch Column */}
//                           <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'lunch' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
//                             <ul className="space-y-1">
//                               {menu.lunch.map((item, idx) => (
//                                 <li key={idx} className="flex items-start gap-1">
//                                   <span className="text-blue-600 text-xs mt-1">•</span>
//                                   <span className={isCurrentDay && currentMeal === 'lunch' ? 'font-medium text-green-800' : 'text-gray-700'}>
//                                     {item}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                             {isCurrentDay && currentMeal === 'lunch' && (
//                               <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
//                                 ⏰ Being served now!
//                               </div>
//                             )}
//                           </td>

//                           {/* Snacks Column */}
//                           <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'snacks' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
//                             <ul className="space-y-1">
//                               {menu.snacks.map((item, idx) => (
//                                 <li key={idx} className="flex items-start gap-1">
//                                   <span className="text-orange-600 text-xs mt-1">•</span>
//                                   <span className={isCurrentDay && currentMeal === 'snacks' ? 'font-medium text-green-800' : 'text-gray-700'}>
//                                     {item}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                             {isCurrentDay && currentMeal === 'snacks' && (
//                               <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
//                                 ⏰ Being served now!
//                               </div>
//                             )}
//                           </td>

//                           {/* Dinner Column */}
//                           <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'dinner' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
//                             <ul className="space-y-1">
//                               {menu.dinner.map((item, idx) => (
//                                 <li key={idx} className="flex items-start gap-1">
//                                   <span className="text-purple-600 text-xs mt-1">•</span>
//                                   <span className={isCurrentDay && currentMeal === 'dinner' ? 'font-medium text-green-800' : 'text-gray-700'}>
//                                     {item}
//                                   </span>
//                                 </li>
//                               ))}
//                             </ul>
//                             {isCurrentDay && currentMeal === 'dinner' && (
//                               <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
//                                 ⏰ Being served now!
//                               </div>
//                             )}
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Footer with legend */}
//               <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-yellow-100 border border-yellow-400 rounded"></div>
//                   <span>Current Day</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
//                   <span>Current Meal Time</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-green-600">•</span>
//                   <span>Breakfast Items</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-blue-600">•</span>
//                   <span>Lunch Items</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-orange-600">•</span>
//                   <span>Snacks Items</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-purple-600">•</span>
//                   <span>Dinner Items</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Attendance Tab */}
//         {activeTab === 'attendance' && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Attendance Tracking</h2>
              
//               {/* Monthly Analytics */}
//               <div className="mb-8">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Attendance Pattern</h3>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <AreaChart data={monthlyAttendanceData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Area type="monotone" dataKey="breakfast" stackId="1" stroke="#F59E0B" fill="#FEF3C7" />
//                     <Area type="monotone" dataKey="lunch" stackId="1" stroke="#3B82F6" fill="#DBEAFE" />
//                     <Area type="monotone" dataKey="snacks" stackId="1" stroke="#10B981" fill="#D1FAE5" />
//                     <Area type="monotone" dataKey="dinner" stackId="1" stroke="#8B5CF6" fill="#EDE9FE" />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>

//               {/* Current Month Stats */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-orange-50 rounded-lg p-4 text-center">
//                   <div className="text-2xl font-bold text-orange-600">25</div>
//                   <div className="text-sm text-gray-600">Breakfast</div>
//                 </div>
//                 <div className="bg-blue-50 rounded-lg p-4 text-center">
//                   <div className="text-2xl font-bold text-blue-600">28</div>
//                   <div className="text-sm text-gray-600">Lunch</div>
//                 </div>
//                 <div className="bg-green-50 rounded-lg p-4 text-center">
//                   <div className="text-2xl font-bold text-green-600">15</div>
//                   <div className="text-sm text-gray-600">Snacks</div>
//                 </div>
//                 <div className="bg-purple-50 rounded-lg p-4 text-center">
//                   <div className="text-2xl font-bold text-purple-600">27</div>
//                   <div className="text-sm text-gray-600">Dinner</div>
//                 </div>
//               </div>

//               {/* Recent Attendance */}
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Attendance</h3>
//               <div className="space-y-3">
//                 {messAttendance.map((attendance) => (
//                   <div key={attendance.date} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                     <div>
//                       <h4 className="font-medium text-gray-800">
//                         {new Date(attendance.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
//                       </h4>
//                       <p className="text-sm text-gray-600">{attendance.totalMealsConsumed} meals consumed</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <span className={`px-2 py-1 text-xs rounded ${attendance.breakfast ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         B: {attendance.breakfast ? '✓' : '✗'}
//                       </span>
//                       <span className={`px-2 py-1 text-xs rounded ${attendance.lunch ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         L: {attendance.lunch ? '✓' : '✗'}
//                       </span>
//                       <span className={`px-2 py-1 text-xs rounded ${attendance.snacks ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         S: {attendance.snacks ? '✓' : '✗'}
//                       </span>
//                       <span className={`px-2 py-1 text-xs rounded ${attendance.dinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
//                         D: {attendance.dinner ? '✓' : '✗'}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Feedback Tab */}
//         {activeTab === 'feedback' && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Feedback & Ratings</h2>
              
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Overall Rating */}
//                 <div className="text-center">
//                   <div className="text-5xl font-bold text-blue-600 mb-2">4.1</div>
//                   <div className="flex justify-center mb-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star key={star} className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//                     ))}
//                   </div>
//                   <p className="text-gray-700 font-medium">Overall Mess Rating</p>
//                   <p className="text-sm text-gray-600">Based on 1,248 reviews</p>
//                 </div>

//                 {/* Aspect Ratings */}
//                 <div className="space-y-4">
//                   {feedbackSummary.map((item) => (
//                     <div key={item.aspect} className="flex items-center justify-between">
//                       <span className="font-medium text-gray-800 w-20">{item.aspect}</span>
//                       <div className="flex-1 mx-4">
//                         <div className="bg-gray-200 rounded-full h-2">
//                           <div 
//                             className="bg-blue-600 h-2 rounded-full" 
//                             style={{ width: `${(item.rating / 5) * 100}%` }}
//                           ></div>
//                         </div>
//                       </div>
//                       <span className="text-sm font-medium text-gray-600">{item.rating}/5</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit Feedback */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="text-center">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Your Experience</h3>
//                   <p className="text-gray-600 mb-4">Help us improve our mess services with your valuable feedback</p>
//                   <button 
//                     onClick={() => setShowFeedbackModal(true)}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     Give Feedback
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mess Bills Tab */}
//         {activeTab === 'bills' && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Bills & Payments</h2>
              
//               <div className="space-y-4">
//                 {messBills.map((bill) => (
//                   <div key={bill.id} className="border border-gray-200 rounded-lg p-6">
//                     <div className="flex justify-between items-start mb-6">
//                       <div>
//                         <h3 className="font-bold text-xl text-gray-800">{bill.month} {bill.year}</h3>
//                         <p className="text-gray-600">Due Date: {new Date(bill.dueDate).toLocaleDateString('en-IN')}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-gray-900">₹{bill.totalAmount.toLocaleString()}</p>
//                         <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
//                           bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
//                           bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
//                           'bg-red-100 text-red-800'
//                         }`}>
//                           {bill.status}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//                       <div className="text-center p-3 bg-orange-50 rounded-lg">
//                         <div className="text-xl font-bold text-orange-600">{bill.mealsTaken.breakfast}</div>
//                         <div className="text-xs text-gray-600">Breakfast</div>
//                       </div>
//                       <div className="text-center p-3 bg-blue-50 rounded-lg">
//                         <div className="text-xl font-bold text-blue-600">{bill.mealsTaken.lunch}</div>
//                         <div className="text-xs text-gray-600">Lunch</div>
//                       </div>
//                       <div className="text-center p-3 bg-green-50 rounded-lg">
//                         <div className="text-xl font-bold text-green-600">{bill.mealsTaken.snacks}</div>
//                         <div className="text-xs text-gray-600">Snacks</div>
//                       </div>
//                       <div className="text-center p-3 bg-purple-50 rounded-lg">
//                         <div className="text-xl font-bold text-purple-600">{bill.mealsTaken.dinner}</div>
//                         <div className="text-xs text-gray-600">Dinner</div>
//                       </div>
//                     </div>

//                     <div className="flex gap-3">
//                       {/* <button onClick={() => handleDownloadBill(bill.id)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                         <Download className="w-4 h-4 inline mr-2" />
//                         Download Bill
//                       </button>
//                       {bill.status !== 'Paid' && (
//                         <button onClick={() => handlePayBill(bill.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
//                           Pay Now - ₹{bill.balanceAmount.toLocaleString()}
//                         </button> */}
//                            <button
//         onClick={() => onDownloadClick(bill.id)}
//         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         type="button"
//       >
//         <Download className="w-4 h-4 inline mr-2" />
//         Download Bill
//       </button>

//       {bill.status !== "Paid" && (
//         <button
//           onClick={() => onPayClick(bill.id)}
//           className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           type="button"
//         >
//           Pay Now - ₹{bill.balanceAmount.toLocaleString()}
//         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mess Rebate Tab */}
//         {activeTab === 'rebate' && (
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Rebate Application</h2>
              
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
//                 <h3 className="font-semibold text-blue-800 mb-2">📋 Rebate Guidelines</h3>
//                 <ul className="text-sm text-blue-700 space-y-1">
//                   <li>• Apply for rebate at least 2 days before leaving</li>
//                   <li>• Minimum absence period: 3 consecutive days</li>
//                   <li>• Rebate amount will be adjusted in next month's bill</li>
//                   <li>• Medical emergency rebates can be applied retrospectively with medical certificate</li>
//                 </ul>
//               </div>

//               <div className="border border-gray-200 rounded-lg p-6">
//                 <h3 className="font-semibold text-gray-800 mb-4">Apply for Mess Rebate</h3>
                
//                 <form className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
//                       <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
//                       <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Absence</label>
//                     <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
//                       <option>Going Home</option>
//                       <option>Medical Treatment</option>
//                       <option>Academic Tour</option>
//                       <option>Personal Emergency</option>
//                       <option>Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
//                     <textarea 
//                       rows={3} 
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                       placeholder="Provide additional details if necessary..."
//                     ></textarea>
//                   </div>

//                   <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                     Submit Rebate Application
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Feedback Modal */}
//         {showFeedbackModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold text-gray-800">Rate Today's Meal</h3>
//                 <button onClick={() => setShowFeedbackModal(false)}>
//                   <AlertCircle className="w-5 h-5" />
//                 </button>
//               </div>

//               <form className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Which meal are you rating?</label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
//                     <option>Breakfast</option>
//                     <option>Lunch</option>
//                     <option>Snacks</option>
//                     <option>Dinner</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
//                   <div className="flex gap-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <button key={star} type="button" className="p-1">
//                         <Star className="w-6 h-6 text-yellow-400 fill-current hover:scale-110 transition-transform" />
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {['Taste', 'Quality', 'Quantity', 'Hygiene'].map((aspect) => (
//                   <div key={aspect}>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">{aspect}</label>
//                     <div className="flex gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button key={star} type="button" className="p-1">
//                           <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 ))}

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
//                   <textarea 
//                     rows={3} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     placeholder="Share your detailed feedback..."
//                   ></textarea>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Suggestions for improvement</label>
//                   <textarea 
//                     rows={2} 
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                     placeholder="How can we make it better?"
//                   ></textarea>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
//                     Submit Feedback
//                   </button>
//                   <button 
//                     type="button" 
//                     onClick={() => setShowFeedbackModal(false)}
//                     className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }};

// export default MessServicesPage;



import React, { useState } from 'react';
import { 
  Utensils, Calendar, Clock, Star, MessageCircle, 
  Download, AlertCircle, CheckCircle,
  ChefHat
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  CartesianGrid, Legend
} from 'recharts';

interface DayMenu {
  day: string;
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
}

interface MessAttendance {
  date: string;
  breakfast: boolean;
  lunch: boolean;
  snacks: boolean;
  dinner: boolean;
  totalMealsConsumed: number;
}

interface MessBill {
  id: string;
  month: string;
  year: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  mealsTaken: {
    breakfast: number;
    lunch: number;
    snacks: number;
    dinner: number;
  };
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

interface Bill {
  id: string;
  status: string;
  balanceAmount: number;
}

interface BillActionsProps {
  bill: Bill;
  handleDownloadBill: (id: string) => void;
  handlePayBill: (id: string) => void;
}

const BillActions: React.FC<BillActionsProps> = ({ bill, handleDownloadBill, handlePayBill }) => {
  const onDownloadClick = (id: string) => {
    handleDownloadBill(id);
  };

  const onPayClick = (id: string) => {
    handlePayBill(id);
  };

  const getMealTiming = (meal: string) => {
    switch(meal) {
      case 'breakfast': return '7:30 AM - 9:30 AM';
      case 'lunch': return '12:00 PM - 2:30 PM';
      case 'snacks': return '4:00 PM - 6:00 PM';
      case 'dinner': return '7:30 PM - 9:30 PM';
      default: return '';
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Component only renders buttons, actual UI handled in main component */}
        <button
          onClick={() => onDownloadClick(bill.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          type="button"
        >
          <Download className="w-4 h-4 inline mr-2" />
          Download Bill
        </button>

        {bill.status !== "Paid" && (
          <button
            onClick={() => onPayClick(bill.id)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            type="button"
          >
            Pay Now - ₹{bill.balanceAmount.toLocaleString()}
          </button>
        )}
      </div>
    </div>
  );
};

export const MessServicesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'menu' | 'attendance' | 'feedback' | 'bills' | 'rebate'>('menu');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Current student info
  const currentStudent = {
    name: 'Arjun Kumar',
    rollNumber: 'CS2023001',
    messCardNumber: 'MC2023001',
    messType: 'Full Mess',
    dietaryPreference: 'Vegetarian'
  };

  // Weekly menu data
  const weeklyMenu: DayMenu[] = [
    {
      day: 'Monday',
      breakfast: ['Idli (4 pcs)', 'Sambar', 'Coconut Chutney', 'Filter Coffee'],
      lunch: ['Rice', 'Sambar', 'Cabbage Curry', 'Potato Fry', 'Curd', 'Pickle'],
      snacks: ['Masala Tea', 'Vada (2 pcs)', 'Banana'],
      dinner: ['Chapati (3 pcs)', 'Dal Tadka', 'Mixed Veg Curry', 'Jeera Rice']
    },
    {
      day: 'Tuesday',
      breakfast: ['Masala Dosa', 'Sambar', 'Tomato Chutney', 'Tea'],
      lunch: ['Vegetable Biryani', 'Raita', 'Papad', 'Pickle', 'Sweet'],
      snacks: ['Filter Coffee', 'Bonda (3 pcs)', 'Chutney'],
      dinner: ['Rice', 'Rasam', 'Beans Curry', 'Chapati (2 pcs)', 'Curd']
    },
    {
      day: 'Wednesday',
      breakfast: ['Upma', 'Coconut Chutney', 'Sambar', 'Masala Tea'],
      lunch: ['Lemon Rice', 'Chickpea Curry', 'Vegetable Salad', 'Buttermilk'],
      snacks: ['Tea', 'Samosa (2 pcs)', 'Green Chutney'],
      dinner: ['Chapati (3 pcs)', 'Paneer Butter Masala', 'Dal', 'Rice']
    },
    {
      day: 'Thursday',
      breakfast: ['Ven Pongal', 'Sambar', 'Ginger Chutney', 'Coffee'],
      lunch: ['Curd Rice', 'Vegetable Curry', 'Rasam', 'Pickle', 'Papad'],
      snacks: ['Masala Tea', 'Pakoda', 'Sauce'],
      dinner: ['Rice', 'Tomato Dal', 'Okra Curry', 'Chapati (2 pcs)']
    },
    {
      day: 'Friday',
      breakfast: ['Poha', 'Banana', 'Tea', 'Boiled Eggs (Non-Veg)'],
      lunch: ['Fried Rice', 'Gobi Manchurian', 'Sweet Corn Soup', 'Pickle'],
      snacks: ['Coffee', 'Bread Pakoda (2 pcs)', 'Chutney'],
      dinner: ['Chapati (3 pcs)', 'Rajma Curry', 'Rice', 'Salad']
    },
    {
      day: 'Saturday',
      breakfast: ['Medu Vada (3 pcs)', 'Sambar', 'Coconut Chutney', 'Filter Coffee'],
      lunch: ['Special Thali: Rice, Dal, 2 Curries, Curd, Pickle, Sweet', 'Papad'],
      snacks: ['Tea', 'Cake Slice', 'Mixture'],
      dinner: ['Rice', 'Sambar', 'Cabbage Stir-fry', 'Chapati (2 pcs)', 'Curd']
    },
    {
      day: 'Sunday',
      breakfast: ['Chapati (2 pcs)', 'Curd', 'Pickle', 'Aloo Curry', 'Tea'],
      lunch: ['Chicken Biryani (Non-Veg)', 'Veg Biryani', 'Raita', 'Boiled Egg', 'Sweet'],
      snacks: ['Filter Coffee', 'Mysore Pak', 'Banana'],
      dinner: ['Rice', 'Dal Fry', 'Mixed Vegetable Curry', 'Chapati (2 pcs)']
    }
  ];

  // Sample Attendance Data
  const messAttendance: MessAttendance[] = [
    { date: '2025-09-01', breakfast: true, lunch: true, snacks: false, dinner: true, totalMealsConsumed: 3 },
    { date: '2025-09-02', breakfast: true, lunch: true, snacks: true, dinner: true, totalMealsConsumed: 4 },
    { date: '2025-09-03', breakfast: false, lunch: true, snacks: false, dinner: true, totalMealsConsumed: 2 }
  ];

  // Sample Bill Data
  const messBills: MessBill[] = [
    {
      id: 'MB001',
      month: 'September',
      year: 2025,
      totalAmount: 3500,
      paidAmount: 3500,
      balanceAmount: 0,
      mealsTaken: { breakfast: 25, lunch: 28, snacks: 15, dinner: 27 },
      dueDate: '2025-10-05',
      status: 'Paid'
    },
    {
      id: 'MB002',
      month: 'October',
      year: 2025,
      totalAmount: 3200,
      paidAmount: 0,
      balanceAmount: 3200,
      mealsTaken: { breakfast: 0, lunch: 0, snacks: 0, dinner: 0 },
      dueDate: '2025-11-05',
      status: 'Pending'
    }
  ];

  // Monthly attendance analytics
  const monthlyAttendanceData = [
    { month: 'Jan', breakfast: 22, lunch: 28, snacks: 12, dinner: 26, total: 88 },
    { month: 'Feb', breakfast: 20, lunch: 26, snacks: 10, dinner: 24, total: 80 },
    { month: 'Mar', breakfast: 18, lunch: 24, snacks: 8, dinner: 22, total: 72 },
    { month: 'Apr', breakfast: 25, lunch: 28, snacks: 15, dinner: 27, total: 95 },
    { month: 'May', breakfast: 15, lunch: 18, snacks: 5, dinner: 16, total: 54 },
    { month: 'Jun', breakfast: 28, lunch: 30, snacks: 18, dinner: 29, total: 105 },
    { month: 'Jul', breakfast: 26, lunch: 29, snacks: 16, dinner: 28, total: 99 },
    { month: 'Aug', breakfast: 25, lunch: 28, snacks: 15, dinner: 27, total: 95 }
  ];

  const feedbackSummary = [
    { aspect: 'Taste', rating: 4.2, reviews: 156 },
    { aspect: 'Quality', rating: 4.0, reviews: 142 },
    { aspect: 'Quantity', rating: 4.5, reviews: 138 },
    { aspect: 'Hygiene', rating: 4.3, reviews: 161 },
    { aspect: 'Service', rating: 3.8, reviews: 134 },
    { aspect: 'Variety', rating: 3.9, reviews: 128 }
  ];

  // Get current day and meal timing
  const getCurrentDayAndMeal = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[now.getDay()];
    const hour = now.getHours();

    let currentMeal = '';
    if (hour >= 7 && hour < 10) currentMeal = 'breakfast';
    else if (hour >= 12 && hour < 15) currentMeal = 'lunch';
    else if (hour >= 16 && hour < 18) currentMeal = 'snacks';
    else if (hour >= 19 && hour < 22) currentMeal = 'dinner';

    return { currentDay, currentMeal, hour };
  };

  const { currentDay, currentMeal } = getCurrentDayAndMeal();
  const currentTime = new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  // Handlers for bill actions
  const handleDownloadBill = (id: string) => {
    alert(`Download bill clicked for id: ${id}`);
  };

  const handlePayBill = (id: string) => {
    alert(`Pay bill clicked for id: ${id}`);
  };

  // Helper function for meal timing display
  const getMealTiming = (meal: string) => {
    switch(meal) {
      case 'breakfast': return '7:30 AM - 9:30 AM';
      case 'lunch': return '12:00 PM - 2:30 PM';
      case 'snacks': return '4:00 PM - 6:00 PM';
      case 'dinner': return '7:30 PM - 9:30 PM';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Student Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Utensils className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{currentStudent.name}</h3>
                <p className="text-sm text-gray-600">Mess Card: {currentStudent.messCardNumber} • {currentStudent.messType}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Diet Preference</p>
              <p className="font-medium text-green-600">{currentStudent.dietaryPreference}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <nav className="-mb-px flex gap-1">
            {[
              { key: 'menu', label: 'Weekly Menu', icon: Utensils },
              { key: 'attendance', label: 'My Attendance', icon: CheckCircle },
              { key: 'feedback', label: 'Feedback', icon: MessageCircle },
              { key: 'bills', label: 'Mess Bills', icon: Download },
              { key: 'rebate', label: 'Mess Rebate', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setActiveTab(tab.key as any)}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Weekly Menu Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Header with current status */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-8 h-8 text-blue-600" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">Weekly Mess Menu</h2>
                      <p className="text-gray-600">Complete meal schedule for the week</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 text-lg font-semibold text-blue-600 mb-1">
                      <Calendar className="w-5 h-5" />
                      {currentDay}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {currentTime}
                    </div>
                  </div>
                </div>

                {/* Current meal status */}
                {currentMeal && (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-800">
                        {currentMeal.charAt(0).toUpperCase() + currentMeal.slice(1)} is being served now! 
                      </span>
                      <span className="text-green-700">
                        ({getMealTiming(currentMeal)})
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Weekly Menu Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-300 px-3 py-4 text-left font-semibold">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Day
                        </div>
                      </th>
                      <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[200px]">
                        <div className="text-center">
                          🌅 Breakfast
                          <div className="text-xs font-normal opacity-90">7:30 AM - 9:30 AM</div>
                        </div>
                      </th>
                      <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[200px]">
                        <div className="text-center">
                          🍽️ Lunch
                          <div className="text-xs font-normal opacity-90">12:00 PM - 2:30 PM</div>
                        </div>
                      </th>
                      <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[180px]">
                        <div className="text-center">
                          ☕ Snacks
                          <div className="text-xs font-normal opacity-90">4:00 PM - 6:00 PM</div>
                        </div>
                      </th>
                      <th className="border border-gray-300 px-3 py-4 text-left font-semibold min-w-[200px]">
                        <div className="text-center">
                          🌙 Dinner
                          <div className="text-xs font-normal opacity-90">7:30 PM - 9:30 PM</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyMenu.map((menu, index) => {
                      const isCurrentDay = menu.day === currentDay;

                      return (
                        <tr 
                          key={menu.day} 
                          className={`${isCurrentDay ? 'bg-yellow-50 border-l-4 border-l-yellow-400' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                        >
                          {/* Day Column */}
                          <td className={`border border-gray-300 px-3 py-4 font-semibold ${isCurrentDay ? 'text-yellow-800 bg-yellow-100' : 'text-gray-700'}`}>
                            <div className="flex items-center gap-2">
                              {isCurrentDay && <Star className="w-4 h-4 text-yellow-600" />}
                              {menu.day}
                              {isCurrentDay && <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Today</span>}
                            </div>
                          </td>

                          {/* Breakfast Column */}
                          <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'breakfast' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
                            <ul className="space-y-1">
                              {menu.breakfast.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-green-600 text-xs mt-1">•</span>
                                  <span className={isCurrentDay && currentMeal === 'breakfast' ? 'font-medium text-green-800' : 'text-gray-700'}>
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {isCurrentDay && currentMeal === 'breakfast' && (
                              <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
                                ⏰ Being served now!
                              </div>
                            )}
                          </td>

                          {/* Lunch Column */}
                          <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'lunch' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
                            <ul className="space-y-1">
                              {menu.lunch.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-blue-600 text-xs mt-1">•</span>
                                  <span className={isCurrentDay && currentMeal === 'lunch' ? 'font-medium text-green-800' : 'text-gray-700'}>
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {isCurrentDay && currentMeal === 'lunch' && (
                              <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
                                ⏰ Being served now!
                              </div>
                            )}
                          </td>

                          {/* Snacks Column */}
                          <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'snacks' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
                            <ul className="space-y-1">
                              {menu.snacks.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-orange-600 text-xs mt-1">•</span>
                                  <span className={isCurrentDay && currentMeal === 'snacks' ? 'font-medium text-green-800' : 'text-gray-700'}>
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {isCurrentDay && currentMeal === 'snacks' && (
                              <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
                                ⏰ Being served now!
                              </div>
                            )}
                          </td>

                          {/* Dinner Column */}
                          <td className={`border border-gray-300 px-3 py-4 ${isCurrentDay && currentMeal === 'dinner' ? 'bg-green-100 border-2 border-green-400' : ''}`}>
                            <ul className="space-y-1">
                              {menu.dinner.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                  <span className="text-purple-600 text-xs mt-1">•</span>
                                  <span className={isCurrentDay && currentMeal === 'dinner' ? 'font-medium text-green-800' : 'text-gray-700'}>
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            {isCurrentDay && currentMeal === 'dinner' && (
                              <div className="mt-2 text-xs text-green-700 font-medium bg-green-200 px-2 py-1 rounded">
                                ⏰ Being served now!
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer with legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-100 border border-yellow-400 rounded"></div>
                  <span>Current Day</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
                  <span>Current Meal Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">•</span>
                  <span>Breakfast Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Lunch Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-600">•</span>
                  <span>Snacks Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">•</span>
                  <span>Dinner Items</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Attendance Tracking</h2>
              
              {/* Monthly Analytics */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Attendance Pattern</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyAttendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="breakfast" stackId="1" stroke="#F59E0B" fill="#FEF3C7" />
                    <Area type="monotone" dataKey="lunch" stackId="1" stroke="#3B82F6" fill="#DBEAFE" />
                    <Area type="monotone" dataKey="snacks" stackId="1" stroke="#10B981" fill="#D1FAE5" />
                    <Area type="monotone" dataKey="dinner" stackId="1" stroke="#8B5CF6" fill="#EDE9FE" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Current Month Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">25</div>
                  <div className="text-sm text-gray-600">Breakfast</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">28</div>
                  <div className="text-sm text-gray-600">Lunch</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">15</div>
                  <div className="text-sm text-gray-600">Snacks</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">27</div>
                  <div className="text-sm text-gray-600">Dinner</div>
                </div>
              </div>

              {/* Recent Attendance */}
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Attendance</h3>
              <div className="space-y-3">
                {messAttendance.map((attendance) => (
                  <div key={attendance.date} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {new Date(attendance.date).toLocaleDateString('en-IN', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </h4>
                      <p className="text-sm text-gray-600">{attendance.totalMealsConsumed} meals consumed</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded ${attendance.breakfast ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        B: {attendance.breakfast ? '✓' : '✗'}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${attendance.lunch ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        L: {attendance.lunch ? '✓' : '✗'}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${attendance.snacks ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        S: {attendance.snacks ? '✓' : '✗'}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded ${attendance.dinner ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        D: {attendance.dinner ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === 'feedback' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Feedback & Ratings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Overall Rating */}
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-600 mb-2">4.1</div>
                  <div className="flex justify-center mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`w-6 h-6 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-700 font-medium">Overall Mess Rating</p>
                  <p className="text-sm text-gray-600">Based on 1,248 reviews</p>
                </div>

                {/* Aspect Ratings */}
                <div className="space-y-4">
                  {feedbackSummary.map((item) => (
                    <div key={item.aspect} className="flex items-center justify-between">
                      <span className="font-medium text-gray-800 w-20">{item.aspect}</span>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(item.rating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{item.rating}/5</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Feedback */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Your Experience</h3>
                  <p className="text-gray-600 mb-4">Help us improve our mess services with your valuable feedback</p>
                  <button 
                    onClick={() => setShowFeedbackModal(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Give Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mess Bills Tab */}
        {activeTab === 'bills' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Bills & Payments</h2>
              
              <div className="space-y-4">
                {messBills.map((bill) => (
                  <div key={bill.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">{bill.month} {bill.year}</h3>
                        <p className="text-gray-600">Due Date: {new Date(bill.dueDate).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">₹{bill.totalAmount.toLocaleString()}</p>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                          bill.status === 'Paid' ? 'bg-green-100 text-green-800' :
                          bill.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {bill.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-xl font-bold text-orange-600">{bill.mealsTaken.breakfast}</div>
                        <div className="text-xs text-gray-600">Breakfast</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-xl font-bold text-blue-600">{bill.mealsTaken.lunch}</div>
                        <div className="text-xs text-gray-600">Lunch</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">{bill.mealsTaken.snacks}</div>
                        <div className="text-xs text-gray-600">Snacks</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-xl font-bold text-purple-600">{bill.mealsTaken.dinner}</div>
                        <div className="text-xs text-gray-600">Dinner</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleDownloadBill(bill.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        type="button"
                      >
                        <Download className="w-4 h-4 inline mr-2" />
                        Download Bill
                      </button>

                      {bill.status !== 'Paid' && (
                        <button
                          onClick={() => handlePayBill(bill.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          type="button"
                        >
                          Pay Now - ₹{bill.balanceAmount.toLocaleString()}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mess Rebate Tab */}
        {activeTab === 'rebate' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Mess Rebate Application</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">📋 Rebate Guidelines</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Apply for rebate at least 2 days before leaving</li>
                  <li>• Minimum absence period: 3 consecutive days</li>
                  <li>• Rebate amount will be adjusted in next month's bill</li>
                  <li>• Medical emergency rebates can be applied retrospectively with medical certificate</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Apply for Mess Rebate</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Absence</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Going Home</option>
                      <option>Medical Treatment</option>
                      <option>Academic Tour</option>
                      <option>Personal Emergency</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                    <textarea 
                      rows={3} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      placeholder="Provide additional details if necessary..."
                    ></textarea>
                  </div>

                  <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Submit Rebate Application
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Rate Today's Meal</h3>
                <button onClick={() => setShowFeedbackModal(false)}>
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Which meal are you rating?</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Snacks</option>
                    <option>Dinner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overall Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" className="p-1">
                        <Star className="w-6 h-6 text-yellow-400 fill-current hover:scale-110 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>

                {['Taste', 'Quality', 'Quantity', 'Hygiene'].map((aspect) => (
                  <div key={aspect}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{aspect}</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button" className="p-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                  <textarea 
                    rows={3} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Share your detailed feedback..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Suggestions for improvement</label>
                  <textarea 
                    rows={2} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="How can we make it better?"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                    Submit Feedback
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MessServicesPage;
