const Loading = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">GPT-EXCEL</h1>
      <div className="mt-4 w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  )
}
export default Loading