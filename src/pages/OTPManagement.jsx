import { useState, useEffect } from 'react'

const otpStats = [
  { label: 'Total OTPs Sent', value: 0, key: 'total' },
  { label: 'Successful Verifications', value: 0, key: 'successful' },
  { label: 'Failed Attempts', value: 0, key: 'failed' },
  { label: 'Active OTPs', value: 0, key: 'active' },
]

const recentOTPs = [
  {
    id: 1,
    user_id: 123,
    email: 'john.doe@example.com',
    action: 'signup',
    status: 'verified',
    created_at: '2024-01-15T14:30:00Z',
    expires_at: '2024-01-15T14:35:00Z',
    attempts: 1,
    ip_address: '192.168.1.100'
  },
  {
    id: 2,
    user_id: 124,
    email: 'jane.smith@example.com',
    action: 'login',
    status: 'expired',
    created_at: '2024-01-15T14:25:00Z',
    expires_at: '2024-01-15T14:30:00Z',
    attempts: 3,
    ip_address: '192.168.1.101'
  },
  {
    id: 3,
    user_id: 125,
    email: 'bob.wilson@example.com',
    action: 'password_reset',
    status: 'failed',
    created_at: '2024-01-15T14:20:00Z',
    expires_at: '2024-01-15T14:25:00Z',
    attempts: 3,
    ip_address: '192.168.1.102'
  }
]

const otpActions = [
  { value: 'signup', label: 'Account Registration' },
  { value: 'login', label: 'Login Verification' },
  { value: 'password_reset', label: 'Password Reset' },
  { value: 'email_verification', label: 'Email Verification' },
  { value: 'two_factor', label: 'Two-Factor Authentication' },
  { value: 'transaction', label: 'Transaction Verification' }
]

export default function OTPManagement() {
  const [stats, setStats] = useState(otpStats)
  const [otps, setOtps] = useState(recentOTPs)
  const [selectedAction, setSelectedAction] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Animate stats
    const demoData = {
      total: 1847,
      successful: 1653,
      failed: 194,
      active: 23
    }

    const animateStats = (key, targetValue) => {
      const duration = 1500
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)

        setStats(prev => prev.map(stat => 
          stat.key === key ? { ...stat, value: currentValue } : stat
        ))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }

    Object.entries(demoData).forEach(([key, value], index) => {
      setTimeout(() => animateStats(key, value), index * 200)
    })
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return '✓'
      case 'expired': return '⏰'
      case 'failed': return '✗'
      case 'pending': return '⏳'
      default: return '?'
    }
  }

  const getActionLabel = (action) => {
    const actionObj = otpActions.find(a => a.value === action)
    return actionObj ? actionObj.label : action
  }

  const filteredOTPs = otps.filter(otp => {
    const actionMatch = selectedAction === 'all' || otp.action === selectedAction
    const statusMatch = selectedStatus === 'all' || otp.status === selectedStatus
    return actionMatch && statusMatch
  })

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleCleanup = async () => {
    if (confirm('Are you sure you want to clean up expired OTPs? This action cannot be undone.')) {
      setIsLoading(true)
      // Simulate cleanup
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Cleanup completed successfully!')
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">OTP Management</h1>
        <div className="flex gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            className="monochrome-button-gold"
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={handleCleanup}
            disabled={isLoading}
            className="monochrome-button"
          >
            Cleanup Expired
          </button>
        </div>
      </div>

      {/* OTP Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-black">
              {stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* Filters */}
      <section className="monochrome-card p-6">
        <h2 className="text-lg font-bold mb-4 text-black">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Actions</option>
              {otpActions.map(action => (
                <option key={action.value} value={action.value}>
                  {action.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Statuses</option>
              <option value="verified">Verified</option>
              <option value="expired">Expired</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </section>

      {/* Recent OTP Activity */}
      <section className="monochrome-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-black">Recent OTP Activity</h2>
          <span className="text-sm text-gray-500">
            Showing {filteredOTPs.length} of {otps.length} OTPs
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Attempts</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Expires</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredOTPs.map((otp) => (
                <tr key={otp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-black">{otp.email}</div>
                    <div className="text-sm text-gray-600">ID: {otp.user_id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-700">{getActionLabel(otp.action)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(otp.status)}`}>
                      <span>{getStatusIcon(otp.status)}</span>
                      {otp.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${
                      otp.attempts >= 3 ? 'text-red-600' : 
                      otp.attempts >= 2 ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {otp.attempts}/3
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(otp.created_at).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm ${
                      new Date(otp.expires_at) < new Date() ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {new Date(otp.expires_at).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600 font-mono">{otp.ip_address}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* OTP Configuration */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="monochrome-card p-6">
          <h3 className="text-lg font-bold mb-4 text-black">OTP Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">OTP Length</span>
              <span className="text-sm font-medium text-black">6 digits</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Expiry Time</span>
              <span className="text-sm font-medium text-black">5 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Max Attempts</span>
              <span className="text-sm font-medium text-black">3 attempts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Rate Limit</span>
              <span className="text-sm font-medium text-black">5 per hour</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className="text-sm font-medium text-green-600">✓ Enabled</span>
            </div>
          </div>
        </div>

        <div className="monochrome-card p-6">
          <h3 className="text-lg font-bold mb-4 text-black">Security Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="text-sm font-medium text-green-600">89.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Verification Time</span>
              <span className="text-sm font-medium text-black">2.3 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Failed Rate</span>
              <span className="text-sm font-medium text-red-600">10.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Suspicious Activity</span>
              <span className="text-sm font-medium text-yellow-600">3 events</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Cleanup</span>
              <span className="text-sm font-medium text-black">2 hours ago</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Alerts */}
      <section className="monochrome-card p-6">
        <h3 className="text-lg font-bold mb-4 text-black">Security Alerts</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">High failure rate detected</p>
              <p className="text-xs text-yellow-600">IP 192.168.1.102 has 3 failed attempts in 5 minutes</p>
            </div>
            <button className="text-xs text-yellow-700 hover:text-yellow-900 font-medium">
              Block IP
            </button>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Suspicious activity detected</p>
              <p className="text-xs text-red-600">Multiple OTP requests from different IPs for same email</p>
            </div>
            <button className="text-xs text-red-700 hover:text-red-900 font-medium">
              Investigate
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
