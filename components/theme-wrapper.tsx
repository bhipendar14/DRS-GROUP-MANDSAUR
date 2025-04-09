"use client"

import { ReactNode } from 'react'
import { useTheme } from '@/context/theme-context'

interface ThemeWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ThemeWrapper({ children, className = '' }: ThemeWrapperProps) {
  const { theme } = useTheme()
  
  return (
    <div className={`${
      theme === 'light' 
        ? 'bg-white text-gray-800' 
        : 'bg-gray-900 text-white'
    } ${className}`}>
      {children}
    </div>
  )
} 