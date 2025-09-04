import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const emailStats = [
  { label: 'Total Emails Sent', value: 0, key: 'total' },
  { label: 'Welcome Emails', value: 0, key: 'welcome' },
  { label: 'Success Rate', value: '0%', key: 'success' },
  { label: 'Failed Emails', value: 0, key: 'failed' },
]

const emailTemplates = [
  {
    id: 1,
    name: 'Welcome Email - New User',
    key: 'welcome_new_user',
    subject: 'Welcome to Biz365! Let\'s get you started',
    isActive: true,
    lastModified: '2024-01-15T10:30:00Z',
    emailsSent: 1247
  },
  {
    id: 2,
    name: 'Welcome Email - Returning User',
    key: 'welcome_returning_user',
    subject: 'Welcome back to Biz365!',
    isActive: true,
    lastModified: '2024-01-15T10:30:00Z',
    emailsSent: 892
  },
  {
    id: 3,
    name: 'Password Reset',
    key: 'password_reset',
    subject: 'Reset your Biz365 password',
    isActive: false,
    lastModified: '2024-01-10T14:20:00Z',
    emailsSent: 156
  }
]

const recentEmails = [
  {
    id: 1,
    recipient: 'john.doe@example.com',
    subject: 'Welcome to Biz365! Let\'s get you started',
    type: 'welcome',
    status: 'sent',
    sentAt: '2024-01-15T14:30:00Z',
    isNewUser: true
  },
  {
    id: 2,
    recipient: 'jane.smith@example.com',
    subject: 'Welcome back to Biz365!',
    type: 'welcome',
    status: 'sent',
    sentAt: '2024-01-15T14:25:00Z',
    isNewUser: false
  },
  {
    id: 3,
    recipient: 'bob.wilson@example.com',
    subject: 'Welcome to Biz365! Let\'s get you started',
    type: 'welcome',
    status: 'failed',
    sentAt: '2024-01-15T14:20:00Z',
    isNewUser: true,
    errorMessage: 'Invalid email address'
  }
]

export default function EmailManagement() {
  const [stats, setStats] = useState(emailStats)
  const [templates, setTemplates] = useState(emailTemplates)
  const [emails, setEmails] = useState(recentEmails)
  const [isTestingEmail, setIsTestingEmail] = useState(false)
  const [testEmailResult, setTestEmailResult] = useState(null)

  useEffect(() => {
    // Animate stats
    const demoData = {
      total: 2847,
      welcome: 2139,
      success: 94.2,
      failed: 108
    }

    const animateStats = (key, targetValue) => {
      const duration = 1500
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        let currentValue = startValue + (targetValue - startValue) * progress

        setStats(prev => prev.map(stat => {
          if (stat.key === key) {
            if (key === 'success') {
              return { ...stat, value: `${currentValue.toFixed(1)}%` }
            } else {
              return { ...stat, value: Math.floor(currentValue) }
            }
          }
          return stat
        }))

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

  const testEmailConfiguration = async () => {
    setIsTestingEmail(true)
    setTestEmailResult(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success/failure
      const success = Math.random() > 0.3
      setTestEmailResult({
        success,
        message: success 
          ? 'Email configuration test successful! Test email sent.'
          : 'Email configuration test failed. Please check your SMTP/Resend settings.'
      })
    } catch (error) {
      setTestEmailResult({
        success: false,
        message: 'Failed to test email configuration: ' + error.message
      })
    } finally {
      setIsTestingEmail(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return '✓'
      case 'failed': return '✗'
      case 'pending': return '⏳'
      default: return '?'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">Email Management</h1>
        <div className="flex gap-3">
          <button 
            onClick={testEmailConfiguration}
            disabled={isTestingEmail}
            className="monochrome-button-gold"
          >
            {isTestingEmail ? 'Testing...' : 'Test Configuration'}
          </button>
          <button className="monochrome-button">
            Email Settings
          </button>
        </div>
      </div>

      {/* Test Result */}
      {testEmailResult && (
        <div className={`monochrome-card p-4 ${testEmailResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <div className="flex items-center gap-2">
            <span className={`text-lg ${testEmailResult.success ? 'text-green-600' : 'text-red-600'}`}>
              {testEmailResult.success ? '✓' : '✗'}
            </span>
            <span className={`font-medium ${testEmailResult.success ? 'text-green-800' : 'text-red-800'}`}>
              {testEmailResult.message}
            </span>
          </div>
        </div>
      )}

      {/* Email Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-black">
              {stat.value}
            </div>
          </div>
        ))}
      </section>

      {/* Email Templates */}
      <section className="monochrome-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-black">Email Templates</h2>
          <button className="monochrome-button">
            Create Template
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Template</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Emails Sent</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Modified</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-black">{template.name}</div>
                    <div className="text-sm text-gray-600">{template.key}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-700">{template.subject}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      template.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-700">{template.emailsSent.toLocaleString()}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(template.lastModified).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        Edit
                      </button>
                      <button className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors">
                        Preview
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Email Activity */}
      <section className="monochrome-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-black">Recent Email Activity</h2>
          <Link to="/logs" className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            View All Logs
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Recipient</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Sent At</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">User Type</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-black">{email.recipient}</div>
                    {email.errorMessage && (
                      <div className="text-xs text-red-600 mt-1">{email.errorMessage}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-700">{email.subject}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600 capitalize">{email.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(email.status)}`}>
                      <span>{getStatusIcon(email.status)}</span>
                      {email.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-gray-600">
                      {new Date(email.sentAt).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      email.isNewUser ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {email.isNewUser ? 'New User' : 'Returning'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Email Configuration Status */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="monochrome-card p-6">
          <h3 className="text-lg font-bold mb-4 text-black">SMTP Configuration</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Host</span>
              <span className="text-sm font-medium text-black">smtp.gmail.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Port</span>
              <span className="text-sm font-medium text-black">587</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Encryption</span>
              <span className="text-sm font-medium text-black">TLS</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className="text-sm font-medium text-green-600">✓ Connected</span>
            </div>
          </div>
        </div>

        <div className="monochrome-card p-6">
          <h3 className="text-lg font-bold mb-4 text-black">Resend API</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Key</span>
              <span className="text-sm font-medium text-black">••••••••••••••••</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">From Email</span>
              <span className="text-sm font-medium text-black">noreply@biz365.ai</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className="text-sm font-medium text-green-600">✓ Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Monthly Limit</span>
              <span className="text-sm font-medium text-black">100,000</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
