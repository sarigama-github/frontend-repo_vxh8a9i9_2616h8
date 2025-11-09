import Navbar from "./components/Navbar";
import OverviewCards from "./components/OverviewCards";
import BookingsTable from "./components/BookingsTable";
import ExpensesChart from "./components/ExpensesChart";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Hero />
        <OverviewCards />
        <ExpensesChart />
        <BookingsTable />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pb-2 pt-8 md:px-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Manage bookings, expenses and teams in one clean workspace
            </h1>
            <p className="mt-2 text-indigo-100">
              VenueOS helps wedding venues, banquets and event spaces run smoothly — from first inquiry to final invoice.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-slate-50">
                Add a Booking
              </button>
              <button className="rounded-md border border-white/40 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20">
                Record Expense
              </button>
            </div>
          </div>
          <ul className="grid w-full max-w-md grid-cols-2 gap-3 text-sm text-white/90 md:max-w-lg">
            <li className="rounded-lg border border-white/20 bg-white/10 px-3 py-2">
              • Availability calendar
            </li>
            <li className="rounded-lg border border-white/20 bg-white/10 px-3 py-2">
              • Client CRM
            </li>
            <li className="rounded-lg border border-white/20 bg-white/10 px-3 py-2">
              • Expense tracking
            </li>
            <li className="rounded-lg border border-white/20 bg-white/10 px-3 py-2">
              • Invoices & payments
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 py-10 text-center text-sm text-slate-500 md:px-6">
      <p>© {new Date().getFullYear()} VenueOS — Built for venue owners</p>
    </footer>
  );
}
