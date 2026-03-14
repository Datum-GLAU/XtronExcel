import { HashRouter, Routes, Route } from 'react-router-dom'
import Loading from './pages/Loading'
import GetStarted from './pages/GetStarted'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ExcelSheet from './pages/ExcelSheet'
import Settings from './pages/Settings'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/excel" element={<ExcelSheet />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </HashRouter>
  )
}

export default App