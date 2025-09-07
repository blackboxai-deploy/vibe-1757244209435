'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-9 h-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-9 h-9 hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <span className="sr-only">Toggle theme</span>
      {theme === 'dark' ? (
        <span className="text-yellow-500 text-lg">☀️</span>
      ) : (
        <span className="text-gray-700 text-lg">🌙</span>
      )}
    </Button>
  )
}