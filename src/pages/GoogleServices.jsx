import { useState, useEffect } from 'react'

const googleServices = [
  {
    id: 1,
    name: 'Google Analytics',
    service: 'analytics',
    status: 'active',
    description: 'Website traffic and user behavior analytics',
    lastSync: '2 hours ago',
    dataPoints: 1247,
    quota: { used: 45000, limit: 100000 }
  },
  {
    id: 2,
    name: 'Google Reviews',
    service: 'reviews',
    status: 'active',
    description: 'Business reviews and ratings management',
    lastSync: '1 hour ago',
    dataPoints: 892,
    quota: { used: 12000, limit: 50000 }
  },
  {
    id: 3,
    name: 'Google Maps',
    service: 'maps',
    status: 'active',
    description: 'Location services and mapping data',
    lastSync: '30 minutes ago',
    dataPoints: 634,
    quota: { used: 25000, limit: 100000 }
  },
  {
    id: 4,
    name: 'Google Search Console',
    service: 'search-console',
    status: 'inactive',
    description: 'Search performance and indexing data',
    lastSync: 'Never',
    dataPoints: 0,
    quota: { used: 0, limit: 10000 }
  },
  {
    id: 5,
    name: 'Google My Business',
    service: 'my-business',
    status: 'active',
    description: 'Business profile and listing management',
    lastSync: '15 minutes ago',
    dataPoints: 156,
    quota: { used: 5000, limit: 25000 }
  }
]

const googleStats = [
  { label: 'Active Services', value: 0, key: 'active' },
  { label: 'Total Data Points', value: 0, key: 'dataPoints' },
  { label: 'API Calls Today', value: 0, key: 'apiCalls' },
  { label: 'Sync Success Rate', value: 0, key: 'success' },
]

const recentActivity = [
  {
    id: 1,
    service: 'Google Analytics',
    action: 'Data sync completed',
    timestamp: '2 hours ago',
    status: 'success',
    details: 'Synced 1,247 new data points'
  },
  {
    id: 2,
    service: 'Google Reviews',
    action: 'New review detected',
    timestamp: '1 hour ago',
    status: 'success',
    details: '5-star review from John Smith'
  },
  {
    id: 3,
    service: 'Google Maps',
    action: 'Location updated',
    timestamp: '30 minutes ago',
    status: 'success',
    details: 'Updated business hours for 3 locations'
  },
  {
    id: 4,
    service: 'Google My Business',
    action: 'Profile sync failed',
    timestamp: '15 minutes ago',
    status: 'error',
    details: 'API rate limit exceeded'
  },
  {
    id: 5,
    service: 'Google Analytics',
    action: 'Report generated',
    timestamp: '1 hour ago',
    status: 'success',
    details: 'Monthly traffic report created'
  }
]

export default function GoogleServices() {
  const [stats, setStats] = useState(googleStats)
  const [selectedService, setSelectedService] = useState(null)

  useEffect(() => {
    // Simulate demo data loading
    const demoData = {
      active: googleServices.filter(s => s.status === 'active').length,
      dataPoints: googleServices.reduce((sum, s) => sum + s.dataPoints, 0),
      apiCalls: 4567,
      success: 98.5
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

  const toggleService = (id) => {
    // In a real app, this would toggle the service status
    console.log('Toggling service:', id)
  }

  const syncService = (service) => {
    // In a real app, this would trigger a sync
    console.log('Syncing service:', service.name)
  }

  const configureService = (service) => {
    setSelectedService(service)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">Google Services — Integration Management</h1>
        <div className="flex gap-3">
          <button className="monochrome-button-gold">
            Sync All Services
          </button>
          <button className="monochrome-button monochrome-button-secondary">
            Add Service
          </button>
        </div>
      </section>

      {/* Google Services Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-black">
              {stat.key === 'success' ? `${stat.value}%` : stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* Google Services */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">Google Services</div>
        <div className="space-y-4">
          {googleServices.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      service.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Last sync: {service.lastSync}</span>
                    <span>Data points: {service.dataPoints.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => configureService(service)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Configure
                  </button>
                  <button
                    onClick={() => syncService(service)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    Sync
                  </button>
                  <button
                    onClick={() => toggleService(service.id)}
                    className={`px-3 py-1 text-sm rounded ${
                      service.status === 'active'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {service.status === 'active' ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">API Quota Usage</span>
                  <span className="text-black font-medium">
                    {service.quota.used.toLocaleString()} / {service.quota.limit.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (service.quota.used / service.quota.limit) > 0.8 ? 'bg-red-500' :
                      (service.quota.used / service.quota.limit) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(service.quota.used / service.quota.limit) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">Recent Activity</div>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-semibold text-black">{activity.service}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {activity.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Configuration Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-black mb-4">Configure {selectedService.name}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <p className="text-black">{selectedService.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedService.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedService.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-700">{selectedService.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Sync</label>
                  <p className="text-gray-700">{selectedService.lastSync}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data Points</label>
                  <p className="text-gray-700">{selectedService.dataPoints.toLocaleString()}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sync Frequency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="realtime">Real-time</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    defaultValue="AIzaSyBvOkBw..."
                  />
                  <button className="px-3 py-2 bg-black text-white rounded text-sm hover:bg-gray-800">
                    Test
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Enable automatic sync</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm text-gray-700">Enable error notifications</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => syncService(selectedService)}
                className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                Test Sync
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="monochrome-button px-4 py-2 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
