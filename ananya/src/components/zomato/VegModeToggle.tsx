import { Leaf } from "lucide-react";

interface Props {
  vegMode: boolean;
  onToggle: () => void;
}

const VegModeToggle = ({ vegMode, onToggle }: Props) => (
  <button
    onClick={onToggle}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
      vegMode
        ? "bg-green-600/10 border-green-600/40 text-green-700 dark:text-green-400"
        : "bg-secondary border-border text-foreground hover:border-primary/30"
    }`}
    aria-pressed={vegMode}
    aria-label="Toggle vegetarian mode"
  >
    <Leaf className={`h-4 w-4 ${vegMode ? "text-green-600" : "text-muted-foreground"}`} />
    <span>Pure Veg</span>
    <div className={`w-8 h-4 rounded-full relative transition-colors ${vegMode ? "bg-green-600" : "bg-muted"}`}>
      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-background transition-transform ${vegMode ? "left-[18px]" : "left-0.5"}`} />
    </div>
  </button>
);

export default VegModeToggle;
