import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export const AdminLoginPage = ({ onLoginSuccess, onBackToSite }) => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('admin@royalenterprises.co.in');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter your administrator password.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      setError(result.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F7] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-sm border border-[#E6EAEB]">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 rounded-md bg-[#07565A] flex items-center justify-center font-bold text-white text-lg mx-auto mb-3">
            <span className="text-[#F47716]">S</span>
          </div>
          <h1 className="text-xl font-bold text-[#07565A]">
            SILICONIX Administrator Portal
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Authorized access only. Protected by Firebase Authentication.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-md flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#263536] mb-1">
              Admin Email
            </label>
            <div className="relative">
              <Mail size={15} className="text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@royalenterprises.co.in"
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-xs focus:border-[#07565A] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#263536] mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock size={15} className="text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-gray-300 rounded-md text-xs focus:border-[#07565A] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-md bg-[#07565A] hover:bg-[#06484B] text-white text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={14} className="text-[#F47716]" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E6EAEB] flex items-center justify-between text-[11px] text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#07565A]" />
            <span>Encrypted Session</span>
          </div>
          {onBackToSite && (
            <button
              onClick={onBackToSite}
              className="hover:text-[#07565A] underline"
            >
              Back to Public Site
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
