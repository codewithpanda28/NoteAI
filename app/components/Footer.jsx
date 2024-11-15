export default function Footer() {
    return (
      <footer className="border-t border-slate-700 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-gradient" />
              <span className="font-bold text-xl text-white">NoteAI</span>
            </div>
            <nav className="flex space-x-4">
              {['Home', 'Todo', 'Note', 'Expense Tracker'].map((item) => (
                <button
                  key={item}
                  className="text-slate-300 hover:text-white transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
          <div className="text-center mt-4 text-sm text-slate-400">
            © 2024 AIvalent. All Rights Reserved.
          </div>
        </div>
      </footer>
    )
  }