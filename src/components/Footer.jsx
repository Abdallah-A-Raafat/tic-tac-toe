const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-6 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-sm sm:text-base">
          <span>Made with</span>
          <span className="text-red-500 animate-pulse text-lg">❤️</span>
          <span>by</span>
          <a
            href="https://github.com/Abdallah-A-Raafat/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline"
          >
            Abdallah Ahmed
          </a>
        </div>
        <div className="mt-2 text-xs text-gray-400">
          © 2025 Mini Games Collection
        </div>
      </div>
    </footer>
  )
}

export default Footer