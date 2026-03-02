import { useState } from "react";
import { Crown, Zap, Truck, Star, X, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VIPMembership = () => {
  const [showModal, setShowModal] = useState(false);
  const [isVIP, setIsVIP] = useState(() => localStorage.getItem("food-vip") === "true");
  const { toast } = useToast();

  const upgrade = () => {
    setIsVIP(true);
    localStorage.setItem("food-vip", "true");
    setShowModal(false);
    toast({ title: "👑 Welcome to VIP!", description: "Enjoy 2x points, free delivery & exclusive deals" });
  };

  const perks = [
    { icon: <Truck className="h-4 w-4" />, text: "Free delivery on all orders" },
    { icon: <Zap className="h-4 w-4" />, text: "2x loyalty points multiplier" },
    { icon: <Star className="h-4 w-4" />, text: "Exclusive VIP-only deals" },
    { icon: <Crown className="h-4 w-4" />, text: "Priority delivery (15 min faster)" },
  ];

  return (
    <>
      <section className="py-8" aria-label="VIP membership">
        <div className="container mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-primary/20 bg-gradient-to-r from-primary/5 via-card to-primary/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">FOOD VIP</h2>
                  {isVIP && <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">ACTIVE</span>}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {isVIP
                    ? "You're enjoying premium benefits — 2x points on every order!"
                    : "Unlock premium perks for just ₹99/month. Priority delivery, free shipping, exclusive deals."}
                </p>
                <div className="flex flex-wrap gap-3">
                  {perks.map((p, i) => (
                    <span key={i} className="flex items-center gap-1.5 text-xs text-foreground bg-secondary px-2.5 py-1 rounded-full">
                      {p.icon} {p.text}
                    </span>
                  ))}
                </div>
              </div>
              {!isVIP && (
                <button
                  onClick={() => setShowModal(true)}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors shrink-0"
                >
                  Upgrade — ₹99/mo
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Upgrade Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 bg-foreground/40 animate-fade-in" onClick={() => setShowModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-background rounded-2xl border border-border p-6 zomato-shadow-hover animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-foreground text-lg">Go VIP</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-secondary rounded-lg"><X className="h-5 w-5" /></button>
            </div>

            <div className="space-y-3 mb-5">
              {perks.map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {p.text}
                </div>
              ))}
            </div>

            <div className="text-center mb-4">
              <span className="text-3xl font-extrabold text-foreground">₹99</span>
              <span className="text-sm text-muted-foreground">/month</span>
            </div>

            <button onClick={upgrade} className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-colors">
              Start VIP Membership
            </button>
            <p className="text-[10px] text-muted-foreground text-center mt-2">Cancel anytime. No commitment.</p>
          </div>
        </>
      )}
    </>
  );
};

export default VIPMembership;
