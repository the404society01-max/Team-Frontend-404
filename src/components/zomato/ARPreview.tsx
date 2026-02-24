import { useState } from "react";
import { Camera, X, Eye } from "lucide-react";
import { dishes } from "@/data/zomatoData";
import { useToast } from "@/hooks/use-toast";

const ARPreview = () => {
  const [active, setActive] = useState(false);
  const [selectedDish, setSelectedDish] = useState<typeof dishes[0] | null>(null);
  const { toast } = useToast();

  const openAR = async (dish: typeof dishes[0]) => {
    setSelectedDish(dish);
    setActive(true);
    try {
      // Request camera just for the permission experience
      await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => stream.getTracks().forEach((t) => t.stop()));
    } catch {
      toast({ title: "Camera access needed", description: "Allow camera to use AR preview", variant: "destructive" });
    }
  };

  return (
    <section className="py-8" aria-label="AR menu preview">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-5">
          <Eye className="h-5 w-5 text-primary" />
          <h2 className="text-xl md:text-2xl font-bold text-foreground">See on Your Table</h2>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">AR</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {dishes.slice(0, 8).map((dish) => (
            <button
              key={dish.id}
              onClick={() => openAR(dish)}
              className="group relative rounded-xl overflow-hidden border border-border bg-card hover:zomato-shadow-hover transition-shadow"
            >
              <img src={dish.image} alt={dish.name} className="w-full h-32 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-3 py-1.5 rounded-full bg-background/90 text-foreground text-xs font-semibold">
                  <Camera className="h-3 w-3" /> View in AR
                </span>
              </div>
              <div className="p-2">
                <p className="text-xs font-medium text-foreground truncate">{dish.name}</p>
              </div>
            </button>
          ))}
        </div>

        {/* AR Modal */}
        {active && selectedDish && (
          <>
            <div className="fixed inset-0 z-50 bg-foreground/60 animate-fade-in" onClick={() => setActive(false)} />
            <div className="fixed inset-4 md:inset-16 z-50 bg-background rounded-2xl overflow-hidden flex flex-col animate-fade-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground text-sm">AR Preview — {selectedDish.name}</span>
                </div>
                <button onClick={() => setActive(false)} className="p-1 hover:bg-secondary rounded-lg"><X className="h-5 w-5" /></button>
              </div>
              <div className="flex-1 relative bg-muted flex items-center justify-center">
                {/* Simulated AR: dish image overlaid on a "table" background */}
                <div className="absolute inset-0 bg-gradient-to-b from-muted to-secondary" />
                <div className="relative">
                  <img
                    src={selectedDish.image}
                    alt={selectedDish.name}
                    className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-background zomato-shadow-hover"
                    style={{ animation: "float 3s ease-in-out infinite" }}
                  />
                  <p className="text-center mt-4 text-sm text-muted-foreground">Point your camera at a table surface</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
      `}</style>
    </section>
  );
};

export default ARPreview;
