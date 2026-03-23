import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const links = [
    "Dashboard",
    "Excel",
    "Documents",
    "Files",
    "Workflow",
    "Developer",
    "Settings",
  ];

  return (
    <aside
      className={`${
        isOpen ? "w-56" : "w-16"
      } transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-2`}
    >
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link}
            to="/"
            className="block px-2 py-2 rounded text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? link : "•"}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;