import { useState, useEffect } from 'react'

const analyticsData = [
  { label: 'Page Views', value: 0, key: 'pageViews', change: '+12%' },
  { label: 'Unique Users', value: 0, key: 'uniqueUsers', change: '+8%' },
  { label: 'Sessions', value: 0, key: 'sessions', change: '+15%' },
  { label: 'Bounce Rate', value: 0, key: 'bounceRate', change: '-3%' },
  { label: 'Avg. Session', value: 0, key: 'avgSession', change: '+5%' },
]

const topPages = [
  { page: '/dashboard', views: 1247, users: 892, bounceRate: 23 },
  { page: '/campaigns', views: 892, users: 634, bounceRate: 31 },
  { page: '/analytics', views: 634, users: 445, bounceRate: 28 },
  { page: '/settings', views: 445, users: 312, bounceRate: 35 },
]

const deviceData = [
  { device: 'Desktop', percentage: 65, users: 1247 },
  { device: 'Mobile', percentage: 30, users: 576 },
  { device: 'Tablet', percentage: 5, users: 96 },
]

export default function Analytics() {
  const [analyticsValues, setAnalyticsValues] = useState(analyticsData)

  useEffect(() => {
    // Simulate demo data loading
    const demoData = {
      pageViews: 12450,
      uniqueUsers: 3247,
      sessions: 4567,
      bounceRate: 23,
      avgSession: 3.2
    }

    // Animate analytics counters
    const animateAnalytics = (key, targetValue) => {
      const duration = 2000
      const startTime = Date.now()
      const startValue = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress)

        setAnalyticsValues(prev => prev.map(item => 
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
      setTimeout(() => animateAnalytics(key, value), index * 200)
    })
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">Analytics — Performance Overview</h1>
        <div className="flex gap-3">
          <button className="monochrome-button-gold">
            Export Data
          </button>
          <button className="monochrome-button monochrome-button-secondary">
            Refresh
          </button>
        </div>
      </section>

      {/* Analytics KPIs */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {analyticsValues.map((item) => (
          <div key={item.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{item.label}</div>
            <div className="text-2xl font-bold text-black">
              {item.key === 'bounceRate' ? `${item.value}%` : 
               item.key === 'avgSession' ? `${item.value}m` : 
               item.value.toLocaleString()}
            </div>
            <div className={`text-xs mt-1 ${
              item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change} vs last month
            </div>
          </div>
        ))}
      </section>

      {/* Charts and Data */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="monochrome-card p-6">
          <div className="text-lg font-bold mb-4 text-black">Top Pages</div>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-black">{page.page}</div>
                  <div className="text-sm text-gray-500">{page.users} users</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-black">{page.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{page.bounceRate}% bounce</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="monochrome-card p-6">
          <div className="text-lg font-bold mb-4 text-black">Device Breakdown</div>
          <div className="space-y-4">
            {deviceData.map((device, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-black">{device.device}</span>
                  <span className="text-sm text-gray-600">{device.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-black h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${device.percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500">{device.users.toLocaleString()} users</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Activity */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-4 text-black">Real-time Activity</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-black">47</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-black">12</div>
            <div className="text-sm text-gray-600">New Sessions</div>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-black">3.2m</div>
            <div className="text-sm text-gray-600">Avg. Duration</div>
          </div>
        </div>
      </section>
    </div>
  )
}
