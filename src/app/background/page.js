'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Background() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setLoading(true);
    
    // Store the API key in sessionStorage and redirect to protected page
    sessionStorage.setItem('submittedApiKey', apiKey.trim());
    router.push('/protected');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <Header title="API Playground" breadcrumb="API Playground" />

        {/* Content Area */}
        <div className="p-8 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 min-h-screen">
          <div className="max-w-2xl mx-auto">
            {/* API Playground Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">🚀 API Playground</h1>
                <p className="text-gray-600">
                  Enter your API key to access the protected playground area where you can test and experiment with our API endpoints.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-900 mb-3">
                    API Key
                  </label>
                  <input
                    type="text"
                    id="apiKey"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono"
                    placeholder="Enter your API key (e.g., ak_...)"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Use one of the API keys from your dashboard to access the playground.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || !apiKey.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Validating...</span>
                    </>
                  ) : (
                    <>
                      <span>🔐 Access Playground</span>
                    </>
                  )}
                </button>
              </form>

              {/* Info Section */}
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">💡 How it works:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Enter a valid API key from your dashboard</li>
                  <li>• Click &quot;Access Playground&quot; to validate your key</li>
                  <li>• If valid, you&apos;ll be taken to the protected playground area</li>
                  <li>• If invalid, you&apos;ll receive an error message</li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <a 
                  href="/dashboards" 
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  ← Back to Dashboard to manage your API keys
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 