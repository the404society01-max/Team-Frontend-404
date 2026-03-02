import { useState } from "react";
import { CalendarClock, Bell, CheckCircle2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ScheduledOrder = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const { toast } = useToast();

  const getMinDate = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const getMaxDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  };

  const schedule = () => {
    if (!date || !time) {
      toast({ title: "Select date & time", variant: "destructive" });
      return;
    }

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    setConfirmed(true);
    toast({ title: "📅 Order scheduled!", description: `Delivery on ${date} at ${time}` });

    localStorage.setItem("food-scheduled", JSON.stringify({ date, time }));
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors">
        <CalendarClock className="h-4 w-4 text-primary" /> Schedule Order
      </button>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-border bg-card zomato-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">Schedule Delivery</h3>
        </div>
        <button onClick={() => { setOpen(false); setConfirmed(false); }} className="p-1 hover:bg-secondary rounded-lg"><X className="h-4 w-4" /></button>
      </div>

      {confirmed ? (
        <div className="text-center py-4">
          <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-2" />
          <p className="font-semibold text-foreground">Scheduled!</p>
          <p className="text-sm text-muted-foreground">{date} at {time}</p>
          <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
            <Bell className="h-3 w-3" /> We'll remind you before delivery
          </div>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-3">Pick a date and time within the next 48 hours</p>
          <div className="space-y-2 mb-3">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground outline-none"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground outline-none"
            />
          </div>
          <button onClick={schedule} className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
            Confirm Schedule
          </button>
        </>
      )}
    </div>
  );
};

export default ScheduledOrder;
