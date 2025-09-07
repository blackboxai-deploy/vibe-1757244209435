'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
import SearchHistory from '@/components/SearchHistory'
import ThemeToggle from '@/components/ThemeToggle'

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  const handleSearch = async (query: string) => {
    if (!query.trim()) return

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setSearchResults([data])
      
      // Add to search history
      const updatedHistory = [query, ...searchHistory.filter(h => h !== query)].slice(0, 10)
      setSearchHistory(updatedHistory)
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
      
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([{
        query,
        response: 'Sorry, I encountered an error while processing your search. Please try again.',
        timestamp: new Date().toISOString()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleHistorySelect = (query: string) => {
    handleSearch(query)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                AI Search
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Powered by Advanced AI
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Search History Sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <SearchHistory 
            history={searchHistory} 
            onSelectHistory={handleHistorySelect}
          />
        </div>

        {/* Main Search Area */}
        <div className="flex-1 flex flex-col">
          {/* Search Section */}
          <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
                  What would you like to know?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Ask any question and get intelligent, comprehensive answers
                </p>
              </div>
              
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <SearchResults results={searchResults} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}