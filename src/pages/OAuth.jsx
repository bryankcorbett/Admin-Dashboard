import { useState, useEffect } from 'react'

const oauthProviders = [
  {
    id: 1,
    name: 'Google',
    provider: 'google',
    status: 'active',
    clientId: 'google-client-id-123456789',
    clientSecret: 'google-client-secret-abcdef',
    redirectUri: 'https://app.biz365.ai/auth/google/callback',
    scopes: ['openid', 'profile', 'email'],
    users: 1247,
    lastUsed: '2 hours ago',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Apple',
    provider: 'apple',
    status: 'active',
    clientId: 'apple-client-id-987654321',
    clientSecret: 'apple-client-secret-fedcba',
    redirectUri: 'https://app.biz365.ai/auth/apple/callback',
    scopes: ['name', 'email'],
    users: 892,
    lastUsed: '1 day ago',
    createdAt: '2024-01-10'
  },
  {
    id: 3,
    name: 'Facebook',
    provider: 'facebook',
    status: 'inactive',
    clientId: 'facebook-client-id-456789123',
    clientSecret: 'facebook-client-secret-cdefab',
    redirectUri: 'https://app.biz365.ai/auth/facebook/callback',
    scopes: ['email', 'public_profile'],
    users: 0,
    lastUsed: 'Never',
    createdAt: '2024-01-05'
  },
  {
    id: 4,
    name: 'GitHub',
    provider: 'github',
    status: 'active',
    clientId: 'github-client-id-789123456',
    clientSecret: 'github-client-secret-abcdef',
    redirectUri: 'https://app.biz365.ai/auth/github/callback',
    scopes: ['user:email'],
    users: 234,
    lastUsed: '3 days ago',
    createdAt: '2024-01-20'
  }
]

const oauthStats = [
  { label: 'Total Providers', value: 0, key: 'total' },
  { label: 'Active', value: 0, key: 'active' },
  { label: 'Total Users', value: 0, key: 'users' },
  { label: 'Success Rate', value: 0, key: 'success' },
]

export default function OAuth() {
  const [stats, setStats] = useState(oauthStats)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)

  useEffect(() => {
    // Simulate demo data loading
    const demoData = {
      total: oauthProviders.length,
      active: oauthProviders.filter(p => p.status === 'active').length,
      users: oauthProviders.reduce((sum, p) => sum + p.users, 0),
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

  const toggleProviderStatus = (id) => {
    // In a real app, this would update the provider status
    console.log('Toggling provider status:', id)
  }

  const deleteProvider = (id) => {
    // In a real app, this would delete the provider
    console.log('Deleting provider:', id)
  }

  const testConnection = (provider) => {
    // In a real app, this would test the OAuth connection
    console.log('Testing connection for:', provider.name)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">OAuth — Authentication Providers</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="monochrome-button-gold"
          >
            Add Provider
          </button>
          <button className="monochrome-button monochrome-button-secondary">
            Documentation
          </button>
        </div>
      </section>

      {/* OAuth Stats */}
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

      {/* OAuth Providers */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">OAuth Providers</div>
        <div className="space-y-4">
          {oauthProviders.map((provider) => (
            <div key={provider.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">
                        {provider.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">{provider.name}</h3>
                      <p className="text-sm text-gray-500">{provider.provider}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      provider.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {provider.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Users: {provider.users.toLocaleString()}</span>
                    <span>Last used: {provider.lastUsed}</span>
                    <span>Created: {provider.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedProvider(provider)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Configure
                  </button>
                  <button
                    onClick={() => testConnection(provider)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    Test
                  </button>
                  <button
                    onClick={() => toggleProviderStatus(provider.id)}
                    className={`px-3 py-1 text-sm rounded ${
                      provider.status === 'active'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {provider.status === 'active' ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => deleteProvider(provider.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Client ID: </span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                    {provider.clientId.substring(0, 20)}...
                  </code>
                </div>
                <div>
                  <span className="text-gray-600">Redirect URI: </span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                    {provider.redirectUri}
                  </code>
                </div>
                <div>
                  <span className="text-gray-600">Scopes: </span>
                  <span className="text-black">{provider.scopes.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Provider Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-black mb-4">Add OAuth Provider</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                  <option value="">Select provider</option>
                  <option value="google">Google</option>
                  <option value="apple">Apple</option>
                  <option value="facebook">Facebook</option>
                  <option value="github">GitHub</option>
                  <option value="microsoft">Microsoft</option>
                  <option value="twitter">Twitter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter client ID"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Client Secret</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter client secret"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Redirect URI</label>
                <input
                  type="url"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://app.biz365.ai/auth/callback"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scopes</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="openid, profile, email"
                />
                <p className="text-xs text-gray-500 mt-1">Separate scopes with commas</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="monochrome-button-gold px-4 py-2 text-sm"
              >
                Add Provider
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provider Details Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-black mb-4">Provider Configuration</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                  <p className="text-black">{selectedProvider.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedProvider.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedProvider.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                    {selectedProvider.clientId}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(selectedProvider.clientId)}
                    className="px-3 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                    {selectedProvider.clientSecret}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(selectedProvider.clientSecret)}
                    className="px-3 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redirect URI</label>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                  {selectedProvider.redirectUri}
                </code>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scopes</label>
                <div className="flex flex-wrap gap-2">
                  {selectedProvider.scopes.map((scope) => (
                    <span key={scope} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Users</label>
                  <p className="text-gray-700">{selectedProvider.users.toLocaleString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Used</label>
                  <p className="text-gray-700">{selectedProvider.lastUsed}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => testConnection(selectedProvider)}
                className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                Test Connection
              </button>
              <button
                onClick={() => setSelectedProvider(null)}
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
