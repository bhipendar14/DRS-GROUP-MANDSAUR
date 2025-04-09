import { AccountInfo } from "./account-info"
import { Play, ArrowRight, Layers, Search, Plus, Send, Pencil, Clock, CheckCircle, MoreVertical } from "lucide-react"

export function DashboardPreview() {
  return (
    <div className="relative mb-20">
      {/* Top buttons */}
      <div className="flex gap-3 mb-4">
        <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
          <Play className="w-4 h-4" />
          <span>Pre-built</span>
        </button>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          <span>Run</span>
        </button>
        <div className="ml-auto flex gap-2">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm">Data-Driven (02)</button>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm">Dashboard</button>
        </div>
      </div>

      {/* Dashboard UI */}
      <div className="bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden border border-gray-800">
        {/* Tabs */}
        <div className="border-b border-gray-800 p-2 flex items-center">
          <div className="flex gap-1 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded mr-4">
            <Layers className="w-3 h-3" />
          </div>
          <div className="flex-1 flex items-center gap-2 text-xs text-gray-400">
            <span>SEO by Theme</span>
            <span className="text-gray-600">dash.DSR GROUP MANDSAUR.com</span>
          </div>
          <div className="flex gap-2 text-xs">
            <button className="bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>(1) Hosted Buyer</span>
            </button>
            <button className="bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
              <span>SEO (2) Report</span>
            </button>
            <button className="bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
              <span>(2) Discord</span>
            </button>
            <button className="bg-gray-800 px-2 py-1 rounded flex items-center gap-1">
              <span>Overview</span>
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded">
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Sidebar and Content */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 border-r border-gray-800 p-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-gray-700 rounded"></div>
                <span className="text-xs">Project</span>
              </div>
              <div className="text-xs text-gray-600">▼</div>
            </div>

            <div className="flex items-center mb-4">
              <div className="text-xs text-gray-600 mr-2">◀</div>
              <div className="text-xs">Overview</div>
              <div className="ml-auto text-xs text-gray-600">+</div>
              <div className="text-xs text-gray-600 ml-1">Add Keyword</div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                <Search className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">Quick actions</span>
              </div>
              <div className="flex items-center gap-1 mb-2 pl-1">
                <div className="w-3 h-3 bg-gray-700 rounded"></div>
                <span className="text-xs text-gray-500">Insight box</span>
              </div>
            </div>

            <div className="mb-2">
              <div className="text-xs mb-1">Rank Tracker</div>
              <div className="text-xs text-gray-400 pl-4 mb-1">• Overview</div>
              <div className="text-xs text-gray-400 pl-4">• Performance</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-3">
            <div className="flex gap-4 h-[200px]">

              {/* Account Info */}
              <div className="w-[250px] bg-gray-800/50 rounded-md overflow-hidden">
                <AccountInfo />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-24 border-l border-gray-800 p-3 flex flex-col items-center gap-4">
            <button className="w-full bg-purple-600 text-white text-xs py-2 rounded-md flex items-center justify-center gap-1">
              <Send className="w-3 h-3" />
              <span>Send</span>
            </button>
            <button className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center">
              <MoreVertical className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-gray-800 rounded-md flex items-center justify-center">
              <Pencil className="w-4 h-4" />
            </button>
            <div className="flex flex-col items-center gap-3 mt-auto">
              <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </button>
              <div className="text-[10px] text-gray-500">Edit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

