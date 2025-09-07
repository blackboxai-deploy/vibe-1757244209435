'use client'

import { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LoadingSpinner from './LoadingSpinner'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading: boolean
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim() && !isLoading) {
      onSearch(query.trim())
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="w-full h-14 pl-6 pr-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-full focus:border-blue-500 dark:focus:border-blue-400 focus:ring-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-white dark:bg-gray-800"
              disabled={isLoading}
              autoFocus
            />
          </div>
          
          <Button
            onClick={handleSearch}
            disabled={!query.trim() || isLoading}
            className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <LoadingSpinner size="sm" />
                <span>Searching...</span>
              </div>
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </div>
      
      {/* Search suggestions or recent queries could go here */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Try asking: "What is artificial intelligence?" or "Explain quantum computing"
        </p>
      </div>
    </div>
  )
}