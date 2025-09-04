import { useState, useEffect } from 'react'

const backupHistory = [
  {
    id: 1,
    name: 'Full System Backup',
    type: 'full',
    size: '2.4 GB',
    status: 'completed',
    createdAt: '2024-01-20 14:30:00',
    duration: '12 minutes',
    files: 1247,
    location: 's3://biz365-backups/full-20240120-143000.tar.gz'
  },
  {
    id: 2,
    name: 'Database Backup',
    type: 'database',
    size: '856 MB',
    status: 'completed',
    createdAt: '2024-01-20 12:00:00',
    duration: '5 minutes',
    files: 23,
    location: 's3://biz365-backups/db-20240120-120000.sql'
  },
  {
    id: 3,
    name: 'User Data Backup',
    type: 'users',
    size: '1.2 GB',
    status: 'completed',
    createdAt: '2024-01-19 18:00:00',
    duration: '8 minutes',
    files: 892,
    location: 's3://biz365-backups/users-20240119-180000.tar.gz'
  },
  {
    id: 4,
    name: 'Configuration Backup',
    type: 'config',
    size: '45 MB',
    status: 'failed',
    createdAt: '2024-01-19 15:30:00',
    duration: '2 minutes',
    files: 0,
    location: 's3://biz365-backups/config-20240119-153000.tar.gz',
    error: 'Connection timeout to S3'
  },
  {
    id: 5,
    name: 'Incremental Backup',
    type: 'incremental',
    size: '234 MB',
    status: 'completed',
    createdAt: '2024-01-19 12:00:00',
    duration: '3 minutes',
    files: 156,
    location: 's3://biz365-backups/inc-20240119-120000.tar.gz'
  }
]

const backupStats = [
  { label: 'Total Backups', value: 0, key: 'total' },
  { label: 'Successful', value: 0, key: 'successful' },
  { label: 'Failed', value: 0, key: 'failed' },
  { label: 'Total Size', value: 0, key: 'size' },
  { label: 'Last Backup', value: 0, key: 'last' },
]

export default function Backups() {
  const [stats, setStats] = useState(backupStats)
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState(null)

  useEffect(() => {
    // Simulate demo data loading
    const demoData = {
      total: backupHistory.length,
      successful: backupHistory.filter(b => b.status === 'completed').length,
      failed: backupHistory.filter(b => b.status === 'failed').length,
      size: 4.7, // GB
      last: 1 // hours ago
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

  const createBackup = async (type) => {
    setIsCreatingBackup(true)
    // Simulate backup creation
    setTimeout(() => {
      const newBackup = {
        id: Date.now(),
        name: `${type.charAt(0).toUpperCase() + type.slice(1)} Backup`,
        type: type,
        size: '0 MB',
        status: 'in_progress',
        createdAt: new Date().toLocaleString(),
        duration: '0 minutes',
        files: 0,
        location: 's3://biz365-backups/...'
      }
      // In a real app, this would update the state
      setIsCreatingBackup(false)
    }, 3000)
  }

  const downloadBackup = (backup) => {
    // Simulate download
    console.log('Downloading backup:', backup.name)
  }

  const restoreBackup = (backup) => {
    // Simulate restore
    console.log('Restoring backup:', backup.name)
  }

  const deleteBackup = (backupId) => {
    // Simulate delete
    console.log('Deleting backup:', backupId)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-black">Backups — Data Protection</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => createBackup('full')}
            disabled={isCreatingBackup}
            className="monochrome-button-gold disabled:opacity-50"
          >
            {isCreatingBackup ? 'Creating...' : 'Create Backup'}
          </button>
          <button className="monochrome-button monochrome-button-secondary">
            Settings
          </button>
        </div>
      </section>

      {/* Backup Stats */}
      <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <div key={stat.key} className="monochrome-metric">
            <div className="text-sm text-gray-600 mb-2 font-medium">{stat.label}</div>
            <div className="text-2xl font-bold text-black">
              {stat.key === 'size' ? `${stat.value} GB` : 
               stat.key === 'last' ? `${stat.value}h ago` : 
               stat.value.toLocaleString()}
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-4 text-black">Quick Actions</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => createBackup('full')}
            disabled={isCreatingBackup}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">Full Backup</p>
              <p className="text-xs text-gray-500">Complete system backup</p>
            </div>
          </button>

          <button
            onClick={() => createBackup('database')}
            disabled={isCreatingBackup}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">Database</p>
              <p className="text-xs text-gray-500">Database only backup</p>
            </div>
          </button>

          <button
            onClick={() => createBackup('users')}
            disabled={isCreatingBackup}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">User Data</p>
              <p className="text-xs text-gray-500">User accounts & data</p>
            </div>
          </button>

          <button
            onClick={() => createBackup('config')}
            disabled={isCreatingBackup}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <div className="text-center">
              <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">Configuration</p>
              <p className="text-xs text-gray-500">System settings</p>
            </div>
          </button>
        </div>
      </section>

      {/* Backup History */}
      <section className="monochrome-card p-6">
        <div className="text-lg font-bold mb-6 text-black">Backup History</div>
        <div className="space-y-4">
          {backupHistory.map((backup) => (
            <div key={backup.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-black">{backup.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      backup.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : backup.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {backup.status}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      {backup.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Size: {backup.size}</span>
                    <span>Files: {backup.files.toLocaleString()}</span>
                    <span>Duration: {backup.duration}</span>
                    <span>Created: {backup.createdAt}</span>
                  </div>
                  {backup.error && (
                    <div className="text-sm text-red-600 mt-2">
                      Error: {backup.error}
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedBackup(backup)}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Details
                  </button>
                  {backup.status === 'completed' && (
                    <>
                      <button
                        onClick={() => downloadBackup(backup)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                      >
                        Download
                      </button>
                      <button
                        onClick={() => restoreBackup(backup)}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                      >
                        Restore
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => deleteBackup(backup.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <span className="font-medium">Location: </span>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                  {backup.location}
                </code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Backup Details Modal */}
      {selectedBackup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-black mb-4">Backup Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <p className="text-black">{selectedBackup.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                    {selectedBackup.type}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <p className="text-gray-700">{selectedBackup.size}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedBackup.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : selectedBackup.status === 'failed'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedBackup.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                  <p className="text-gray-700">{selectedBackup.createdAt}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <p className="text-gray-700">{selectedBackup.duration}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Files</label>
                <p className="text-gray-700">{selectedBackup.files.toLocaleString()} files</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <code className="block bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                  {selectedBackup.location}
                </code>
              </div>
              {selectedBackup.error && (
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-1">Error</label>
                  <p className="text-red-600">{selectedBackup.error}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              {selectedBackup.status === 'completed' && (
                <>
                  <button
                    onClick={() => downloadBackup(selectedBackup)}
                    className="px-4 py-2 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => restoreBackup(selectedBackup)}
                    className="px-4 py-2 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                  >
                    Restore
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedBackup(null)}
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
