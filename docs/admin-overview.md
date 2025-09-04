# Admin Panel Overview

## Overview

The Biz365 Admin Panel is a Supabase-style administrative interface that provides comprehensive management capabilities for the platform. Built with React and integrated with the PHP backend API, it offers schema-driven data tables, real-time analytics, and system configuration management.

## Architecture

### Frontend Components
- **AdminLayout**: Main layout with collapsible sidebar and header
- **DataTable**: Generic table component with automatic schema detection
- **Entity Pages**: Specialized pages for different data entities
- **API Client**: Centralized API communication layer

### Backend Integration
- **PHP API**: RESTful endpoints for all admin operations
- **Database**: MySQL with automatic migrations
- **Authentication**: JWT-based admin authentication
- **CORS**: Configured for cross-origin requests

## API-to-UI Mapping

| Entity | API Endpoint | UI Component | Features |
|--------|-------------|--------------|----------|
| **Users** | `/api/admin/users` | `Users.jsx` | CRUD operations, role management, status filtering |
| **NFC Tags** | `/api/admin/nfc-tags` | `NfcTags.jsx` | Tag management, usage tracking, status monitoring |
| **Stores** | `/api/admin/stores` | `Stores.jsx` | Store configuration, owner management |
| **Roles** | `/api/admin/roles` | `Roles.jsx` | Role management, permissions matrix, access control |
| **Settings** | `/api/admin/settings` | `Settings.jsx` | System configuration, OAuth setup, feature flags |
| **Logs** | `/api/admin/logs` | `Logs.jsx` | System logs, audit trails, error tracking |
| **Analytics** | `/api/admin/analytics/*` | `Analytics.jsx` | System stats, activity feeds, performance metrics |

## CRUD Operations Matrix

| Entity | Create | Read | Update | Delete | Notes |
|--------|--------|------|--------|--------|-------|
| **Users** | ✅ | ✅ | ✅ | ✅ | Soft delete supported |
| **NFC Tags** | ✅ | ✅ | ✅ | ✅ | Hard delete with cascade |
| **Stores** | ✅ | ✅ | ✅ | ✅ | Soft delete supported |
| **Roles** | ✅ | ✅ | ✅ | ✅ | Role-based access control |
| **Permissions** | ✅ | ✅ | ✅ | ✅ | Granular permission system |
| **Settings** | ✅ | ✅ | ✅ | ❌ | Settings are system-critical |
| **Logs** | ❌ | ✅ | ❌ | ✅ | Read-only, admin cleanup only |
| **Analytics** | ❌ | ✅ | ❌ | ❌ | Read-only data |

## Example Request/Response Payloads

### Users Entity

#### Create User
```json
POST /api/admin/users
{
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "role": "customer",
  "status": "active"
}

Response:
{
  "success": true,
  "data": {
    "id": 123,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

#### Update User
```json
PUT /api/admin/users/123
{
  "first_name": "Jane",
  "status": "suspended"
}

Response:
{
  "success": true,
  "data": {
    "id": 123,
    "email": "user@example.com",
    "first_name": "Jane",
    "last_name": "Doe",
    "role": "customer",
    "status": "suspended",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T11:45:00Z"
  }
}
```

### NFC Tags Entity

#### Create NFC Tag
```json
POST /api/admin/nfc-tags
{
  "tag_id": "TAG001",
  "target_url": "https://biz365.ai/store/123",
  "store_id": 456,
  "status": "active",
  "description": "Store entrance tag"
}

Response:
{
  "success": true,
  "data": {
    "id": 789,
    "tag_id": "TAG001",
    "target_url": "https://biz365.ai/store/123",
    "store_id": 456,
    "status": "active",
    "description": "Store entrance tag",
    "hit_count": 0,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

### Settings Entity

#### Update Setting
```json
PUT /api/admin/settings/app_name
{
  "value": "Biz365 Platform"
}

Response:
{
  "success": true,
  "data": {
    "key": "app_name",
    "value": "Biz365 Platform",
    "description": "Application name",
    "updated_at": "2024-01-15T11:45:00Z"
  }
}
```

## DataTable Component

### Features
- **Schema Detection**: Automatically detects column types from API responses
- **Type Formatting**: Renders appropriate UI for different data types
- **Pagination**: Built-in pagination with configurable page sizes
- **Search & Filter**: Real-time search and filtering capabilities
- **Sorting**: Multi-column sorting with visual indicators
- **Responsive**: Mobile-friendly table design

### Column Type Detection
```javascript
// Automatic type detection based on data patterns
- boolean → Toggle switch with Yes/No labels
- enum → Colored badges for status values
- timestamp → Formatted date/time display
- email → Clickable mailto links
- url → Clickable external links
- number → Formatted numbers with locale
- json → Expandable JSON viewer
- text → Plain text display
```

### Usage Example
```jsx
<DataTable
  endpoint="/users"
  title="User Management"
  searchable={true}
  sortable={true}
  pagination={true}
  pageSize={20}
/>
```

## Entity Management

### Users Management
- **List View**: Paginated table with search and filters
- **User Details**: Complete user profile information
- **Role Management**: Assign and modify user roles
- **Status Control**: Activate, suspend, or delete users
- **Bulk Operations**: Select multiple users for batch actions

### NFC Tags Management
- **Tag Overview**: List all NFC tags with usage statistics
- **Tag Creation**: Create new NFC tags with target URLs
- **Usage Analytics**: Track hits, performance metrics
- **Status Management**: Activate, deactivate, or delete tags
- **Store Association**: Link tags to specific stores

### System Settings
- **General Settings**: App name, version, maintenance mode
- **OAuth Configuration**: Google and Apple OAuth setup
- **NFC Settings**: Base URLs and service configuration
- **Feature Flags**: Enable/disable platform features
- **Security Settings**: Authentication and authorization rules
- **Individual Settings**: Edit individual settings with secure handling of sensitive data
- **Secret Management**: Masked display of API keys, tokens, and passwords

### Roles & Permissions Management
- **Role Creation**: Create custom roles with specific permission sets
- **Permission Matrix**: Visual matrix showing role-permission relationships
- **Granular Control**: Fine-grained permissions for each resource and action
- **User Assignment**: Assign roles to users with automatic permission inheritance
- **Access Control**: Role-based access control for all admin operations

### Logs & Audit Management
- **System Logs**: Comprehensive logging of all system events and user actions
- **Advanced Filtering**: Filter by date, user, entity, action type, and log level
- **Detail Views**: Expandable log entries with full metadata and context
- **Audit Trail**: Complete audit trail for compliance and security monitoring
- **Log Cleanup**: Bulk delete operations for log maintenance
- **Real-time Monitoring**: Live log streaming for system monitoring

### Global Search
- **Cross-Entity Search**: Search across all entities (Users, NFC Tags, Stores, Settings, Logs)
- **Smart Results**: Grouped results with entity-specific formatting
- **Quick Navigation**: Direct navigation to specific records from search results
- **Keyboard Shortcuts**: ⌘K shortcut for quick search access
- **Real-time Search**: Live search with debounced API calls

## API Client

### Features
- **Authentication**: Automatic token management
- **Error Handling**: Centralized error processing
- **Request/Response**: Normalized API communication
- **Caching**: Optional response caching
- **Retry Logic**: Automatic retry for failed requests

### Usage
```javascript
import apiClient from '../services/apiClient'

// Get users with pagination
const users = await apiClient.getUsers({
  page: 1,
  limit: 20,
  search: 'john',
  role: 'customer'
})

// Create new user
const newUser = await apiClient.createUser({
  email: 'user@example.com',
  first_name: 'John',
  last_name: 'Doe',
  role: 'customer'
})
```

## Navigation Structure

### Sidebar Organization
```
Overview
├── Dashboard
└── Analytics

Data Management
├── Users
├── NFC Tags
├── Reviews
└── Analytics Data

System
├── Settings
├── Logs
├── API Keys
└── Backups

Integrations
├── OAuth
├── NFC Service
└── Google Services
```

## Security Features

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Token Refresh**: Automatic token renewal
- **Session Management**: Secure session handling
- **Logout**: Complete session cleanup

### Authorization
- **Role-Based Access**: Different permission levels
- **Admin-Only Routes**: Protected admin endpoints
- **API Security**: Bearer token validation
- **CORS Protection**: Configured cross-origin policies

### Data Protection
- **Input Validation**: Server-side validation
- **SQL Injection**: PDO prepared statements
- **XSS Prevention**: Output sanitization
- **CSRF Protection**: Token-based protection

## Performance Optimizations

### Frontend
- **Lazy Loading**: Component-based code splitting
- **Virtual Scrolling**: Large dataset handling
- **Debounced Search**: Optimized search performance
- **Caching**: API response caching

### Backend
- **Database Indexing**: Optimized query performance
- **Connection Pooling**: Efficient database connections
- **Response Caching**: Reduced API response times
- **Pagination**: Efficient large dataset handling

## Development Workflow

### Local Development
1. Start API server: `cd api/php && php -S localhost:8000`
2. Start dashboard: `cd dashbord/apps/dashboard && npm run dev`
3. Access admin panel: `http://localhost:5175/admin/dashboard`

### Environment Setup
```bash
# API Environment
cp api/php/env.nfc.example api/php/.env

# Dashboard Environment
cp dashbord/apps/dashboard/.env.example dashbord/apps/dashboard/.env
```

### Testing
- **Unit Tests**: Component and utility testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user workflow testing
- **Performance Tests**: Load and stress testing

## Deployment

### Production Build
```bash
# Build dashboard
cd dashbord/apps/dashboard
npm run build

# Deploy API
cd api/php
composer install --no-dev
```

### Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=https://api.biz365.ai
VITE_APP_NAME=Biz365 Admin
VITE_APP_ENV=production
```

## Monitoring & Analytics

### System Metrics
- **User Statistics**: Total users, active users, new registrations
- **NFC Performance**: Tag usage, hit rates, popular tags
- **System Health**: API response times, error rates
- **Storage Usage**: Database size, file storage

### Activity Tracking
- **User Actions**: Login, logout, profile updates
- **Admin Actions**: Settings changes, user management
- **System Events**: Errors, warnings, maintenance
- **API Usage**: Request counts, response times

## Troubleshooting

### Common Issues
1. **API Connection**: Check CORS configuration and base URL
2. **Authentication**: Verify token validity and expiration
3. **Data Loading**: Check API endpoint availability
4. **Permissions**: Ensure proper admin role assignment

### Debug Tools
- **Browser DevTools**: Network and console debugging
- **API Logs**: Server-side request/response logging
- **Database Logs**: Query performance and error tracking
- **Error Tracking**: Centralized error collection and analysis

## Future Enhancements

### Planned Features
- **Real-time Updates**: WebSocket integration for live data
- **Advanced Filtering**: Complex filter combinations
- **Bulk Operations**: Multi-select actions for efficiency
- **Export Functionality**: CSV/Excel data export
- **Audit Logs**: Complete action history tracking
- **Role Management**: Granular permission system
- **API Documentation**: Interactive API explorer
- **Mobile App**: Native mobile admin interface
