import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AIChatPanel from "../components/AIChatPanel";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      
      <Sidebar isOpen={isOpen} />

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={() => setIsOpen(!isOpen)} />

        <main className="flex-1 p-4 text-gray-900 dark:text-gray-100">
          <h1 className="text-2xl font-semibold mb-4">
            Dashboard
          </h1>

          <p>
            Welcome to GPT-EXCEL dashboard.
          </p>
        </main>
      </div>

      <AIChatPanel />
    </div>
  );
};

export default Dashboard;