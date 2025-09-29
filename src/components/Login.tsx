import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, School, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getRedirectPath } from './ProtectedRoute';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(username, password);
    if (success) {
      if (rememberMe) {
        localStorage.setItem('rememberUser', username);
      }
      // Get the user from auth context to determine redirect path
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const redirectPath = getRedirectPath(currentUser.role);
      navigate(redirectPath);
    } else {
      setError('Invalid username or password');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <School className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              College ERP
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1 max-h-32 overflow-y-auto">
              <p><strong>Master Admin:</strong> master / 1234</p>
              <p><strong>Secretary:</strong> secretary / 1234</p>
              <p><strong>Chairperson:</strong> chairperson / 1234</p>
              <p><strong>Principal:</strong> principal / 1234</p>
              <p><strong>Dean:</strong> dean / 1234</p>
              <p><strong>HoD:</strong> hod / 1234</p>
              <p><strong>TPO:</strong> tpo / 1234</p>
              <p><strong>Controller:</strong> controller / 1234</p>
              <p><strong>Faculty:</strong> faculty / 1234</p>
              <p><strong>Lab Assistant:</strong> labassistant / 1234</p>
              <p><strong>Lab Technician:</strong> labtechnician / 1234</p>
              <p><strong>Student:</strong> student / 1234</p>
              <p><strong>Parent:</strong> parent / 1234</p>
              <p><strong>Administration Officer:</strong> registor / 1234</p>
              <p><strong>Transport:</strong> transport / 1234</p>
              <p><strong>Hostel Incharge (Warden):</strong> warden / 1234</p>
              <p><strong>Librarian:</strong> librarian / 1234</p>
              <p><strong>Accounts:</strong> accounts / 1234</p>
              <p><strong>Scholarship:</strong> scholarship / 1234</p>
              <p><strong>Stores:</strong> stores / 1234</p>
              <p><strong>Sports:</strong> sports / 1234</p>
              <p><strong>Security:</strong> security / 1234</p>
              <p><strong>IT Dept:</strong> it / 1234</p>
              <p><strong>Services:</strong> services / 1234</p>
              <p><strong>Maintenance:</strong> maintenance / 1234</p>
              <p><strong>ERP Admin:</strong> erpadmin / 1234</p>
              <p><strong>Temporary Student:</strong> studenttemp / 1234</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;