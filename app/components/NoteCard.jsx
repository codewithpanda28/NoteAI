import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function NoteCard({ note, onDelete }) {
  return (
    <Card className="group bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-purple-500 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <textarea
            className="w-full bg-transparent text-slate-200 resize-none focus:outline-none"
            rows={4}
            placeholder="Write your note here..."
            value={note.content}
            readOnly
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(note.id)}
            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 hover:bg-red-900/30 transition-all duration-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}