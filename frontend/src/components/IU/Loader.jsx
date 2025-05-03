import React from 'react'
import { LoaderCircle } from 'lucide-react';
import './Loader.css'

export const Loader = () => {
  return (
    <div className="loader-container">
    <LoaderCircle className="loader-icon" size={48} />
  </div>
  )
}
