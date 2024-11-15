'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Header from './components/header'
import Footer from './components/footer'
import NoteCard from './components/note-card'

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

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex-grow flex flex-col">
        <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                  Notes
                </span>
              </h2>
              <p className="text-slate-300 leading-relaxed">
                You can add notes by clicking this green button, the notes will automatically save.
                You can also delete the notes one by one by clicking the trash icon in each note or
                just clear all the notes by clicking the red button below.
              </p>
              <div className="flex space-x-4">
                <Button
                  onClick={addNote}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Note
                </Button>
                <Button
                  onClick={clearNotes}
                  className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white transition-all duration-300 transform hover:scale-105"
                >
                  <Trash className="h-5 w-5 mr-2" />
                  Clear Notes
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                  Note List
                </span>
              </h2>
              <div className="space-y-4">
                {notes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={deleteNote}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}