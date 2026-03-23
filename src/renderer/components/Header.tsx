import { useEffect, useState } from "react";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;

      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }

      return newMode;
    });
  };

  return (
    <header className="h-12 flex items-center justify-between px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      
      {/* Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
      >
        ☰
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white transition"
      >
        {darkMode ? "Dark 🌙" : "Light ☀️"}
      </button>

    </header>
  );
};

export default Header;