import { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, Bookmark, BookmarkCheck, Tag, CreditCard, Smartphone, Banknote, Clock, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const validCoupons: Record<string, number> = {
  FOOD50: 50,
  FREEDEL: 0,
  BIRYANI20: 20,
  WELCOME100: 100,
  DESSERT30: 30,
};

const paymentMethods = [
  { id: "upi", label: "UPI (GPay / PhonePe)", icon: <Smartphone className="h-4 w-4" /> },
  { id: "card", label: "Credit / Debit Card", icon: <CreditCard className="h-4 w-4" /> },
  { id: "cash", label: "Cash on Delivery", icon: <Banknote className="h-4 w-4" /> },
];

const CartDrawer = ({ open, onClose }: Props) => {
  const { items, updateQuantity, removeItem, clearCart, total, count } = useCart();
  const { toast } = useToast();
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("upi");

  // Persist cart to localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("food-cart", JSON.stringify(items));
    }
  }, [items]);

  const toggleSave = (id: string) => {
    setSavedItems((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
    toast({ title: savedItems.includes(id) ? "Moved to cart" : "Saved for later" });
  };

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (validCoupons[code] !== undefined) {
      setAppliedCoupon({ code, discount: validCoupons[code] });
      toast({ title: "🎉 Coupon applied!", description: `${code} - ₹${validCoupons[code]} off` });
    } else {
      toast({ title: "Invalid coupon", description: "Please check the code and try again", variant: "destructive" });
    }
  };

  const removeCoupon = () => { setAppliedCoupon(null); setCouponCode(""); };

  const deliveryFee = total > 299 ? 0 : 40;
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const grandTotal = Math.max(0, total - discount + deliveryFee);
  const estimatedTime = items.length > 0 ? `${20 + items.length * 3}-${30 + items.length * 3} min` : "--";

  if (!open) return null;

  const activeItems = items.filter((i) => !savedItems.includes(i.id));
  const saved = items.filter((i) => savedItems.includes(i.id));

  return (
    <>
      <div className="fixed inset-0 z-50 bg-foreground/40 animate-fade-in" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-bold text-lg text-foreground">Your Cart</h2>
            <span className="text-sm text-muted-foreground">({count} items)</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add items from a restaurant to start your order</p>
            </div>
          ) : (
            <>
              {/* Active Items */}
              {activeItems.length > 0 && (
                <div className="space-y-3 mb-4">
                  {activeItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-secondary/50">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.restaurant}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-foreground text-sm">₹{item.price * item.quantity}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center hover:bg-secondary">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-semibold text-foreground w-5 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded bg-primary flex items-center justify-center hover:bg-primary/90">
                              <Plus className="h-3 w-3 text-primary-foreground" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 self-start">
                        <button onClick={() => toggleSave(item.id)} className="p-1 text-muted-foreground hover:text-zomato-gold transition-colors" aria-label="Save for later" title="Save for later">
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove item">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Saved for Later */}
              {saved.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Saved for Later ({saved.length})</p>
                  <div className="space-y-2">
                    {saved.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-dashed border-border">
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">₹{item.price}</p>
                        </div>
                        <button onClick={() => toggleSave(item.id)} className="p-1.5 text-zomato-gold hover:text-primary transition-colors" title="Move to cart">
                          <BookmarkCheck className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Coupon Code */}
              <div className="mb-4 p-3 rounded-xl border border-border bg-card">
                <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                  <Tag className="h-4 w-4 text-primary" /> Apply Coupon
                </div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-primary/5 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-zomato-green" />
                      <span className="text-sm font-mono font-bold text-primary">{appliedCoupon.code}</span>
                      <span className="text-xs text-zomato-green">-₹{appliedCoupon.discount}</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-destructive hover:underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    />
                    <button onClick={applyCoupon} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90">Apply</button>
                  </div>
                )}
              </div>

              {/* Delivery Time */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border mb-4">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Delivery</p>
                  <p className="text-sm font-semibold text-foreground">{estimatedTime}</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-3 rounded-xl border border-border bg-card mb-2">
                <p className="text-sm font-semibold text-foreground mb-2">Payment Method</p>
                <div className="space-y-1.5">
                  {paymentMethods.map((pm) => (
                    <label key={pm.id} className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${selectedPayment === pm.id ? "bg-primary/5 border border-primary/30" : "hover:bg-secondary border border-transparent"}`}>
                      <input type="radio" name="payment" value={pm.id} checked={selectedPayment === pm.id} onChange={() => setSelectedPayment(pm.id)} className="accent-primary" />
                      {pm.icon}
                      <span className="text-sm text-foreground">{pm.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">₹{total}</span></div>
              {discount > 0 && <div className="flex justify-between text-zomato-green"><span>Discount</span><span>-₹{discount}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className={deliveryFee === 0 ? "text-zomato-green" : "text-foreground"}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span></div>
              <div className="flex justify-between font-bold text-foreground border-t border-border pt-2 mt-1">
                <span>Total</span><span className="text-lg">₹{grandTotal}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={clearCart} className="px-4 py-3 rounded-xl border border-border text-sm text-destructive hover:bg-secondary transition-colors">Clear</button>
              <button className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
                Pay ₹{grandTotal}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
