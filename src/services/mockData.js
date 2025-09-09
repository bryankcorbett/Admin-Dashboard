/**
 * Mock Data for Admin Dashboard
 * Provides sample data for all entities when backend is not available
 */

// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone: '+1234567890',
    role: 'customer',
    status: 'active',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    last_login: '2024-01-20T14:30:00Z'
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    first_name: 'Jane',
    last_name: 'Smith',
    phone: '+1234567891',
    role: 'store_owner',
    status: 'active',
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-14T09:15:00Z',
    last_login: '2024-01-20T13:45:00Z'
  },
  {
    id: 3,
    email: 'admin@biz365.ai',
    first_name: 'Admin',
    last_name: 'User',
    phone: '+1234567892',
    role: 'admin',
    status: 'active',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-01-10T08:00:00Z',
    last_login: '2024-01-20T15:00:00Z'
  },
  {
    id: 4,
    email: 'bob.wilson@example.com',
    first_name: 'Bob',
    last_name: 'Wilson',
    phone: '+1234567893',
    role: 'customer',
    status: 'suspended',
    created_at: '2024-01-12T11:20:00Z',
    updated_at: '2024-01-18T16:30:00Z',
    last_login: '2024-01-18T16:30:00Z'
  },
  {
    id: 5,
    email: 'sarah.johnson@example.com',
    first_name: 'Sarah',
    last_name: 'Johnson',
    phone: '+1234567894',
    role: 'store_owner',
    status: 'pending_verification',
    created_at: '2024-01-19T14:45:00Z',
    updated_at: '2024-01-19T14:45:00Z',
    last_login: null
  }
]

// Mock NFC Tags Data
export const mockNfcTags = [
  {
    id: 1,
    store_id: 'store123',
    uid: 'ABC12345',
    title: 'Welcome Page',
    target_url: 'https://biz365.ai/store/123',
    status: 'active',
    hit_count: 1247,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    last_hit: '2024-01-20T14:30:00Z'
  },
  {
    id: 2,
    store_id: 'store456',
    uid: 'DEF67890',
    title: 'Menu Page',
    target_url: 'https://biz365.ai/store/456/menu',
    status: 'active',
    hit_count: 892,
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-14T09:15:00Z',
    last_hit: '2024-01-20T13:45:00Z'
  },
  {
    id: 3,
    store_id: 'store789',
    uid: 'GHI01234',
    title: 'Contact Info',
    target_url: 'https://biz365.ai/store/789/contact',
    status: 'inactive',
    hit_count: 156,
    created_at: '2024-01-12T11:20:00Z',
    updated_at: '2024-01-18T16:30:00Z',
    last_hit: '2024-01-18T16:30:00Z'
  },
  {
    id: 4,
    store_id: 'store101',
    uid: 'JKL56789',
    title: 'Special Offers',
    target_url: 'https://biz365.ai/store/101/offers',
    status: 'pending',
    hit_count: 45,
    created_at: '2024-01-19T14:45:00Z',
    updated_at: '2024-01-19T14:45:00Z',
    last_hit: null
  }
]

// Mock Stores Data
export const mockStores = [
  {
    id: 1,
    name: 'Coffee Shop ABC',
    slug: 'coffee-shop-abc',
    description: 'Premium coffee and pastries in downtown',
    website_url: 'https://coffeeshopabc.com',
    phone: '+1234567890',
    email: 'info@coffeeshopabc.com',
    address_line1: '123 Main Street',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    postal_code: '10001',
    timezone: 'America/New_York',
    currency: 'USD',
    status: 'active',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Restaurant XYZ',
    slug: 'restaurant-xyz',
    description: 'Fine dining experience with local ingredients',
    website_url: 'https://restaurantxyz.com',
    phone: '+1234567891',
    email: 'contact@restaurantxyz.com',
    address_line1: '456 Oak Avenue',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    postal_code: '90210',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
    status: 'active',
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-14T09:15:00Z'
  },
  {
    id: 3,
    name: 'Retail Store 123',
    slug: 'retail-store-123',
    description: 'Fashion and accessories for modern lifestyle',
    website_url: 'https://retailstore123.com',
    phone: '+1234567892',
    email: 'hello@retailstore123.com',
    address_line1: '789 Fashion Blvd',
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
    postal_code: '60601',
    timezone: 'America/Chicago',
    currency: 'USD',
    status: 'inactive',
    created_at: '2024-01-12T11:20:00Z',
    updated_at: '2024-01-18T16:30:00Z'
  }
]

// Mock Roles Data
export const mockRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    level: 'admin',
    status: 'active',
    user_count: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 2,
    name: 'Store Manager',
    description: 'Manage store operations and staff',
    level: 'manager',
    status: 'active',
    user_count: 15,
    created_at: '2024-01-05T10:00:00Z',
    updated_at: '2024-01-05T10:00:00Z'
  },
  {
    id: 3,
    name: 'Customer',
    description: 'Standard customer access',
    level: 'user',
    status: 'active',
    user_count: 1247,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 4,
    name: 'Store Owner',
    description: 'Business owner with store management access',
    level: 'manager',
    status: 'active',
    user_count: 89,
    created_at: '2024-01-03T12:00:00Z',
    updated_at: '2024-01-03T12:00:00Z'
  }
]

// Mock Permissions Data
export const mockPermissions = [
  {
    id: 1,
    name: 'users.create',
    description: 'Create new user accounts',
    resource: 'users',
    action: 'create'
  },
  {
    id: 2,
    name: 'users.read',
    description: 'View user account information',
    resource: 'users',
    action: 'read'
  },
  {
    id: 3,
    name: 'users.update',
    description: 'Update user account information',
    resource: 'users',
    action: 'update'
  },
  {
    id: 4,
    name: 'users.delete',
    description: 'Delete user accounts',
    resource: 'users',
    action: 'delete'
  },
  {
    id: 5,
    name: 'nfc-tags.create',
    description: 'Create new NFC tags',
    resource: 'nfc-tags',
    action: 'create'
  },
  {
    id: 6,
    name: 'nfc-tags.read',
    description: 'View NFC tag information',
    resource: 'nfc-tags',
    action: 'read'
  },
  {
    id: 7,
    name: 'nfc-tags.update',
    description: 'Update NFC tag configuration',
    resource: 'nfc-tags',
    action: 'update'
  },
  {
    id: 8,
    name: 'nfc-tags.delete',
    description: 'Delete NFC tags',
    resource: 'nfc-tags',
    action: 'delete'
  },
  {
    id: 9,
    name: 'stores.create',
    description: 'Create new stores',
    resource: 'stores',
    action: 'create'
  },
  {
    id: 10,
    name: 'stores.read',
    description: 'View store information',
    resource: 'stores',
    action: 'read'
  },
  {
    id: 11,
    name: 'stores.update',
    description: 'Update store information',
    resource: 'stores',
    action: 'update'
  },
  {
    id: 12,
    name: 'stores.delete',
    description: 'Delete stores',
    resource: 'stores',
    action: 'delete'
  },
  {
    id: 13,
    name: 'settings.read',
    description: 'View system settings',
    resource: 'settings',
    action: 'read'
  },
  {
    id: 14,
    name: 'settings.update',
    description: 'Update system settings',
    resource: 'settings',
    action: 'update'
  },
  {
    id: 15,
    name: 'logs.read',
    description: 'View system logs',
    resource: 'logs',
    action: 'read'
  },
  {
    id: 16,
    name: 'logs.delete',
    description: 'Delete system logs',
    resource: 'logs',
    action: 'delete'
  }
]

// Mock Logs Data
export const mockLogs = [
  {
    id: 1,
    level: 'info',
    action: 'user.login',
    message: 'User logged in successfully',
    user_id: 1,
    user_email: 'john.doe@example.com',
    ip_address: '192.168.1.100',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2024-01-20T14:30:00Z',
    metadata: {
      session_id: 'sess_123456',
      login_method: 'email'
    }
  },
  {
    id: 2,
    level: 'warning',
    action: 'user.failed_login',
    message: 'Failed login attempt',
    user_id: null,
    user_email: 'unknown@example.com',
    ip_address: '192.168.1.101',
    user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    timestamp: '2024-01-20T14:25:00Z',
    metadata: {
      reason: 'invalid_password',
      attempts: 3
    }
  },
  {
    id: 3,
    level: 'info',
    action: 'nfc.scan',
    message: 'NFC tag scanned successfully',
    user_id: 2,
    user_email: 'jane.smith@example.com',
    ip_address: '192.168.1.102',
    user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    timestamp: '2024-01-20T14:20:00Z',
    metadata: {
      tag_id: 'ABC12345',
      store_id: 'store123'
    }
  },
  {
    id: 4,
    level: 'error',
    action: 'system.error',
    message: 'Database connection timeout',
    user_id: null,
    user_email: null,
    ip_address: '127.0.0.1',
    user_agent: 'System',
    timestamp: '2024-01-20T14:15:00Z',
    metadata: {
      error_code: 'DB_TIMEOUT',
      duration: 30000
    }
  },
  {
    id: 5,
    level: 'info',
    action: 'admin.settings_update',
    message: 'System settings updated',
    user_id: 3,
    user_email: 'admin@biz365.ai',
    ip_address: '192.168.1.103',
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    timestamp: '2024-01-20T14:10:00Z',
    metadata: {
      settings_changed: ['app_name', 'maintenance_mode']
    }
  }
]

// Mock Settings Data
export const mockSettings = {
  app_name: 'Biz365 Platform',
  app_version: '1.0.0',
  maintenance_mode: false,
  registration_enabled: true,
  email_verification_required: true,
  oauth_providers: {
    google: {
      enabled: true,
      client_id: 'google-client-id-123456789',
      client_secret: 'google-client-secret-abcdef'
    },
    apple: {
      enabled: true,
      client_id: 'apple-client-id-987654321',
      client_secret: 'apple-client-secret-fedcba'
    }
  },
  nfc_settings: {
    base_url: 'https://nfc.biz365.ai',
    timeout: 5000,
    max_retries: 3
  },
  email_settings: {
    smtp_host: 'smtp.gmail.com',
    smtp_port: 587,
    smtp_user: 'noreply@biz365.ai',
    smtp_password: 'smtp-password-secret'
  }
}

// Mock Role Permissions (which permissions each role has)
export const mockRolePermissions = {
  1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], // Super Admin - all permissions
  2: [2, 6, 10, 13], // Store Manager - read permissions
  3: [2, 6, 10], // Customer - basic read permissions
  4: [2, 6, 9, 10, 11] // Store Owner - store management permissions
}

// Helper function to simulate API delay
export const simulateApiDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Helper function to paginate data
export const paginateData = (data, page = 1, limit = 20) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = data.slice(startIndex, endIndex)
  
  return {
    data: paginatedData,
    pagination: {
      page: page,
      limit: limit,
      total: data.length,
      pages: Math.ceil(data.length / limit)
    }
  }
}

// Helper function to filter data
export const filterData = (data, filters = {}) => {
  let filteredData = [...data]
  
  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase()
    filteredData = filteredData.filter(item => {
      return Object.values(item).some(value => {
        if (value === null || value === undefined) return false
        return String(value).toLowerCase().includes(searchTerm)
      })
    })
  }
  
  // Status filter
  if (filters.status) {
    filteredData = filteredData.filter(item => item.status === filters.status)
  }
  
  // Role filter
  if (filters.role) {
    filteredData = filteredData.filter(item => item.role === filters.role)
  }
  
  // Level filter (for logs)
  if (filters.level) {
    filteredData = filteredData.filter(item => item.level === filters.level)
  }
  
  // Action filter (for logs)
  if (filters.action) {
    filteredData = filteredData.filter(item => item.action?.includes(filters.action))
  }
  
  // Date filters (for logs)
  if (filters.date_from) {
    const fromDate = new Date(filters.date_from)
    filteredData = filteredData.filter(item => new Date(item.timestamp || item.created_at) >= fromDate)
  }
  
  if (filters.date_to) {
    const toDate = new Date(filters.date_to)
    filteredData = filteredData.filter(item => new Date(item.timestamp || item.created_at) <= toDate)
  }
  
  return filteredData
}

// Helper function to sort data
export const sortData = (data, sortField = 'created_at', sortOrder = 'desc') => {
  return [...data].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]
    
    // Handle null/undefined values
    if (aValue === null || aValue === undefined) aValue = ''
    if (bValue === null || bValue === undefined) bValue = ''
    
    // Convert to comparable values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    let comparison = 0
    if (aValue > bValue) {
      comparison = 1
    } else if (aValue < bValue) {
      comparison = -1
    }
    
    return sortOrder === 'desc' ? comparison * -1 : comparison
  })
}

// Helper function to generate new ID
export const generateId = (existingData) => {
  const maxId = Math.max(...existingData.map(item => item.id), 0)
  return maxId + 1
}