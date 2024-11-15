'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NotePage() {
  const [notes, setNotes] = useState([])
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes')
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes))
    }
    
    const storedTheme = localStorage.getItem('isDark')
    if (storedTheme !== null) {
      setIsDark(JSON.parse(storedTheme))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('isDark', JSON.stringify(isDark))
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      content: '',
      createdAt: new Date().toISOString()
    }
    setNotes([newNote, ...notes])
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const clearNotes = () => {
    setNotes([])
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <div className={`bg-gradient-to-br ${isDark ? 'from-gray-900 via-purple-900 to-gray-900' : 'from-blue-100 via-white to-pink-100'} flex-grow flex flex-col transition-colors duration-500`}>
        <header className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} bg-opacity-90 backdrop-blur-md sticky top-0 z-10`}>
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient" />
                <span className={`font-bold text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>NoteAI</span>
              </div>
              <nav className="hidden md:flex space-x-4">
                {['Home', 'About', 'Todo', 'Note', 'Expense Tracker'].map((item) => (
                  <Button key={item} variant="ghost" className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} hover:bg-opacity-20 transition-colors duration-300`}>
                    {item}
                  </Button>
                ))}
              </nav>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`${isDark ? 'text-yellow-300 hover:bg-yellow-900/30' : 'text-gray-600 hover:bg-gray-200'} transition-colors duration-300`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8 flex-grow flex justify-center items-start">
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
            <div className="space-y-6">
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center space-x-2`}>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                  Notes
                </span>
              </h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                You can add notes by clicking this colorful button, the notes will automatically save.
                You can also delete the notes one by one by clicking the trash icon in each note or
                just clear all the notes by clicking the red button below.
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={addNote}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Note
                </Button>
                <Button
                  onClick={clearNotes}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Trash className="h-5 w-5 mr-2" />
                  Clear Notes
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} flex items-center space-x-2`}>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                  Note List
                </span>
              </h2>
              <div className="space-y-4">
                {notes.map(note => (
                  <Card key={note.id} className={`group ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border-transparent hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-lg`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <textarea
                          className={`w-full ${isDark ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} resize-none focus:outline-none transition-colors duration-300`}
                          rows={4}
                          placeholder="Write your note here..."
                          value={note.content}
                          onChange={(e) => {
                            const updatedNotes = notes.map(n =>
                              n.id === note.id ? { ...n, content: e.target.value } : n
                            )
                            setNotes(updatedNotes)
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNote(note.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className={`border-t ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'} bg-opacity-90 backdrop-blur-md`}>
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient" />
                <span className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>NoteAI</span>
              </div>
              <nav className="flex space-x-4">
                {['Home', 'Todo', 'Note', 'Expense Tracker'].map((item) => (
                  <button
                    key={item}
                    className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>
            <div className={`text-center mt-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              © 2024 AIvalent. All Rights Reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}