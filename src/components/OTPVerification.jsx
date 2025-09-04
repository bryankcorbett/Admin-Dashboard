import { useState, useEffect, useRef } from 'react'

const OTPVerification = ({ 
  otpId, 
  email, 
  action, 
  onVerify, 
  onResend, 
  onCancel,
  isLoading = false,
  error = null,
  expiresAt = null 
}) => {
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)
  const [attemptsLeft, setAttemptsLeft] = useState(3)
  const inputRefs = useRef([])

  // Calculate time left
  useEffect(() => {
    if (!expiresAt) return

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const expiry = new Date(expiresAt).getTime()
      const difference = expiry - now

      if (difference > 0) {
        const minutes = Math.floor(difference / 60000)
        const seconds = Math.floor((difference % 60000) / 1000)
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`)
      } else {
        setTimeLeft('Expired')
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  // Handle OTP input
  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtpCode = [...otpCode]
    newOtpCode[index] = value
    setOtpCode(newOtpCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all digits are entered
    if (newOtpCode.every(digit => digit !== '') && newOtpCode.join('').length === 6) {
      handleVerify(newOtpCode.join(''))
    }
  }

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    
    if (pastedData.length === 6) {
      const newOtpCode = pastedData.split('')
      setOtpCode(newOtpCode)
      inputRefs.current[5]?.focus()
      handleVerify(pastedData)
    }
  }

  // Verify OTP
  const handleVerify = async (code = null) => {
    const finalCode = code || otpCode.join('')
    
    if (finalCode.length !== 6) {
      return
    }

    setIsVerifying(true)
    try {
      await onVerify(finalCode)
    } catch (error) {
      console.error('OTP verification error:', error)
    } finally {
      setIsVerifying(false)
    }
  }

  // Resend OTP
  const handleResend = async () => {
    setIsResending(true)
    try {
      await onResend()
      setOtpCode(['', '', '', '', '', ''])
      setAttemptsLeft(3)
      inputRefs.current[0]?.focus()
    } catch (error) {
      console.error('OTP resend error:', error)
    } finally {
      setIsResending(false)
    }
  }

  // Get action text
  const getActionText = (action) => {
    const actions = {
      signup: 'account registration',
      login: 'login verification',
      password_reset: 'password reset',
      email_verification: 'email verification',
      two_factor: 'two-factor authentication',
      transaction: 'transaction verification'
    }
    return actions[action] || 'verification'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Verify Your Email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a 6-digit verification code to
          </p>
          <p className="text-sm font-medium text-gray-900">
            {email}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            for {getActionText(action)}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* OTP Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 text-center">
              Enter verification code
            </label>
            <div className="flex justify-center space-x-2" onPaste={handlePaste}>
              {otpCode.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-colors"
                  disabled={isVerifying || isLoading}
                />
              ))}
            </div>
          </div>

          {/* Timer and Status */}
          <div className="text-center space-y-2">
            {timeLeft && (
              <p className={`text-sm ${timeLeft === 'Expired' ? 'text-red-600' : 'text-gray-600'}`}>
                {timeLeft === 'Expired' ? 'Code expired' : `Code expires in ${timeLeft}`}
              </p>
            )}
            {attemptsLeft < 3 && (
              <p className="text-sm text-orange-600">
                {attemptsLeft} attempts remaining
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying || isLoading || otpCode.join('').length !== 6 || timeLeft === 'Expired'}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isVerifying ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                'Verify Code'
              )}
            </button>

            <div className="flex space-x-3">
              <button
                onClick={handleResend}
                disabled={isResending || isLoading}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResending ? 'Sending...' : 'Resend Code'}
              </button>
              
              {onCancel && (
                <button
                  onClick={onCancel}
                  disabled={isVerifying || isLoading}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Security Notice</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Never share your verification code</li>
                    <li>Only enter the code on official Biz365 pages</li>
                    <li>If you didn't request this code, ignore this email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTPVerification
