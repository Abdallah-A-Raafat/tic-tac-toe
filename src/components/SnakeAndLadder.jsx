import { useState } from 'react'

const SnakeAndLadder = () => {
  const [player1Position, setPlayer1Position] = useState(0)
  const [player2Position, setPlayer2Position] = useState(0)
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [diceValue, setDiceValue] = useState(null)
  const [isRolling, setIsRolling] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [winner, setWinner] = useState(null)
  const [gameHistory, setGameHistory] = useState([])

  // Snakes: head -> tail
  const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
  }

  // Ladders: bottom -> top
  const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
  }

  const rollDice = () => {
    if (isRolling || gameWon) return

    setIsRolling(true)
    setDiceValue(null)

    // Animate dice rolling
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1)
    }, 100)

    setTimeout(() => {
      clearInterval(rollInterval)
      const finalValue = Math.floor(Math.random() * 6) + 1
      setDiceValue(finalValue)
      movePlayer(finalValue)
      setIsRolling(false)
    }, 1000)
  }

  const movePlayer = (steps) => {
    const currentPos = currentPlayer === 1 ? player1Position : player2Position
    let newPosition = currentPos + steps

    // Can't go beyond 100
    if (newPosition > 100) {
      newPosition = currentPos
    }

    // Check for snakes
    if (snakes[newPosition]) {
      const snakeEnd = snakes[newPosition]
      setTimeout(() => {
        if (currentPlayer === 1) {
          setPlayer1Position(snakeEnd)
        } else {
          setPlayer2Position(snakeEnd)
        }
        addToHistory(`Player ${currentPlayer} got bitten by a snake! Moved from ${newPosition} to ${snakeEnd}`)
      }, 1000)
      newPosition = snakeEnd
    }
    // Check for ladders
    else if (ladders[newPosition]) {
      const ladderTop = ladders[newPosition]
      setTimeout(() => {
        if (currentPlayer === 1) {
          setPlayer1Position(ladderTop)
        } else {
          setPlayer2Position(ladderTop)
        }
        addToHistory(`Player ${currentPlayer} climbed a ladder! Moved from ${newPosition} to ${ladderTop}`)
      }, 1000)
      newPosition = ladderTop
    }

    // Update position
    if (currentPlayer === 1) {
      setPlayer1Position(newPosition)
    } else {
      setPlayer2Position(newPosition)
    }

    // Check for win
    if (newPosition === 100) {
      setGameWon(true)
      setWinner(currentPlayer)
      addToHistory(`🎉 Player ${currentPlayer} wins the game!`)
      return
    }

    // Switch turns
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    addToHistory(`Player ${currentPlayer} rolled ${steps} and moved to position ${newPosition}`)
  }

  const addToHistory = (message) => {
    setGameHistory(prev => [message, ...prev.slice(0, 4)])
  }

  const resetGame = () => {
    setPlayer1Position(0)
    setPlayer2Position(0)
    setCurrentPlayer(1)
    setDiceValue(null)
    setIsRolling(false)
    setGameWon(false)
    setWinner(null)
    setGameHistory([])
  }

  const getSquareNumber = (row, col) => {
    // Snake and ladder board numbering
    if (row % 2 === 0) {
      return (9 - row) * 10 + col + 1
    } else {
      return (9 - row) * 10 + (10 - col)
    }
  }

  const renderSquare = (row, col) => {
    const squareNumber = getSquareNumber(row, col)
    const hasPlayer1 = player1Position === squareNumber
    const hasPlayer2 = player2Position === squareNumber
    const isSnakeHead = snakes[squareNumber]
    const isLadderBottom = ladders[squareNumber]

    return (
      <div
        key={`${row}-${col}`}
        className={`relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border border-gray-300 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
          squareNumber === 100 
            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
            : squareNumber === 1
            ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
            : isSnakeHead
            ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white'
            : isLadderBottom
            ? 'bg-gradient-to-r from-blue-400 to-purple-500 text-white'
            : 'bg-white hover:bg-gray-50'
        }`}
      >
        <span className={`${isSnakeHead || isLadderBottom || squareNumber === 1 || squareNumber === 100 ? 'text-white' : 'text-gray-700'}`}>
          {squareNumber}
        </span>
        
        {/* Snake emoji */}
        {isSnakeHead && (
          <span className="absolute -top-1 -right-1 text-lg">🐍</span>
        )}
        
        {/* Ladder emoji */}
        {isLadderBottom && (
          <span className="absolute -top-1 -right-1 text-lg">🪜</span>
        )}

        {/* Players */}
        <div className="absolute -bottom-1 left-0 right-0 flex justify-center space-x-1">
          {hasPlayer1 && (
            <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
              1
            </span>
          )}
          {hasPlayer2 && (
            <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
              2
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6 sm:mb-8 animate-pulse">
          🐍🪜 Snake and Ladder
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-6 border border-green-200">
              <div className="grid grid-cols-10 gap-1 mb-4">
                {Array.from({ length: 10 }, (_, row) =>
                  Array.from({ length: 10 }, (_, col) => renderSquare(row, col))
                )}
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="space-y-4">
            {/* Player Status */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 border border-blue-200">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Players
              </h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-lg flex items-center justify-between ${
                  currentPlayer === 1 && !gameWon ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                    <span className="font-semibold">Player 1</span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">Position: {player1Position}</span>
                </div>
                <div className={`p-3 rounded-lg flex items-center justify-between ${
                  currentPlayer === 2 && !gameWon ? 'bg-red-100 border-2 border-red-400' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center space-x-2">
                    <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                    <span className="font-semibold">Player 2</span>
                  </div>
                  <span className="text-lg font-bold text-red-600">Position: {player2Position}</span>
                </div>
              </div>
            </div>

            {/* Dice and Controls */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 border border-green-200">
              {gameWon ? (
                <div className="text-center">
                  <div className="mb-4 p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
                    <h2 className="text-2xl font-bold text-white">🎉 Game Over!</h2>
                    <p className="text-white">Player {winner} Wins!</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-3 text-gray-700">
                    Player {currentPlayer}'s Turn
                  </h3>
                  <div className="mb-4">
                    <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center text-3xl font-bold border-4 transition-all duration-300 ${
                      isRolling ? 'animate-spin bg-yellow-200 border-yellow-400' : 'bg-white border-gray-300'
                    }`}>
                      {diceValue ? `⚄${diceValue}` : '🎲'}
                    </div>
                  </div>
                  <button
                    onClick={rollDice}
                    disabled={isRolling}
                    className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      currentPlayer === 1 
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                        : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    } ${isRolling ? 'opacity-50 cursor-not-allowed' : 'shadow-lg hover:shadow-xl'}`}
                  >
                    {isRolling ? 'Rolling...' : 'Roll Dice'}
                  </button>
                </div>
              )}
              
              <button
                onClick={resetGame}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                🔄 New Game
              </button>
            </div>

            {/* Game History */}
            {gameHistory.length > 0 && (
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-4 border border-purple-200">
                <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Recent Moves
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {gameHistory.map((move, index) => (
                    <div key={index} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                      {move}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Instructions */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-4 sm:p-6 border border-green-200">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-3">
            How to Play
          </h3>
          <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
            <p className="mb-2">🎯 <strong>Goal:</strong> Be the first player to reach square 100!</p>
            <p className="mb-2">🎲 <strong>Rules:</strong> Take turns rolling the dice and move your piece forward.</p>
            <p className="mb-2">🪜 <strong>Ladders:</strong> Climb up when you land on the bottom of a ladder!</p>
            <p>🐍 <strong>Snakes:</strong> Slide down when you land on a snake's head!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SnakeAndLadder