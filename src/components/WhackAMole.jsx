import { useState, useEffect } from 'react'

const WhackAMole = () => {
  const [holes, setHoles] = useState(Array(9).fill(false))
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameActive, setGameActive] = useState(false)
  const [moleTimeout, setMoleTimeout] = useState(null)

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
    
    const randomHole = Math.floor(Math.random() * 9)
    const newHoles = Array(9).fill(false)
    newHoles[randomHole] = true
    setHoles(newHoles)

    const timeout = setTimeout(() => {
      setHoles(Array(9).fill(false))
      if (gameActive) {
        setTimeout(showMole, Math.random() * 1000 + 500) // Random delay between 0.5-1.5s
      }
    }, 1000) // Mole stays visible for 1 second

    setMoleTimeout(timeout)
  }

  const whackMole = (index) => {
    if (holes[index] && gameActive) {
      setScore(prev => prev + 1)
      const newHoles = [...holes]
      newHoles[index] = false
      setHoles(newHoles)
      clearTimeout(moleTimeout)
      setTimeout(showMole, 500)
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
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-yellow-200">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 sm:mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Score</div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">{score}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Time</div>
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${
                timeLeft > 10 ? 'from-blue-600 to-indigo-600' : 'from-red-600 to-pink-600 animate-bounce'
              }`}>{timeLeft}s</div>
            </div>
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
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Click the moles as they pop up from their holes! You have 30 seconds to score as many points as possible. Be quick - they don't stay up for long!
          </p>
        </div>
      </div>
    </div>
  )
}

export default WhackAMole