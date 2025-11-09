import { useEffect, useState } from "react";
import { CalendarCheck2, Clock, MoreHorizontal, Loader2 } from "lucide-react";

const StatusBadge = ({ status }) => {
  const map = {
    Confirmed: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Tentative: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    Inquiry: "bg-slate-50 text-slate-700 ring-1 ring-slate-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${map[status] || map.Inquiry}`}>
      <CalendarCheck2 className="mr-1 h-3 w-3" />
      {status}
    </span>
  );
};

export default function BookingsTable() {
  const API = import.meta.env.VITE_BACKEND_URL;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/bookings`);
        const data = await res.json();
        setRows(data.items || []);
      } catch (e) {
        console.error("Failed to fetch bookings", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [API]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6">
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Upcoming Bookings</h3>
            <p className="text-sm text-slate-500">Quick view of your next events</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Clock className="h-4 w-4" />
            Refresh
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center p-10 text-slate-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Client</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Venue</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Guests</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {rows.map((b) => {
                  const dt = new Date(b.date);
                  const dateStr = isNaN(dt.getTime()) ? b.date : dt.toLocaleDateString();
                  return (
                    <tr key={b._id} className="hover:bg-slate-50/60">
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{dateStr} {b.time ? `• ${b.time}` : ""}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-900">{b.client}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{b.venue}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{b.guests || "-"}</td>
                      <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={b.status || "Inquiry"} /></td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <button className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100">
                          <MoreHorizontal className="h-4 w-4 text-slate-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                      No bookings yet. Create one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
