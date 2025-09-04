import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import Users from './pages/Users'
import NfcTags from './pages/NfcTags'
import Settings from './pages/Settings'
import Roles from './pages/Roles'
import Logs from './pages/Logs'

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
      <Route path="/settings" element={
        <AdminLayout user={user}>
          <Settings />
        </AdminLayout>
      } />
      <Route path="/roles" element={
        <AdminLayout user={user}>
          <Roles />
        </AdminLayout>
      } />
      <Route path="/logs" element={
        <AdminLayout user={user}>
          <Logs />
        </AdminLayout>
      } />
    </Routes>
  )
}

export default App
