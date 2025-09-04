/**
 * Entity Schemas
 * Defines field configurations for different entities in the admin panel
 */

export const userSchema = [
  {
    key: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'user@example.com',
    description: 'User\'s email address for login and notifications'
  },
  {
    key: 'first_name',
    label: 'First Name',
    type: 'string',
    required: true,
    placeholder: 'John',
    maxLength: 100
  },
  {
    key: 'last_name',
    label: 'Last Name',
    type: 'string',
    required: true,
    placeholder: 'Doe',
    maxLength: 100
  },
  {
    key: 'phone',
    label: 'Phone Number',
    type: 'string',
    required: false,
    placeholder: '+1234567890',
    description: 'Optional phone number'
  },
  {
    key: 'role',
    label: 'Role',
    type: 'enum',
    required: true,
    options: [
      { value: 'customer', label: 'Customer' },
      { value: 'store_owner', label: 'Store Owner' },
      { value: 'admin', label: 'Admin' },
      { value: 'super_admin', label: 'Super Admin' }
    ]
  },
  {
    key: 'status',
    label: 'Status',
    type: 'enum',
    required: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'suspended', label: 'Suspended' },
      { value: 'pending_verification', label: 'Pending Verification' }
    ]
  }
]

export const nfcTagSchema = [
  {
    key: 'store_id',
    label: 'Store ID',
    type: 'string',
    required: true,
    placeholder: 'store123',
    description: 'Unique identifier for the store'
  },
  {
    key: 'uid',
    label: 'NFC UID',
    type: 'string',
    required: true,
    placeholder: 'ABC12345',
    maxLength: 8,
    description: 'Unique NFC tag identifier'
  },
  {
    key: 'title',
    label: 'Tag Title',
    type: 'string',
    required: true,
    placeholder: 'Welcome Page',
    maxLength: 255,
    description: 'Descriptive title for the NFC tag'
  },
  {
    key: 'target_url',
    label: 'Target URL',
    type: 'url',
    required: true,
    placeholder: 'https://example.com/landing',
    description: 'URL to redirect to when NFC tag is scanned'
  },
  {
    key: 'status',
    label: 'Status',
    type: 'enum',
    required: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'pending', label: 'Pending' }
    ]
  }
]

export const storeSchema = [
  {
    key: 'name',
    label: 'Store Name',
    type: 'string',
    required: true,
    placeholder: 'My Store',
    maxLength: 255
  },
  {
    key: 'slug',
    label: 'Store Slug',
    type: 'string',
    required: true,
    placeholder: 'my-store',
    maxLength: 100,
    description: 'URL-friendly identifier for the store'
  },
  {
    key: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    placeholder: 'A great store description...',
    description: 'Optional store description'
  },
  {
    key: 'website_url',
    label: 'Website URL',
    type: 'url',
    required: false,
    placeholder: 'https://mystore.com'
  },
  {
    key: 'phone',
    label: 'Phone Number',
    type: 'string',
    required: false,
    placeholder: '+1234567890'
  },
  {
    key: 'email',
    label: 'Email Address',
    type: 'email',
    required: false,
    placeholder: 'store@example.com'
  },
  {
    key: 'address_line1',
    label: 'Address Line 1',
    type: 'string',
    required: false,
    placeholder: '123 Main St',
    maxLength: 255
  },
  {
    key: 'city',
    label: 'City',
    type: 'string',
    required: false,
    placeholder: 'New York',
    maxLength: 100
  },
  {
    key: 'state',
    label: 'State',
    type: 'string',
    required: false,
    placeholder: 'NY',
    maxLength: 100
  },
  {
    key: 'country',
    label: 'Country',
    type: 'string',
    required: false,
    placeholder: 'USA',
    maxLength: 100
  },
  {
    key: 'postal_code',
    label: 'Postal Code',
    type: 'string',
    required: false,
    placeholder: '10001',
    maxLength: 20
  },
  {
    key: 'timezone',
    label: 'Timezone',
    type: 'string',
    required: false,
    placeholder: 'America/New_York',
    description: 'Store timezone (e.g., America/New_York)'
  },
  {
    key: 'currency',
    label: 'Currency',
    type: 'string',
    required: false,
    placeholder: 'USD',
    maxLength: 3,
    description: 'Three-letter currency code'
  },
  {
    key: 'status',
    label: 'Status',
    type: 'enum',
    required: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' },
      { value: 'suspended', label: 'Suspended' },
      { value: 'pending_approval', label: 'Pending Approval' }
    ]
  }
]

export const roleSchema = [
  {
    key: 'name',
    label: 'Role Name',
    type: 'string',
    required: true,
    placeholder: 'Manager',
    maxLength: 100,
    description: 'Unique name for the role'
  },
  {
    key: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    placeholder: 'Role description...',
    description: 'Optional description of the role'
  },
  {
    key: 'level',
    label: 'Level',
    type: 'enum',
    required: true,
    options: [
      { value: 'admin', label: 'Administrator' },
      { value: 'manager', label: 'Manager' },
      { value: 'user', label: 'User' },
      { value: 'guest', label: 'Guest' }
    ]
  },
  {
    key: 'status',
    label: 'Status',
    type: 'enum',
    required: true,
    options: [
      { value: 'active', label: 'Active' },
      { value: 'inactive', label: 'Inactive' }
    ]
  }
]

export const permissionSchema = [
  {
    key: 'name',
    label: 'Permission Name',
    type: 'string',
    required: true,
    placeholder: 'users.create',
    maxLength: 100,
    description: 'Unique permission identifier'
  },
  {
    key: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    placeholder: 'Permission description...',
    description: 'Description of what this permission allows'
  },
  {
    key: 'resource',
    label: 'Resource',
    type: 'enum',
    required: true,
    options: [
      { value: 'users', label: 'Users' },
      { value: 'roles', label: 'Roles' },
      { value: 'nfc-tags', label: 'NFC Tags' },
      { value: 'stores', label: 'Stores' },
      { value: 'settings', label: 'Settings' },
      { value: 'logs', label: 'Logs' }
    ]
  },
  {
    key: 'action',
    label: 'Action',
    type: 'enum',
    required: true,
    options: [
      { value: 'create', label: 'Create' },
      { value: 'read', label: 'Read' },
      { value: 'update', label: 'Update' },
      { value: 'delete', label: 'Delete' }
    ]
  }
]

export const logSchema = [
  {
    key: 'level',
    label: 'Log Level',
    type: 'enum',
    required: true,
    options: [
      { value: 'error', label: 'Error' },
      { value: 'warning', label: 'Warning' },
      { value: 'info', label: 'Info' },
      { value: 'debug', label: 'Debug' }
    ]
  },
  {
    key: 'action',
    label: 'Action',
    type: 'string',
    required: true,
    placeholder: 'user.login',
    maxLength: 100,
    description: 'Action that was performed'
  },
  {
    key: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'User logged in successfully',
    description: 'Log message'
  },
  {
    key: 'user_id',
    label: 'User ID',
    type: 'string',
    required: false,
    placeholder: '123',
    description: 'ID of the user who performed the action'
  },
  {
    key: 'ip_address',
    label: 'IP Address',
    type: 'string',
    required: false,
    placeholder: '192.168.1.1',
    description: 'IP address of the request'
  },
  {
    key: 'user_agent',
    label: 'User Agent',
    type: 'string',
    required: false,
    placeholder: 'Mozilla/5.0...',
    description: 'User agent string'
  }
]

export const settingSchema = [
  {
    key: 'key',
    label: 'Setting Key',
    type: 'string',
    required: true,
    placeholder: 'app_name',
    maxLength: 100,
    description: 'Unique identifier for the setting'
  },
  {
    key: 'value',
    label: 'Value',
    type: 'textarea',
    required: true,
    placeholder: 'Setting value...',
    description: 'Value of the setting'
  },
  {
    key: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
    placeholder: 'Setting description...',
    description: 'Description of what this setting controls'
  },
  {
    key: 'category',
    label: 'Category',
    type: 'enum',
    required: true,
    options: [
      { value: 'general', label: 'General' },
      { value: 'oauth', label: 'OAuth' },
      { value: 'nfc', label: 'NFC' },
      { value: 'email', label: 'Email' },
      { value: 'security', label: 'Security' }
    ]
  }
]

// Schema mapping for different entities
export const entitySchemas = {
  users: userSchema,
  'nfc-tags': nfcTagSchema,
  stores: storeSchema,
  roles: roleSchema,
  permissions: permissionSchema,
  logs: logSchema,
  settings: settingSchema
}

// Helper function to get schema for an entity
export function getEntitySchema(entityType) {
  return entitySchemas[entityType] || []
}
