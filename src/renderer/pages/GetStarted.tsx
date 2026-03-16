import { useNavigate } from "react-router-dom"

const GetStarted = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-200 via-blue-100 to-purple-200">

      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-5 bg-white/60 backdrop-blur-md shadow-sm">

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-green-700">
          GPT-EXCEL
        </h1>

        <button
          onClick={() => navigate("/auth")}
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>

      </header>


      {/* HERO */}
      <div className="flex flex-col items-center text-center mt-16 px-6">

        <div className="px-5 py-2 text-sm bg-white rounded-full shadow">
          🚀 40M+ formulas generated
        </div>

        <h1 className="mt-8 text-5xl font-bold max-w-4xl leading-tight">

          AI Powered{" "}
          <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-transparent bg-clip-text">
            Spreadsheet Automation
          </span>

        </h1>

        <p className="mt-6 text-gray-700 max-w-2xl text-lg">
          Generate formulas, pivot tables, charts and powerful spreadsheet
          insights instantly using AI prompts.
        </p>


        {/* USERS */}
        <div className="flex items-center mt-8 space-x-4">

          <div className="flex -space-x-2">
            <div className="w-9 h-9 bg-green-400 rounded-full border-2 border-white"></div>
            <div className="w-9 h-9 bg-blue-400 rounded-full border-2 border-white"></div>
            <div className="w-9 h-9 bg-purple-400 rounded-full border-2 border-white"></div>
            <div className="w-9 h-9 bg-pink-400 rounded-full border-2 border-white"></div>
          </div>

          <span className="text-gray-700">
            <span className="font-semibold text-pink-600">1.4M+</span> happy users
          </span>

        </div>


        {/* CTA */}
        <button
          onClick={() => navigate("/auth")}
          className="mt-10 px-10 py-4 text-lg bg-black text-white rounded-full hover:scale-105 transition"
        >
          Get Started →
        </button>

      </div>


      {/* FEATURES */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 px-10 mt-20 mb-20 max-w-6xl mx-auto">

        <div className="p-6 bg-green-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Pivot Builder</h3>
          <p className="text-sm text-gray-700 mt-2">
            Create pivot tables automatically from prompts.
          </p>
        </div>

        <div className="p-6 bg-blue-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Formula Assistant</h3>
          <p className="text-sm text-gray-700 mt-2">
            Generate complex Excel formulas instantly.
          </p>
        </div>

        <div className="p-6 bg-purple-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Data Analysis</h3>
          <p className="text-sm text-gray-700 mt-2">
            AI powered spreadsheet insights.
          </p>
        </div>

        <div className="p-6 bg-yellow-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Charts & Graphs</h3>
          <p className="text-sm text-gray-700 mt-2">
            Generate visualizations automatically.
          </p>
        </div>

        <div className="p-6 bg-pink-100 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">Reports</h3>
          <p className="text-sm text-gray-700 mt-2">
            Create professional reports from spreadsheets.
          </p>
        </div>

      </div>

    </div>
  )
}

export default GetStarted