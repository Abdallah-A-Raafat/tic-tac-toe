import { useState } from 'react'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  const winner = calculateWinner(board)
  const isDraw = !winner && board.every(square => square !== null)

  const handleClick = (index) => {
    if (board[index] || winner || gameOver) return

    const newBoard = [...board]
    newBoard[index] = isXNext ? 'X' : 'O'
    setBoard(newBoard)
    setIsXNext(!isXNext)

    if (calculateWinner(newBoard) || newBoard.every(square => square !== null)) {
      setGameOver(true)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsXNext(true)
    setGameOver(false)
  }

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner} 🎉`
    } else if (isDraw) {
      return "It's a draw! 🤝"
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`
    }
  }

  return (
    <div className="text-center px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-6 sm:mb-8 animate-pulse">⭕ Tic Tac Toe</h1>
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-8 border border-pink-200">
          <div className={`text-lg sm:text-2xl font-bold mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${
            winner ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white animate-bounce' : 
            isDraw ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
            'bg-gradient-to-r from-purple-400 to-pink-500 text-white'
          }`}>
            {getStatus()}
          </div>
          
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 p-3 sm:p-4 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">{board.map((square, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  square 
                    ? 'bg-gradient-to-br from-white to-gray-100 shadow-lg border-2 border-gray-300' 
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-100 hover:to-purple-100 border-2 border-gray-300 hover:border-purple-400'
                } ${gameOver ? 'cursor-not-allowed opacity-75' : 'hover:shadow-xl'}`}
                disabled={square || gameOver}
              >
                <span className={`${square === 'X' ? 'text-blue-500 animate-pulse' : 'text-red-500 animate-pulse'} drop-shadow-lg`}>
                  {square}
                </span>
              </button>
            ))}
          </div>
          
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
          >
            🔄 New Game
          </button>
        </div>
        
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg border border-blue-200">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-3">How to Play</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Players take turns placing X's and O's on the grid. The first player to get 3 in a row (horizontally, vertically, or diagonally) wins!
          </p>
        </div>
      </div>
    </div>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default TicTacToe