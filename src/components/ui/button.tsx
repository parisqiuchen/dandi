import React from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'hero'
  size?: 'sm' | 'default' | 'lg'
  children: React.ReactNode
}

export function Button({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
  
  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
    outline: "border-2 border-blue-600 bg-transparent text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-purple-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200",
    ghost: "hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all duration-200",
    hero: "bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white hover:from-orange-600 hover:via-pink-600 hover:to-violet-700 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 font-semibold"
  }
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 py-2 px-4",
    lg: "h-11 px-8"
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
} 