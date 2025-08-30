import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Calendar, FileText, Presentation as PresentationChart, Clock, Award, MessageSquare, Inbox, Bell, CalendarCheck } from 'lucide-react';

interface GenericListPageProps {
  title: string;
  description: string;
  addPath: string;
}

const getIconForTitle = (title: string) => {
  switch (title.toLowerCase()) {
    case 'holiday list':
      return Calendar;
    case 'holiday calendar':
      return CalendarCheck;
    case 'topics':
      return FileText;
    case 'lessons':
      return PresentationChart;
    case 'academic year':
      return Clock;
    case 'affiliation':
      return Award;
    case 'my calendar':
      return CalendarCheck;
    case 'inbox':
      return Inbox;
    case 'notifications':
      return Bell;
    case 'events':
      return MessageSquare;
    default:
      return FileText;
  }
};

export const GenericListPage: React.FC<GenericListPageProps> = ({
  title,
  description,
  addPath
}) => {
  const navigate = useNavigate();
  const Icon = getIconForTitle(title);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">MANAGE {title.toUpperCase()}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <button
          onClick={() => navigate(addPath)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add {title}
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">{title} List</h2>
          </div>
        </div>

        <div className="p-12">
          <div className="text-center">
            <Icon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No {title.toLowerCase()} found</h3>
            <p className="mt-2 text-sm text-gray-500">
              Get started by creating your first {title.toLowerCase()}.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate(addPath)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-150"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add {title}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};