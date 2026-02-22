import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, Users, Clock, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SectionHeading from "@/components/SectionHeading";
import { useToast } from "@/hooks/use-toast";
import interiorImg from "@/assets/restaurant-interior.jpg";

const timeSlots = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];

const Reservation = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialReq, setSpecialReq] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Reservation Confirmed! 🎉", description: `Table for ${guests} on ${date ? format(date, "PPP") : ""} at ${time}. See you soon!` });
  };

  return (
    <div className="pt-20">
      <section className="relative py-20">
        <div className="absolute inset-0">
          <img src={interiorImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-background mb-4">Reserve Your Table</h1>
          <p className="text-background/70 text-lg max-w-lg mx-auto">Secure your spot for an unforgettable dining experience.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Email address" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone number" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Date */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><CalendarIcon className="h-4 w-4" /> Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className={cn("w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm text-left", !date && "text-muted-foreground")}>
                      {date ? format(date, "MMM d, yyyy") : "Pick date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Clock className="h-4 w-4" /> Time</label>
                <select value={time} onChange={(e) => setTime(e.target.value)} required className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm">
                  <option value="">Select</option>
                  {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Guests */}
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><Users className="h-4 w-4" /> Guests</label>
                <select value={guests} onChange={(e) => setGuests(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1.5"><MessageSquare className="h-4 w-4" /> Special Requests</label>
              <textarea value={specialReq} onChange={(e) => setSpecialReq(e.target.value)} rows={3} placeholder="Allergies, celebrations, seating preferences..." className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>

            <button type="submit" className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Confirm Reservation
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Reservation;
