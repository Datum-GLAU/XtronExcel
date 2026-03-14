import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const navItems = ['Dashboard', 'Excel Sheet', 'Documents', 'File Manager', 'Workflow', 'Developer Mode', 'Settings']
  return (
    <aside className="w-56 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <nav className="space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase().replace(' ', '')}`}
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${isActive ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`
            }
          >
            {item}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
export default Sidebar