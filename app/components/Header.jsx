'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Header({ isDark, toggleTheme }) {
  return (
    <header className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient" />
            <span className="font-bold text-2xl text-white">NoteAI</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            {['Home', 'About', 'Todo', 'Note', 'Expense Tracker'].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`}>
                <Button variant="ghost" className="text-slate-200 hover:bg-white/10 hover:text-white transition-colors duration-300">
                  {item}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="text-yellow-300 hover:bg-yellow-900/30 transition-colors duration-300"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  )
}