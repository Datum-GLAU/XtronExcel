const ExcelSheet = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Excel Sheet Module</h2>
      <textarea placeholder="Enter your prompt..." className="w-full border rounded p-2 mb-4" rows={4} />
      <button className="px-4 py-2 bg-black text-white rounded mb-4">Generate</button>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded p-2 h-64 overflow-auto">Python code preview</div>
        <div className="border rounded p-2 h-64 overflow-auto">Output preview</div>
      </div>
      <button className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">Export</button>
    </div>
  )
}
export default ExcelSheet