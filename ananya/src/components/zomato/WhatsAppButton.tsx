import { MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "919876543210";

const WhatsAppButton = () => {
  const { items, total } = useCart();

  const handleClick = () => {
    let message = "Hi! I'd like to place an order from FOOD:\n\n";
    if (items.length > 0) {
      items.forEach((item) => {
        message += `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
      });
      message += `\nTotal: ₹${total}\n`;
      message += "Please confirm availability and delivery time.";
    } else {
      message += "I'd like to browse the menu and place an order. Please share the latest menu.";
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[hsl(142,70%,45%)] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Order via WhatsApp"
      title="Order via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 fill-current" />
      {items.length > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
          {items.length}
        </span>
      )}
    </button>
  );
};

export default WhatsAppButton;
