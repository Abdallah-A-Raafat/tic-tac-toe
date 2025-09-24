const NavBar = ({ currentGame, setCurrentGame }) => {
  const games = [
    { id: 'home', name: 'Home', icon: '🏠', color: 'from-purple-500 to-pink-500' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', icon: '⭕', color: 'from-red-500 to-orange-500' },
    { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', icon: '✂️', color: 'from-green-500 to-teal-500' },
    { id: 'memory', name: 'Memory Game', icon: '🧠', color: 'from-blue-500 to-indigo-500' },
  ]

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="animate-bounce">
              <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">🎮 Mini Games</h1>
            </div>
          </div>
          
          {/* Mobile: 2x2 Grid, Tablet+: Horizontal */}
          <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setCurrentGame(game.id)}
                className={`flex items-center justify-center sm:justify-start space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  currentGame === game.id
                    ? `bg-gradient-to-r ${game.color} text-white shadow-lg scale-105`
                    : 'text-white hover:bg-white hover:bg-opacity-20 backdrop-blur-sm'
                }`}
              >
                <span className="text-lg sm:text-xl animate-pulse">{game.icon}</span>
                <span className="font-semibold hidden sm:inline">{game.name}</span>
                <span className="font-semibold sm:hidden text-xs">{game.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar