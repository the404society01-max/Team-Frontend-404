export type DietType = "veg" | "non-veg" | "vegan";
export type SpiceLevel = "mild" | "medium" | "spicy";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "starters" | "mains" | "desserts" | "beverages";
  diet: DietType;
  spice?: SpiceLevel;
  popular?: boolean;
}

import foodStarters from "@/assets/food-starters.jpg";
import foodMain from "@/assets/food-main.jpg";
import foodDessert from "@/assets/food-dessert.jpg";
import foodBeverages from "@/assets/food-beverages.jpg";

export const menuItems: MenuItem[] = [
  { id: "1", name: "Truffle Mushroom Bruschetta", description: "Toasted sourdough with wild mushrooms, truffle oil, and aged parmesan", price: 14, image: foodStarters, category: "starters", diet: "veg", spice: "mild", popular: true },
  { id: "2", name: "Spicy Prawn Tempura", description: "Tiger prawns in light crispy batter with sweet chili dipping sauce", price: 18, image: foodStarters, category: "starters", diet: "non-veg", spice: "spicy" },
  { id: "3", name: "Beetroot Carpaccio", description: "Thinly sliced roasted beetroot with goat cheese mousse and walnut crumble", price: 12, image: foodStarters, category: "starters", diet: "veg", spice: "mild" },
  { id: "4", name: "Vegan Spring Rolls", description: "Crispy rolls filled with seasonal vegetables and served with ponzu sauce", price: 11, image: foodStarters, category: "starters", diet: "vegan", spice: "mild" },
  { id: "5", name: "Grilled Wagyu Ribeye", description: "Premium wagyu beef with roasted vegetables and red wine jus", price: 48, image: foodMain, category: "mains", diet: "non-veg", spice: "mild", popular: true },
  { id: "6", name: "Pan-Seared Salmon", description: "Atlantic salmon with asparagus purée, cherry tomatoes, and lemon butter", price: 32, image: foodMain, category: "mains", diet: "non-veg", spice: "mild" },
  { id: "7", name: "Wild Mushroom Risotto", description: "Arborio rice with porcini, shiitake, and oyster mushrooms in truffle cream", price: 26, image: foodMain, category: "mains", diet: "veg", spice: "mild", popular: true },
  { id: "8", name: "Spiced Lamb Shank", description: "Slow-braised lamb shank with saffron couscous and harissa yogurt", price: 36, image: foodMain, category: "mains", diet: "non-veg", spice: "spicy" },
  { id: "9", name: "Chocolate Lava Fondant", description: "Warm dark chocolate cake with a molten center, served with vanilla gelato", price: 14, image: foodDessert, category: "desserts", diet: "veg", popular: true },
  { id: "10", name: "Crème Brûlée", description: "Classic vanilla custard with caramelized sugar crust and fresh berries", price: 12, image: foodDessert, category: "desserts", diet: "veg" },
  { id: "11", name: "Vegan Coconut Panna Cotta", description: "Silky coconut cream dessert with mango coulis and passion fruit", price: 13, image: foodDessert, category: "desserts", diet: "vegan" },
  { id: "12", name: "Signature Espresso Martini", description: "Premium vodka shaken with fresh espresso and coffee liqueur", price: 16, image: foodBeverages, category: "beverages", diet: "veg" },
  { id: "13", name: "Fresh Mango Lassi", description: "Creamy yogurt blend with alphonso mango and a hint of cardamom", price: 8, image: foodBeverages, category: "beverages", diet: "veg" },
  { id: "14", name: "Craft Elderflower Spritz", description: "Sparkling elderflower tonic with cucumber and fresh mint", price: 10, image: foodBeverages, category: "beverages", diet: "vegan" },
];

export const categories = [
  { key: "all", label: "All" },
  { key: "starters", label: "Starters" },
  { key: "mains", label: "Main Course" },
  { key: "desserts", label: "Desserts" },
  { key: "beverages", label: "Beverages" },
] as const;
