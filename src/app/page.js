'use client';

import Image from "next/image";
import Link from "next/link";
import AuthButton from "../components/AuthButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with Auth */}
      <header className="w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Dandi Logo"
            width={120}
            height={25}
            priority
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dandi
          </span>
        </div>
        <AuthButton />
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-[32px] items-center justify-center min-h-[80vh] px-8">
        <div className="text-center space-y-6 max-w-4xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            AI-Powered API Management
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage your API keys, analyze GitHub repositories with AI, and build amazing applications with our modern dashboard.
          </p>
        </div>

        {session ? (
          <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white gap-2 hover:from-blue-700 hover:to-purple-700 font-medium text-sm sm:text-base h-12 px-8 sm:w-auto shadow-lg"
              href="/dashboards"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Go to Dashboard
            </Link>
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-gray-900 gap-2 hover:bg-gray-100 font-medium text-sm sm:text-base h-12 px-8 sm:w-auto shadow-lg"
              href="/background"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              API Playground
            </Link>
          </div>
        ) : (
          <div className="mt-8 text-center space-y-4">
            <p className="text-gray-600 text-lg">
              Sign in with Google to access your personalized dashboard
            </p>
            <div className="flex justify-center">
              <AuthButton />
            </div>
          </div>
        )}

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2 2 2 0 01-2 2m-2-2a2 2 0 00-2-2M9 5a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">API Key Management</h3>
            <p className="text-gray-600">Securely manage and track your API keys with usage monitoring and rate limiting.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Repository Analysis</h3>
            <p className="text-gray-600">Analyze GitHub repositories with AI to get summaries and insights powered by LangChain.</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Monitor API usage, performance metrics, and get detailed analytics in real-time.</p>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
