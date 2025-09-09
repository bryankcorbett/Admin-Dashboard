# Biz365 Admin Dashboard

A comprehensive Supabase-style administrative interface for the Biz365 platform, built with React and integrated with the PHP backend API.

## Overview

The Admin Dashboard provides complete system management capabilities including:
- User and role management
- NFC tag configuration
- System settings and configuration
- Audit logging and monitoring
- Global search across all entities
- Real-time analytics and reporting

## Features

### Core Admin Features
- **User Management**: Complete CRUD operations for user accounts
- **Role & Permissions**: Granular role-based access control
- **NFC Tag Management**: Create and manage NFC tags and configurations
- **System Settings**: Configure global system settings with secret management
- **Audit Logging**: Comprehensive system logs and audit trails
- **Global Search**: Cross-entity search functionality

### Technical Features
- **Schema-Driven UI**: Automatic form generation based on entity schemas
- **Real-time Updates**: Live data updates and notifications
- **Responsive Design**: Mobile-friendly admin interface
- **Security**: JWT authentication and role-based access control
- **Performance**: Optimized for large datasets with pagination and filtering

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm 10.9.2+
- **PHP 8.2+ (for API backend) - REQUIRED**
- **MySQL 8.0+ (for database) - REQUIRED**

### Installation

1. **Clone and Install**
   ```bash
   cd admin-dashboard
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start Backend API Server (REQUIRED)**
   ```bash
   # Navigate to your PHP API directory and start the server
   php -S localhost:8000
   ```
   
   **Important**: The admin dashboard requires a PHP backend API server running on port 8000. Without this server, you will see "Failed to fetch" errors.

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Admin Dashboard**
   - Open http://localhost:5175
   - Default admin user: admin@biz365.ai

### Environment Variables

Create a `.env` file with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000

# Application Configuration
VITE_APP_NAME=Biz365 Admin Dashboard
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0

# Authentication
VITE_JWT_SECRET=your-jwt-secret-key
VITE_TOKEN_EXPIRY=3600

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LOGGING=true
VITE_ENABLE_DEBUG=true

# External Services
VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
VITE_APPLE_OAUTH_CLIENT_ID=your-apple-client-id
```

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Project Structure

```
admin-dashboard/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin-specific components
│   │   └── layout/         # Layout components
│   ├── pages/              # Admin pages
│   ├── services/           # API client and services
│   ├── schemas/            # Entity schemas
│   ├── lib/                # Utility functions
│   └── assets/             # Static assets
├── docs/                   # Documentation
├── public/                 # Public assets
└── dist/                   # Build output
```

## API Integration

The admin dashboard connects to the PHP API backend:

- **Base URL**: Configured via `VITE_API_BASE_URL`
- **Authentication**: JWT token-based
- **Endpoints**: RESTful API with CRUD operations
- **CORS**: Configured for cross-origin requests

### API Endpoints

| Entity | Endpoint | Operations |
|--------|----------|------------|
| Users | `/api/admin/users` | CRUD, role management |
| NFC Tags | `/api/admin/nfc-tags` | CRUD, status management |
| Roles | `/api/admin/roles` | CRUD, permissions |
| Settings | `/api/admin/settings` | Read, update |
| Logs | `/api/admin/logs` | Read, delete |
| Search | `/api/admin/search` | Global search |

## Deployment

### Production Build

```bash
npm run build
```

### Deployment Options

1. **Vercel** (Recommended)
   ```bash
   vercel --prod
   ```

2. **Netlify**
   ```bash
   netlify deploy --prod --dir=dist
   ```

3. **Static Hosting**
   - Upload `dist/` folder to your web server
   - Configure environment variables

### Environment Configuration

For production, update these environment variables:

```env
VITE_API_BASE_URL=https://api.biz365.ai
VITE_APP_ENV=production
VITE_ENABLE_DEBUG=false
```

## Documentation

Complete documentation is available in the `/docs` folder:

- `admin-final-overview.md` - Complete feature overview
- `deployment-guide.md` - Production deployment guide
- `qa-checklist.md` - Quality assurance checklist
- `theme.md` - Design system documentation

## Security

### Authentication
- JWT token-based authentication
- Automatic token refresh
- Role-based access control

### Data Protection
- Secret field masking
- Input validation and sanitization
- SQL injection protection
- XSS prevention

### Audit Logging
- All admin actions are logged
- Comprehensive audit trail
- Security event monitoring

## Performance

### Optimization Features
- Code splitting and lazy loading
- Bundle optimization
- Response caching
- Virtual scrolling for large datasets

### Performance Metrics
- **Bundle Size**: ~312 kB (90 kB gzipped)
- **Load Time**: < 2 seconds
- **API Response**: < 500ms

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure all builds pass

## Support

For issues or questions:
- Check the documentation in `/docs`
- Review the QA checklist
- Contact the development team

## License

Proprietary - Biz365 Platform

---

**Version**: 1.0.0
**Last Updated**: [Current Date]
**Status**: ✅ Production Ready
