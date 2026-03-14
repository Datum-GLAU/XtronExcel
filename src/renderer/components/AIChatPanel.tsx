const AIChatPanel = () => {
  return (
    <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-auto">Chat messages</div>
        <div className="mt-4 flex gap-2">
          <input type="text" placeholder="Type a message..." className="flex-1 border rounded px-2 py-1" />
          <button className="px-3 py-1 bg-black text-white rounded">Send</button>
        </div>
      </div>
    </aside>
  )
}
export default AIChatPanel