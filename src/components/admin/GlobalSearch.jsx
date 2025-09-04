import { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'
import { Search, X, Users, Smartphone, Store, Settings, FileText, ArrowRight } from 'lucide-react'

/**
 * Global Search Component
 * Provides search across all entities in the admin panel
 */
export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef(null)

  // Search entities configuration
  const searchEntities = [
    { key: 'users', label: 'Users', icon: Users, color: 'text-blue-500' },
    { key: 'nfc-tags', label: 'NFC Tags', icon: Smartphone, color: 'text-green-500' },
    { key: 'stores', label: 'Stores', icon: Store, color: 'text-purple-500' },
    { key: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-500' },
    { key: 'logs', label: 'Logs', icon: FileText, color: 'text-red-500' }
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length >= 2) {
      const timeoutId = setTimeout(() => {
        performSearch(query)
      }, 300)
      return () => clearTimeout(timeoutId)
    } else {
      setResults({})
    }
  }, [query])

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true)
      setError(null)
      
      const { default: apiClient } = await import('../../services/apiClient')
      const response = await apiClient.get('/admin/search', { q: searchQuery })
      
      setResults(response.data || {})
    } catch (error) {
      console.error('Search error:', error)
      setError('Failed to perform search')
      setResults({})
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, getTotalResults() - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      const result = getFlatResults()[selectedIndex]
      if (result) {
        handleResultClick(result)
      }
    }
  }

  const getTotalResults = () => {
    return Object.values(results).reduce((total, entityResults) => total + entityResults.length, 0)
  }

  const getFlatResults = () => {
    const flatResults = []
    searchEntities.forEach(entity => {
      if (results[entity.key]) {
        results[entity.key].forEach(result => {
          flatResults.push({ ...result, entityType: entity.key, entityLabel: entity.label })
        })
      }
    })
    return flatResults
  }

  const handleResultClick = (result) => {
    // Navigate to the appropriate page
    const routes = {
      'users': '/admin/users',
      'nfc-tags': '/admin/nfc-tags',
      'stores': '/admin/stores',
      'settings': '/admin/settings',
      'logs': '/admin/logs'
    }
    
    const route = routes[result.entityType]
    if (route) {
      window.location.href = route
      onClose()
    }
  }

  const formatResultTitle = (result, entityType) => {
    switch (entityType) {
      case 'users':
        return `${result.first_name} ${result.last_name}` || result.email
      case 'nfc-tags':
        return result.tag_id || result.target_url
      case 'stores':
        return result.name || result.business_name
      case 'settings':
        return result.key
      case 'logs':
        return result.message
      default:
        return result.name || result.title || result.id
    }
  }

  const formatResultSubtitle = (result, entityType) => {
    switch (entityType) {
      case 'users':
        return result.email
      case 'nfc-tags':
        return result.description || result.target_url
      case 'stores':
        return result.address || result.owner_email
      case 'settings':
        return result.description || result.value
      case 'logs':
        return `${result.level} • ${new Date(result.timestamp).toLocaleString()}`
      default:
        return result.description || result.subtitle
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div className="relative w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search across all entities..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-10 py-3 text-lg border-0 focus:ring-0 focus:outline-none"
                />
                <button
                  onClick={onClose}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {loading && (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-500">Searching...</p>
                </div>
              )}

              {error && (
                <div className="p-8 text-center">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {!loading && !error && query.length < 2 && (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">Type at least 2 characters to search</p>
                </div>
              )}

              {!loading && !error && query.length >= 2 && getTotalResults() === 0 && (
                <div className="p-8 text-center">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm text-gray-500">No results found for "{query}"</p>
                </div>
              )}

              {!loading && !error && getTotalResults() > 0 && (
                <div className="divide-y divide-gray-200">
                  {searchEntities.map((entity) => {
                    const entityResults = results[entity.key] || []
                    if (entityResults.length === 0) return null

                    const Icon = entity.icon
                    return (
                      <div key={entity.key} className="p-4">
                        <div className="flex items-center mb-3">
                          <Icon className={cn("h-4 w-4 mr-2", entity.color)} />
                          <h3 className="text-sm font-medium text-gray-900">{entity.label}</h3>
                          <span className="ml-2 text-xs text-gray-500">({entityResults.length})</span>
                        </div>
                        
                        <div className="space-y-1">
                          {entityResults.slice(0, 3).map((result, index) => {
                            const globalIndex = getFlatResults().findIndex(r => 
                              r.id === result.id && r.entityType === entity.key
                            )
                            const isSelected = globalIndex === selectedIndex
                            
                            return (
                              <button
                                key={result.id}
                                onClick={() => handleResultClick({ ...result, entityType: entity.key, entityLabel: entity.label })}
                                className={cn(
                                  "w-full text-left p-3 rounded-lg transition-colors",
                                  isSelected 
                                    ? "bg-amber-50 border border-amber-200" 
                                    : "hover:bg-gray-50"
                                )}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {formatResultTitle(result, entity.key)}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                      {formatResultSubtitle(result, entity.key)}
                                    </p>
                                  </div>
                                  <ArrowRight className="h-4 w-4 text-gray-400 ml-2 flex-shrink-0" />
                                </div>
                              </button>
                            )
                          })}
                          
                          {entityResults.length > 3 && (
                            <div className="text-xs text-gray-500 text-center py-2">
                              +{entityResults.length - 3} more results
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
                <div>
                  {getTotalResults() > 0 && `${getTotalResults()} results`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
