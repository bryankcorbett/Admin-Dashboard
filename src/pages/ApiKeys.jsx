import { useState } from 'react'

const apiKeys = [
  {
    id: 1,
    name: 'Production API Key',
    key: 'sk-prod-1234567890abcdef',
    description: 'Main production API key for all services',
    permissions: ['read', 'write', 'admin'],
    lastUsed: '2 hours ago',
    status: 'active',
    createdAt: '2024-01-15',
    usage: { requests: 1247, limit: 10000 }
  },
  {
    id: 2,
    name: 'Development API Key',
    key: 'sk-dev-abcdef1234567890',
    description: 'Development and testing environment',
    permissions: ['read', 'write'],
    lastUsed: '1 day ago',
    status: 'active',
    createdAt: '2024-01-10',
    usage: { requests: 234, limit: 1000 }
  },
  {
    id: 3,
    name: 'Webhook Key',
    key: 'sk-webhook-9876543210fedcba',
    description: 'Webhook authentication for external services',
    permissions: ['read'],
    lastUsed: '3 days ago',
    status: 'inactive',
    createdAt: '2024-01-05',
    usage: { requests: 45, limit: 500 }
  },
  {
    id: 4,
    name: 'Mobile App Key',
    key: 'sk-mobile-fedcba0987654321',
    description: 'Mobile application authentication',
    permissions: ['read', 'write'],
    lastUsed: '5 minutes ago',
    status: 'active',
    createdAt: '2024-01-20',
    usage: { requests: 892, limit: 5000 }
  }
]

export default function ApiKeys() {
  const [keys, setKeys] = useState(apiKeys)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedKey, setSelectedKey] = useState(null)

  const generateNewKey = () => {
    const newKey = {
      id: Date.now(),
      name: 'New API Key',
      key: `sk-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      description: 'Generated API key',
      permissions: ['read'],
      lastUsed: 'Never',
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      usage: { requests: 0, limit: 1000 }
    }
    setKeys([...keys, newKey])
    setShowCreateModal(false)
  }

  const toggleKeyStatus = (id) => {
    setKeys(keys.map(key => 
      key.id === id 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ))
  }

  const deleteKey = (id) => {
    setKeys(keys.filter(key => key.id !== id))
  }

  const copyToClipboard = (key) => {
    navigator.clipboard.writeText(key)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">API Keys — Authentication Management</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="monochrome-button-gold"
          >
            Generate New Key
          </button>
          <button className="monochrome-button monochrome-button-secondary">
            Documentation
          </button>
        </div>
      </section>

      {/* API Key Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="monochrome-metric">
          <div className="text-sm text-gray-600 mb-2 font-medium">Total Keys</div>
          <div className="text-2xl font-bold text-black">{keys.length}</div>
        </div>
        <div className="monochrome-metric">
          <div className="text-sm text-gray-600 mb-2 font-medium">Active Keys</div>
          <div className="text-2xl font-bold text-black">{keys.filter(k => k.status === 'active').length}</div>
        </div>
        <div className="monochrome-metric">
          <div className="text-sm text-gray-600 mb-2 font-medium">Total Requests</div>
          <div className="text-2xl font-bold text-black">{keys.reduce((sum, k) => sum + k.usage.requests, 0).toLocaleString()}</div>
        </div>
        <div className="monochrome-metric">
          <div className="text-sm text-gray-600 mb-2 font-medium">Rate Limit</div>
          <div className="text-2xl font-bold text-black">1000/min</div>
        </div>
      </section>

      {/* API Keys List */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">API Keys</div>
        <div className="space-y-4">
          {keys.map((key) => (
            <div key={key.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-black">{key.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      key.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {key.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{key.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Created: {key.createdAt}</span>
                    <span>Last used: {key.lastUsed}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedKey(key)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    View
                  </button>
                  <button
                    onClick={() => toggleKeyStatus(key.id)}
                    className={`px-3 py-1 text-sm rounded ${
                      key.status === 'active'
                        ? 'bg-red-100 text-red-800 hover:bg-red-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {key.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => deleteKey(key.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Key: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                      {key.key.substring(0, 20)}...
                    </code>
                    <button
                      onClick={() => copyToClipboard(key.key)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Permissions: </span>
                    <span className="text-black">{key.permissions.join(', ')}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Usage: {key.usage.requests.toLocaleString()}/{key.usage.limit.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-black mb-4">Generate New API Key</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter key name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  rows="3"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="space-y-2">
                  {['read', 'write', 'admin'].map((permission) => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        defaultChecked={permission === 'read'}
                      />
                      <span className="text-sm text-gray-700 capitalize">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={generateNewKey}
                className="monochrome-button-gold px-4 py-2 text-sm"
              >
                Generate Key
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Key Details Modal */}
      {selectedKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-black mb-4">API Key Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-black">{selectedKey.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedKey.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedKey.status}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                    {selectedKey.key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(selectedKey.key)}
                    className="px-3 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-700">{selectedKey.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                  <p className="text-gray-700">{selectedKey.createdAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Used</label>
                  <p className="text-gray-700">{selectedKey.lastUsed}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usage</label>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">
                    {selectedKey.usage.requests.toLocaleString()} / {selectedKey.usage.limit.toLocaleString()} requests
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-black h-2 rounded-full"
                      style={{ width: `${(selectedKey.usage.requests / selectedKey.usage.limit) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedKey(null)}
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
