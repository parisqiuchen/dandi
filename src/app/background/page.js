'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Background() {
  const [apiKey, setApiKey] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!apiKey.trim() || !githubUrl.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);
    
    try {
      const response = await fetch('/api/github-summarizer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey.trim()
        },
        body: JSON.stringify({
          repositoryUrl: githubUrl.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || 'An error occurred');
        return;
      }

      setResults(data);
    } catch (err) {
      setError('Failed to make request. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResults(null);
    setError(null);
    setGithubUrl('');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden lg:ml-0">
        <Header title="API Playground" breadcrumb="API Playground" />

        {/* Content Area */}
        <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 min-h-screen">
          <div className="max-w-4xl mx-auto">
            {/* API Playground Card */}
            <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">🚀 API Playground</h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Test the GitHub summarizer API by entering your API key and a GitHub repository URL.
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
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base lg:text-lg font-mono"
                    placeholder="Enter your API key (e.g., ak_...)"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Use one of the API keys from your dashboard to access the API.
                  </p>
                </div>

                <div>
                  <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-900 mb-3">
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="https://github.com/owner/repository"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter a valid GitHub repository URL to analyze and summarize.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading || !apiKey.trim() || !githubUrl.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>🔍 Analyze Repository</span>
                      </>
                    )}
                  </button>
                  
                  {(results || error) && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-base sm:text-lg"
                    >
                      🔄 New Request
                    </button>
                  )}
                </div>
              </form>

              {/* Error Display */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600">❌</span>
                    <h3 className="font-semibold text-red-900">Error</h3>
                  </div>
                  <p className="text-red-800 mt-2">{error}</p>
                </div>
              )}

              {/* Results Display */}
              {results && (
                <div className="mt-6 space-y-6">
                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Analysis Results</h2>
                  </div>

                  {/* Repository Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {results.stars !== undefined && (
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="text-yellow-800 font-semibold">⭐ Stars</div>
                        <div className="text-2xl font-bold text-yellow-900">{results.stars.toLocaleString()}</div>
                      </div>
                    )}
                    
                    {results.latestVersion && (
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="text-green-800 font-semibold">🏷️ Latest Version</div>
                        <div className="text-lg font-bold text-green-900">{results.latestVersion}</div>
                      </div>
                    )}
                    
                    {results.licenseType && (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="text-blue-800 font-semibold">📜 License</div>
                        <div className="text-lg font-bold text-blue-900">{results.licenseType}</div>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {results.summary && (
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                        <span>📝</span>
                        <span>Summary</span>
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{results.summary}</p>
                    </div>
                  )}

                  {/* Cool Facts */}
                  {results.cool_facts && results.cool_facts.length > 0 && (
                    <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                      <h3 className="font-bold text-purple-900 mb-3 flex items-center space-x-2">
                        <span>✨</span>
                        <span>Cool Facts</span>
                      </h3>
                      <ul className="space-y-2">
                        {results.cool_facts.map((fact, index) => (
                          <li key={index} className="text-purple-800 flex items-start space-x-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Website Link */}
                  {results.websiteUrl && (
                    <div className="text-center">
                      <a 
                        href={results.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <span>🔗</span>
                        <span>Visit Repository</span>
                        <span>↗</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Info Section */}
              {!results && !error && (
                <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">💡 How it works:</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Enter a valid API key from your dashboard</li>
                    <li>• Provide a GitHub repository URL (e.g., https://github.com/owner/repo)</li>
                                         <li>• Click &quot;Analyze Repository&quot; to get AI-powered insights</li>
                    <li>• View the summary, cool facts, and repository metadata</li>
                  </ul>
                </div>
              )}

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