import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Auth = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // temporary login logic
    if (email && password) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-blue-100 to-purple-200">

      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">
          Sign In
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            className="mt-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account? Sign up later
        </p>

      </div>

    </div>
  )
}

export default Auth