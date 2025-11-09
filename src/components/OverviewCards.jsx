import { useEffect, useState, useMemo } from "react";
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
  const API = import.meta.env.VITE_BACKEND_URL;
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [bRes, cRes, eRes] = await Promise.all([
          fetch(`${API}/bookings`).then((r) => r.json()),
          fetch(`${API}/clients`).then((r) => r.json()),
          fetch(`${API}/expenses`).then((r) => r.json()),
        ]);
        setBookings(bRes.items || []);
        setClients(cRes.items || []);
        setExpenses(eRes.items || []);
      } catch (e) {
        console.error("Failed to load overview data", e);
      }
    };
    fetchAll();
  }, [API]);

  const confirmedCount = useMemo(
    () => bookings.filter((b) => (b.status || "").toLowerCase() === "confirmed").length,
    [bookings]
  );

  const monthlyExpenses = useMemo(() => {
    // Sum expenses in the current month
    const now = new Date();
    return expenses
      .filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);
  }, [expenses]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card title="Upcoming Events" value={bookings.length.toString()} change="Live" icon={CalendarDays} color="bg-indigo-600" />
        <Card title="Confirmed Bookings" value={confirmedCount.toString()} change={bookings.length ? `${Math.round((confirmedCount / bookings.length) * 100)}%` : undefined} icon={CheckCircle2} color="bg-emerald-600" />
        <Card title="Active Clients" value={clients.length.toString()} change="Updated" icon={Users} color="bg-sky-600" />
        <Card title="Monthly Expenses" value={`$${monthlyExpenses.toLocaleString()}`} change="This month" icon={Wallet} color="bg-amber-600" />
      </div>
    </section>
  );
}
