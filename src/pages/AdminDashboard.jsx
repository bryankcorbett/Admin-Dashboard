import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const kpis = [
  { label: 'Total Users', value: 0, key: 'users' },
  { label: 'NFC Tags', value: 0, key: 'nfc' },
  { label: 'Reviews', value: 0, key: 'reviews' },
  { label: 'Integrations', value: 0, key: 'integrations' },
  { label: 'System Health', value: 0, key: 'health' },
]

const adminActions = [
  { name: 'User Management', status: 'active', count: 1247 },
  { name: 'NFC Management', status: 'active', count: 89 },
  { name: 'System Logs', status: 'warning', count: 12 },
]

export default function AdminDashboard() {
  const [kpiValues, setKpiValues] = useState(kpis)

  useEffect(() => {
    // Simulate demo data loading
    const demoData = {
      users: 1247,
      nfc: 89,
      reviews: 156,
      integrations: 3,
      health: 98
    }

    // Animate KPI counters
    const animateKPI = (key, targetValue) => {
      const duration = 2000
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)

        setKpiValues(prev => prev.map(kpi => 
          kpi.key === key ? { ...kpi, value: currentValue } : kpi
        ))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }

    // Start animations with slight delays
    Object.entries(demoData).forEach(([key, value], index) => {
      setTimeout(() => animateKPI(key, value), index * 200)
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">Admin Dashboard — System Overview</h1>
        <div className="flex gap-3">
          <button className="monochrome-button-gold">
            System Status
          </button>
          <Link 
            to="/settings" 
            className="monochrome-button monochrome-button-secondary"
          >
            Settings
          </Link>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpiValues.map((kpi) => (
          <div key={kpi.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{kpi.label}</div>
            <div className="text-2xl font-bold text-black">
              {kpi.key === 'health' ? `${kpi.value}%` : kpi.value.toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* Admin Actions & System Status */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 monochrome-card p-6">
          <div className="text-lg font-bold mb-2 text-black">Admin Actions</div>
          <div className="text-sm text-gray-600 mb-6">System management and monitoring</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {adminActions.map((action, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                <div className="text-sm font-semibold text-black">{action.name}</div>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${
                    action.status === 'active' ? 'bg-green-500' : 
                    action.status === 'warning' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}></span>
                  {action.status === 'active' ? 'Active' : action.status === 'warning' ? 'Warning' : 'Inactive'}
                </div>
                <div className="text-lg font-bold text-black mt-2">{action.count.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="monochrome-card p-6">
          <div className="text-lg font-bold mb-4 text-black">System Status</div>
          <ul className="text-sm text-gray-600 space-y-3">
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Database Connected
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              API Services Running
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              Backup Pending
            </li>
            <li className="flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Security Active
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-4 text-black">Quick Actions</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/users" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors group">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900 group-hover:text-black">Manage Users</p>
              <p className="text-xs text-gray-500">User accounts & roles</p>
            </div>
          </Link>

          <Link to="/nfc-tags" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors group">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900 group-hover:text-black">NFC Tags</p>
              <p className="text-xs text-gray-500">Tag management</p>
            </div>
          </Link>

          <Link to="/logs" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors group">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900 group-hover:text-black">System Logs</p>
              <p className="text-xs text-gray-500">View activity logs</p>
            </div>
          </Link>

          <Link to="/settings" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors group">
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400 group-hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900 group-hover:text-black">Settings</p>
              <p className="text-xs text-gray-500">System configuration</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}
