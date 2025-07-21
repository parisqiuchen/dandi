'use client';

import { getProviders, signIn, getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface Providers {
  [key: string]: Provider;
}

export default function SignIn() {
  const [providers, setProviders] = useState<Providers | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const setupProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push('/dashboards');
      }
    };

    setupProviders();
    checkSession();
  }, [router]);

  const handleSignIn = async (providerId: string) => {
    setLoading(true);
    try {
      await signIn(providerId, { 
        callbackUrl: '/dashboards',
        redirect: true 
      });
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="flex items-center gap-3">
              <Image
                className="dark:invert"
                src="/next.svg"
                alt="Dandi Logo"
                width={120}
                height={25}
                priority
              />
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dandi
              </span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your API management dashboard
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    onClick={() => handleSignIn(provider.id)}
                    disabled={loading}
                    className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          {provider.id === 'google' && (
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          )}
                        </span>
                        Continue with {provider.name}
                      </>
                    )}
                  </button>
                </div>
              ))
            }
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Secure authentication powered by NextAuth.js
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push('/')}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 