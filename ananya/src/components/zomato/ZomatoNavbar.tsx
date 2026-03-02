import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, ShoppingBag, Menu, X, User, Tag, Moon, Sun } from "lucide-react";
import { cities } from "@/data/zomatoData";
import { useCart } from "@/context/CartContext";
import VoiceSearch from "./VoiceSearch";
import VegModeToggle from "./VegModeToggle";

interface Props {
  onCartClick: () => void;
  onLoginClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  darkMode: boolean;
  onToggleDark: () => void;
  vegMode: boolean;
  onToggleVeg: () => void;
}

const ZomatoNavbar = ({ onCartClick, onLoginClick, searchQuery, onSearchChange, darkMode, onToggleDark, vegMode, onToggleVeg }: Props) => {
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Shivamogga, Karnataka");
  const [mobileMenu, setMobileMenu] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const { count } = useCart();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border zomato-shadow">
      <div className="container mx-auto flex items-center h-16 gap-3">
        {/* Logo */}
        <a href="/" className="text-primary font-extrabold text-2xl tracking-tight shrink-0">
          FOOD
        </a>

        {/* Location Selector */}
        <div className="hidden md:block relative" ref={cityRef}>
          <button
            onClick={() => setCityOpen(!cityOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm"
            aria-label="Select city"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-foreground font-medium max-w-[140px] truncate">{selectedCity}</span>
            <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${cityOpen ? "rotate-180" : ""}`} />
          </button>
          {cityOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl border border-border zomato-shadow-hover p-2 animate-fade-in max-h-72 overflow-y-auto">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => { setSelectedCity(city); setCityOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    selectedCity === city ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <MapPin className="h-3.5 w-3.5 inline mr-2 opacity-50" />{city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 hidden md:flex items-center bg-secondary rounded-xl px-4 py-2 gap-2 max-w-xl border border-border focus-within:border-primary/50 transition-colors">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for restaurant, cuisine or a dish"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            aria-label="Search restaurants"
          />
          <VoiceSearch onResult={onSearchChange} />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={onToggleDark} className="p-2 rounded-lg hover:bg-secondary transition-colors" aria-label="Toggle dark mode">
            {darkMode ? <Sun className="h-5 w-5 text-zomato-gold" /> : <Moon className="h-5 w-5 text-muted-foreground" />}
          </button>
          <div className="hidden md:block">
            <VegModeToggle vegMode={vegMode} onToggle={onToggleVeg} />
          </div>
          <button className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm text-foreground">
            <Tag className="h-4 w-4" /> Offers
          </button>
          <button onClick={onLoginClick} className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-sm text-foreground">
            <User className="h-4 w-4" /> Log in
          </button>
          <button onClick={onCartClick} className="relative p-2 rounded-lg hover:bg-secondary transition-colors" aria-label="Cart">
            <ShoppingBag className="h-5 w-5 text-foreground" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 rounded-lg hover:bg-secondary" aria-label="Menu">
            {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-secondary rounded-xl px-3 py-2 gap-2 border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for restaurant, cuisine or a dish"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container mx-auto py-3 space-y-1">
            {/* Mobile city selector */}
            <div className="px-3 py-2 text-xs text-muted-foreground uppercase tracking-wider">Location</div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-secondary text-sm text-foreground border-0"
            >
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-secondary text-sm text-foreground">
              <Tag className="h-4 w-4" /> Offers
            </button>
            <button onClick={() => { onLoginClick(); setMobileMenu(false); }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-secondary text-sm text-foreground">
              <User className="h-4 w-4" /> Log in / Sign up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default ZomatoNavbar;
