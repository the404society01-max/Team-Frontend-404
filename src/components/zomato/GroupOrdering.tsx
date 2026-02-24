import { useState } from "react";
import { Users, Copy, CheckCircle2, X, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

const GroupOrdering = () => {
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState<string[]>(["You (Host)"]);
  const [newName, setNewName] = useState("");
  const [copied, setCopied] = useState(false);
  const { items } = useCart();
  const { toast } = useToast();

  const shareLink = () => {
    const cartState = btoa(JSON.stringify(items.map((i) => ({ id: i.id, qty: i.quantity }))));
    const url = `${window.location.origin}?group=${cartState}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({ title: "Link copied!", description: "Share with friends to order together" });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const addParticipant = () => {
    if (!newName.trim() || participants.length >= 10) return;
    setParticipants((p) => [...p, newName.trim()]);
    setNewName("");
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary transition-colors"
      >
        <Users className="h-4 w-4 text-primary" /> Group Order
      </button>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-border bg-card zomato-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-foreground">Group Order</h3>
          <span className="text-xs text-muted-foreground">({participants.length}/10)</span>
        </div>
        <button onClick={() => setOpen(false)} className="p-1 hover:bg-secondary rounded-lg"><X className="h-4 w-4" /></button>
      </div>

      <p className="text-xs text-muted-foreground mb-3">Share a link so friends can add to your cart. You pay for everyone!</p>

      {/* Participants */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {participants.map((p, i) => (
          <span key={i} className="px-2 py-1 rounded-full bg-secondary text-xs text-foreground flex items-center gap-1">
            {p} {i === 0 && <span className="text-primary font-bold">👑</span>}
          </span>
        ))}
      </div>

      {/* Add */}
      <div className="flex gap-2 mb-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addParticipant()}
          placeholder="Add a friend..."
          className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button onClick={addParticipant} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90">
          <UserPlus className="h-4 w-4" />
        </button>
      </div>

      {/* Share */}
      <button onClick={shareLink} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
        {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Share Cart Link"}
      </button>
    </div>
  );
};

export default GroupOrdering;
