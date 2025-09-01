


import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { 
    name: 'Computer Science', 
    value: 3250, 
    color: '#3B82F6',
    books: [
      'Clean Code by Robert C. Martin',
      'Design Patterns by Gang of Four',
      'Introduction to Algorithms by Cormen',
      'The Pragmatic Programmer by Hunt & Thomas',
      'Computer Networks by Tanenbaum',
      'Operating System Concepts by Silberschatz',
      'Database System Concepts by Korth',
      'Artificial Intelligence: A Modern Approach by Russell'
    ]
  },
  { 
    name: 'Engineering', 
    value: 2890, 
    color: '#10B981',
    books: [
      'Engineering Mechanics by Beer & Johnston',
      'Thermodynamics by Cengel & Boles',
      'Fluid Mechanics by White',
      'Materials Science by Callister',
      'Control Systems Engineering by Nise',
      'Digital Signal Processing by Proakis',
      'Engineering Ethics by Martin & Schinzinger'
    ]
  },
  { 
    name: 'Science', 
    value: 1980, 
    color: '#EF4444',
    books: [
      'Physics for Scientists by Serway',
      'General Chemistry by Petrucci',
      'Biology by Campbell & Reece',
      'Earth Science by Tarbuck',
      'Organic Chemistry by Wade',
      'Molecular Biology by Watson',
      'Environmental Science by Miller'
    ]
  },
  { 
    name: 'Others', 
    value: 1570, 
    color: '#6B7280',
    books: [
      'The Art of War by Sun Tzu',
      'Psychology by Myers',
      'Economics by Mankiw',
      'History of the World by Roberts',
      'Philosophy by Russell',
      'Sociology by Giddens'
    ]
  },
  { 
    name: 'Mathematics', 
    value: 1560, 
    color: '#F59E0B',
    books: [
      'Calculus by Stewart',
      'Linear Algebra by Strang',
      'Discrete Mathematics by Rosen',
      'Real Analysis by Rudin',
      'Abstract Algebra by Hungerford',
      'Probability and Statistics by Ross',
      'Numerical Methods by Burden'
    ]
  },
  { 
    name: 'Literature', 
    value: 1200, 
    color: '#8B5CF6',
    books: [
      'Pride and Prejudice by Jane Austen',
      'To Kill a Mockingbird by Harper Lee',
      '1984 by George Orwell',
      'The Great Gatsby by F. Scott Fitzgerald',
      'Hamlet by William Shakespeare',
      'One Hundred Years of Solitude by García Márquez'
    ]
  }
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name, value
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#374151" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="14"
      fontWeight="500"
    >
      {`${name}: ${value}`}
    </text>
  );
};

const BookList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handlePieClick = (data: any, index: number) => {
    setSelectedCategory(selectedCategory === data.name ? null : data.name);
  };

  const selectedCategoryData = data.find(item => item.name === selectedCategory);

  return (
    <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Collection by Category
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pie Chart Section */}
        <div className="lg:w-1/2">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={handlePieClick}
                  className="cursor-pointer"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke={selectedCategory === entry.name ? '#000' : 'none'}
                      strokeWidth={selectedCategory === entry.name ? 2 : 0}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            Click on a slice to view books in that category
          </p>
        </div>

        {/* Book List Section */}
        <div className="lg:w-1/2">
          {selectedCategory ? (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span 
                  className="w-4 h-4 rounded-full mr-2" 
                  style={{ backgroundColor: selectedCategoryData?.color }}
                ></span>
                {selectedCategory} Books ({selectedCategoryData?.value})
              </h3>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {selectedCategoryData?.books.map((book, index) => (
                  <div 
                    key={index}
                    className="bg-white p-3 rounded border-l-4 shadow-sm hover:shadow-md transition-shadow"
                    style={{ borderLeftColor: selectedCategoryData.color }}
                  >
                    <p className="text-gray-800">{book}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-500 text-lg">Select a category to view its book collection</p>
              <div className="mt-4 space-y-2">
                {data.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className="block w-full text-left p-2 rounded hover:bg-gray-200 transition-colors"
                  >
                    <span 
                      className="w-3 h-3 rounded-full inline-block mr-2" 
                      style={{ backgroundColor: category.color }}
                    ></span>
                    {category.name} ({category.value} books)
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;