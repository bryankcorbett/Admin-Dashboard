/**
 * Admin API Client
 * Handles all API communication for the admin panel
 */
import { 
  mockUsers, 
  mockNfcTags, 
  mockStores, 
  mockRoles, 
  mockPermissions, 
  mockLogs, 
  mockSettings,
  mockRolePermissions,
  simulateApiDelay,
  paginateData,
  filterData,
  sortData,
  generateId
} from './mockData'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true // Default to mock data

class ApiClient {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api/admin`
    this.token = localStorage.getItem('admin_token')
    
    // Initialize mock data storage
    if (USE_MOCK_DATA) {
      this.initializeMockData()
    }
  }

  /**
   * Initialize mock data in localStorage
   */
  initializeMockData() {
    if (!localStorage.getItem('mock_users')) {
      localStorage.setItem('mock_users', JSON.stringify(mockUsers))
    }
    if (!localStorage.getItem('mock_nfc_tags')) {
      localStorage.setItem('mock_nfc_tags', JSON.stringify(mockNfcTags))
    }
    if (!localStorage.getItem('mock_stores')) {
      localStorage.setItem('mock_stores', JSON.stringify(mockStores))
    }
    if (!localStorage.getItem('mock_roles')) {
      localStorage.setItem('mock_roles', JSON.stringify(mockRoles))
    }
    if (!localStorage.getItem('mock_permissions')) {
      localStorage.setItem('mock_permissions', JSON.stringify(mockPermissions))
    }
    if (!localStorage.getItem('mock_logs')) {
      localStorage.setItem('mock_logs', JSON.stringify(mockLogs))
    }
    if (!localStorage.getItem('mock_settings')) {
      localStorage.setItem('mock_settings', JSON.stringify(mockSettings))
    }
    if (!localStorage.getItem('mock_role_permissions')) {
      localStorage.setItem('mock_role_permissions', JSON.stringify(mockRolePermissions))
    }
  }

  /**
   * Get mock data from localStorage
   */
  getMockData(key) {
    const data = localStorage.getItem(`mock_${key}`)
    return data ? JSON.parse(data) : []
  }

  /**
   * Set mock data in localStorage
   */
  setMockData(key, data) {
    localStorage.setItem(`mock_${key}`, JSON.stringify(data))
  }

  /**
   * Mock API response wrapper
   */
  async mockResponse(data, delay = 300) {
    await simulateApiDelay(delay)
    return {
      ok: true,
      data: data.data || data,
      pagination: data.pagination,
      total: data.total,
      pages: data.pages
    }
  }

  /**
   * Set authentication token
   */
  setToken(token) {
    this.token = token
    if (token) {
      localStorage.setItem('admin_token', token)
    } else {
      localStorage.removeItem('admin_token')
    }
  }

  /**
   * Get authentication headers
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    let data
    try {
      data = await response.json()
    } catch (error) {
      // Handle cases where response is not valid JSON
      throw new Error('Invalid response from server')
    }

    if (!response.ok) {
      const error = new Error(data.error || 'API request failed')
      error.code = data.code
      error.details = data.details
      error.status = response.status
      throw error
    }

    return data
  }

  /**
   * Generic request method
   */
  async request(endpoint, options = {}) {
    // Use mock data if enabled
    if (USE_MOCK_DATA) {
      return this.handleMockRequest(endpoint, options)
    }
    
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      const response = await fetch(url, config)
      return await this.handleResponse(response)
    } catch (error) {
      console.error('API request failed:', error)
      
      // Check if it's a network error (backend not running)
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Unable to connect to the API server. Please ensure the backend server is running on http://localhost:8000')
      }
      
      throw error
    }
  }

  /**
   * Handle mock requests
   */
  async handleMockRequest(endpoint, options = {}) {
    const method = options.method || 'GET'
    const body = options.body ? JSON.parse(options.body) : null
    
    // Parse endpoint to determine entity and action
    const pathParts = endpoint.split('/')
    const entity = pathParts[1] || pathParts[0]
    const id = pathParts[2]
    
    switch (method) {
      case 'GET':
        return this.handleMockGet(entity, id, endpoint)
      case 'POST':
        return this.handleMockPost(entity, body, endpoint)
      case 'PUT':
        return this.handleMockPut(entity, id, body)
      case 'DELETE':
        return this.handleMockDelete(entity, id)
      default:
        throw new Error(`Unsupported method: ${method}`)
    }
  }

  /**
   * Handle mock GET requests
   */
  async handleMockGet(entity, id, fullEndpoint) {
    const url = new URL(`http://localhost${fullEndpoint}`)
    const params = Object.fromEntries(url.searchParams)
    
    if (id) {
      // Get single item
      const data = this.getMockData(entity.replace('-', '_'))
      const item = data.find(item => item.id === parseInt(id))
      if (!item) {
        throw new Error('Item not found')
      }
      return this.mockResponse(item)
    } else {
      // Get list with pagination and filtering
      let data = this.getMockData(entity.replace('-', '_'))
      
      // Apply filters
      data = filterData(data, params)
      
      // Apply sorting
      if (params.sort) {
        data = sortData(data, params.sort, params.order || 'desc')
      }
      
      // Apply pagination
      const page = parseInt(params.page) || 1
      const limit = parseInt(params.limit) || 20
      const result = paginateData(data, page, limit)
      
      return this.mockResponse(result)
    }
  }

  /**
   * Handle mock POST requests
   */
  async handleMockPost(entity, body, fullEndpoint) {
    // Handle special endpoints
    if (fullEndpoint.includes('/bulk-delete')) {
      return this.handleMockBulkDelete(entity, body)
    }
    
    if (fullEndpoint.includes('/permissions')) {
      return this.handleMockPermissionUpdate(entity, body, fullEndpoint)
    }
    
    // Regular create operation
    const data = this.getMockData(entity.replace('-', '_'))
    const newItem = {
      ...body,
      id: generateId(data),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    data.push(newItem)
    this.setMockData(entity.replace('-', '_'), data)
    
    return this.mockResponse(newItem)
  }

  /**
   * Handle mock PUT requests
   */
  async handleMockPut(entity, id, body) {
    const data = this.getMockData(entity.replace('-', '_'))
    const index = data.findIndex(item => item.id === parseInt(id))
    
    if (index === -1) {
      throw new Error('Item not found')
    }
    
    data[index] = {
      ...data[index],
      ...body,
      updated_at: new Date().toISOString()
    }
    
    this.setMockData(entity.replace('-', '_'), data)
    
    return this.mockResponse(data[index])
  }

  /**
   * Handle mock DELETE requests
   */
  async handleMockDelete(entity, id) {
    const data = this.getMockData(entity.replace('-', '_'))
    const filteredData = data.filter(item => item.id !== parseInt(id))
    
    if (data.length === filteredData.length) {
      throw new Error('Item not found')
    }
    
    this.setMockData(entity.replace('-', '_'), filteredData)
    
    return this.mockResponse({ success: true })
  }

  /**
   * Handle mock bulk delete
   */
  async handleMockBulkDelete(entity, body) {
    const data = this.getMockData(entity.replace('-', '_'))
    const idsToDelete = body.log_ids || body.ids || []
    const filteredData = data.filter(item => !idsToDelete.includes(item.id))
    
    this.setMockData(entity.replace('-', '_'), filteredData)
    
    return this.mockResponse({ success: true, deleted: idsToDelete.length })
  }

  /**
   * Handle mock permission updates
   */
  async handleMockPermissionUpdate(entity, body, fullEndpoint) {
    const roleId = parseInt(fullEndpoint.split('/')[3])
    const { permission_id, action } = body
    
    const rolePermissions = this.getMockData('role_permissions')
    
    if (!rolePermissions[roleId]) {
      rolePermissions[roleId] = []
    }
    
    if (action === 'grant') {
      if (!rolePermissions[roleId].includes(permission_id)) {
        rolePermissions[roleId].push(permission_id)
      }
    } else if (action === 'revoke') {
      rolePermissions[roleId] = rolePermissions[roleId].filter(id => id !== permission_id)
    }
    
    this.setMockData('role_permissions', rolePermissions)
    
    return this.mockResponse({ success: true })
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    if (USE_MOCK_DATA) {
      const queryString = new URLSearchParams(params).toString()
      const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint
      return this.handleMockRequest(fullEndpoint, { method: 'GET' })
    }
    
    const url = new URL(`${this.baseURL}${endpoint}`)
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        url.searchParams.append(key, params[key])
      }
    })

    return this.request(url.pathname + url.search, {
      method: 'GET',
    })
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    if (USE_MOCK_DATA) {
      return this.handleMockRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      })
    }
    
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    if (USE_MOCK_DATA) {
      return this.handleMockRequest(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data)
      })
    }
    
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    if (USE_MOCK_DATA) {
      return this.handleMockRequest(endpoint, { method: 'DELETE' })
    }
    
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }

  // ===== USERS API =====

  /**
   * Get users list with pagination and filters
   */
  async getUsers(params = {}) {
    return this.get('/users', params)
  }

  /**
   * Get single user by ID
   */
  async getUser(id) {
    return this.get(`/users/${id}`)
  }

  /**
   * Create new user
   */
  async createUser(userData) {
    return this.post('/users', userData)
  }

  /**
   * Update user
   */
  async updateUser(id, userData) {
    return this.put(`/users/${id}`, userData)
  }

  /**
   * Delete user
   */
  async deleteUser(id) {
    return this.delete(`/users/${id}`)
  }

  // ===== NFC TAGS API =====

  /**
   * Get NFC tags list
   */
  async getNfcTags(params = {}) {
    return this.get('/nfc-tags', params)
  }

  /**
   * Get single NFC tag
   */
  async getNfcTag(id) {
    return this.get(`/nfc-tags/${id}`)
  }

  /**
   * Create new NFC tag
   */
  async createNfcTag(tagData) {
    return this.post('/nfc-tags', tagData)
  }

  /**
   * Update NFC tag
   */
  async updateNfcTag(id, tagData) {
    return this.put(`/nfc-tags/${id}`, tagData)
  }

  /**
   * Delete NFC tag
   */
  async deleteNfcTag(id) {
    return this.delete(`/nfc-tags/${id}`)
  }

  // ===== STORES API =====

  /**
   * Get stores list
   */
  async getStores(params = {}) {
    return this.get('/stores', params)
  }

  /**
   * Get single store
   */
  async getStore(id) {
    return this.get(`/stores/${id}`)
  }

  /**
   * Create new store
   */
  async createStore(storeData) {
    return this.post('/stores', storeData)
  }

  /**
   * Update store
   */
  async updateStore(id, storeData) {
    return this.put(`/stores/${id}`, storeData)
  }

  /**
   * Delete store
   */
  async deleteStore(id) {
    return this.delete(`/stores/${id}`)
  }

  // ===== SETTINGS API =====

  /**
   * Get system settings
   */
  async getSettings() {
    if (USE_MOCK_DATA) {
      await simulateApiDelay()
      return this.mockResponse(this.getMockData('settings'))
    }
    return this.get('/settings')
  }

  /**
   * Update system settings
   */
  async updateSettings(settingsData) {
    if (USE_MOCK_DATA) {
      await simulateApiDelay()
      this.setMockData('settings', settingsData)
      return this.mockResponse(settingsData)
    }
    return this.put('/settings', settingsData)
  }

  // ===== ROLES & PERMISSIONS API =====

  /**
   * Get roles list
   */
  async getRoles(params = {}) {
    if (USE_MOCK_DATA) {
      let data = this.getMockData('roles')
      data = filterData(data, params)
      data = sortData(data, params.sort, params.order)
      const result = paginateData(data, params.page, params.limit)
      return this.mockResponse(result)
    }
    return this.get('/admin/roles', params)
  }

  /**
   * Get single role
   */
  async getRole(id) {
    if (USE_MOCK_DATA) {
      const roles = this.getMockData('roles')
      const role = roles.find(r => r.id === parseInt(id))
      if (!role) throw new Error('Role not found')
      
      // Add permissions to role
      const rolePermissions = this.getMockData('role_permissions')
      const permissions = this.getMockData('permissions')
      role.permissions = permissions.filter(p => rolePermissions[id]?.includes(p.id))
      
      return this.mockResponse(role)
    }
    return this.get(`/admin/roles/${id}`)
  }

  /**
   * Create new role
   */
  async createRole(roleData) {
    return this.post('/admin/roles', roleData)
  }

  /**
   * Update role
   */
  async updateRole(id, roleData) {
    return this.put(`/admin/roles/${id}`, roleData)
  }

  /**
   * Delete role
   */
  async deleteRole(id) {
    return this.delete(`/admin/roles/${id}`)
  }

  /**
   * Get permissions list
   */
  async getPermissions(params = {}) {
    if (USE_MOCK_DATA) {
      let data = this.getMockData('permissions')
      data = filterData(data, params)
      const result = paginateData(data, params.page, params.limit)
      return this.mockResponse(result)
    }
    return this.get('/admin/permissions', params)
  }

  /**
   * Grant permission to role
   */
  async grantPermission(roleId, permissionId) {
    return this.post(`/admin/roles/${roleId}/permissions`, {
      permission_id: permissionId,
      action: 'grant'
    })
  }

  /**
   * Revoke permission from role
   */
  async revokePermission(roleId, permissionId) {
    return this.post(`/admin/roles/${roleId}/permissions`, {
      permission_id: permissionId,
      action: 'revoke'
    })
  }

  // ===== LOGS & AUDIT API =====

  /**
   * Get logs list
   */
  async getLogs(params = {}) {
    if (USE_MOCK_DATA) {
      let data = this.getMockData('logs')
      data = filterData(data, params)
      data = sortData(data, params.sort || 'timestamp', params.order || 'desc')
      const result = paginateData(data, params.page, params.limit)
      return this.mockResponse(result)
    }
    return this.get('/admin/logs', params)
  }

  /**
   * Get single log entry
   */
  async getLog(id) {
    return this.get(`/admin/logs/${id}`)
  }

  /**
   * Delete log entry
   */
  async deleteLog(id) {
    return this.delete(`/admin/logs/${id}`)
  }

  /**
   * Bulk delete logs
   */
  async bulkDeleteLogs(logIds) {
    return this.post('/admin/logs/bulk-delete', { log_ids: logIds })
  }

  // ===== GLOBAL SEARCH API =====

  /**
   * Global search across all entities
   */
  async globalSearch(query, params = {}) {
    if (USE_MOCK_DATA) {
      await simulateApiDelay()
      const results = {}
      
      // Search users
      const users = filterData(this.getMockData('users'), { search: query })
      if (users.length > 0) results.users = users.slice(0, 5)
      
      // Search NFC tags
      const nfcTags = filterData(this.getMockData('nfc_tags'), { search: query })
      if (nfcTags.length > 0) results['nfc-tags'] = nfcTags.slice(0, 5)
      
      // Search stores
      const stores = filterData(this.getMockData('stores'), { search: query })
      if (stores.length > 0) results.stores = stores.slice(0, 5)
      
      // Search logs
      const logs = filterData(this.getMockData('logs'), { search: query })
      if (logs.length > 0) results.logs = logs.slice(0, 5)
      
      return this.mockResponse(results)
    }
    return this.get('/admin/search', { q: query, ...params })
  }

  // ===== LOGS API =====

  /**
   * Get system logs
   */
  async getLogs(params = {}) {
    return this.get('/logs', params)
  }

  // ===== ANALYTICS API =====

  /**
   * Get system statistics
   */
  async getStats() {
    return this.get('/analytics/stats')
  }

  /**
   * Get activity feed
   */
  async getActivity(params = {}) {
    return this.get('/analytics/activity', params)
  }

  // ===== AUTHENTICATION =====

  /**
   * Admin login
   */
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/api/auth/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await this.handleResponse(response)
    
    if (data.token) {
      this.setToken(data.token)
    }

    return data
  }

  /**
   * Admin logout
   */
  logout() {
    this.setToken(null)
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.token
  }

  /**
   * Get current token
   */
  getToken() {
    return this.token
  }

  // ===== GENERIC CRUD METHODS =====

  /**
   * Generic create entity method
   */
  async createEntity(endpoint, data) {
    return this.post(endpoint, data)
  }

  /**
   * Generic update entity method
   */
  async updateEntity(endpoint, id, data) {
    return this.put(`${endpoint}/${id}`, data)
  }

  /**
   * Generic delete entity method
   */
  async deleteEntity(endpoint, id) {
    return this.delete(`${endpoint}/${id}`)
  }

  /**
   * Generic get entity method
   */
  async getEntity(endpoint, id) {
    return this.get(`${endpoint}/${id}`)
  }

  /**
   * Generic list entities method
   */
  async listEntities(endpoint, params = {}) {
    if (USE_MOCK_DATA) {
      // Map endpoint to mock data key
      const entityMap = {
        '/users': 'users',
        '/nfc-tags': 'nfc_tags',
        '/stores': 'stores',
        '/admin/roles': 'roles',
        '/admin/permissions': 'permissions',
        '/admin/logs': 'logs',
        '/settings': 'settings'
      }
      
      const dataKey = entityMap[endpoint]
      if (!dataKey) {
        throw new Error(`Unknown endpoint: ${endpoint}`)
      }
      
      let data = this.getMockData(dataKey)
      data = filterData(data, params)
      data = sortData(data, params.sort, params.order)
      const result = paginateData(data, params.page, params.limit)
      
      return this.mockResponse(result)
    }
    return this.get(endpoint, params)
  }
}

// Create singleton instance
const apiClient = new ApiClient()

export default apiClient