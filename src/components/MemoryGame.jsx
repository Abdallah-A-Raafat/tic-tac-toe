import { useState, useEffect } from 'react'

const MemoryGame = () => {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)

  const cardEmojis = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎸', '🎺']

  const initializeGame = () => {
    const shuffledCards = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }))
    
    setCards(shuffledCards)
    setFlipped([])
    setSolved([])
    setMoves(0)
    setGameWon(false)
  }

  useEffect(() => {
    initializeGame()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCardClick = (clickedCard) => {
    if (flipped.length === 2) return
    if (flipped.includes(clickedCard.id)) return
    if (solved.includes(clickedCard.id)) return

    const newFlipped = [...flipped, clickedCard.id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      const [firstId, secondId] = newFlipped
      const firstCard = cards.find(card => card.id === firstId)
      const secondCard = cards.find(card => card.id === secondId)

      if (firstCard.emoji === secondCard.emoji) {
        setSolved([...solved, firstId, secondId])
        setFlipped([])
        
        if (solved.length + 2 === cards.length) {
          setGameWon(true)
        }
      } else {
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }

  const isCardFlipped = (cardId) => {
    return flipped.includes(cardId) || solved.includes(cardId)
  }

  return (
    <div className="text-center px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-6 sm:mb-8 animate-pulse">🧠 Memory Game</h1>
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-orange-200">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12 mb-6 sm:mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Moves</div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">{moves}</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl shadow-lg w-full sm:w-auto">
              <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">Pairs Found</div>
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent animate-bounce">{solved.length / 2}/8</div>
            </div>
          </div>
          
          {gameWon && (
            <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-400 to-emerald-500 border border-green-300 rounded-2xl shadow-lg animate-bounce">
              <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">🎉 Congratulations!</h2>
              <p className="text-white text-lg sm:text-xl font-semibold">You won in {moves} moves!</p>
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl text-xl sm:text-2xl md:text-3xl font-bold transition-all duration-500 transform hover:scale-105 ${
                  isCardFlipped(card.id)
                    ? 'bg-gradient-to-br from-yellow-200 to-orange-300 border-2 border-yellow-400 shadow-lg animate-flip'
                    : 'bg-gradient-to-br from-gray-200 to-gray-300 hover:from-blue-200 hover:to-purple-200 border-2 border-gray-300 hover:border-purple-400 shadow-md'
                }`}
                disabled={flipped.length === 2}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <span className={isCardFlipped(card.id) ? 'animate-bounce' : ''}>
                  {isCardFlipped(card.id) ? card.emoji : '❓'}
                </span>
              </button>
            ))}
          </div>
          
          <button
            onClick={initializeGame}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
          >
            🔄 New Game
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl shadow-lg p-4 sm:p-6 border border-orange-200">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2 sm:mb-3">How to Play</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Click on cards to flip them over. Find matching pairs to clear them. Try to match all pairs in as few moves as possible!
          </p>
        </div>
      </div>
    </div>
  )
}

export default MemoryGame