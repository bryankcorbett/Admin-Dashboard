/**
 * Admin API Client
 * Handles all API communication for the admin panel
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

class ApiClient {
  constructor() {
    this.baseURL = `${API_BASE_URL}/api`
    this.token = localStorage.getItem('admin_token')
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
    const data = await response.json()

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
      throw error
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
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
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
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
    return this.get('/nfc/tags', params)
  }

  /**
   * Get single NFC tag
   */
  async getNfcTag(id) {
    return this.get(`/nfc/tags/${id}`)
  }

  /**
   * Create new NFC tag
   */
  async createNfcTag(tagData) {
    return this.post('/nfc/tags', tagData)
  }

  /**
   * Update NFC tag
   */
  async updateNfcTag(id, tagData) {
    return this.put(`/nfc/tags/${id}`, tagData)
  }

  /**
   * Delete NFC tag
   */
  async deleteNfcTag(id) {
    return this.delete(`/nfc/tags/${id}`)
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
    return this.get('/settings')
  }

  /**
   * Update system settings
   */
  async updateSettings(settingsData) {
    return this.put('/settings', settingsData)
  }

  // ===== ROLES & PERMISSIONS API =====

  /**
   * Get roles list
   */
  async getRoles(params = {}) {
    return this.get('/admin/roles', params)
  }

  /**
   * Get single role
   */
  async getRole(id) {
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
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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
    return this.get(endpoint, params)
  }
}

// Create singleton instance
const apiClient = new ApiClient()

export default apiClient
