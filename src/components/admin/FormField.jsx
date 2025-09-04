import { cn } from '../../lib/utils'

/**
 * Generic Form Field Component
 * Renders appropriate input control based on field type and schema
 */
export default function FormField({ 
  field, 
  value, 
  onChange, 
  error = null,
  options = [],
  className = ''
}) {
  const { key, label, type, required = false, placeholder, description } = field

  const baseInputClasses = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
  const errorClasses = "border-red-300 focus:ring-red-500 focus:border-red-500"
  const normalClasses = "border-gray-300"

  const inputClasses = cn(
    baseInputClasses,
    error ? errorClasses : normalClasses,
    className
  )

  const handleChange = (e) => {
    let newValue = e.target.value

    // Type conversion based on field type
    if (type === 'number') {
      newValue = newValue === '' ? null : Number(newValue)
    } else if (type === 'boolean') {
      newValue = e.target.checked
    }

    onChange(key, newValue)
  }

  const renderInput = () => {
    switch (type) {
      case 'boolean':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={key}
              checked={value || false}
              onChange={handleChange}
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <label htmlFor={key} className="ml-2 block text-sm text-gray-900">
              {label}
            </label>
          </div>
        )

      case 'enum':
        return (
          <select
            id={key}
            value={value || ''}
            onChange={handleChange}
            className={inputClasses}
            required={required}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'textarea':
        return (
          <textarea
            id={key}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            rows={4}
            className={inputClasses}
          />
        )

      case 'email':
        return (
          <input
            type="email"
            id={key}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )

      case 'url':
        return (
          <input
            type="url"
            id={key}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )

      case 'number':
        return (
          <input
            type="number"
            id={key}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )

      case 'timestamp':
        return (
          <input
            type="datetime-local"
            id={key}
            value={value ? new Date(value).toISOString().slice(0, 16) : ''}
            onChange={(e) => {
              const newValue = e.target.value ? new Date(e.target.value).toISOString() : null
              onChange(key, newValue)
            }}
            required={required}
            className={inputClasses}
          />
        )

      case 'password':
        return (
          <input
            type="password"
            id={key}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )

      default:
        return (
          <input
            type="text"
            id={key}
            value={value || ''}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )
    }
  }

  if (type === 'boolean') {
    return (
      <div className={cn("space-y-1", className)}>
        {renderInput()}
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div className={cn("space-y-1", className)}>
      <label htmlFor={key} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
