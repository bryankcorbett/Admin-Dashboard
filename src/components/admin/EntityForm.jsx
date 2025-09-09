import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import FormField from './FormField'

/**
 * Generic Entity Form Component
 * Creates forms dynamically based on entity schema and field definitions
 */
export default function EntityForm({ 
  fields, 
  initialData = {}, 
  onSubmit, 
  submitLabel = 'Save',
  loading = false,
  className = ''
}) {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Initialize form data
  useEffect(() => {
    const initialFormData = {}
    fields.forEach(field => {
      initialFormData[field.key] = initialData[field.key] || field.defaultValue || null
    })
    setFormData(initialFormData)
  }, [fields, initialData])

  // Client-side validation
  const validateField = (key, value, field) => {
    const fieldErrors = []

    // Required validation
    if (field.required && (!value || value === '')) {
      fieldErrors.push(`${field.label} is required`)
    }

    // Type-specific validation
    if (value && value !== '') {
      switch (field.type) {
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            fieldErrors.push('Please enter a valid email address')
          }
          break
        case 'url':
          try {
            new URL(value)
          } catch {
            fieldErrors.push('Please enter a valid URL')
          }
          break
        case 'number':
          if (isNaN(value)) {
            fieldErrors.push('Please enter a valid number')
          }
          if (field.min !== undefined && value < field.min) {
            fieldErrors.push(`Value must be at least ${field.min}`)
          }
          if (field.max !== undefined && value > field.max) {
            fieldErrors.push(`Value must be at most ${field.max}`)
          }
          break
        case 'string':
          if (field.maxLength && value.length > field.maxLength) {
            fieldErrors.push(`Maximum length is ${field.maxLength} characters`)
          }
          if (field.minLength && value.length < field.minLength) {
            fieldErrors.push(`Minimum length is ${field.minLength} characters`)
          }
          break
      }
    }

    return fieldErrors
  }

  // Validate all fields
  const validateForm = () => {
    const newErrors = {}
    let isValid = true

    fields.forEach(field => {
      const fieldErrors = validateField(field.key, formData[field.key], field)
      if (fieldErrors.length > 0) {
        newErrors[field.key] = fieldErrors[0] // Show first error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  // Handle field change
  const handleFieldChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }))
    
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }))
    }
  }

  // Handle field blur (for validation)
  const handleFieldBlur = (key) => {
    setTouched(prev => ({ ...prev, [key]: true }))
    
    const field = fields.find(f => f.key === key)
    if (field) {
      const fieldErrors = validateField(key, formData[key], field)
      setErrors(prev => ({ 
        ...prev, 
        [key]: fieldErrors.length > 0 ? fieldErrors[0] : null 
      }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      // Handle server-side validation errors
      if (error.details && typeof error.details === 'object') {
        setErrors(error.details)
      } else {
        console.error('Form submission error:', error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 gap-6">
        {fields.map((field) => (
          <FormField
            key={field.key}
            field={field}
            value={formData[field.key]}
            onChange={handleFieldChange}
            error={touched[field.key] ? errors[field.key] : null}
            options={field.options || []}
          />
        ))}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={() => window.history.back()}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </div>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  )
}
