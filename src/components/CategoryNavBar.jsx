import { useState } from 'react'

const CategoryNavBar = ({ currentGame, setCurrentGame }) => {
  const [openDropdown, setOpenDropdown] = useState(null)

  const categories = [
    {
      id: 'two-players',
      name: '2 Players',
      icon: '👥',
      color: 'from-blue-500 to-cyan-500',
      games: [
        { id: 'tic-tac-toe', name: 'Tic Tac Toe', icon: '⭕' },
        { id: 'snake-and-ladder', name: 'Snake & Ladder', icon: '🐍' }
      ]
    },
    {
      id: 'puzzles',
      name: 'Puzzles',
      icon: '🧩',
      color: 'from-purple-500 to-pink-500',
      games: [
        { id: 'guess-the-number', name: 'Guess the Number', icon: '🔢' },
        { id: 'memory', name: 'Memory Game', icon: '🧠' }
      ]
    },
    {
      id: 'challenge',
      name: 'Challenge',
      icon: '⚡',
      color: 'from-green-500 to-teal-500',
      games: [
        { id: 'whack-a-mole', name: 'Whack-a-Mole', icon: '🔨' },
        { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', icon: '✂️' }
      ]
    }
  ]

  const handleGameSelect = (gameId) => {
    setCurrentGame(gameId)
    setOpenDropdown(null)
  }

  const handleMobileMenuToggle = () => {
    setOpenDropdown(openDropdown === 'mobile-menu' ? null : 'mobile-menu')
  }

  const toggleDropdown = (categoryId) => {
    setOpenDropdown(openDropdown === categoryId ? null : categoryId)
  }

  const getCurrentCategory = () => {
    for (const category of categories) {
      if (category.games.some(game => game.id === currentGame)) {
        return category
      }
    }
    return null
  }

  const currentCategory = getCurrentCategory()

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button
              onClick={() => setCurrentGame('home')}
              className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
            >
              <div className="animate-bounce">
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">🎮 Mini Games</h1>
              </div>
            </button>

            {/* Category Dropdowns */}
            <div className="flex space-x-1">
              {categories.map((category) => (
                <div key={category.id} className="relative">
                  <button
                    onClick={() => toggleDropdown(category.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      currentCategory?.id === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                        : 'text-white hover:bg-white hover:bg-opacity-20 backdrop-blur-sm'
                    }`}
                  >
                    <span className="text-xl animate-pulse">{category.icon}</span>
                    <span className="font-semibold">{category.name}</span>
                    <span className={`transform transition-transform duration-200 ${
                      openDropdown === category.id ? 'rotate-180' : ''
                    }`}>▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === category.id && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fade-in">
                      {category.games.map((game, index) => (
                        <button
                          key={game.id}
                          onClick={() => handleGameSelect(game.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                            currentGame === game.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          } ${index === 0 ? '' : 'border-t border-gray-100'}`}
                        >
                          <span className="text-2xl">{game.icon}</span>
                          <span className="font-medium">{game.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-xl">
        <div className="px-4 py-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentGame('home')}
              className="flex items-center space-x-2"
            >
              <h1 className="text-xl font-bold text-white drop-shadow-lg">🎮 Mini Games</h1>
            </button>
            <button
              onClick={handleMobileMenuToggle}
              className="text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <span className="text-xl">☰</span>
            </button>
          </div>

          {/* Mobile Dropdown */}
          {openDropdown === 'mobile-menu' && (
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 animate-fade-in relative z-50">
              {categories.map((category) => (
                <div key={category.id} className="mb-4 last:mb-0">
                  <div className={`flex items-center space-x-2 mb-2 px-3 py-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-semibold text-white">{category.name}</span>
                  </div>
                  <div className="space-y-1 pl-4">
                    {category.games.map((game) => (
                      <button
                        key={game.id}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleGameSelect(game.id)
                        }}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 relative z-10 ${
                          currentGame === game.id 
                            ? 'bg-white text-purple-700' 
                            : 'text-white hover:bg-white hover:bg-opacity-20'
                        }`}
                      >
                        <span className="text-lg">{game.icon}</span>
                        <span className="font-medium">{game.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Close dropdown when clicking outside - only for desktop */}
      {openDropdown && openDropdown !== 'mobile-menu' && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </>
  )
}

export default CategoryNavBar