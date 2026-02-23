import { useState } from "react";
import { Award, Gift, Users, Star, ChevronRight, X, Sparkles } from "lucide-react";

const tiers = [
  { name: "Silver", minPoints: 0, color: "bg-gray-400", benefits: ["Free delivery on 3 orders/month", "Birthday special 10% off"] },
  { name: "Gold", minPoints: 500, color: "bg-zomato-gold", benefits: ["Free delivery always", "15% off every 5th order", "Priority support"] },
  { name: "Platinum", minPoints: 1500, color: "bg-purple-500", benefits: ["All Gold perks", "25% off weekly", "Exclusive early access to deals"] },
];

const coupons = [
  { code: "FOOD50", desc: "₹50 off on orders above ₹299", points: 100 },
  { code: "FREEDEL", desc: "Free delivery on next order", points: 50 },
  { code: "BIRYANI20", desc: "20% off on Biryani orders", points: 150 },
  { code: "DESSERT30", desc: "30% off on Desserts", points: 200 },
];

const LoyaltyProgram = () => {
  const [points] = useState(320);
  const [referralOpen, setReferralOpen] = useState(false);
  const currentTier = tiers.reduce((t, tier) => (points >= tier.minPoints ? tier : t), tiers[0]);
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progressToNext = nextTier ? Math.min(100, (points / nextTier.minPoints) * 100) : 100;

  return (
    <section className="py-8" aria-label="Loyalty program">
      <div className="container mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
          <Award className="h-6 w-6 text-zomato-gold" /> FOOD Rewards
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Points Card */}
          <div className="bg-gradient-to-br from-primary to-zomato-orange rounded-2xl p-5 text-primary-foreground">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-80">Your Points</p>
                <p className="text-3xl font-bold">{points}</p>
              </div>
              <div className={`w-14 h-14 ${currentTier.color} rounded-full flex items-center justify-center`}>
                <Star className="h-7 w-7 text-white fill-current" />
              </div>
            </div>
            <p className="text-sm font-semibold mb-1">{currentTier.name} Member</p>
            <p className="text-xs opacity-80 mb-3">Earn 10 points per ₹100 spent</p>
            {nextTier && (
              <>
                <div className="h-2 bg-primary-foreground/20 rounded-full overflow-hidden mb-1">
                  <div className="h-full bg-primary-foreground rounded-full transition-all" style={{ width: `${progressToNext}%` }} />
                </div>
                <p className="text-xs opacity-80">{nextTier.minPoints - points} points to {nextTier.name}</p>
              </>
            )}
            <button onClick={() => setReferralOpen(true)} className="mt-4 w-full py-2.5 rounded-xl bg-primary-foreground/20 text-sm font-semibold hover:bg-primary-foreground/30 transition-colors flex items-center justify-center gap-1.5">
              <Users className="h-4 w-4" /> Refer a Friend — Earn 50 pts
            </button>
          </div>

          {/* Reward Badges */}
          <div className="bg-card rounded-2xl border border-border p-5 zomato-shadow">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-zomato-gold" /> Your Badges</h3>
            <div className="grid grid-cols-2 gap-3">
              {tiers.map((tier) => {
                const unlocked = points >= tier.minPoints;
                return (
                  <div key={tier.name} className={`p-3 rounded-xl border text-center transition-colors ${unlocked ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/50 opacity-50"}`}>
                    <div className={`w-10 h-10 ${tier.color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    <p className="text-xs font-bold text-foreground">{tier.name}</p>
                    <p className="text-[10px] text-muted-foreground">{tier.minPoints} pts</p>
                  </div>
                );
              })}
              <div className="p-3 rounded-xl border border-dashed border-border bg-secondary/30 text-center opacity-60">
                <div className="w-10 h-10 bg-muted rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-xs font-bold text-foreground">5 Orders Away</p>
                <p className="text-[10px] text-muted-foreground">from Gold!</p>
              </div>
            </div>
          </div>

          {/* Redeemable Coupons */}
          <div className="bg-card rounded-2xl border border-border p-5 zomato-shadow">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-1.5"><Gift className="h-4 w-4 text-primary" /> Redeem Coupons</h3>
            <div className="space-y-2.5">
              {coupons.map((coupon) => {
                const canRedeem = points >= coupon.points;
                return (
                  <div key={coupon.code} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono font-bold text-sm text-primary">{coupon.code}</p>
                      <p className="text-xs text-muted-foreground truncate">{coupon.desc}</p>
                    </div>
                    <button disabled={!canRedeem} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${canRedeem ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-muted-foreground cursor-not-allowed"}`}>
                      {coupon.points} pts
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Referral Modal */}
        {referralOpen && (
          <>
            <div className="fixed inset-0 z-50 bg-foreground/40 animate-fade-in" onClick={() => setReferralOpen(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-card rounded-2xl border border-border w-full max-w-sm p-6 zomato-shadow-hover animate-scale-in text-center">
                <button onClick={() => setReferralOpen(false)} className="absolute top-3 right-3 p-1 rounded hover:bg-secondary"><X className="h-5 w-5" /></button>
                <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="font-bold text-lg text-foreground mb-2">Refer a Friend</h3>
                <p className="text-sm text-muted-foreground mb-4">Share your code and both earn 50 points!</p>
                <div className="bg-secondary rounded-xl p-3 font-mono font-bold text-lg text-primary mb-4">FOOD-REF-2026</div>
                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5">
                  Share Code <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LoyaltyProgram;
