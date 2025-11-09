import { CalendarDays, Users, Wallet, CheckCircle2 } from "lucide-react";

const Card = ({ title, value, change, icon: Icon, color }) => (
  <div className="flex flex-1 items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color} text-white`}>
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-slate-500">{title}</p>
      <div className="flex items-end gap-2">
        <p className="text-xl font-semibold text-slate-900">{value}</p>
        {change && (
          <span className="text-xs font-medium text-emerald-600">{change}</span>
        )}
      </div>
    </div>
  </div>
);

export default function OverviewCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Upcoming Events" value="12" change="+3 this week" icon={CalendarDays} color="bg-indigo-600" />
        <Card title="Confirmed Bookings" value="84" change="+12%" icon={CheckCircle2} color="bg-emerald-600" />
        <Card title="Active Clients" value="47" change="+5" icon={Users} color="bg-sky-600" />
        <Card title="Monthly Revenue" value="$42,380" change="+8%" icon={Wallet} color="bg-amber-600" />
      </div>
    </section>
  );
}
