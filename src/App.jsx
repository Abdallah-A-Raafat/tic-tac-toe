import { useState } from 'react'
import CategoryNavBar from './components/CategoryNavBar'
import Footer from './components/Footer'
import Home from './components/Home'
import TicTacToe from './components/TicTacToe'
import RockPaperScissors from './components/RockPaperScissors'
import MemoryGame from './components/MemoryGame'
import WhackAMole from './components/WhackAMole'
import GuessTheNumber from './components/GuessTheNumber'
import SnakeAndLadder from './components/SnakeAndLadder'

function App() {
  const [currentGame, setCurrentGame] = useState('home')

  const renderGame = () => {
    switch (currentGame) {
      case 'home':
        return <Home setCurrentGame={setCurrentGame} />
      case 'tic-tac-toe':
        return <TicTacToe />
      case 'rock-paper-scissors':
        return <RockPaperScissors />
      case 'memory':
        return <MemoryGame />
      case 'whack-a-mole':
        return <WhackAMole />
      case 'guess-the-number':
        return <GuessTheNumber />
      case 'snake-and-ladder':
        return <SnakeAndLadder />
      default:
        return <Home setCurrentGame={setCurrentGame} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-indigo-600 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      </div>
      
      <div className="relative z-10">
        <CategoryNavBar currentGame={currentGame} setCurrentGame={setCurrentGame} />
        <main className="container mx-auto px-4 py-6 sm:py-8">
          {renderGame()}
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
