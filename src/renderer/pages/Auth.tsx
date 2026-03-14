const Auth = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2 mb-3" />
        <input type="password" placeholder="Password" className="w-full border rounded px-3 py-2 mb-4" />
        <button className="w-full bg-black text-white py-2 rounded mb-2">Login with Email</button>
        <button className="w-full bg-gray-200 dark:bg-gray-700 py-2 rounded mb-2">Login with Google</button>
        <button className="w-full bg-gray-200 dark:bg-gray-700 py-2 rounded">Login with Microsoft</button>
      </div>
    </div>
  )
}
export default Auth