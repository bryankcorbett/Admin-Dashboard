# Biz365 Admin Panel - Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the Biz365 Admin Panel to production environments. It covers frontend deployment, backend API deployment, database setup, and production configuration.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Frontend Deployment](#frontend-deployment)
4. [Backend API Deployment](#backend-api-deployment)
5. [Database Setup](#database-setup)
6. [Production Configuration](#production-configuration)
7. [SSL/TLS Setup](#ssltls-setup)
8. [Monitoring & Logging](#monitoring--logging)
9. [Backup & Recovery](#backup--recovery)
10. [Scaling & Performance](#scaling--performance)
11. [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements

#### Frontend (React Application)
- **Node.js**: 18.0.0 or higher
- **npm**: 10.9.2 or higher
- **Memory**: 2GB RAM minimum, 4GB recommended
- **Storage**: 1GB free space for build artifacts

#### Backend (PHP API)
- **PHP**: 8.2.0 or higher
- **Composer**: Latest version
- **Memory**: 1GB RAM minimum, 2GB recommended
- **Storage**: 500MB free space

#### Database (MySQL)
- **MySQL**: 8.0.0 or higher
- **Memory**: 2GB RAM minimum, 4GB recommended
- **Storage**: 10GB free space minimum

#### Web Server
- **Nginx**: 1.18.0 or higher (recommended)
- **Apache**: 2.4.0 or higher (alternative)
- **SSL Certificate**: Valid SSL certificate

### Hosting Recommendations

#### Frontend Hosting
- **Vercel**: Recommended for React applications
- **Netlify**: Alternative for static hosting
- **AWS S3 + CloudFront**: For enterprise deployments
- **DigitalOcean App Platform**: For simple deployments

#### Backend Hosting
- **DigitalOcean Droplet**: Cost-effective VPS
- **AWS EC2**: Scalable cloud hosting
- **Google Cloud Platform**: Enterprise-grade hosting
- **Linode**: Developer-friendly VPS

#### Database Hosting
- **DigitalOcean Managed Database**: Managed MySQL
- **AWS RDS**: Scalable managed database
- **Google Cloud SQL**: Enterprise database hosting
- **Self-hosted MySQL**: For full control

## Environment Setup

### Production Environment Variables

#### Frontend Environment (.env.production)
```env
# API Configuration
VITE_API_BASE_URL=https://api.biz365.ai
VITE_APP_NAME=Biz365 Admin Panel
VITE_APP_ENV=production
VITE_APP_VERSION=1.0.0

# Authentication
VITE_JWT_SECRET=your-super-secret-jwt-key-here
VITE_TOKEN_EXPIRY=3600

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_LOGGING=true
VITE_ENABLE_DEBUG=false

# External Services
VITE_GOOGLE_OAUTH_CLIENT_ID=your-google-client-id
VITE_APPLE_OAUTH_CLIENT_ID=your-apple-client-id
```

#### Backend Environment (.env.production)
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=biz365_production
DB_USER=biz365_user
DB_PASS=your-secure-database-password

# Application Configuration
APP_NAME=Biz365 API
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.biz365.ai
APP_KEY=your-32-character-secret-key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRY=3600
JWT_REFRESH_EXPIRY=86400

# OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret

# NFC Service Configuration
NFC_BASE_URL=https://nfc.biz365.ai
NFC_API_KEY=your-nfc-api-key

# Email Configuration
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-email-password
MAIL_ENCRYPTION=tls

# Logging Configuration
LOG_CHANNEL=stack
LOG_LEVEL=error
LOG_FILE=/var/log/biz365/api.log

# Security Configuration
CORS_ALLOWED_ORIGINS=https://admin.biz365.ai,https://biz365.ai
RATE_LIMIT_ENABLED=true
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60
```

## Frontend Deployment

### Build Process

#### 1. Install Dependencies
```bash
cd dashbord/apps/dashboard
npm ci --production
```

#### 2. Build for Production
```bash
npm run build
```

#### 3. Verify Build
```bash
# Check build output
ls -la dist/
# Verify no errors in build
npm run build 2>&1 | grep -i error
```

### Deployment Options

#### Option 1: Vercel Deployment (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy to Vercel**
```bash
cd dashbord/apps/dashboard
vercel --prod
```

3. **Configure Environment Variables**
```bash
vercel env add VITE_API_BASE_URL
vercel env add VITE_APP_NAME
# ... add all environment variables
```

4. **Configure Custom Domain**
```bash
vercel domains add admin.biz365.ai
```

#### Option 2: Netlify Deployment

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Deploy to Netlify**
```bash
cd dashbord/apps/dashboard
netlify deploy --prod --dir=dist
```

3. **Configure Environment Variables**
```bash
netlify env:set VITE_API_BASE_URL https://api.biz365.ai
netlify env:set VITE_APP_NAME "Biz365 Admin Panel"
# ... add all environment variables
```

#### Option 3: AWS S3 + CloudFront

1. **Install AWS CLI**
```bash
pip install awscli
```

2. **Configure AWS**
```bash
aws configure
```

3. **Upload to S3**
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

4. **Create CloudFront Distribution**
```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

#### Option 4: Traditional Web Server

1. **Copy Build Files**
```bash
scp -r dist/* user@server:/var/www/html/admin/
```

2. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name admin.biz365.ai;
    root /var/www/html/admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Backend API Deployment

### PHP Environment Setup

#### 1. Install PHP and Extensions
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install php8.2 php8.2-fpm php8.2-mysql php8.2-curl php8.2-json php8.2-mbstring php8.2-xml php8.2-zip

# CentOS/RHEL
sudo yum install php82 php82-php-fpm php82-php-mysql php82-php-curl php82-php-json php82-php-mbstring php82-php-xml php82-php-zip
```

#### 2. Install Composer
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

#### 3. Deploy Application
```bash
# Clone repository
git clone https://github.com/your-org/biz365-api.git /var/www/biz365-api
cd /var/www/biz365-api

# Install dependencies
composer install --no-dev --optimize-autoloader

# Set permissions
sudo chown -R www-data:www-data /var/www/biz365-api
sudo chmod -R 755 /var/www/biz365-api
```

### Web Server Configuration

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.biz365.ai;
    root /var/www/biz365-api/public;
    index index.php;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req zone=api burst=20 nodelay;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

#### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName api.biz365.ai
    DocumentRoot /var/www/biz365-api/public

    <Directory /var/www/biz365-api/public>
        AllowOverride All
        Require all granted
    </Directory>

    # Security headers
    Header always set X-Frame-Options "SAMEORIGIN"
    Header always set X-XSS-Protection "1; mode=block"
    Header always set X-Content-Type-Options "nosniff"
    Header always set Referrer-Policy "no-referrer-when-downgrade"

    # Rate limiting
    <Location />
        SetOutputFilter RATE_LIMIT
        SetEnv rate-limit 10
    </Location>

    ErrorLog ${APACHE_LOG_DIR}/biz365-api_error.log
    CustomLog ${APACHE_LOG_DIR}/biz365-api_access.log combined
</VirtualHost>
```

### PHP-FPM Configuration

#### PHP-FPM Pool Configuration
```ini
[biz365]
user = www-data
group = www-data
listen = /var/run/php/php8.2-fpm-biz365.sock
listen.owner = www-data
listen.group = www-data
listen.mode = 0660

pm = dynamic
pm.max_children = 50
pm.start_servers = 5
pm.min_spare_servers = 5
pm.max_spare_servers = 35
pm.max_requests = 500

php_admin_value[error_log] = /var/log/php8.2-fpm-biz365.log
php_admin_flag[log_errors] = on
php_admin_value[memory_limit] = 256M
php_admin_value[max_execution_time] = 30
```

## Database Setup

### MySQL Installation and Configuration

#### 1. Install MySQL
```bash
# Ubuntu/Debian
sudo apt install mysql-server-8.0

# CentOS/RHEL
sudo yum install mysql-server
```

#### 2. Secure MySQL Installation
```bash
sudo mysql_secure_installation
```

#### 3. Create Database and User
```sql
CREATE DATABASE biz365_production CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'biz365_user'@'localhost' IDENTIFIED BY 'your-secure-password';
GRANT ALL PRIVILEGES ON biz365_production.* TO 'biz365_user'@'localhost';
FLUSH PRIVILEGES;
```

#### 4. Run Database Migrations
```bash
cd /var/www/biz365-api
php artisan migrate --force
php artisan db:seed --force
```

### Database Optimization

#### MySQL Configuration
```ini
[mysqld]
# Performance
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# Security
bind-address = 127.0.0.1
skip-networking = false
max_connections = 200

# Logging
log-error = /var/log/mysql/error.log
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
```

## Production Configuration

### SSL/TLS Setup

#### Let's Encrypt SSL Certificate
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d api.biz365.ai -d admin.biz365.ai

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### SSL Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name api.biz365.ai;

    ssl_certificate /etc/letsencrypt/live/api.biz365.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.biz365.ai/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Rest of configuration...
}
```

### Security Configuration

#### Firewall Setup
```bash
# UFW (Ubuntu)
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 3306/tcp

# iptables (CentOS/RHEL)
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 3306 -j DROP
```

#### Fail2Ban Configuration
```ini
[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-limit-req]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
```

## Monitoring & Logging

### Application Monitoring

#### Log Configuration
```bash
# Create log directories
sudo mkdir -p /var/log/biz365
sudo chown www-data:www-data /var/log/biz365

# Log rotation
sudo nano /etc/logrotate.d/biz365
```

#### Log Rotation Configuration
```
/var/log/biz365/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
    postrotate
        /bin/kill -USR1 `cat /var/run/nginx.pid 2>/dev/null` 2>/dev/null || true
    endscript
}
```

### System Monitoring

#### Install Monitoring Tools
```bash
# Install htop, iotop, netstat
sudo apt install htop iotop net-tools

# Install Prometheus Node Exporter
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz
tar xvfz node_exporter-1.6.1.linux-amd64.tar.gz
sudo mv node_exporter-1.6.1.linux-amd64/node_exporter /usr/local/bin/
```

#### System Monitoring Script
```bash
#!/bin/bash
# /usr/local/bin/system-monitor.sh

# Check disk space
df -h | awk '$5 > 80 {print $0}'

# Check memory usage
free -m | awk 'NR==2{printf "Memory Usage: %s/%sMB (%.2f%%)\n", $3,$2,$3*100/$2 }'

# Check CPU usage
top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print "CPU Usage: " $1 "%"}'

# Check MySQL status
systemctl is-active mysql

# Check Nginx status
systemctl is-active nginx

# Check PHP-FPM status
systemctl is-active php8.2-fpm
```

## Backup & Recovery

### Database Backup

#### Automated Backup Script
```bash
#!/bin/bash
# /usr/local/bin/backup-database.sh

BACKUP_DIR="/var/backups/biz365"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="biz365_production"
DB_USER="biz365_user"
DB_PASS="your-secure-password"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create database backup
mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/db_backup_$DATE.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +7 -delete

# Log backup
echo "$(date): Database backup completed - db_backup_$DATE.sql.gz" >> /var/log/biz365/backup.log
```

#### Backup Cron Job
```bash
# Add to crontab
0 2 * * * /usr/local/bin/backup-database.sh
```

### Application Backup

#### Code Backup Script
```bash
#!/bin/bash
# /usr/local/bin/backup-application.sh

BACKUP_DIR="/var/backups/biz365"
DATE=$(date +%Y%m%d_%H%M%S)
APP_DIR="/var/www/biz365-api"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create application backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz -C $APP_DIR .

# Keep only last 7 days of backups
find $BACKUP_DIR -name "app_backup_*.tar.gz" -mtime +7 -delete

# Log backup
echo "$(date): Application backup completed - app_backup_$DATE.tar.gz" >> /var/log/biz365/backup.log
```

### Recovery Procedures

#### Database Recovery
```bash
# Restore from backup
gunzip -c /var/backups/biz365/db_backup_20240115_020000.sql.gz | mysql -u biz365_user -p biz365_production
```

#### Application Recovery
```bash
# Restore application
tar -xzf /var/backups/biz365/app_backup_20240115_020000.tar.gz -C /var/www/biz365-api/
```

## Scaling & Performance

### Horizontal Scaling

#### Load Balancer Configuration
```nginx
upstream api_backend {
    server 10.0.1.10:80;
    server 10.0.1.11:80;
    server 10.0.1.12:80;
}

server {
    listen 80;
    server_name api.biz365.ai;

    location / {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Performance Optimization

#### PHP-FPM Optimization
```ini
pm = dynamic
pm.max_children = 100
pm.start_servers = 20
pm.min_spare_servers = 10
pm.max_spare_servers = 30
pm.max_requests = 1000
```

#### MySQL Optimization
```ini
innodb_buffer_pool_size = 2G
innodb_log_file_size = 512M
innodb_flush_log_at_trx_commit = 2
query_cache_size = 64M
query_cache_type = 1
```

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version
npm --version
```

#### 2. API Connection Issues
```bash
# Check API endpoint
curl -I https://api.biz365.ai/health

# Check CORS configuration
curl -H "Origin: https://admin.biz365.ai" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: X-Requested-With" -X OPTIONS https://api.biz365.ai/api/admin/users
```

#### 3. Database Connection Issues
```bash
# Test database connection
mysql -u biz365_user -p -h localhost biz365_production

# Check MySQL status
systemctl status mysql

# Check MySQL logs
tail -f /var/log/mysql/error.log
```

#### 4. Performance Issues
```bash
# Check system resources
htop
iotop
netstat -tulpn

# Check PHP-FPM status
systemctl status php8.2-fpm

# Check slow queries
tail -f /var/log/mysql/slow.log
```

### Log Analysis

#### Application Logs
```bash
# Check application logs
tail -f /var/log/biz365/api.log

# Check error logs
grep "ERROR" /var/log/biz365/api.log

# Check access logs
tail -f /var/log/nginx/access.log
```

#### System Logs
```bash
# Check system logs
journalctl -u nginx -f
journalctl -u mysql -f
journalctl -u php8.2-fpm -f
```

## Deployment Checklist

### Pre-Deployment
- [ ] All tests pass
- [ ] Security audit completed
- [ ] Performance testing completed
- [ ] Backup procedures tested
- [ ] Environment variables configured
- [ ] SSL certificates obtained
- [ ] DNS records configured

### Deployment
- [ ] Database migrations run
- [ ] Application deployed
- [ ] Web server configured
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Monitoring configured
- [ ] Backup scripts configured

### Post-Deployment
- [ ] Health checks pass
- [ ] All endpoints accessible
- [ ] SSL certificate valid
- [ ] Performance metrics acceptable
- [ ] Error rates within limits
- [ ] Backup procedures working
- [ ] Monitoring alerts configured

## Support & Maintenance

### Regular Maintenance Tasks
- [ ] Update dependencies monthly
- [ ] Review security logs weekly
- [ ] Test backup procedures monthly
- [ ] Monitor performance metrics daily
- [ ] Review error logs daily
- [ ] Update SSL certificates annually

### Emergency Contacts
- **System Administrator**: admin@biz365.ai
- **Database Administrator**: dba@biz365.ai
- **Security Team**: security@biz365.ai
- **Emergency Hotline**: +1-XXX-XXX-XXXX

---

**Last Updated**: [Date]
**Version**: 1.0.0
**Maintained By**: DevOps Team
