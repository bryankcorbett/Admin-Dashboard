import { useState, useEffect } from 'react'
import { cn } from '../lib/utils'
import Modal from '../components/admin/Modal'
import EntityForm from '../components/admin/EntityForm'
import Toast, { ToastContainer } from '../components/admin/Toast'
import { Settings as SettingsIcon, Save, Eye, EyeOff, Key, Globe, Shield, Mail, Smartphone } from 'lucide-react'
import apiClient from '../services/apiClient'

export default function Settings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [toasts, setToasts] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedSetting, setSelectedSetting] = useState(null)
  const [showSecrets, setShowSecrets] = useState({})

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await apiClient.getSettings()
      setSettings(response.data || {})
    } catch (err) {
      setError(err.message || 'Failed to load settings')
      addToast('Failed to load settings', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Toast management
  const addToast = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError(null)
      setSuccess(false)
      
      await apiClient.updateSettings(settings)
      setSuccess(true)
      addToast('Settings saved successfully!', 'success')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.message || 'Failed to save settings')
      addToast('Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleEditSetting = (setting) => {
    setSelectedSetting(setting)
    setShowEditModal(true)
  }

  const handleUpdateSetting = async (formData) => {
    try {
      setSaving(true)
      await apiClient.updateEntity('/admin/settings', selectedSetting.key, formData)
      
      setShowEditModal(false)
      setSelectedSetting(null)
      addToast('Setting updated successfully!', 'success')
      fetchSettings()
    } catch (error) {
      console.error('Update error:', error)
      addToast(error.message || 'Failed to update setting', 'error')
      throw error
    } finally {
      setSaving(false)
    }
  }

  const toggleSecretVisibility = (key) => {
    setShowSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const isSecretField = (key) => {
    const secretFields = ['client_secret', 'api_key', 'private_key', 'password', 'token']
    return secretFields.some(field => key.toLowerCase().includes(field))
  }

  const maskSecret = (value) => {
    if (!value) return ''
    return '•'.repeat(Math.min(value.length, 20))
  }

  const handleInputChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleNestedInputChange = (parentKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [key]: value
      }
    }))
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure system settings and preferences
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Convert settings to array for table display
  const settingsArray = Object.entries(settings).map(([key, value]) => ({
    key,
    value: typeof value === 'object' ? JSON.stringify(value) : value,
    type: typeof value,
    category: getSettingCategory(key)
  }))

  const getSettingCategory = (key) => {
    if (key.includes('oauth') || key.includes('google') || key.includes('apple')) return 'OAuth'
    if (key.includes('nfc')) return 'NFC'
    if (key.includes('email') || key.includes('smtp')) return 'Email'
    if (key.includes('security') || key.includes('auth')) return 'Security'
    if (key.includes('app') || key.includes('maintenance') || key.includes('registration')) return 'General'
    return 'Other'
  }

  const settingSchema = {
    value: { type: 'textarea', required: true, label: 'Value' },
    description: { type: 'textarea', required: false, label: 'Description' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="h-6 w-6 mr-2 text-amber-600" />
            System Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Configure system settings and global configurations
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {/* Settings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Settings</h3>
          <p className="text-sm text-gray-500 mt-1">Manage individual settings with secure handling of sensitive data</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Setting
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {settingsArray.map((setting) => (
                <tr key={setting.key} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {setting.category === 'OAuth' && <Key className="h-4 w-4 text-blue-500 mr-2" />}
                      {setting.category === 'NFC' && <Smartphone className="h-4 w-4 text-green-500 mr-2" />}
                      {setting.category === 'Email' && <Mail className="h-4 w-4 text-purple-500 mr-2" />}
                      {setting.category === 'Security' && <Shield className="h-4 w-4 text-red-500 mr-2" />}
                      {setting.category === 'General' && <Globe className="h-4 w-4 text-gray-500 mr-2" />}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{setting.key}</div>
                        <div className="text-sm text-gray-500">System configuration</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                      setting.category === 'OAuth' && "bg-blue-100 text-blue-800",
                      setting.category === 'NFC' && "bg-green-100 text-green-800",
                      setting.category === 'Email' && "bg-purple-100 text-purple-800",
                      setting.category === 'Security' && "bg-red-100 text-red-800",
                      setting.category === 'General' && "bg-gray-100 text-gray-800",
                      setting.category === 'Other' && "bg-yellow-100 text-yellow-800"
                    )}>
                      {setting.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    <div className="flex items-center">
                      {isSecretField(setting.key) ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-mono">
                            {showSecrets[setting.key] ? setting.value : maskSecret(setting.value)}
                          </span>
                          <button
                            onClick={() => toggleSecretVisibility(setting.key)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {showSecrets[setting.key] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="truncate">{setting.value}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {setting.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditSetting(setting)}
                      className="text-amber-600 hover:text-amber-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Name
            </label>
            <input
              type="text"
              value={settings.app_name || ''}
              onChange={(e) => handleInputChange('app_name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Version
            </label>
            <input
              type="text"
              value={settings.app_version || ''}
              onChange={(e) => handleInputChange('app_version', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="maintenance_mode"
              checked={settings.maintenance_mode || false}
              onChange={(e) => handleInputChange('maintenance_mode', e.target.checked)}
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-gray-900">
              Maintenance Mode
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="registration_enabled"
              checked={settings.registration_enabled !== false}
              onChange={(e) => handleInputChange('registration_enabled', e.target.checked)}
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="registration_enabled" className="ml-2 block text-sm text-gray-900">
              Enable User Registration
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="email_verification_required"
              checked={settings.email_verification_required !== false}
              onChange={(e) => handleInputChange('email_verification_required', e.target.checked)}
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor="email_verification_required" className="ml-2 block text-sm text-gray-900">
              Require Email Verification
            </label>
          </div>
        </div>
      </div>

      {/* OAuth Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">OAuth Providers</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Google OAuth</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="google_enabled"
                  checked={settings.oauth_providers?.google?.enabled || false}
                  onChange={(e) => handleNestedInputChange('oauth_providers', 'google', {
                    ...settings.oauth_providers?.google,
                    enabled: e.target.checked
                  })}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="google_enabled" className="ml-2 block text-sm text-gray-900">
                  Enable Google OAuth
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Client ID
                </label>
                <input
                  type="text"
                  value={settings.oauth_providers?.google?.client_id || ''}
                  onChange={(e) => handleNestedInputChange('oauth_providers', 'google', {
                    ...settings.oauth_providers?.google,
                    client_id: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Apple OAuth</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="apple_enabled"
                  checked={settings.oauth_providers?.apple?.enabled || false}
                  onChange={(e) => handleNestedInputChange('oauth_providers', 'apple', {
                    ...settings.oauth_providers?.apple,
                    enabled: e.target.checked
                  })}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="apple_enabled" className="ml-2 block text-sm text-gray-900">
                  Enable Apple OAuth
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apple Client ID
                </label>
                <input
                  type="text"
                  value={settings.oauth_providers?.apple?.client_id || ''}
                  onChange={(e) => handleNestedInputChange('oauth_providers', 'apple', {
                    ...settings.oauth_providers?.apple,
                    client_id: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NFC Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">NFC Settings</h3>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NFC Base URL
            </label>
            <input
              type="url"
              value={settings.nfc_settings?.base_url || ''}
              onChange={(e) => handleNestedInputChange('nfc_settings', 'base_url', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Edit Setting Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setSelectedSetting(null)
        }}
        title={`Edit Setting - ${selectedSetting?.key}`}
      >
        {selectedSetting && (
          <EntityForm
            schema={settingSchema}
            initialData={{
              value: selectedSetting.value,
              description: selectedSetting.description || ''
            }}
            onSubmit={handleUpdateSetting}
            loading={saving}
            submitText="Update Setting"
          />
        )}
      </Modal>

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  )
}
