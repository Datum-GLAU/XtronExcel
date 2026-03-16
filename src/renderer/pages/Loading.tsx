import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Loading = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/get-started")
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black">

      {/* Logo */}
      <h1 className="text-5xl font-bold tracking-wide text-gray-900 dark:text-white">
        GPT<span className="text-blue-600">-EXCEL</span>
      </h1>

      {/* Tagline */}
      <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
        AI Powered Spreadsheet Generator
      </p>

      {/* Loader */}
      <div className="mt-10 flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-6 text-xs text-gray-500">
        Initializing AI modules...
      </p>

    </div>
  )
}

export default Loading