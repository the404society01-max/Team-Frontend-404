import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CartDrawer = ({ open, onClose }: Props) => {
  const { items, updateQuantity, removeItem, clearCart, total, count } = useCart();

  if (!open) return null;

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
            <div className="space-y-4">
              {items.map((item) => (
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
                  <button onClick={() => removeItem(item.id)} className="self-start p-1 text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove item">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-3">
            <div className="flex items-center justify-between">
              <button onClick={clearCart} className="text-sm text-destructive hover:underline">Clear cart</button>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Total (taxes extra)</p>
                <p className="text-xl font-bold text-foreground">₹{total}</p>
              </div>
            </div>
            <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
