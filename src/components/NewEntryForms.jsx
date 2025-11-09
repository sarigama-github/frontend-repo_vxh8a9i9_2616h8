import { useState } from "react";
import { PlusCircle, Receipt, CalendarPlus, Users, Building2 } from "lucide-react";

export default function NewEntryForms() {
  const API = import.meta.env.VITE_BACKEND_URL;
  const [tab, setTab] = useState("booking");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [booking, setBooking] = useState({ date: "", time: "", client: "", venue: "", guests: "", status: "Inquiry" });
  const [expense, setExpense] = useState({ date: "", category: "Catering", amount: "", description: "" });
  const [client, setClient] = useState({ name: "", email: "", phone: "" });
  const [venue, setVenue] = useState({ name: "", location: "", capacity: "" });

  const submit = async (type) => {
    setLoading(true);
    setMessage("");
    try {
      let body = {};
      let url = `${API}/${type}s`;
      if (type === "booking") body = { ...booking, guests: booking.guests ? Number(booking.guests) : undefined };
      if (type === "expense") body = { ...expense, amount: expense.amount ? Number(expense.amount) : 0 };
      if (type === "client") body = client;
      if (type === "venue") body = { ...venue, capacity: venue.capacity ? Number(venue.capacity) : undefined };

      const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`Failed with ${res.status}`);
      setMessage("Saved successfully. Refresh sections to see updates.");
      if (type === "booking") setBooking({ date: "", time: "", client: "", venue: "", guests: "", status: "Inquiry" });
      if (type === "expense") setExpense({ date: "", category: "Catering", amount: "", description: "" });
      if (type === "client") setClient({ name: "", email: "", phone: "" });
      if (type === "venue") setVenue({ name: "", location: "", capacity: "" });
    } catch (e) {
      console.error(e);
      setMessage("There was an issue saving. Check inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  const Input = ({ label, ...props }) => (
    <label className="grid gap-1 text-sm">
      <span className="text-slate-600">{label}</span>
      <input {...props} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </label>
  );

  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <button onClick={() => setTab("booking")} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${tab === "booking" ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-700"}`}>
            <CalendarPlus className="h-4 w-4" /> Booking
          </button>
          <button onClick={() => setTab("expense")} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${tab === "expense" ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-700"}`}>
            <Receipt className="h-4 w-4" /> Expense
          </button>
          <button onClick={() => setTab("client")} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${tab === "client" ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-700"}`}>
            <Users className="h-4 w-4" /> Client
          </button>
          <button onClick={() => setTab("venue")} className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${tab === "venue" ? "bg-indigo-600 text-white" : "border border-slate-200 text-slate-700"}`}>
            <Building2 className="h-4 w-4" /> Venue
          </button>
        </div>

        {tab === "booking" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Input label="Date" type="date" value={booking.date} onChange={(e) => setBooking({ ...booking, date: e.target.value })} />
            <Input label="Time" placeholder="5:00 PM" value={booking.time} onChange={(e) => setBooking({ ...booking, time: e.target.value })} />
            <Input label="Client" placeholder="Amelia & Jack" value={booking.client} onChange={(e) => setBooking({ ...booking, client: e.target.value })} />
            <Input label="Venue" placeholder="Grand Ballroom" value={booking.venue} onChange={(e) => setBooking({ ...booking, venue: e.target.value })} />
            <Input label="Guests" type="number" placeholder="200" value={booking.guests} onChange={(e) => setBooking({ ...booking, guests: e.target.value })} />
            <label className="grid gap-1 text-sm">
              <span className="text-slate-600">Status</span>
              <select value={booking.status} onChange={(e) => setBooking({ ...booking, status: e.target.value })} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Inquiry</option>
                <option>Tentative</option>
                <option>Confirmed</option>
              </select>
            </label>
            <div className="md:col-span-3">
              <button disabled={loading} onClick={() => submit("booking")} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60">
                <PlusCircle className="h-4 w-4" /> Create Booking
              </button>
            </div>
          </div>
        )}

        {tab === "expense" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Input label="Date" type="date" value={expense.date} onChange={(e) => setExpense({ ...expense, date: e.target.value })} />
            <Input label="Category" placeholder="Catering" value={expense.category} onChange={(e) => setExpense({ ...expense, category: e.target.value })} />
            <Input label="Amount" type="number" placeholder="5000" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
            <label className="md:col-span-3 grid gap-1 text-sm">
              <span className="text-slate-600">Description</span>
              <input value={expense.description} onChange={(e) => setExpense({ ...expense, description: e.target.value })} className="rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Notes" />
            </label>
            <div className="md:col-span-3">
              <button disabled={loading} onClick={() => submit("expense")} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60">
                <PlusCircle className="h-4 w-4" /> Record Expense
              </button>
            </div>
          </div>
        )}

        {tab === "client" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Input label="Name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} placeholder="Amelia" />
            <Input label="Email" type="email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} placeholder="amelia@example.com" />
            <Input label="Phone" value={client.phone} onChange={(e) => setClient({ ...client, phone: e.target.value })} placeholder="+1 555 123 4567" />
            <div className="md:col-span-3">
              <button disabled={loading} onClick={() => submit("client")} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60">
                <PlusCircle className="h-4 w-4" /> Add Client
              </button>
            </div>
          </div>
        )}

        {tab === "venue" && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <Input label="Name" value={venue.name} onChange={(e) => setVenue({ ...venue, name: e.target.value })} placeholder="Grand Ballroom" />
            <Input label="Location" value={venue.location} onChange={(e) => setVenue({ ...venue, location: e.target.value })} placeholder="Downtown" />
            <Input label="Capacity" type="number" value={venue.capacity} onChange={(e) => setVenue({ ...venue, capacity: e.target.value })} placeholder="250" />
            <div className="md:col-span-3">
              <button disabled={loading} onClick={() => submit("venue")} className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60">
                <PlusCircle className="h-4 w-4" /> Add Venue
              </button>
            </div>
          </div>
        )}

        {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
      </div>
    </section>
  );
}
