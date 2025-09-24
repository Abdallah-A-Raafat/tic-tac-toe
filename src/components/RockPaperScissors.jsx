import { useState } from 'react'

const RockPaperScissors = () => {
  const [playerChoice, setPlayerChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [result, setResult] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const choices = [
    { name: 'rock', icon: '🗿', beats: 'scissors' },
    { name: 'paper', icon: '📄', beats: 'rock' },
    { name: 'scissors', icon: '✂️', beats: 'paper' }
  ]

  const playGame = (playerChoice) => {
    setIsPlaying(true)
    setPlayerChoice(playerChoice)
    
    // Add delay for suspense
    setTimeout(() => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)]
      setComputerChoice(computerChoice)
      
      const result = determineWinner(playerChoice, computerChoice)
      setResult(result)
      
      if (result === 'win') {
        setPlayerScore(prev => prev + 1)
      } else if (result === 'lose') {
        setComputerScore(prev => prev + 1)
      }
      
      setIsPlaying(false)
    }, 1000)
  }

  const determineWinner = (player, computer) => {
    if (player.name === computer.name) return 'tie'
    if (player.beats === computer.name) return 'win'
    return 'lose'
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setResult('')
    setPlayerScore(0)
    setComputerScore(0)
  }

  const getResultMessage = () => {
    switch (result) {
      case 'win':
        return '🎉 You Win!'
      case 'lose':
        return '😔 You Lose!'
      case 'tie':
        return '🤝 It\'s a Tie!'
      default:
        return 'Make your choice!'
    }
  }

  return (
    <div className="text-center px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 bg-clip-text text-transparent mb-6 sm:mb-8 animate-pulse">✂️ Rock Paper Scissors</h1>
        
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 sm:p-8 mb-6 sm:mb-8 border border-teal-200">
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-8 lg:space-x-16 mb-6 sm:mb-8">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">You</h3>
              <div className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl mb-4 transition-all duration-500 ${
                playerChoice ? 'bg-gradient-to-br from-blue-400 to-purple-500 animate-bounce shadow-xl' : 'bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse'
              }`}>
                {playerChoice ? playerChoice.icon : '❓'}
              </div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{playerScore}</div>
            </div>
            
            <div className="text-center order-first sm:order-none">
              <div className="text-2xl sm:text-3xl font-bold text-gray-600 mb-4 animate-pulse">VS</div>
              <div className={`text-lg sm:text-xl md:text-2xl p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                result === 'win' ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white animate-bounce' :
                result === 'lose' ? 'bg-gradient-to-r from-red-400 to-pink-500 text-white animate-shake' :
                result === 'tie' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse' :
                'text-gray-600'
              }`}>
                {getResultMessage()}
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">Computer</h3>
              <div className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl mb-4 transition-all duration-500 ${
                computerChoice ? 'bg-gradient-to-br from-red-400 to-pink-500 animate-bounce shadow-xl' : 'bg-gradient-to-br from-red-100 to-pink-100 animate-pulse'
              }`}>
                {isPlaying ? '🤔' : (computerChoice ? computerChoice.icon : '❓')}
              </div>
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{computerScore}</div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
            {choices.map((choice) => (
              <button
                key={choice.name}
                onClick={() => playGame(choice)}
                disabled={isPlaying}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 hover:from-teal-200 hover:to-blue-200 rounded-2xl text-2xl sm:text-3xl md:text-4xl transition-all duration-300 disabled:opacity-50 transform hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-xl"
              >
                {choice.icon}
              </button>
            ))}
          </div>
          
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
          >
            🔄 Reset Score
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl shadow-lg p-4 sm:p-6 border border-teal-200">
          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-3">How to Play</h3>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            Rock crushes scissors, scissors cuts paper, paper covers rock. First to score the most wins!
          </p>
        </div>
      </div>
    </div>
  )
}

export default RockPaperScissors