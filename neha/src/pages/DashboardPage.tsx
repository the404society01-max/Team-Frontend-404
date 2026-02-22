import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, MapPin, Calendar, CreditCard, Settings, LogOut, Clock, Star, ArrowRight } from "lucide-react";

const bookings = [
  {
    id: "BK-2026-001",
    destination: "Kashmir Paradise",
    location: "Srinagar, India",
    dates: "Mar 15 – Mar 20, 2026",
    status: "Upcoming",
    price: "₹28,999",
    travelers: 2,
  },
  {
    id: "BK-2025-042",
    destination: "Bali Retreat",
    location: "Ubud, Indonesia",
    dates: "Dec 5 – Dec 14, 2025",
    status: "Completed",
    price: "₹65,999",
    travelers: 1,
  },
  {
    id: "BK-2025-038",
    destination: "Fjords Expedition",
    location: "Bergen, Norway",
    dates: "Sep 10 – Sep 18, 2025",
    status: "Completed",
    price: "₹89,999",
    travelers: 2,
  },
  {
    id: "BK-2025-025",
    destination: "Kyoto Cultural Immersion",
    location: "Kyoto, Japan",
    dates: "Jun 1 – Jun 10, 2025",
    status: "Completed",
    price: "₹72,500",
    travelers: 1,
  },
];

const statusColor: Record<string, string> = {
  Upcoming: "bg-accent/20 text-accent",
  Completed: "bg-secondary text-secondary-foreground",
  Cancelled: "bg-destructive/20 text-destructive",
};

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-serif text-foreground">Traveler</h3>
                  <p className="text-xs text-muted-foreground">traveler@email.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { icon: MapPin, label: "My Bookings", active: true },
                  { icon: Calendar, label: "Upcoming Trips", active: false },
                  { icon: CreditCard, label: "Payments", active: false },
                  { icon: Star, label: "Wishlist", active: false },
                  { icon: Settings, label: "Settings", active: false },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors ${
                      item.active
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
                <Link
                  to="/"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </Link>
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Trips", value: "4" },
                { label: "Countries", value: "4" },
                { label: "Upcoming", value: "1" },
                { label: "Total Spent", value: "₹2.57L" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border rounded-lg p-5 text-center">
                  <p className="text-2xl font-serif text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-serif text-foreground mb-6">Booking History</h2>
              <div className="space-y-4">
                {bookings.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="bg-card border-2 border-border rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-lg text-foreground">{booking.destination}</h3>
                        <span className={`text-[10px] tracking-wider uppercase px-2 py-0.5 rounded ${statusColor[booking.status]}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin size={12} /> {booking.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {booking.dates}</span>
                        <span className="flex items-center gap-1"><User size={12} /> {booking.travelers} traveler{booking.travelers > 1 ? "s" : ""}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {booking.id}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-lg font-serif text-foreground">{booking.price}</p>
                      <button className="p-2 rounded border border-border hover:bg-secondary transition-colors">
                        <ArrowRight size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
