const Header = () => {
  return (
    <header className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end px-4 gap-4">
      <span className="text-sm text-gray-600 dark:text-gray-300">Free tier: 80% used</span>
      <button className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
    </header>
  )
}
export default Header