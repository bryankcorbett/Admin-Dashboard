import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'
import Modal from '../components/admin/Modal'
import EntityForm from '../components/admin/EntityForm'
import ConfirmDialog from '../components/admin/ConfirmDialog'
import Toast, { ToastContainer } from '../components/admin/Toast'
import { Shield, Users, Plus, Edit, Trash2, Check, X } from 'lucide-react'

/**
 * Roles & Policies Management Page
 * Manages user roles, permissions, and access policies
 */
export default function Roles() {
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toasts, setToasts] = useState([])
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPermissionsModal, setShowPermissionsModal] = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const [formLoading, setFormLoading] = useState(false)

  // Permissions matrix state
  const [permissionMatrix, setPermissionMatrix] = useState({})

  useEffect(() => {
    fetchRoles()
    fetchPermissions()
  }, [])

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const { default: apiClient } = await import('../services/apiClient')
      const response = await apiClient.listEntities('/admin/roles')
      setRoles(response.data || [])
    } catch (error) {
      console.error('Error fetching roles:', error)
      setError(error.message || 'Failed to connect to API server')
      addToast(error.message || 'Failed to load roles. Please ensure the backend server is running.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchPermissions = async () => {
    try {
      const { default: apiClient } = await import('../services/apiClient')
      const response = await apiClient.listEntities('/admin/permissions')
      setPermissions(response.data || [])
    } catch (error) {
      console.error('Error fetching permissions:', error)
      addToast(error.message || 'Failed to load permissions. Please ensure the backend server is running.', 'error')
    }
  }

  const fetchRolePermissions = async (roleId) => {
    try {
      const { default: apiClient } = await import('../services/apiClient')
      const response = await apiClient.getEntity('/admin/roles', roleId)
      return response.data?.permissions || []
    } catch (error) {
      console.error('Error fetching role permissions:', error)
      return []
    }
  }

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
      const { default: apiClient } = await import('../services/apiClient')
      await apiClient.createEntity('/admin/roles', formData)
      
      setShowCreateModal(false)
      addToast('Role created successfully!', 'success')
      fetchRoles()
    } catch (error) {
      console.error('Create error:', error)
      addToast(error.message || 'Failed to create role', 'error')
      throw error
    } finally {
      setFormLoading(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setFormLoading(true)
      const { default: apiClient } = await import('../services/apiClient')
      await apiClient.updateEntity('/admin/roles', selectedRole.id, formData)
      
      setShowEditModal(false)
      setSelectedRole(null)
      addToast('Role updated successfully!', 'success')
      fetchRoles()
    } catch (error) {
      console.error('Update error:', error)
      addToast(error.message || 'Failed to update role', 'error')
      throw error
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setFormLoading(true)
      const { default: apiClient } = await import('../services/apiClient')
      await apiClient.deleteEntity('/admin/roles', selectedRole.id)
      
      setShowDeleteDialog(false)
      setSelectedRole(null)
      addToast('Role deleted successfully!', 'success')
      fetchRoles()
    } catch (error) {
      console.error('Delete error:', error)
      addToast(error.message || 'Failed to delete role', 'error')
    } finally {
      setFormLoading(false)
    }
  }

  const handlePermissionsUpdate = async (roleId, permissionId, granted) => {
    try {
      const { default: apiClient } = await import('../services/apiClient')
      const action = granted ? 'grant' : 'revoke'
      await apiClient.post(`/admin/roles/${roleId}/permissions`, {
        permission_id: permissionId,
        action: action
      })
      
      addToast(`Permission ${action}ed successfully!`, 'success')
      fetchRoles()
    } catch (error) {
      console.error('Permission update error:', error)
      addToast(error.message || 'Failed to update permission', 'error')
    }
  }

  // Action handlers
  const handleEditClick = (role) => {
    setSelectedRole(role)
    setShowEditModal(true)
  }

  const handleDeleteClick = (role) => {
    setSelectedRole(role)
    setShowDeleteDialog(true)
  }

  const handlePermissionsClick = async (role) => {
    setSelectedRole(role)
    const rolePermissions = await fetchRolePermissions(role.id)
    
    // Build permission matrix
    const matrix = {}
    permissions.forEach(permission => {
      matrix[permission.id] = rolePermissions.some(rp => rp.id === permission.id)
    })
    setPermissionMatrix(matrix)
    setShowPermissionsModal(true)
  }

  const roleSchema = {
    name: { type: 'text', required: true, label: 'Role Name' },
    description: { type: 'textarea', required: false, label: 'Description' },
    level: { type: 'select', required: true, label: 'Level', options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'manager', label: 'Manager' },
      { value: 'user', label: 'User' },
      { value: 'guest', label: 'Guest' }
    ]},
    status: { type: 'select', required: true, label: 'Status', options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]}
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center">
          <X className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-sm font-medium text-red-800">Error loading roles</h3>
        </div>
        <p className="mt-2 text-sm text-red-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roles & Policies</h1>
          <p className="text-gray-600 mt-1">Manage user roles and permissions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-amber-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{role.level}</p>
                </div>
              </div>
              <span className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                role.status === 'active' 
                  ? "bg-green-100 text-green-800" 
                  : "bg-gray-100 text-gray-800"
              )}>
                {role.status}
              </span>
            </div>
            
            <p className="mt-3 text-sm text-gray-600">{role.description}</p>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                {role.user_count || 0} users
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePermissionsClick(role)}
                  className="text-amber-600 hover:text-amber-900 text-sm font-medium"
                >
                  Permissions
                </button>
                <button
                  onClick={() => handleEditClick(role)}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(role)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {roles.length === 0 && (
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No roles found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new role.</p>
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Role"
      >
        <EntityForm
          schema={roleSchema}
          onSubmit={handleCreate}
          loading={formLoading}
          submitText="Create Role"
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedRole(null)
        }}
        title="Edit Role"
      >
        {selectedRole && (
          <EntityForm
            schema={roleSchema}
            initialData={selectedRole}
            onSubmit={handleEdit}
            loading={formLoading}
            submitText="Update Role"
          />
        )}
      </Modal>

      {/* Permissions Modal */}
      <Modal
        isOpen={showPermissionsModal}
        onClose={() => {
          setShowPermissionsModal(false)
          setSelectedRole(null)
          setPermissionMatrix({})
        }}
        title={`Manage Permissions - ${selectedRole?.name}`}
        size="large"
      >
        {selectedRole && (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              Configure permissions for the <strong>{selectedRole.name}</strong> role
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Granted
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {permissions.map((permission) => (
                    <tr key={permission.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {permission.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {permission.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handlePermissionsUpdate(
                            selectedRole.id, 
                            permission.id, 
                            !permissionMatrix[permission.id]
                          )}
                          className={cn(
                            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors",
                            permissionMatrix[permission.id]
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          )}
                        >
                          {permissionMatrix[permission.id] ? (
                            <Check className="h-3 w-3 mr-1" />
                          ) : (
                            <X className="h-3 w-3 mr-1" />
                          )}
                          {permissionMatrix[permission.id] ? 'Granted' : 'Denied'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false)
          setSelectedRole(null)
        }}
        onConfirm={handleDelete}
        title="Delete Role"
        message={`Are you sure you want to delete the "${selectedRole?.name}" role? This action cannot be undone and may affect user access.`}
        confirmText="Delete Role"
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
