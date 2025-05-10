// src/components/Auth/AuthFormInput.js
import React from 'react'
import { Eye, EyeOff } from 'lucide-react'

const AuthFormInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword
}) => {
  const isPassword = type === 'password'

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={isPassword && showPassword ? 'text' : type}
        value={value}
        onChange={onChange}
        required
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        placeholder={placeholder}
      />
      {isPassword && (
        <div
          className="absolute right-3 top-9 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      )}
    </div>
  )
}

export default AuthFormInput
