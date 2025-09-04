import { useState, useEffect, useMemo } from 'react'
import { cn } from '../../lib/utils'
import Modal from './Modal'
import EntityForm from './EntityForm'
import ConfirmDialog from './ConfirmDialog'
import Toast, { ToastContainer } from './Toast'
import { getEntitySchema } from '../../schemas/entitySchemas'
import { Plus, Edit, Trash2 } from 'lucide-react'

/**
 * Generic DataTable Component
 * Renders data from API endpoints with automatic column detection and formatting
 */
export default function DataTable({ 
  endpoint, 
  columns = null, 
  title = 'Data Table',
  searchable = true,
  sortable = true,
  pagination = true,
  pageSize = 20,
  className = ''
}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [paginationState, setPaginationStateState] = useState({
    page: 1,
    limit: pageSize,
    total: 0,
    pages: 0
  })
  const [filters, setFilters] = useState({
    search: '',
    sort: 'created_at',
    order: 'desc'
  })

  // CRUD state
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const [toasts, setToasts] = useState([])

  // Auto-detect columns from first data item if not provided
  const detectedColumns = useMemo(() => {
    if (columns) return columns
    
    if (data.length > 0) {
      const firstItem = data[0]
      return Object.keys(firstItem).map(key => ({
        key,
        label: formatColumnLabel(key),
        type: detectColumnType(firstItem[key]),
        sortable: true,
        searchable: true
      }))
    }
    
    return []
  }, [data, columns])

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Import API client dynamically to avoid circular dependencies
      const { default: apiClient } = await import('../../services/apiClient')
      
      const params = {
        page: paginationState.page,
        limit: paginationState.limit,
        ...filters
      }

      const response = await apiClient.get(endpoint, params)
      
      setData(response.data || [])
      setPaginationState(response.pagination || {
        page: 1,
        limit: pageSize,
        total: 0,
        pages: 0
      })
    } catch (err) {
      console.error('Failed to fetch data:', err)
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  // Fetch data when dependencies change
  useEffect(() => {
    fetchData()
  }, [endpoint, paginationState.page, paginationState.limit, filters.search, filters.sort, filters.order])

  // Handle search
  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }))
    setPaginationState(prev => ({ ...prev, page: 1 }))
  }

  // Handle sort
  const handleSort = (column) => {
    if (!sortable || !column.sortable) return
    
    const newOrder = filters.sort === column.key && filters.order === 'asc' ? 'desc' : 'asc'
    setFilters(prev => ({ ...prev, sort: column.key, order: newOrder }))
  }

  // Handle pagination
  const handlePageChange = (newPage) => {
    setPaginationState(prev => ({ ...prev, page: newPage }))
  }

  // Get entity schema for forms
  const entitySchema = getEntitySchema(endpoint.replace('/', ''))

  // Toast management
  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // CRUD Operations
  const handleCreate = async (formData) => {
    try {
      setFormLoading(true)
      const { default: apiClient } = await import('../../services/apiClient')
      await apiClient.createEntity(endpoint, formData)
      
      setShowCreateModal(false)
      addToast(`${title.slice(0, -1)} created successfully!`, 'success')
      fetchData() // Refresh data
    } catch (error) {
      console.error('Create error:', error)
      addToast(error.message || 'Failed to create item', 'error')
      throw error // Re-throw for form validation
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setFormLoading(true)
      const { default: apiClient } = await import('../../services/apiClient')
      await apiClient.updateEntity(endpoint, selectedItem.id, formData)
      
      setShowEditModal(false)
      setSelectedItem(null)
      addToast(`${title.slice(0, -1)} updated successfully!`, 'success')
      fetchData() // Refresh data
    } catch (error) {
      console.error('Update error:', error)
      addToast(error.message || 'Failed to update item', 'error')
      throw error // Re-throw for form validation
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setFormLoading(true)
      const { default: apiClient } = await import('../../services/apiClient')
      await apiClient.deleteEntity(endpoint, selectedItem.id)
      
      setShowDeleteDialog(false)
      setSelectedItem(null)
      addToast(`${title.slice(0, -1)} deleted successfully!`, 'success')
      fetchData() // Refresh data
    } catch (error) {
      console.error('Delete error:', error)
      addToast(error.message || 'Failed to delete item', 'error')
    } finally {
      setFormLoading(false)
    }
  }

  // Action handlers
  const handleEditClick = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedItem(item)
    setShowDeleteDialog(true)
  }

  // Format cell value based on column type
  const formatCellValue = (value, column) => {
    if (value === null || value === undefined) {
      return <span className="text-gray-400">—</span>
    }

    switch (column.type) {
      case 'boolean':
        return (
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {value ? 'Yes' : 'No'}
          </span>
        )
      
      case 'enum':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {value}
          </span>
        )
      
      case 'timestamp':
        return new Date(value).toLocaleString()
      
      case 'email':
        return (
          <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800">
            {value}
          </a>
        )
      
      case 'url':
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            {value}
          </a>
        )
      
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value
      
      case 'json':
        return (
          <pre className="text-xs bg-gray-100 p-2 rounded max-w-xs overflow-auto">
            {JSON.stringify(value, null, 2)}
          </pre>
        )
      
      default:
        return String(value)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="text-center">
            <div className="text-red-600 mb-2">⚠️ Error loading data</div>
            <div className="text-sm text-gray-600 mb-4">{error}</div>
            <button 
              onClick={fetchData}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200", className)}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-4">
            {searchable && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {detectedColumns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    sortable && column.sortable && "cursor-pointer hover:bg-gray-100"
                  )}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortable && column.sortable && (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={row.id || index} className="hover:bg-gray-50">
                {detectedColumns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCellValue(row[column.key], column)}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditClick(row)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-amber-600 hover:text-amber-900 hover:bg-amber-50 rounded transition-colors"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(row)}
                      className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 hover:text-red-900 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && paginationState.pages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((paginationState.page - 1) * paginationState.limit) + 1} to {Math.min(paginationState.page * paginationState.limit, paginationState.total)} of {paginationState.total} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(paginationState.page - 1)}
                disabled={paginationState.page <= 1}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {[...Array(Math.min(5, paginationState.pages))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={cn(
                      "px-3 py-1 border rounded-md text-sm",
                      paginationState.page === pageNum
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "border-gray-300 hover:bg-gray-50"
                    )}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              <button
                onClick={() => handlePageChange(paginationState.page + 1)}
                disabled={paginationState.page >= paginationState.pages}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data.length === 0 && !loading && (
        <div className="px-6 py-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No data found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filters.search ? 'Try adjusting your search criteria.' : 'Get started by adding some data.'}
          </p>
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={`Create New ${title.slice(0, -1)}`}
      >
        <EntityForm
          schema={entitySchema}
          onSubmit={handleCreate}
          loading={formLoading}
          submitText="Create"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedItem(null)
        }}
        title={`Edit ${title.slice(0, -1)}`}
      >
        {selectedItem && (
          <EntityForm
            schema={entitySchema}
            initialData={selectedItem}
            onSubmit={handleEdit}
            loading={formLoading}
            submitText="Update"
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setSelectedItem(null)
        }}
        onConfirm={handleDelete}
        title={`Delete ${title.slice(0, -1)}`}
        message={`Are you sure you want to delete this ${title.slice(0, -1).toLowerCase()}? This action cannot be undone.`}
        confirmText="Delete"
        loading={formLoading}
      />

      {/* Toast Container */}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </ToastContainer>
    </div>
  )
}

// Helper functions

/**
 * Format column label from key
 */
function formatColumnLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

/**
 * Detect column type from value
 */
function detectColumnType(value) {
  if (value === null || value === undefined) return 'text'
  
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'object') return 'json'
  
  const stringValue = String(value)
  
  // Check for common patterns
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(stringValue)) return 'timestamp'
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) return 'email'
  if (/^https?:\/\//.test(stringValue)) return 'url'
  if (['active', 'inactive', 'pending', 'suspended'].includes(stringValue)) return 'enum'
  if (['customer', 'store_owner', 'admin', 'super_admin'].includes(stringValue)) return 'enum'
  
  return 'text'
}
