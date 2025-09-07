import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Search - Intelligent Information Discovery',
  description: 'Get instant, accurate answers to your questions powered by advanced AI technology',
  keywords: 'AI search, intelligent search, information, answers, artificial intelligence',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}