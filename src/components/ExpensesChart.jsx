import { useEffect, useMemo, useState } from "react";

// Simple inline chart using SVG to avoid extra deps
function MiniBar({ data, height = 120 }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const barWidth = 100 / data.length;
  return (
    <svg viewBox={`0 0 100 ${height}`} className="w-full" preserveAspectRatio="none" aria-label="Monthly expenses mini chart">
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 20);
        const x = i * barWidth + 4;
        const y = height - h - 10;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={barWidth - 8} height={h} rx="2" className="fill-indigo-500/80" />
          </g>
        );
      })}
    </svg>
  );
}

export default function ExpensesChart() {
  const API = import.meta.env.VITE_BACKEND_URL;
  const [raw, setRaw] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/expenses`);
        const data = await res.json();
        setRaw(data.items || []);
      } catch (e) {
        console.error("Failed to fetch expenses", e);
      }
    };
    load();
  }, [API]);

  // Group by month label
  const data = useMemo(() => {
    const map = new Map();
    for (const e of raw) {
      const d = new Date(e.date);
      const key = isNaN(d.getTime()) ? "Unknown" : `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
      map.set(key, (map.get(key) || 0) + Number(e.amount || 0));
    }
    return Array.from(map.entries()).map(([label, value]) => ({ label, value }));
  }, [raw]);

  const total = raw.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Expenses Overview</h3>
              <p className="text-sm text-slate-500">Track catering, staff, decor and more</p>
            </div>
            <span className="text-xs text-slate-500">Live</span>
          </div>
          <MiniBar data={data.length ? data : [{ label: "No data", value: 1 }]} />
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            {data.map((d) => (
              <div key={d.label} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                {d.label}
                <span className="font-medium text-slate-900">${d.value.toLocaleString()}</span>
              </div>
            ))}
            {data.length === 0 && (
              <div className="text-slate-500">No expenses yet</div>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="mb-2 text-sm font-semibold text-slate-900">Total</h4>
          <p className="text-2xl font-bold text-slate-900">${total.toLocaleString()}</p>
          <p className="text-sm text-emerald-600">Live</p>
          <ul className="mt-4 space-y-3 text-sm">
            {raw.slice(0, 6).map((e) => {
              const d = new Date(e.date);
              return (
                <li key={e._id} className="flex items-center justify-between">
                  <span className="text-slate-600">{e.category || "Other"} • {isNaN(d.getTime()) ? e.date : d.toLocaleDateString()}</span>
                  <span className="font-medium text-slate-900">${Number(e.amount || 0).toLocaleString()}</span>
                </li>
              );
            })}
            {raw.length === 0 && (
              <li className="text-slate-500">No recent expenses</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
