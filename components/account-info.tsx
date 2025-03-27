export function AccountInfo() {
  return (
    <div className="h-full w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">Account Name</div>
        <div className="flex gap-2">
          <button className="text-xs bg-gray-800 px-2 py-1 rounded">Eco</button>
          <button className="text-xs bg-gray-800 px-2 py-1 rounded">Schedule</button>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-md p-3 mb-3">
        <div className="text-sm mb-1">Buyer/Payer (UK)</div>
      </div>

      <div className="text-sm text-gray-400 mb-1">Account Number</div>
    </div>
  )
}

