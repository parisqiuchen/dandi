'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Toast from '../../components/Toast';

export default function Protected() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isValidated, setIsValidated] = useState(false);
  const [keyInfo, setKeyInfo] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    message: ''
  });
  const router = useRouter();

  // Validate API key
  const validateApiKey = useCallback(async () => {
    // Show toast notification (moved inside useCallback)
    const showToast = (type, message) => {
      setToast({
        show: true,
        type,
        message
      });
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
    };

    try {
      const submittedApiKey = sessionStorage.getItem('submittedApiKey');
      
      if (!submittedApiKey) {
        showToast('delete', 'No API key provided');
        setTimeout(() => router.push('/background'), 2000);
        return;
      }

      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey: submittedApiKey }),
      });

      const data = await response.json();

      if (data.valid) {
        setIsValidated(true);
        setKeyInfo(data.keyInfo);
        showToast('success', 'Valid API key! Access granted to playground');
        // Clear the API key from session storage
        sessionStorage.removeItem('submittedApiKey');
      } else {
        showToast('delete', 'Invalid API key');
        setTimeout(() => router.push('/background'), 2000);
      }
    } catch (error) {
      console.error('Validation error:', error);
      showToast('delete', 'Error validating API key');
      setTimeout(() => router.push('/background'), 2000);
    } finally {
      setLoading(false);
    }
  }, [router, setIsValidated, setKeyInfo, setLoading, setToast]);

  useEffect(() => {
    setMounted(true);
    validateApiKey();
  }, [validateApiKey]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-hidden">
          <Header title="Protected Playground" breadcrumb="Protected" />
          <div className="p-8 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 min-h-screen flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <div className="text-lg font-medium">Validating API key...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast toast={toast} setToast={setToast} />
      
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Header title="Protected Playground" breadcrumb="Protected" />

          {/* Content Area */}
          <div className="p-8 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 min-h-screen">
            <div className="max-w-4xl mx-auto">
              {isValidated ? (
                <>
                  {/* Success Content */}
                  <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                    <div className="text-center mb-8">
                      <div className="text-6xl mb-4">🎉</div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the API Playground!</h1>
                      <p className="text-gray-600">
                        Your API key has been validated successfully. You now have access to test and experiment with our API endpoints.
                      </p>
                    </div>

                    {/* API Key Info */}
                    {keyInfo && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Validated API Key Details:</h3>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium text-green-800">Name:</span> <span className="text-green-700">{keyInfo.name}</span></div>
                          <div><span className="font-medium text-green-800">Type:</span> <span className="text-green-700 capitalize">{keyInfo.type}</span></div>
                          <div><span className="font-medium text-green-800">Created:</span> <span className="text-green-700">{new Date(keyInfo.createdAt).toLocaleDateString()}</span></div>
                        </div>
                      </div>
                    )}

                    {/* Playground Content */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <h3 className="font-semibold text-blue-900 mb-3">🔧 API Testing Tools</h3>
                        <ul className="text-sm text-blue-800 space-y-2">
                          <li>• Interactive API documentation</li>
                          <li>• Real-time request/response testing</li>
                          <li>• Code generation in multiple languages</li>
                          <li>• Rate limiting and quota monitoring</li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                        <h3 className="font-semibold text-purple-900 mb-3">📊 Analytics & Monitoring</h3>
                        <ul className="text-sm text-purple-800 space-y-2">
                          <li>• API usage statistics</li>
                          <li>• Error rate monitoring</li>
                          <li>• Performance metrics</li>
                          <li>• Request history and logs</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sample API Endpoints */}
                  <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">🚀 Available API Endpoints</h2>
                    
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono">GET</span>
                          <code className="text-sm font-mono text-gray-700">/api/research/search</code>
                        </div>
                        <p className="text-sm text-gray-600">Search and retrieve research data from our knowledge base.</p>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">POST</span>
                          <code className="text-sm font-mono text-gray-700">/api/research/analyze</code>
                        </div>
                        <p className="text-sm text-gray-600">Submit data for AI-powered analysis and insights.</p>
                      </div>

                      <div className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-mono">PUT</span>
                          <code className="text-sm font-mono text-gray-700">/api/research/update</code>
                        </div>
                        <p className="text-sm text-gray-600">Update existing research records and metadata.</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Fallback content while redirecting */
                <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                  <p className="text-gray-600">Redirecting you back to the API key validation page...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 