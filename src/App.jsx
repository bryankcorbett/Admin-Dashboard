import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import Analytics from './pages/Analytics'
import Users from './pages/Users'
import NfcTags from './pages/NfcTags'
import Reviews from './pages/Reviews'
import EmailManagement from './pages/EmailManagement'
import OTPManagement from './pages/OTPManagement'
import Roles from './pages/Roles'
import Settings from './pages/Settings'
import Logs from './pages/Logs'
import ApiKeys from './pages/ApiKeys'
import Backups from './pages/Backups'
import OAuth from './pages/OAuth'
import NfcService from './pages/NfcService'
import GoogleServices from './pages/GoogleServices'

function App() {
  // Demo user for the application
  const user = { id: 1, name: 'Admin User', email: 'admin@biz365.ai', role: 'admin' }

  return (
    <Routes>
      {/* Default route redirects to admin dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Admin routes */}
      <Route path="/dashboard" element={
        <AdminLayout user={user}>
          <AdminDashboard />
        </AdminLayout>
      } />
      <Route path="/analytics" element={
        <AdminLayout user={user}>
          <Analytics />
        </AdminLayout>
      } />
      <Route path="/users" element={
        <AdminLayout user={user}>
          <Users />
        </AdminLayout>
      } />
      <Route path="/nfc-tags" element={
        <AdminLayout user={user}>
          <NfcTags />
        </AdminLayout>
      } />
                  <Route path="/reviews" element={
              <AdminLayout user={user}>
                <Reviews />
              </AdminLayout>
            } />
            <Route path="/email-management" element={
              <AdminLayout user={user}>
                <EmailManagement />
              </AdminLayout>
            } />
            <Route path="/otp-management" element={
              <AdminLayout user={user}>
                <OTPManagement />
              </AdminLayout>
            } />
            <Route path="/roles" element={
              <AdminLayout user={user}>
                <Roles />
              </AdminLayout>
            } />
      <Route path="/settings" element={
        <AdminLayout user={user}>
          <Settings />
        </AdminLayout>
      } />
      <Route path="/logs" element={
        <AdminLayout user={user}>
          <Logs />
        </AdminLayout>
      } />
      <Route path="/api-keys" element={
        <AdminLayout user={user}>
          <ApiKeys />
        </AdminLayout>
      } />
      <Route path="/backups" element={
        <AdminLayout user={user}>
          <Backups />
        </AdminLayout>
      } />
      <Route path="/oauth" element={
        <AdminLayout user={user}>
          <OAuth />
        </AdminLayout>
      } />
      <Route path="/nfc-service" element={
        <AdminLayout user={user}>
          <NfcService />
        </AdminLayout>
      } />
      <Route path="/google" element={
        <AdminLayout user={user}>
          <GoogleServices />
        </AdminLayout>
      } />
    </Routes>
  )
}

export default App
