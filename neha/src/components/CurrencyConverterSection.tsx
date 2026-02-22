import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

const currencies: Record<string, { name: string; symbol: string; rate: number }> = {
  USD: { name: "US Dollar", symbol: "$", rate: 1 },
  EUR: { name: "Euro", symbol: "€", rate: 0.92 },
  GBP: { name: "British Pound", symbol: "£", rate: 0.79 },
  JPY: { name: "Japanese Yen", symbol: "¥", rate: 150.2 },
  INR: { name: "Indian Rupee", symbol: "₹", rate: 83.1 },
  AUD: { name: "Australian Dollar", symbol: "A$", rate: 1.53 },
  THB: { name: "Thai Baht", symbol: "฿", rate: 35.4 },
  IDR: { name: "Indonesian Rupiah", symbol: "Rp", rate: 15680 },
  MAD: { name: "Moroccan Dirham", symbol: "MAD", rate: 10.05 },
  NOK: { name: "Norwegian Krone", symbol: "kr", rate: 10.6 },
  ARS: { name: "Argentine Peso", symbol: "ARS", rate: 870 },
};

const CurrencyConverterSection = () => {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");

  const converted = useMemo(() => {
    const val = parseFloat(amount) || 0;
    const inUsd = val / currencies[from].rate;
    return (inUsd * currencies[to].rate).toFixed(2);
  }, [amount, from, to]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <section id="currency" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Currency Converter</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Know your rates</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Quick currency conversion for your travel planning.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto bg-card border border-border rounded-lg p-8"
        >
          <div className="mb-6">
            <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">Amount</label>
            <div className="flex gap-3 items-end">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 min-w-0 bg-transparent border-b border-border py-3 text-2xl font-serif text-foreground focus:outline-none focus:border-primary transition-colors"
                min="0"
              />
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm border-none focus:outline-none cursor-pointer flex-shrink-0"
              >
                {Object.entries(currencies).map(([code, c]) => (
                  <option key={code} value={code}>{code} — {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <button
              onClick={swap}
              className="p-3 rounded-full border border-border hover:bg-secondary transition-colors"
              aria-label="Swap currencies"
            >
              <ArrowLeftRight size={16} className="text-muted-foreground" />
            </button>
          </div>

          <div className="mb-2">
            <label className="block text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2">Converted</label>
            <div className="flex gap-3 items-end">
              <p className="flex-1 text-3xl font-serif text-foreground py-3 border-b border-border">
                {currencies[to].symbol} {converted}
              </p>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-secondary text-secondary-foreground px-4 py-2 rounded text-sm border-none focus:outline-none cursor-pointer"
              >
                {Object.entries(currencies).map(([code, c]) => (
                  <option key={code} value={code}>{code} — {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground mt-4 text-center">
            Rates are indicative and may differ from actual market rates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrencyConverterSection;
