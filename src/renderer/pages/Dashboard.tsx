import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import AIChatPanel from '../components/AIChatPanel'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
        <AIChatPanel />
      </div>
    </div>
  )
}
export default Dashboard