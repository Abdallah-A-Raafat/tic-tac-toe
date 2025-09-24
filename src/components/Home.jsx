const Home = ({ setCurrentGame }) => {
  return (
    <div className="text-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-400 rounded-full opacity-25 animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-green-400 rounded-full opacity-20 animate-bounce delay-150"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-pulse">
            Welcome to Mini Games! 🎮
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-12 font-medium px-4">
            Choose from our collection organized by categories: 2 Players, Puzzles, and Challenge games!
          </p>
        </div>

        {/* Category Sections */}
        <div className="space-y-12">
          {/* 2 Players Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 flex items-center justify-center space-x-3">
              <span className="text-3xl">👥</span>
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">2 Players</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-4">
              <GameCard
                icon="⭕"
                title="Tic Tac Toe"
                description="Classic 3x3 grid game. Get three in a row to win!"
                color="from-red-400 via-pink-500 to-purple-500"
                delay="delay-0"
                gameId="tic-tac-toe"
                setCurrentGame={setCurrentGame}
              />
              <GameCard
                icon="🐍"
                title="Snake & Ladder"
                description="Classic board game for 2 players! Race to reach 100!"
                color="from-green-400 via-emerald-500 to-teal-500"
                delay="delay-100"
                gameId="snake-and-ladder"
                setCurrentGame={setCurrentGame}
              />
            </div>
          </div>

          {/* Puzzles Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 flex items-center justify-center space-x-3">
              <span className="text-3xl">🧩</span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Puzzles</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-4">
              <GameCard
                icon="🔢"
                title="Guess the Number"
                description="Can you guess my number between 1 and 100?"
                color="from-indigo-400 via-purple-500 to-pink-500"
                delay="delay-0"
                gameId="guess-the-number"
                setCurrentGame={setCurrentGame}
              />
              <GameCard
                icon="🧠"
                title="Memory Game"
                description="Test your memory by matching pairs of cards!"
                color="from-yellow-400 via-orange-500 to-red-500"
                delay="delay-100"
                gameId="memory"
                setCurrentGame={setCurrentGame}
              />
            </div>
          </div>

          {/* Challenge Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 flex items-center justify-center space-x-3">
              <span className="text-3xl">⚡</span>
              <span className="bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">Challenge</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-4">
              <GameCard
                icon="�"
                title="Whack-a-Mole"
                description="Quick reflexes! Whack the moles as they pop up!"
                color="from-amber-400 via-yellow-500 to-orange-500"
                delay="delay-0"
                gameId="whack-a-mole"
                setCurrentGame={setCurrentGame}
              />
              <GameCard
                icon="✂️"
                title="Rock Paper Scissors"
                description="Challenge the computer in this timeless game of strategy!"
                color="from-green-400 via-teal-500 to-blue-500"
                delay="delay-100"
                gameId="rock-paper-scissors"
                setCurrentGame={setCurrentGame}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 mx-4 p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl shadow-xl border border-blue-200">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">Game Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="font-bold text-blue-600 mb-1">2 Players</h3>
              <p className="text-sm text-gray-600">Compete with friends</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="text-2xl mb-2">🧩</div>
              <h3 className="font-bold text-purple-600 mb-1">Puzzles</h3>
              <p className="text-sm text-gray-600">Challenge your mind</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-bold text-green-600 mb-1">Challenge</h3>
              <p className="text-sm text-gray-600">Test your reflexes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const GameCard = ({ icon, title, description, color, delay, gameId, setCurrentGame }) => {
  const handleCardClick = () => {
    setCurrentGame(gameId)
  }

  return (
    <button
      onClick={handleCardClick}
      className={`w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 transform hover:scale-110 hover:rotate-1 transition-all duration-300 ${delay} animate-fade-in-up border hover:shadow-2xl group cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-300`}
    >
      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:animate-bounce shadow-lg`}>
        <span className="text-2xl sm:text-3xl transform group-hover:scale-110 transition-transform duration-200">{icon}</span>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
      <div className="mt-4 text-indigo-600 font-semibold text-sm group-hover:text-purple-600 transition-colors">
        Click to Play →
      </div>
    </button>
  )
}

export default Home