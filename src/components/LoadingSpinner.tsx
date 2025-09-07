'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const dotSizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  }

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <div className="relative">
        {/* Animated dots */}
        <div className="flex space-x-1">
          <div className={`${dotSizeClasses[size]} bg-blue-500 rounded-full animate-pulse`} style={{ animationDelay: '0ms' }}></div>
          <div className={`${dotSizeClasses[size]} bg-blue-500 rounded-full animate-pulse`} style={{ animationDelay: '150ms' }}></div>
          <div className={`${dotSizeClasses[size]} bg-blue-500 rounded-full animate-pulse`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}