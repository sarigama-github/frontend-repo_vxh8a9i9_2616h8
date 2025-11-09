import { useMemo } from "react";

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
  const data = useMemo(
    () => [
      { label: "Jan", value: 8200 },
      { label: "Feb", value: 6200 },
      { label: "Mar", value: 9800 },
      { label: "Apr", value: 7600 },
      { label: "May", value: 11300 },
      { label: "Jun", value: 9400 },
    ],
    []
  );

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 md:px-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Expenses Overview</h3>
              <p className="text-sm text-slate-500">Track catering, staff, decor and more</p>
            </div>
            <select className="rounded-md border border-slate-200 px-2 py-1 text-sm text-slate-700">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <MiniBar data={data} />
          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
            {data.map((d) => (
              <div key={d.label} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                {d.label}
                <span className="font-medium text-slate-900">${d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h4 className="mb-2 text-sm font-semibold text-slate-900">This Period</h4>
          <p className="text-2xl font-bold text-slate-900">${total.toLocaleString()}</p>
          <p className="text-sm text-emerald-600">Under budget by 6%</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center justify-between">
              <span className="text-slate-600">Catering</span>
              <span className="font-medium text-slate-900">$4,200</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-600">Staffing</span>
              <span className="font-medium text-slate-900">$3,400</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-600">Decor</span>
              <span className="font-medium text-slate-900">$2,100</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-slate-600">Other</span>
              <span className="font-medium text-slate-900">$1,800</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
