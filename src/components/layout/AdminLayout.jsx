import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '../../lib/utils'

// Admin navigation items - Comprehensive admin functionality
const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'grid' },
  { name: 'Analytics', href: '/analytics', icon: 'chart' },
  { name: 'Users', href: '/users', icon: 'users' },
  { name: 'NFC Tags', href: '/nfc-tags', icon: 'tag' },
  { name: 'Reviews', href: '/reviews', icon: 'star' },
  { name: 'Email Management', href: '/email-management', icon: 'mail' },
  { name: 'OTP Management', href: '/otp-management', icon: 'shield-check' },
  { name: 'Roles', href: '/roles', icon: 'shield' },
  { name: 'Settings', href: '/settings', icon: 'settings' },
  { name: 'Logs', href: '/logs', icon: 'file-text' },
  { name: 'API Keys', href: '/api-keys', icon: 'key' },
  { name: 'Backups', href: '/backups', icon: 'database' },
  { name: 'OAuth', href: '/oauth', icon: 'lock' },
  { name: 'NFC Service', href: '/nfc-service', icon: 'wifi' },
  { name: 'Google Services', href: '/google', icon: 'search' },
]

// Icon component for standard industry icons
const Icon = ({ name, className = "w-5 h-5" }) => {
  const icons = {
    grid: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    chart: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
      </svg>
    ),
    tag: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    star: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    'file-text': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    key: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
    database: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    lock: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    wifi: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    mail: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    'shield-check': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    chevron: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    'user': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    'info': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'credit-card': (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )
  }
  
  return icons[name] || null
}

export default function AdminLayout({ user, children }) {
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true) // Start collapsed
  const [isHovering, setIsHovering] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [currentPlan, setCurrentPlan] = useState('Admin') // Admin plan
  const [planDetails] = useState({
    'Admin': {
      name: 'Admin',
      price: '0.00',
      currency: 'USD',
      renewalDate: 'Unlimited',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  })

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div 
        className={cn(
          "bg-black text-white transition-all duration-300 ease-in-out flex flex-col relative border-r border-gray-800 sticky top-0 h-screen",
          (sidebarCollapsed && !isHovering) ? "w-16" : "w-64"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {(!sidebarCollapsed || isHovering) && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center">
                  <Icon name="grid" className="w-5 h-5 text-black" />
                </div>
                <span className="font-semibold text-lg text-white">Biz365 Admin</span>
              </div>
            )}
            {!isHovering && (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <Icon name="grid" className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        {(!sidebarCollapsed || isHovering) && (
          <div className="p-4 border-b border-gray-800">
            <div className="relative">
              <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search admin..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                onClick={() => setSearchOpen(true)}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {adminNavigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center rounded-lg transition-colors group",
                  (sidebarCollapsed && !isHovering) 
                    ? "justify-center px-2 py-2" 
                    : "space-x-3 px-3 py-2",
                  isActive 
                    ? "bg-white text-black" 
                    : "text-gray-300 hover:bg-gray-900 hover:text-white"
                )}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <Icon 
                  name={item.icon} 
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-black" : "text-gray-400 group-hover:text-white"
                  )} 
                />
                {(!sidebarCollapsed || isHovering) && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Current Plan Section */}
        {(!sidebarCollapsed || isHovering) && (
          <div className="p-4 border-t border-gray-800">
            <div className={`${planDetails[currentPlan].bgColor} ${planDetails[currentPlan].borderColor} border rounded-lg p-3 relative`}>
              {/* Profile Icon */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <Icon name="user" className="w-3 h-3 text-gray-600" />
              </div>
              
              <div className="pt-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Admin Access
                </div>
                
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-bold text-lg ${planDetails[currentPlan].color}`}>
                    {planDetails[currentPlan].name}
                  </span>
                  <span className={`font-semibold ${planDetails[currentPlan].color}`}>
                    {planDetails[currentPlan].price} {planDetails[currentPlan].currency}
                  </span>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <Icon name="info" className="w-3 h-3 mr-1" />
                  {planDetails[currentPlan].renewalDate}
                </div>
                
                <button className={`w-full py-2 px-3 rounded-md text-xs font-medium transition-colors bg-black text-white hover:bg-gray-800`}>
                  <div className="flex items-center justify-center">
                    <Icon name="settings" className="w-3 h-3 mr-1" />
                    Admin Panel
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-black">AU</span>
            </div>
            {(!sidebarCollapsed || isHovering) && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@biz365.ai</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Expand Button - appears when collapsed and not hovering */}
        {sidebarCollapsed && !isHovering && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
          >
            <Icon name="grid" className="w-4 h-4 text-black" />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-white">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-black">
                {adminNavigation.find(item => item.href === location.pathname)?.name || 'Admin Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs px-3 py-1 border border-gray-300 bg-gray-100 text-gray-700 rounded-full">
                Admin Mode
              </span>
              <span className="text-xs px-3 py-1 border border-gray-300 bg-gray-100 text-gray-700 rounded-full">
                Full Access (ADM01)
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm min-h-[calc(100vh-200px)]">
            <div className="p-8">
              {children}
            </div>
          </div>
        </main>

        {/* Admin Status Banner - Footer Area */}
        <footer className="p-6 bg-white">
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-black text-sm">Admin Panel</div>
                <div className="text-xs text-gray-600">
                  Full system access enabled
                </div>
              </div>
              <button className="monochrome-button-gold px-4 py-2 rounded-lg text-sm font-medium">
                System Status
              </button>
            </div>
          </div>
        </footer>
      </div>

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
