import { useState } from 'react'

const GuessTheNumber = () => {
  const [targetNumber, setTargetNumber] = useState(Math.floor(Math.random() * 100) + 1)
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [guesses, setGuesses] = useState([])
  const [gameWon, setGameWon] = useState(false)
  const [hint, setHint] = useState('I\'m thinking of a number between 1 and 100!')

  const makeGuess = () => {
    const guessNumber = parseInt(guess)
    
    if (isNaN(guessNumber) || guessNumber < 1 || guessNumber > 100) {
      setHint('Please enter a valid number between 1 and 100!')
      return
    }

    const newAttempts = attempts + 1
    setAttempts(newAttempts)
    
    const guessData = {
      number: guessNumber,
      attempt: newAttempts
    }
    
    setGuesses(prev => [...prev, guessData])

    if (guessNumber === targetNumber) {
      setGameWon(true)
      setHint(`🎉 Congratulations! You got it in ${newAttempts} attempts!`)
    } else if (guessNumber < targetNumber) {
      const diff = targetNumber - guessNumber
      if (diff <= 5) {
        setHint('🔥 Very close! Go higher!')
      } else if (diff <= 15) {
        setHint('📈 Close! Try higher!')
      } else {
        setHint('⬆️ Too low! Go much higher!')
      }
    } else {
      const diff = guessNumber - targetNumber
      if (diff <= 5) {
        setHint('🔥 Very close! Go lower!')
      } else if (diff <= 15) {
        setHint('📉 Close! Try lower!')
      } else {
        setHint('⬇️ Too high! Go much lower!')
      }
    }

    setGuess('')
  }

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1)
    setGuess('')
    setAttempts(0)
    setGuesses([])
    setGameWon(false)
    setHint('I\'m thinking of a number between 1 and 100!')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameWon) {
      makeGuess()
    }
  }

  const getScoreColor = () => {
    if (attempts <= 5) return 'from-green-600 to-emerald-600'
    if (attempts <= 10) return 'from-yellow-600 to-orange-600'
    return 'from-red-600 to-pink-600'
  }

  const getScoreEmoji = () => {
    if (attempts <= 5) return '🌟'
    if (attempts <= 10) return '👍'
    return '💪'
  }

  return (
    <div className="text-center px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 sm:mb-8 animate-pulse">🔢 Guess the Number</h1>
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-purple-200">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-6 sm:mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Attempts</div>
              <div className={`text-3xl sm:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${getScoreColor()}`}>
                {getScoreEmoji()} {attempts}
              </div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Range</div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">1-100</div>
            </div>
          </div>

          <div className={`mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl shadow-lg transition-all duration-500 ${
            gameWon ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-bounce' : 
            'bg-gradient-to-r from-indigo-100 to-purple-100'
          }`}>
            <div className={`text-lg sm:text-xl font-semibold ${
              gameWon ? 'text-white' : 'text-gray-700'
            }`}>
              {hint}
            </div>
          </div>

          {!gameWon && (
            <div className="mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your guess..."
                  className="w-full sm:w-48 px-4 py-3 text-xl font-bold text-center border-2 border-purple-300 rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                />
                <button
                  onClick={makeGuess}
                  disabled={!guess.trim()}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base disabled:cursor-not-allowed disabled:transform-none"
                >
                  🎯 Guess!
                </button>
              </div>
            </div>
          )}

          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base mb-6"
          >
            🔄 New Game
          </button>

          {guesses.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">Your Guesses:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                {guesses.slice(-12).map((guessData, index) => (
                  <div
                    key={index}
                    className={`p-2 sm:p-3 rounded-lg shadow-md transition-all duration-300 ${
                      guessData.number === targetNumber
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white animate-pulse'
                        : guessData.number < targetNumber
                        ? 'bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800'
                        : 'bg-gradient-to-r from-red-200 to-red-300 text-red-800'
                    }`}
                  >
                    <div className="text-lg sm:text-xl font-bold">{guessData.number}</div>
                    <div className="text-xs sm:text-sm">#{guessData.attempt}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-lg p-4 sm:p-6 border border-indigo-200">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">How to Play</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            I'm thinking of a number between 1 and 100. Try to guess it in as few attempts as possible! I'll give you hints along the way. Can you get it in 5 tries or less?
          </p>
        </div>
      </div>
    </div>
  )
}

export default GuessTheNumber