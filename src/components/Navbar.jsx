import { Calendar, Building2, Settings, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-slate-900">VenueOS</p>
            <p className="text-xs text-slate-500">Run your venues beautifully</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Calendar className="h-4 w-4" />
            New Booking
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 hover:bg-slate-50">
            <User className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
