import { useState } from "react";
import { Leaf, TreePine, Package, TrendingDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const SustainabilityTracker = () => {
  const { total, count } = useCart();
  const [ecoPackaging, setEcoPackaging] = useState(false);
  const [plantTree, setPlantTree] = useState(false);
  const { toast } = useToast();

  const carbonKg = (count * 0.3).toFixed(1);
  const saved = ecoPackaging ? (count * 0.1).toFixed(1) : "0.0";

  const handlePlantTree = () => {
    setPlantTree(!plantTree);
    if (!plantTree) toast({ title: "🌳 Thank you!", description: "₹10 will be donated to plant a tree" });
  };

  return (
    <section className="py-8" aria-label="Sustainability tracker">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <Leaf className="h-5 w-5 text-green-600" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Eco Impact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Carbon footprint */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-foreground">Carbon Footprint</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{carbonKg} kg CO₂</p>
            <p className="text-xs text-muted-foreground mt-1">Estimated for your current order</p>
            {parseFloat(saved) > 0 && (
              <p className="text-xs text-green-600 mt-1">🌿 Saved {saved} kg with eco packaging</p>
            )}
          </div>

          {/* Eco packaging */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-foreground">Eco Packaging</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Switch to biodegradable containers — no extra charge!</p>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={ecoPackaging} onChange={(e) => setEcoPackaging(e.target.checked)} className="w-4 h-4 accent-green-600 rounded" />
              <span className="text-sm text-foreground">Use eco-friendly packaging</span>
            </label>
          </div>

          {/* Plant a tree */}
          <div className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-foreground">Plant a Tree</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Add ₹10 to your order to plant a tree in Shivamogga 🌳</p>
            <button
              onClick={handlePlantTree}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                plantTree
                  ? "bg-green-600/10 text-green-700 border border-green-600/40"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {plantTree ? "✓ Tree added to order" : "Donate ₹10"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityTracker;
