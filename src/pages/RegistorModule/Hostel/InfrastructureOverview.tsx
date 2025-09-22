import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Home, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Calendar,
  IndianRupee,
  Activity,
  Wrench,
  BedDouble,
  Eye
} from 'lucide-react';

const InfrastructureOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Extended sample data for different time periods
  const allMaintenanceCosts = [
    // Current year data
    { month: 'Jan', cost: 142000, year: 2024, period: '1year' },
    { month: 'Feb', cost: 156000, year: 2024, period: '1year' },
    { month: 'Mar', cost: 134000, year: 2024, period: '1year' },
    { month: 'Apr', cost: 125000, year: 2024, period: '6months' },
    { month: 'May', cost: 98000, year: 2024, period: '6months' },
    { month: 'Jun', cost: 145000, year: 2024, period: '6months' },
    { month: 'Jul', cost: 178000, year: 2024, period: '3months' },
    { month: 'Aug', cost: 134000, year: 2024, period: '3months' },
    { month: 'Sep', cost: 156000, year: 2024, period: '3months' }
  ];

  const allOccupancyData = {
    '3months': {
      overall: 85.2,
      blocks: [
        { block: 'Block A - Boys', occupancy: 91.5, total: 120, occupied: 110 },
        { block: 'Block B - Girls', occupancy: 89.2, total: 90, occupied: 80 },
        { block: 'Block C - Mixed', occupancy: 0, total: 150, occupied: 0 },
        { block: 'Block D - PG', occupancy: 94.1, total: 80, occupied: 75 },
        { block: 'Block E - Faculty', occupancy: 78.5, total: 40, occupied: 31 }
      ],
      roomStatus: [
        { status: 'Occupied', count: 296, percentage: 60.7, color: '#10b981' },
        { status: 'Vacant', count: 144, percentage: 29.5, color: '#f59e0b' },
        { status: 'Under Maintenance', count: 32, percentage: 6.6, color: '#ef4444' },
        { status: 'Reserved', count: 16, percentage: 3.3, color: '#8b5cf6' }
      ]
    },
    '6months': {
      overall: 82.5,
      blocks: [
        { block: 'Block A - Boys', occupancy: 89.2, total: 120, occupied: 107 },
        { block: 'Block B - Girls', occupancy: 86.7, total: 90, occupied: 78 },
        { block: 'Block C - Mixed', occupancy: 0, total: 150, occupied: 0 },
        { block: 'Block D - PG', occupancy: 91.3, total: 80, occupied: 73 },
        { block: 'Block E - Faculty', occupancy: 75.0, total: 40, occupied: 30 }
      ],
      roomStatus: [
        { status: 'Occupied', count: 288, percentage: 59.0, color: '#10b981' },
        { status: 'Vacant', count: 152, percentage: 31.1, color: '#f59e0b' },
        { status: 'Under Maintenance', count: 40, percentage: 8.2, color: '#ef4444' },
        { status: 'Reserved', count: 8, percentage: 1.6, color: '#8b5cf6' }
      ]
    },
    '1year': {
      overall: 79.8,
      blocks: [
        { block: 'Block A - Boys', occupancy: 86.7, total: 120, occupied: 104 },
        { block: 'Block B - Girls', occupancy: 84.4, total: 90, occupied: 76 },
        { block: 'Block C - Mixed', occupancy: 0, total: 150, occupied: 0 },
        { block: 'Block D - PG', occupancy: 88.8, total: 80, occupied: 71 },
        { block: 'Block E - Faculty', occupancy: 72.5, total: 40, occupied: 29 }
      ],
      roomStatus: [
        { status: 'Occupied', count: 280, percentage: 57.4, color: '#10b981' },
        { status: 'Vacant', count: 158, percentage: 32.4, color: '#f59e0b' },
        { status: 'Under Maintenance', count: 42, percentage: 8.6, color: '#ef4444' },
        { status: 'Reserved', count: 8, percentage: 1.6, color: '#8b5cf6' }
      ]
    }
  };

  // Filter data based on selected period
  const filteredData = useMemo(() => {
    let maintenanceCosts;
    let periodData;
    
    switch (selectedPeriod) {
      case '3months':
        maintenanceCosts = allMaintenanceCosts.filter(item => item.period === '3months');
        periodData = allOccupancyData['3months'];
        break;
      case '6months':
        maintenanceCosts = allMaintenanceCosts.filter(item => 
          item.period === '3months' || item.period === '6months'
        );
        periodData = allOccupancyData['6months'];
        break;
      case '1year':
        maintenanceCosts = allMaintenanceCosts;
        periodData = allOccupancyData['1year'];
        break;
      default:
        maintenanceCosts = allMaintenanceCosts.filter(item => item.period === '6months');
        periodData = allOccupancyData['6months'];
    }

    return {
      maintenanceCosts,
      overallOccupancy: periodData.overall,
      blockOccupancy: periodData.blocks,
      roomStatusData: periodData.roomStatus
    };
  }, [selectedPeriod]);

  const { maintenanceCosts, overallOccupancy, blockOccupancy, roomStatusData } = filteredData;

  const totalRooms = roomStatusData?.reduce((sum, item) => sum + item.count, 0) || 0;
  const avgMaintenance = maintenanceCosts?.length > 0 
    ? maintenanceCosts.reduce((sum, item) => sum + item.cost, 0) / maintenanceCosts.length 
    : 0;

  // Calculate trends based on period
  const getTrend = (period) => {
    switch (period) {
      case '3months':
        return { occupancy: 3.2, maintenance: -12.1 };
      case '6months':
        return { occupancy: 2.3, maintenance: -8.5 };
      case '1year':
        return { occupancy: -1.8, maintenance: 4.2 };
      default:
        return { occupancy: 2.3, maintenance: -8.5 };
    }
  };

  const trends = getTrend(selectedPeriod);

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue', trend = null }) => {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
            <p className={`text-3xl font-bold mt-2 text-${color}-600 dark:text-${color}-400`}>
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className={`w-4 h-4 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-sm ${trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-${color}-100 dark:bg-${color}-900/30`}>
            <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
          </div>
        </div>
      </div>
    );
  };

  const OccupancyBar = ({ block, occupancy, total, occupied }) => {
    const getBarColor = (occupancy) => {
      if (occupancy >= 85) return 'bg-green-500';
      if (occupancy >= 70) return 'bg-yellow-500';
      if (occupancy >= 50) return 'bg-orange-500';
      return 'bg-red-500';
    };

    return (
      <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-slate-900 dark:text-white text-sm">{block}</h4>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {occupancy}%
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3 mb-2">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${getBarColor(occupancy)}`}
            style={{ width: `${occupancy}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {occupied}/{total} rooms occupied
        </p>
      </div>
    );
  };

  const PieChartComponent = ({ data = [], size = 200 }) => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500 dark:text-slate-400">No data available</p>
        </div>
      );
    }

    const total = data.reduce((sum, item) => sum + (item?.count || 0), 0);
    if (total === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-slate-500 dark:text-slate-400">No data to display</p>
        </div>
      );
    }

    let currentAngle = 0;
    
    const paths = data.map((item, index) => {
      const percentage = (item.count / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      currentAngle += angle;
      
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      
      const x1 = size/2 + (size/2 - 10) * Math.cos(startAngleRad);
      const y1 = size/2 + (size/2 - 10) * Math.sin(startAngleRad);
      const x2 = size/2 + (size/2 - 10) * Math.cos(endAngleRad);
      const y2 = size/2 + (size/2 - 10) * Math.sin(endAngleRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${size/2} ${size/2}`,
        `L ${x1} ${y1}`,
        `A ${size/2 - 10} ${size/2 - 10} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      return (
        <path
          key={index}
          d={pathData}
          fill={item.color}
          className="hover:opacity-80 transition-opacity cursor-pointer"
        />
      );
    });

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="mb-4">
          {paths}
        </svg>
        <div className="space-y-2 w-full">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-slate-700 dark:text-slate-300">{item.status}</span>
              </div>
              <span className="font-medium text-slate-900 dark:text-white">
                {item.count} ({item.percentage}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LineChart = ({ data = [], height = 200 }) => {
    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center" style={{ height: height + 60 }}>
          <p className="text-slate-500 dark:text-slate-400">No data available</p>
        </div>
      );
    }

    const costs = data.map(d => d?.cost || 0).filter(cost => cost > 0);
    if (costs.length === 0) {
      return (
        <div className="flex items-center justify-center" style={{ height: height + 60 }}>
          <p className="text-slate-500 dark:text-slate-400">No cost data to display</p>
        </div>
      );
    }

    const maxCost = Math.max(...costs);
    const minCost = Math.min(...costs);
    const range = maxCost - minCost || 1;
    
    const points = data.map((item, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 300;
      const cost = item?.cost || 0;
      const y = height - ((cost - minCost) / range) * (height - 40);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="w-full">
        <svg width="100%" height={height + 60} viewBox="0 0 300 260" className="overflow-visible">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="0"
              y1={20 + i * (height - 40) / 4}
              x2="300"
              y2={20 + i * (height - 40) / 4}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-slate-300 dark:text-slate-600"
            />
          ))}
          
          {/* Line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points={points}
            className="drop-shadow-sm"
          />
          
          {/* Points */}
          {data.map((item, index) => {
            const x = (index / Math.max(data.length - 1, 1)) * 300;
            const cost = item?.cost || 0;
            const y = height - ((cost - minCost) / range) * (height - 40);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all cursor-pointer"
              />
            );
          })}
          
          {/* X-axis labels */}
          {data.map((item, index) => {
            const x = (index / Math.max(data.length - 1, 1)) * 300;
            return (
              <text
                key={index}
                x={x}
                y={height + 20}
                textAnchor="middle"
                className="text-xs fill-slate-600 dark:fill-slate-400"
              >
                {item?.month || ''}
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  // Get period display text
  const getPeriodText = () => {
    switch (selectedPeriod) {
      case '3months': return 'Last 3 Months';
      case '6months': return 'Last 6 Months';
      case '1year': return 'Last Year';
      default: return 'Last 6 Months';
    }
  };

  // Get best performing block for the selected period
  const getBestPerformingBlock = () => {
    const sortedBlocks = [...blockOccupancy].sort((a, b) => b.occupancy - a.occupancy);
    return sortedBlocks[0];
  };

  const bestBlock = getBestPerformingBlock();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Infrastructure Overview</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Monitor asset utilization, occupancy rates, and maintenance costs - {getPeriodText()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Overall Occupancy Rate"
            value={`${overallOccupancy}%`}
            subtitle={`${roomStatusData[0].count} of ${totalRooms} rooms occupied`}
            icon={Building2}
            color="blue"
            trend={trends.occupancy}
          />
          <StatCard
            title="Total Rooms"
            value={totalRooms}
            subtitle="Across all hostel blocks"
            icon={Home}
            color="green"
          />
          <StatCard
            title="Active Students"
            value={roomStatusData[0].count}
            subtitle="Currently residing"
            icon={Users}
            color="purple"
          />
          <StatCard
            title="Avg Monthly Maintenance"
            value={`₹${(avgMaintenance / 1000).toFixed(0)}K`}
            subtitle={`${getPeriodText()} average`}
            icon={Wrench}
            color="orange"
            trend={trends.maintenance}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Block Occupancy Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Block-wise Occupancy</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">({getPeriodText()})</span>
            </div>
            <div className="space-y-4">
              {blockOccupancy.map((block, index) => (
                <OccupancyBar
                  key={index}
                  block={block.block}
                  occupancy={block.occupancy}
                  total={block.total}
                  occupied={block.occupied}
                />
              ))}
            </div>
          </div>

          {/* Room Status Pie Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Room Status Distribution</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">({getPeriodText()})</span>
            </div>
            <div className="flex justify-center">
              <PieChartComponent data={roomStatusData} size={250} />
            </div>
          </div>
        </div>

        {/* Maintenance Costs Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Maintenance Costs</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">({getPeriodText()})</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Maintenance Expenses</span>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ₹{maintenanceCosts?.length > 0 ? (maintenanceCosts.reduce((sum, item) => sum + (item?.cost || 0), 0) / 100000).toFixed(1) : '0'}L
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Spent</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ₹{(avgMaintenance / 1000).toFixed(0)}K
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Monthly Average</p>
              </div>
              <div className="hidden md:block">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ₹{maintenanceCosts?.length > 0 ? (Math.max(...maintenanceCosts.map(d => d?.cost || 0)) / 1000).toFixed(0) : '0'}K
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Highest Month</p>
              </div>
            </div>
          </div>

          <div className="h-64">
            <LineChart data={maintenanceCosts} height={200} />
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Infrastructure Health */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-6">
              <BedDouble className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Infrastructure Health</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">({getPeriodText()})</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="text-green-800 dark:text-green-200 font-medium">Operational Rooms</span>
                <span className="text-green-900 dark:text-green-100 font-bold">
                  {(roomStatusData?.[0]?.count || 0) + (roomStatusData?.[1]?.count || 0)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <span className="text-yellow-800 dark:text-yellow-200 font-medium">Maintenance Required</span>
                <span className="text-yellow-900 dark:text-yellow-100 font-bold">{roomStatusData?.[2]?.count || 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-blue-800 dark:text-blue-200 font-medium">Reserved/Blocked</span>
                <span className="text-blue-900 dark:text-blue-100 font-bold">{roomStatusData?.[3]?.count || 0}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden p-6">
            <div className="flex items-center gap-2 mb-6">
              <Eye className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quick Insights</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">({getPeriodText()})</span>
            </div>
            <div className="space-y-4">
              <div className="p-3 border-l-4 border-green-500 bg-slate-50 dark:bg-slate-700/50">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Best Performing Block</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {bestBlock?.block} ({bestBlock?.occupancy}% occupancy)
                </p>
              </div>
              <div className="p-3 border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-700/50">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Capacity Utilization</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Overall {overallOccupancy}% - {overallOccupancy >= 80 ? 'Good' : overallOccupancy >= 60 ? 'Moderate' : 'Low'} utilization rate
                </p>
              </div>
              <div className="p-3 border-l-4 border-orange-500 bg-slate-50 dark:bg-slate-700/50">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Maintenance Trend</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {trends.maintenance > 0 ? `${trends.maintenance}% increase` : `${Math.abs(trends.maintenance)}% reduction`} in costs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureOverview;
