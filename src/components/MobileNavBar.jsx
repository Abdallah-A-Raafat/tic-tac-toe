import { useState } from 'react'

const MobileNavBar = ({ currentGame, setCurrentGame }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const games = [
    { id: 'home', name: 'Home', icon: '🏠', color: 'from-purple-500 to-pink-500' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', icon: '⭕', color: 'from-red-500 to-orange-500' },
    { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', icon: '✂️', color: 'from-green-500 to-teal-500' },
    { id: 'memory', name: 'Memory Game', icon: '🧠', color: 'from-blue-500 to-indigo-500' },
    { id: 'whack-a-mole', name: 'Whack-a-Mole', icon: '🔨', color: 'from-yellow-500 to-amber-500' },
    { id: 'guess-the-number', name: 'Guess the Number', icon: '🔢', color: 'from-indigo-500 to-purple-500' },
    { id: 'snake-and-ladder', name: 'Snake & Ladder', icon: '🐍', color: 'from-green-500 to-emerald-500' },
  ]

  const currentGameData = games.find(game => game.id === currentGame) || games[0]

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId)
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="animate-bounce">
                <h1 className="text-3xl font-bold text-white drop-shadow-lg">🎮 Mini Games</h1>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setCurrentGame(game.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm ${
                    currentGame === game.id
                      ? `bg-gradient-to-r ${game.color} text-white shadow-lg scale-105`
                      : 'text-white hover:bg-white hover:bg-opacity-20 backdrop-blur-sm'
                  }`}
                >
                  <span className="text-lg animate-pulse">{game.icon}</span>
                  <span className="font-semibold hidden lg:inline">{game.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="animate-bounce">
                <h1 className="text-xl font-bold text-white drop-shadow-lg">🎮 Mini Games</h1>
              </div>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 bg-gradient-to-r ${currentGameData.color} text-white shadow-lg`}
            >
              <span className="text-lg animate-pulse">{currentGameData.icon}</span>
              <span className="font-semibold">{currentGameData.name}</span>
              <span className={`transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}>
                ⬇️
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>
            
            {/* Menu */}
            <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-50 border-t-4 border-purple-500">
              <div className="container mx-auto px-4 py-4">
                <div className="grid grid-cols-1 gap-3">
                  {games.map((game) => (
                    <button
                      key={game.id}
                      onClick={() => handleGameSelect(game.id)}
                      className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        currentGame === game.id
                          ? `bg-gradient-to-r ${game.color} text-white shadow-lg`
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                      }`}
                    >
                      <span className="text-2xl">{game.icon}</span>
                      <span className="font-semibold text-lg">{game.name}</span>
                      {currentGame === game.id && (
                        <span className="ml-auto text-white">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  )
}

export default MobileNavBar