import { useState, useEffect } from "react";
import { Package, ChefHat, Bike, CheckCircle2, MapPin, Clock } from "lucide-react";

interface TrackingStep {
  label: string;
  icon: React.ReactNode;
  time: string;
}

const steps: TrackingStep[] = [
  { label: "Order Confirmed", icon: <Package className="h-5 w-5" />, time: "12:30 PM" },
  { label: "Preparing", icon: <ChefHat className="h-5 w-5" />, time: "12:35 PM" },
  { label: "Out for Delivery", icon: <Bike className="h-5 w-5" />, time: "12:50 PM" },
  { label: "Delivered", icon: <CheckCircle2 className="h-5 w-5" />, time: "1:05 PM" },
];

const OrderTracking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [eta, setEta] = useState(35);
  const [demoStarted, setDemoStarted] = useState(false);

  useEffect(() => {
    if (!demoStarted) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 3) { clearInterval(interval); return 3; }
        return prev + 1;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [demoStarted]);

  useEffect(() => {
    if (!demoStarted) return;
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [demoStarted]);

  const progress = ((activeStep) / (steps.length - 1)) * 100;

  return (
    <section className="py-8" aria-label="Live order tracking">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
          <Bike className="h-6 w-6 text-primary" /> Live Order Tracking
        </h2>
        <div className="bg-card rounded-2xl border border-border p-5 md:p-6 zomato-shadow">
          {!demoStarted ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">Place an order to see live tracking</p>
              <button onClick={() => setDemoStarted(true)} className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                Start Demo Tracking
              </button>
            </div>
          ) : (
            <>
              {/* ETA */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                  <p className="text-2xl font-bold text-foreground">{eta > 0 ? `${eta} min` : "Delivered!"}</p>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-zomato-green font-medium">
                  <Clock className="h-4 w-4" />
                  {activeStep < 3 ? "In Progress" : "Completed"}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {steps.map((step, i) => (
                  <div key={step.label} className={`flex flex-col items-center text-center gap-2 p-3 rounded-xl transition-colors ${i <= activeStep ? "bg-primary/5" : "bg-secondary/50"}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${i <= activeStep ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
                      {step.icon}
                    </div>
                    <span className={`text-xs font-semibold ${i <= activeStep ? "text-primary" : "text-muted-foreground"}`}>{step.label}</span>
                    <span className="text-[10px] text-muted-foreground">{i <= activeStep ? step.time : "--:--"}</span>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-6 rounded-xl bg-secondary h-48 flex items-center justify-center border border-border">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground font-medium">Delivery rider is on the way</p>
                  <p className="text-xs text-muted-foreground">Shivamogga, Karnataka</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderTracking;
