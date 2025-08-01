'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navigationItems = [
    {
      name: 'Overview',
      href: '/dashboards',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      active: true
    },
    {
      name: 'API Playground',
      href: '/background',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: 'Use Cases',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      name: 'Billing',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      name: 'Settings',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  const externalLinks = [
    {
      name: 'Documentation',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      external: true
    },
    {
      name: 'Dandi MCP',
      href: '#',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      external: true
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 
        fixed lg:static inset-y-0 left-0 z-50 
        ${isCollapsed ? 'w-16' : 'w-64'} 
        bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out
      `}>
        
        {/* Desktop collapse button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:block absolute -right-3 top-8 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 z-10"
        >
          <svg 
            className={`w-3 h-3 mx-auto text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className={`${isCollapsed ? 'p-3' : 'p-6'} border-b border-gray-200 transition-all duration-300`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">🚀</span>
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-gray-900 transition-opacity duration-300">dandi</span>
            )}
          </div>
        </div>

        {/* User Section */}
        {session && (
          <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-b border-gray-200 transition-all duration-300`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} p-2 rounded-lg hover:bg-gray-50 cursor-pointer`}>
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">P</span>
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-700">Personal</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-1 transition-all duration-300 overflow-y-auto`}>
          {navigationItems.map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className={`
                flex items-center ${isCollapsed ? 'justify-center p-3' : 'space-x-3 p-3'} 
                rounded-lg transition-all duration-200 group
                ${item.active 
                  ? 'bg-blue-50 text-blue-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
              title={isCollapsed ? item.name : ''}
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              {!isCollapsed && (
                <span className="transition-opacity duration-300">{item.name}</span>
              )}
            </a>
          ))}
          
          {/* External Links */}
          <div className={`${isCollapsed ? 'pt-4' : 'pt-6'} transition-all duration-300`}>
            {externalLinks.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className={`
                  flex items-center ${isCollapsed ? 'justify-center p-3' : 'space-x-3 p-3'} 
                  rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group
                `}
                title={isCollapsed ? item.name : ''}
              >
                <div className="flex-shrink-0">
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <>
                    <span className="flex-1 transition-opacity duration-300">{item.name}</span>
                    <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </>
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        {session && (
          <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-gray-200 transition-all duration-300`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} transition-all duration-300`}>
              {/* User Avatar */}
              <div className="flex-shrink-0">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    width={isCollapsed ? 32 : 40}
                    height={isCollapsed ? 32 : 40}
                    className="rounded-full border-2 border-gray-200"
                  />
                ) : (
                  <div className={`${isCollapsed ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300`}>
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <>
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {session.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session.user?.email}
                    </p>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleSignOut}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                    title="Sign out"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Collapsed state logout button */}
            {isCollapsed && session && (
              <button
                onClick={handleSignOut}
                className="w-full mt-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Sign out"
              >
                <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
} 