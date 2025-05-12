import React from 'react'

const Spinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
      <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  )
}

export default Spinner
