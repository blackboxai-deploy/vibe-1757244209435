'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

interface SearchHistoryProps {
  history: string[]
  onSelectHistory: (query: string) => void
}

export default function SearchHistory({ history, onSelectHistory }: SearchHistoryProps) {
  const [localHistory, setLocalHistory] = useState<string[]>([])

  useEffect(() => {
    // Load history from localStorage on mount
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
      try {
        setLocalHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to parse search history:', error)
      }
    }
  }, [])

  useEffect(() => {
    setLocalHistory(history)
  }, [history])

  const clearHistory = () => {
    localStorage.removeItem('searchHistory')
    setLocalHistory([])
  }

  const formatQuery = (query: string, maxLength: number = 50) => {
    return query.length > maxLength ? query.substring(0, maxLength) + '...' : query
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Recent Searches
          </h3>
          {localHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* History List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {localHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 px-4">
                Your search history will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {localHistory.map((query, index) => (
                <button
                  key={index}
                  onClick={() => onSelectHistory(query)}
                  className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                      🔍
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 leading-relaxed">
                        {formatQuery(query)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Search #{localHistory.length - index}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Popular Suggestions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Try These
        </h4>
        <div className="space-y-2">
          {[
            'What is machine learning?',
            'Explain climate change',
            'How does blockchain work?',
            'Benefits of renewable energy'
          ].map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelectHistory(suggestion)}
              className="w-full text-left p-2 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}