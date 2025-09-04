import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'
import GlobalSearch from '../admin/GlobalSearch'
import { Search, Menu, X, Bell, User } from 'lucide-react'

// Admin navigation items - Supabase-style organization
const adminNavigation = [
  {
    title: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: '📊' },
      { name: 'Analytics', href: '/analytics', icon: '📈' },
    ]
  },
  {
    title: 'Data Management',
    items: [
      { name: 'Users', href: '/users', icon: '👥' },
      { name: 'NFC Tags', href: '/nfc-tags', icon: '🏷️' },
      { name: 'Reviews', href: '/reviews', icon: '⭐' },
      { name: 'Analytics', href: '/analytics-data', icon: '📊' },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Roles', href: '/roles', icon: '🛡️' },
      { name: 'Settings', href: '/settings', icon: '⚙️' },
      { name: 'Logs', href: '/logs', icon: '📝' },
      { name: 'API Keys', href: '/api-keys', icon: '🔑' },
      { name: 'Backups', href: '/backups', icon: '💾' },
    ]
  },
  {
    title: 'Integrations',
    items: [
      { name: 'OAuth', href: '/oauth', icon: '🔐' },
      { name: 'NFC Service', href: '/nfc-service', icon: '📡' },
      { name: 'Google Services', href: '/google', icon: '🔍' },
    ]
  }
]

export default function AdminLayout({ user, children }) {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-gray-900">Biz365 Admin</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-6">
          {adminNavigation.map((section) => (
            <div key={section.title}>
              {sidebarOpen && (
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-yellow-50 text-yellow-700 border-r-2 border-yellow-500"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      )}
                    >
                      <span className="text-lg">{item.icon}</span>
                      {sidebarOpen && <span>{item.name}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'admin@biz365.ai'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {getPageTitle(location.pathname)}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {getPageDescription(location.pathname)}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Global Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              >
                <Search className="h-4 w-4 text-gray-400" />
                <span className="text-gray-500">Search...</span>
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
                </svg>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
    </div>
  )
}

// Helper function to get page title based on route
function getPageTitle(pathname) {
  const titles = {
    '/dashboard': 'Dashboard',
    '/analytics': 'Analytics',
    '/users': 'User Management',
    '/nfc-tags': 'NFC Tags',
    '/reviews': 'Reviews',
    '/analytics-data': 'Analytics Data',
    '/settings': 'Settings',
    '/logs': 'System Logs',
    '/api-keys': 'API Keys',
    '/backups': 'Backups',
    '/oauth': 'OAuth Configuration',
    '/nfc-service': 'NFC Service',
    '/google': 'Google Services',
  }
  return titles[pathname] || 'Admin Panel'
}

// Helper function to get page description based on route
function getPageDescription(pathname) {
  const descriptions = {
    '/dashboard': 'Overview of system metrics and key performance indicators',
    '/analytics': 'Detailed analytics and reporting dashboard',
    '/users': 'Manage user accounts, roles, and permissions',
    '/nfc-tags': 'Create and manage NFC tags and configurations',
    '/reviews': 'Monitor and manage customer reviews',
    '/analytics-data': 'Raw analytics data and export options',
    '/settings': 'Configure system settings and preferences',
    '/logs': 'View system logs and audit trails',
    '/api-keys': 'Manage API keys and access tokens',
    '/backups': 'System backups and data recovery',
    '/oauth': 'OAuth provider configuration and management',
    '/nfc-service': 'NFC service integration and monitoring',
    '/google': 'Google services integration and configuration',
  }
  return descriptions[pathname] || 'Administrative interface for Biz365 platform'
}
