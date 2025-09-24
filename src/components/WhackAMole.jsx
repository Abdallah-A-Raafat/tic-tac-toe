import { useState, useEffect } from 'react'

const WhackAMole = () => {
  const [holes, setHoles] = useState(Array(9).fill(false))
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [moleTimeout, setMoleTimeout] = useState(null)
  const [difficulty, setDifficulty] = useState('easy')

  const difficulties = {
    easy: {
      name: 'Easy',
      color: 'from-green-500 to-emerald-500',
      moleVisibleTime: 1500, // 1.5 seconds
      minDelay: 800,
      maxDelay: 1500,
      icon: '😊',
      description: 'Slow and steady'
    },
    medium: {
      name: 'Medium',
      color: 'from-yellow-500 to-orange-500',
      moleVisibleTime: 1000, // 1 second
      minDelay: 500,
      maxDelay: 1000,
      icon: '😐',
      description: 'Getting tricky'
    },
    hard: {
      name: 'Hard',
      color: 'from-red-500 to-pink-500',
      moleVisibleTime: 600, // 0.6 seconds
      minDelay: 200,
      maxDelay: 600,
      icon: '😤',
      description: 'Lightning fast!'
    }
  }

  useEffect(() => {
    let interval = null
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameActive(false)
      clearTimeout(moleTimeout)
    }
    return () => clearInterval(interval)
  }, [gameActive, timeLeft, moleTimeout])

  useEffect(() => {
    if (gameActive) {
      showMole()
    }
    return () => {
      if (moleTimeout) {
        clearTimeout(moleTimeout)
      }
    }
  }, [gameActive]) // eslint-disable-line react-hooks/exhaustive-deps

  const showMole = () => {
    if (!gameActive) return
    
    const currentDifficulty = difficulties[difficulty]
    const randomHole = Math.floor(Math.random() * 9)
    const newHoles = Array(9).fill(false)
    newHoles[randomHole] = true
    setHoles(newHoles)

    const timeout = setTimeout(() => {
      setHoles(Array(9).fill(false))
      if (gameActive) {
        const delayRange = currentDifficulty.maxDelay - currentDifficulty.minDelay
        const randomDelay = Math.random() * delayRange + currentDifficulty.minDelay
        setTimeout(showMole, randomDelay)
      }
    }, currentDifficulty.moleVisibleTime)

    setMoleTimeout(timeout)
  }

  const whackMole = (index) => {
    if (holes[index] && gameActive) {
      // Score multiplier based on difficulty
      const scoreMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
      setScore(prev => prev + scoreMultiplier)
      
      const newHoles = [...holes]
      newHoles[index] = false
      setHoles(newHoles)
      clearTimeout(moleTimeout)
      
      // Shorter delay before next mole on harder difficulties
      const nextMoleDelay = difficulty === 'hard' ? 200 : difficulty === 'medium' ? 300 : 500
      setTimeout(showMole, nextMoleDelay)
    }
  }

  const startGame = () => {
    setScore(0)
    setTimeLeft(30)
    setGameActive(true)
    setHoles(Array(9).fill(false))
  }

  const resetGame = () => {
    setGameActive(false)
    setScore(0)
    setTimeLeft(30)
    setHoles(Array(9).fill(false))
    clearTimeout(moleTimeout)
  }

  return (
    <div className="text-center px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-green-500 bg-clip-text text-transparent mb-6 sm:mb-8 animate-pulse">🔨 Whack-a-Mole</h1>
        
        {/* Difficulty Selection */}
        {!gameActive && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">Choose Difficulty</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {Object.entries(difficulties).map(([key, diff]) => (
                <button
                  key={key}
                  onClick={() => setDifficulty(key)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    difficulty === key
                      ? `bg-gradient-to-r ${diff.color} text-white border-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="text-2xl mb-2">{diff.icon}</div>
                  <div className="font-bold text-lg">{diff.name}</div>
                  <div className="text-sm opacity-80">{diff.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-yellow-200">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Score</div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">{score}</div>
              {gameActive && (
                <div className="text-sm text-gray-600 mt-1">
                  +{difficulty === 'easy' ? '1' : difficulty === 'medium' ? '2' : '3'} per hit
                </div>
              )}
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Time</div>
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                timeLeft > 10 ? 'from-blue-600 to-indigo-600' : 'from-red-600 to-pink-600 animate-bounce'
              }`}>{timeLeft}s</div>
            </div>
            {gameActive && (
              <div className={`text-center p-4 bg-gradient-to-r ${difficulties[difficulty].color} rounded-xl shadow-lg w-full sm:w-auto`}>
                <div className="text-xl sm:text-2xl font-bold text-white mb-2">Difficulty</div>
                <div className="text-2xl mb-1">{difficulties[difficulty].icon}</div>
                <div className="text-lg font-bold text-white">{difficulties[difficulty].name}</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl">
            {holes.map((hasMole, index) => (
              <button
                key={index}
                onClick={() => whackMole(index)}
                disabled={!gameActive}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full transition-all duration-300 transform hover:scale-105 ${
                  gameActive ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-amber-800 to-yellow-900 rounded-full border-4 border-amber-900 shadow-inner flex items-center justify-center">
                  {hasMole && (
                    <div className="text-3xl sm:text-4xl animate-bounce">
                      🐹
                    </div>
                  )}
                  {!hasMole && (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full opacity-50"></div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!gameActive && timeLeft === 30 && (
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
              >
                🎮 Start Game
              </button>
            )}
            
            {timeLeft === 0 && (
              <div className="mb-4">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
                  🎉 Game Over! Final Score: {score}
                </div>
              </div>
            )}

            <button
              onClick={resetGame}
              className="bg-gradient-to-r from-gray-500 to-slate-500 hover:from-gray-600 hover:to-slate-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
            >
              🔄 Reset Game
            </button>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl shadow-lg p-4 sm:p-6 border border-yellow-200">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2 sm:mb-3">How to Play</h3>
          <div className="text-gray-700 leading-relaxed text-sm sm:text-base space-y-2">
            <p>🎯 Click the moles as they pop up from their holes!</p>
            <p>⏰ You have 30 seconds to score as many points as possible.</p>
            <p>🏆 Choose your difficulty level:</p>
            <div className="ml-4 space-y-1">
              <p>😊 <strong>Easy:</strong> Moles appear slowly and stay visible longer</p>
              <p>😐 <strong>Medium:</strong> Faster moles with shorter visibility</p>
              <p>😤 <strong>Hard:</strong> Lightning-fast moles that disappear quickly!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhackAMole