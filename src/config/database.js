/**
 * BIZ365 Admin Dashboard Database Configuration
 * Use this in your React admin dashboard
 */

// API Configuration
export const API_CONFIG = {
  // Base URLs
  API_BASE_URL: 'https://api.biz365.ai',
  NFC_BASE_URL: 'https://nfc.biz365.ai',
  ADMIN_BASE_URL: 'https://admin.biz365.ai',
  
  // Database connection info (for reference)
  DATABASE: {
    host: 'e0c0kw4040c8404so0sg0cgw',
    port: 3306,
    name: 'biz365_master',
    user: 'biz365_app',
    ssl: true
  },
  
  // API Endpoints
  ENDPOINTS: {
    // Authentication
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GOOGLE_AUTH: '/api/auth/google',
    APPLE_AUTH: '/api/auth/apple',
    LOGOUT: '/api/auth/logout',
    REFRESH_TOKEN: '/api/auth/refresh',
    
    // OTP
    SEND_OTP: '/api/otp/send',
    VERIFY_OTP: '/api/otp/verify',
    RESEND_OTP: '/api/otp/resend',
    
    // Profile
    PROFILE: '/api/profile',
    PROFILE_UPDATE: '/api/profile',
    PROFILE_UPLOAD: '/api/profile/upload',
    PROFILE_ACTIVITY: '/api/profile/activity',
    
    // Stores
    STORES: '/api/stores',
    STORE_CREATE: '/api/stores',
    STORE_UPDATE: '/api/stores',
    STORE_DELETE: '/api/stores',
    
    // Products
    PRODUCTS: '/api/products',
    PRODUCT_CREATE: '/api/products',
    PRODUCT_UPDATE: '/api/products',
    PRODUCT_DELETE: '/api/products',
    
    // Orders
    ORDERS: '/api/orders',
    ORDER_CREATE: '/api/orders',
    ORDER_UPDATE: '/api/orders',
    
    // Cart
    CART: '/api/cart',
    CART_ADD: '/api/cart/add',
    CART_UPDATE: '/api/cart/update',
    CART_REMOVE: '/api/cart/remove',
    CART_CLEAR: '/api/cart/clear',
    
    // NFC
    NFC_TAGS: '/api/nfc/tags',
    NFC_CREATE: '/api/nfc/tags',
    NFC_UPDATE: '/api/nfc/tags',
    NFC_DELETE: '/api/nfc/tags',
    NFC_METRICS: '/api/nfc/metrics',
    
    // Analytics
    ANALYTICS: '/api/analytics',
    ANALYTICS_EVENTS: '/api/analytics/events',
    
    // Admin
    ADMIN_USERS: '/api/admin/users',
    ADMIN_STORES: '/api/admin/stores',
    ADMIN_ANALYTICS: '/api/admin/analytics',
    ADMIN_LOGS: '/api/admin/logs'
  },
  
  // Request configuration
  REQUEST_CONFIG: {
    timeout: 30000,
    retries: 3,
    retryDelay: 1000
  },
  
  // Authentication
  AUTH: {
    tokenKey: 'biz365_admin_token',
    refreshTokenKey: 'biz365_admin_refresh_token',
    userKey: 'biz365_admin_user'
  }
};

// Database connection helper for API calls
export const makeApiRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    ...API_CONFIG.REQUEST_CONFIG
  };
  
  // Add authentication token if available
  const token = localStorage.getItem(API_CONFIG.AUTH.tokenKey);
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }
  
  const requestOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// NFC API helper
export const makeNfcRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.NFC_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    ...API_CONFIG.REQUEST_CONFIG
  };
  
  const requestOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('NFC API request failed:', error);
    throw error;
  }
};

// Admin API helper
export const makeAdminRequest = async (endpoint, options = {}) => {
  const url = `${API_CONFIG.ADMIN_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    ...API_CONFIG.REQUEST_CONFIG
  };
  
  // Add authentication token if available
  const token = localStorage.getItem(API_CONFIG.AUTH.tokenKey);
  if (token) {
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  }
  
  const requestOptions = { ...defaultOptions, ...options };
  
  try {
    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Admin API request failed:', error);
    throw error;
  }
};

export default API_CONFIG;
