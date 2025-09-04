import { useState, useEffect } from 'react'

const nfcServiceStats = [
  { label: 'Total Tags', value: 0, key: 'tags' },
  { label: 'Active Tags', value: 0, key: 'active' },
  { label: 'Scans Today', value: 0, key: 'scans' },
  { label: 'Success Rate', value: 0, key: 'success' },
  { label: 'Avg Response', value: 0, key: 'response' },
]

const nfcEndpoints = [
  {
    id: 1,
    name: 'Tag Redirect',
    endpoint: '/nfc/redirect',
    method: 'GET',
    status: 'active',
    requests: 1247,
    avgResponse: 45,
    lastUsed: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Tag Info',
    endpoint: '/nfc/info',
    method: 'GET',
    status: 'active',
    requests: 892,
    avgResponse: 23,
    lastUsed: '5 minutes ago'
  },
  {
    id: 3,
    name: 'Tag Analytics',
    endpoint: '/nfc/analytics',
    method: 'POST',
    status: 'active',
    requests: 634,
    avgResponse: 67,
    lastUsed: '10 minutes ago'
  },
  {
    id: 4,
    name: 'Tag Management',
    endpoint: '/nfc/manage',
    method: 'POST',
    status: 'maintenance',
    requests: 0,
    avgResponse: 0,
    lastUsed: 'Never'
  }
]

const recentScans = [
  {
    id: 1,
    tagId: 'NFC-001-ABC123',
    business: 'Coffee Shop ABC',
    location: 'New York, NY',
    timestamp: '2 minutes ago',
    responseTime: 45,
    status: 'success'
  },
  {
    id: 2,
    tagId: 'NFC-002-DEF456',
    business: 'Restaurant XYZ',
    location: 'Los Angeles, CA',
    timestamp: '5 minutes ago',
    responseTime: 23,
    status: 'success'
  },
  {
    id: 3,
    tagId: 'NFC-003-GHI789',
    business: 'Retail Store 123',
    location: 'Chicago, IL',
    timestamp: '8 minutes ago',
    responseTime: 67,
    status: 'success'
  },
  {
    id: 4,
    tagId: 'NFC-004-JKL012',
    business: 'Spa & Wellness',
    location: 'Miami, FL',
    timestamp: '12 minutes ago',
    responseTime: 0,
    status: 'error'
  },
  {
    id: 5,
    tagId: 'NFC-005-MNO345',
    business: 'Fitness Center',
    location: 'Seattle, WA',
    timestamp: '15 minutes ago',
    responseTime: 34,
    status: 'success'
  }
]

export default function NfcService() {
  const [stats, setStats] = useState(nfcServiceStats)
  const [serviceStatus, setServiceStatus] = useState('operational')

  useEffect(() => {
    // Simulate demo data loading
    const demoData = {
      tags: 89,
      active: 76,
      scans: 1247,
      success: 98.5,
      response: 45
    }

    // Animate stats counters
    const animateStats = (key, targetValue) => {
      const duration = 2000
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)

        setStats(prev => prev.map(item => 
          item.key === key ? { ...item, value: currentValue } : item
        ))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()
    }

    // Start animations with slight delays
    Object.entries(demoData).forEach(([key, value], index) => {
      setTimeout(() => animateStats(key, value), index * 200)
    })
  }, [])

  const restartService = () => {
    setServiceStatus('restarting')
    setTimeout(() => setServiceStatus('operational'), 3000)
  }

  const testEndpoint = (endpoint) => {
    console.log('Testing endpoint:', endpoint.name)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">NFC Service — Tag Management</h1>
        <div className="flex gap-3">
          <button 
            onClick={restartService}
            disabled={serviceStatus === 'restarting'}
            className="monochrome-button-gold disabled:opacity-50"
          >
            {serviceStatus === 'restarting' ? 'Restarting...' : 'Restart Service'}
          </button>
          <button className="monochrome-button monochrome-button-secondary">
            Documentation
          </button>
        </div>
      </section>

      {/* Service Status */}
      <section className="monochrome-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-bold text-black">Service Status</div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              serviceStatus === 'operational' ? 'bg-green-500' :
              serviceStatus === 'restarting' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm font-medium text-black capitalize">{serviceStatus}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-black">nfc.biz365.ai</div>
            <div className="text-sm text-gray-600">Primary Service</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-black">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-black">45ms</div>
            <div className="text-sm text-gray-600">Avg Response</div>
          </div>
        </div>
      </section>

      {/* NFC Service Stats */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-black">
              {stat.key === 'success' ? `${stat.value}%` : 
               stat.key === 'response' ? `${stat.value}ms` : 
               stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* API Endpoints */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">API Endpoints</div>
        <div className="space-y-4">
          {nfcEndpoints.map((endpoint) => (
            <div key={endpoint.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-black">{endpoint.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      endpoint.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : endpoint.status === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {endpoint.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      endpoint.method === 'GET' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {endpoint.method}
                    </span>
                  </div>
                  <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {endpoint.endpoint}
                  </code>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => testEndpoint(endpoint)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    Test
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Requests: </span>
                  <span className="text-black font-medium">{endpoint.requests.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Avg Response: </span>
                  <span className="text-black font-medium">{endpoint.avgResponse}ms</span>
                </div>
                <div>
                  <span className="text-gray-600">Last Used: </span>
                  <span className="text-black font-medium">{endpoint.lastUsed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Scans */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">Recent Scans</div>
        <div className="space-y-4">
          {recentScans.map((scan) => (
            <div key={scan.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-black">{scan.tagId}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      scan.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {scan.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>{scan.business}</div>
                    <div>{scan.location}</div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div>{scan.timestamp}</div>
                  <div>{scan.responseTime}ms</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Configuration */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">Service Configuration</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-black mb-4">General Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service URL</label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  defaultValue="https://nfc.biz365.ai"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timeout (ms)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  defaultValue="5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Retries</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  defaultValue="3"
                />
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-4">Security Settings</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">Enable HTTPS</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">Rate Limiting</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">IP Whitelist</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  defaultChecked
                />
                <span className="text-sm text-gray-700">Request Logging</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="monochrome-button-gold px-4 py-2 text-sm">
            Save Configuration
          </button>
        </div>
      </section>
    </div>
  )
}
