import dishBiryani from "@/assets/dish-biryani.jpg";
import dishPizza from "@/assets/dish-pizza.jpg";
import dishChinese from "@/assets/dish-chinese.jpg";
import dishSouthIndian from "@/assets/dish-southindian.jpg";
import dishHealthy from "@/assets/dish-healthy.jpg";
import dishBurger from "@/assets/dish-burger.jpg";
import dishNorthIndian from "@/assets/dish-northindian.jpg";
import foodStarters from "@/assets/food-starters.jpg";
import foodMain from "@/assets/food-main.jpg";
import foodDessert from "@/assets/food-dessert.jpg";
import foodBeverages from "@/assets/food-beverages.jpg";

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisines: string[];
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  discount?: string;
  promoted?: boolean;
  veg?: boolean;
}

export interface Dish {
  id: string;
  name: string;
  restaurant: string;
  restaurantId: string;
  image: string;
  price: number;
  rating: number;
  veg: boolean;
  description: string;
}

export interface Category {
  name: string;
  image: string;
}

export const cities = [
  "Shivamogga, Karnataka",
  "Bengaluru",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Jaipur",
  "Ahmedabad",
  "Kochi",
  "Mysuru",
  "Mangalore",
  "Hubli-Dharwad",
];

export const categories: Category[] = [
  { name: "Biryani", image: dishBiryani },
  { name: "Pizza", image: dishPizza },
  { name: "Chinese", image: dishChinese },
  { name: "South Indian", image: dishSouthIndian },
  { name: "Healthy", image: dishHealthy },
  { name: "Burger", image: dishBurger },
  { name: "North Indian", image: dishNorthIndian },
  { name: "Desserts", image: foodDessert },
  { name: "Beverages", image: foodBeverages },
  { name: "Starters", image: foodStarters },
];

export const restaurants: Restaurant[] = [
  { id: "r1", name: "Meghana Foods", image: dishBiryani, cuisines: ["Biryani", "North Indian", "Chinese"], rating: 4.5, deliveryTime: "25-30 min", priceForTwo: 500, discount: "50% OFF up to ₹100", promoted: true },
  { id: "r2", name: "Pizza Hut", image: dishPizza, cuisines: ["Pizza", "Italian", "Fast Food"], rating: 4.1, deliveryTime: "30-35 min", priceForTwo: 600, discount: "₹125 OFF ABOVE ₹249" },
  { id: "r3", name: "Wok Express", image: dishChinese, cuisines: ["Chinese", "Thai", "Asian"], rating: 4.3, deliveryTime: "20-25 min", priceForTwo: 400, discount: "20% OFF" },
  { id: "r4", name: "Dosa Plaza", image: dishSouthIndian, cuisines: ["South Indian", "Dosa", "Idli"], rating: 4.2, deliveryTime: "15-20 min", priceForTwo: 300, veg: true },
  { id: "r5", name: "Green Bowl", image: dishHealthy, cuisines: ["Healthy", "Salads", "Bowls"], rating: 4.6, deliveryTime: "25-30 min", priceForTwo: 550, veg: true, promoted: true, discount: "FREE DELIVERY" },
  { id: "r6", name: "Burger King", image: dishBurger, cuisines: ["Burger", "Fast Food", "American"], rating: 4.0, deliveryTime: "20-25 min", priceForTwo: 350, discount: "40% OFF up to ₹80" },
  { id: "r7", name: "Punjab Grill", image: dishNorthIndian, cuisines: ["North Indian", "Mughlai", "Kebabs"], rating: 4.4, deliveryTime: "30-40 min", priceForTwo: 800 },
  { id: "r8", name: "Empire Restaurant", image: foodMain, cuisines: ["Biryani", "Kebabs", "North Indian"], rating: 4.3, deliveryTime: "25-35 min", priceForTwo: 450, discount: "30% OFF up to ₹75", promoted: true },
  { id: "r9", name: "Cafe Coffee Day", image: foodBeverages, cuisines: ["Beverages", "Cafe", "Snacks"], rating: 3.9, deliveryTime: "15-20 min", priceForTwo: 400 },
  { id: "r10", name: "Truffles", image: dishBurger, cuisines: ["Burger", "American", "Continental"], rating: 4.5, deliveryTime: "30-35 min", priceForTwo: 700, discount: "₹50 OFF ABOVE ₹199" },
  { id: "r11", name: "A2B - Adyar Ananda Bhavan", image: dishSouthIndian, cuisines: ["South Indian", "Sweets", "North Indian"], rating: 4.2, deliveryTime: "20-30 min", priceForTwo: 350, veg: true },
  { id: "r12", name: "Domino's Pizza", image: dishPizza, cuisines: ["Pizza", "Italian", "Pasta"], rating: 4.0, deliveryTime: "25-30 min", priceForTwo: 500, discount: "60% OFF up to ₹120" },
  { id: "r13", name: "Behrouz Biryani", image: dishBiryani, cuisines: ["Biryani", "Mughlai", "North Indian"], rating: 4.4, deliveryTime: "35-40 min", priceForTwo: 650, discount: "₹150 OFF ABOVE ₹499" },
  { id: "r14", name: "McDonald's", image: dishBurger, cuisines: ["Burger", "Fast Food", "American"], rating: 4.1, deliveryTime: "15-20 min", priceForTwo: 400, discount: "Buy 1 Get 1 FREE" },
  { id: "r15", name: "Barbeque Nation", image: dishNorthIndian, cuisines: ["North Indian", "BBQ", "Kebabs"], rating: 4.5, deliveryTime: "40-50 min", priceForTwo: 1200, promoted: true },
  { id: "r16", name: "Sagar Ratna", image: dishSouthIndian, cuisines: ["South Indian", "North Indian", "Chinese"], rating: 4.0, deliveryTime: "20-30 min", priceForTwo: 400, veg: true },
  { id: "r17", name: "Chai Point", image: foodBeverages, cuisines: ["Beverages", "Snacks", "Cafe"], rating: 4.2, deliveryTime: "10-15 min", priceForTwo: 200, discount: "FREE DELIVERY" },
  { id: "r18", name: "Faasos - Wraps & Rolls", image: dishNorthIndian, cuisines: ["North Indian", "Fast Food", "Wraps"], rating: 4.0, deliveryTime: "20-25 min", priceForTwo: 300, discount: "₹75 OFF ABOVE ₹199" },
  { id: "r19", name: "Baskin Robbins", image: foodDessert, cuisines: ["Desserts", "Ice Cream"], rating: 4.3, deliveryTime: "15-25 min", priceForTwo: 450, veg: true },
  { id: "r20", name: "Panda Chinese", image: dishChinese, cuisines: ["Chinese", "Thai", "Momos"], rating: 3.8, deliveryTime: "25-30 min", priceForTwo: 350, discount: "30% OFF" },
  { id: "r21", name: "Theobroma", image: foodDessert, cuisines: ["Desserts", "Bakery", "Cafe"], rating: 4.6, deliveryTime: "20-30 min", priceForTwo: 500, promoted: true },
  { id: "r22", name: "Haldiram's", image: dishNorthIndian, cuisines: ["North Indian", "Sweets", "Starters"], rating: 4.1, deliveryTime: "20-25 min", priceForTwo: 350, veg: true, discount: "20% OFF" },
  { id: "r23", name: "KFC", image: dishBurger, cuisines: ["Burger", "Fast Food", "American"], rating: 4.0, deliveryTime: "20-30 min", priceForTwo: 500, discount: "₹100 OFF ABOVE ₹399" },
  { id: "r24", name: "Subway", image: dishHealthy, cuisines: ["Healthy", "Fast Food", "Wraps"], rating: 3.9, deliveryTime: "15-20 min", priceForTwo: 400 },
];

export const dishes: Dish[] = [
  { id: "d1", name: "Chicken Biryani", restaurant: "Meghana Foods", restaurantId: "r1", image: dishBiryani, price: 249, rating: 4.5, veg: false, description: "Aromatic basmati rice cooked with tender chicken pieces, saffron, and traditional spices" },
  { id: "d2", name: "Margherita Pizza", restaurant: "Pizza Hut", restaurantId: "r2", image: dishPizza, price: 199, rating: 4.2, veg: true, description: "Classic pizza with fresh mozzarella, tomato sauce, and basil on a thin crust" },
  { id: "d3", name: "Hakka Noodles", restaurant: "Wok Express", restaurantId: "r3", image: dishChinese, price: 179, rating: 4.3, veg: false, description: "Stir-fried noodles with vegetables, soy sauce, and Indo-Chinese spices" },
  { id: "d4", name: "Masala Dosa", restaurant: "Dosa Plaza", restaurantId: "r4", image: dishSouthIndian, price: 99, rating: 4.4, veg: true, description: "Crispy rice crepe filled with spiced potato filling, served with sambar and chutney" },
  { id: "d5", name: "Quinoa Power Bowl", restaurant: "Green Bowl", restaurantId: "r5", image: dishHealthy, price: 349, rating: 4.6, veg: true, description: "Nutritious quinoa bowl with avocado, roasted vegetables, and tahini dressing" },
  { id: "d6", name: "Whopper Burger", restaurant: "Burger King", restaurantId: "r6", image: dishBurger, price: 189, rating: 4.1, veg: false, description: "Flame-grilled beef patty with lettuce, tomato, onion, and special sauce" },
  { id: "d7", name: "Butter Chicken", restaurant: "Punjab Grill", restaurantId: "r7", image: dishNorthIndian, price: 329, rating: 4.5, veg: false, description: "Tender chicken in rich tomato-butter gravy with cream and kasuri methi" },
  { id: "d8", name: "Gulab Jamun", restaurant: "A2B", restaurantId: "r11", image: foodDessert, price: 79, rating: 4.3, veg: true, description: "Soft milk dumplings soaked in rose-cardamom flavored sugar syrup" },
  { id: "d9", name: "Paneer Tikka", restaurant: "Punjab Grill", restaurantId: "r7", image: dishNorthIndian, price: 269, rating: 4.4, veg: true, description: "Marinated cottage cheese cubes grilled in tandoor with bell peppers and onions" },
  { id: "d10", name: "Chicken Momos", restaurant: "Panda Chinese", restaurantId: "r20", image: dishChinese, price: 149, rating: 4.2, veg: false, description: "Steamed dumplings filled with spiced minced chicken, served with spicy chutney" },
  { id: "d11", name: "Veg Fried Rice", restaurant: "Wok Express", restaurantId: "r3", image: dishChinese, price: 159, rating: 4.0, veg: true, description: "Wok-tossed rice with mixed vegetables, soy sauce, and aromatic seasonings" },
  { id: "d12", name: "Pepperoni Pizza", restaurant: "Domino's Pizza", restaurantId: "r12", image: dishPizza, price: 349, rating: 4.3, veg: false, description: "Loaded with spicy pepperoni slices on a cheesy base with tangy tomato sauce" },
  { id: "d13", name: "Chole Bhature", restaurant: "Haldiram's", restaurantId: "r22", image: dishNorthIndian, price: 149, rating: 4.2, veg: true, description: "Fluffy deep-fried bread served with spicy chickpea curry and pickled onion" },
  { id: "d14", name: "Mutton Biryani", restaurant: "Behrouz Biryani", restaurantId: "r13", image: dishBiryani, price: 399, rating: 4.6, veg: false, description: "Royal Mughlai biryani with slow-cooked mutton, saffron rice, and aromatic spices" },
  { id: "d15", name: "Brownie Sundae", restaurant: "Theobroma", restaurantId: "r21", image: foodDessert, price: 199, rating: 4.7, veg: true, description: "Warm chocolate brownie topped with vanilla ice cream, hot fudge, and whipped cream" },
  { id: "d16", name: "McChicken Burger", restaurant: "McDonald's", restaurantId: "r14", image: dishBurger, price: 149, rating: 4.0, veg: false, description: "Crispy chicken patty with lettuce and creamy mayo in a sesame seed bun" },
  { id: "d17", name: "Masala Chai", restaurant: "Chai Point", restaurantId: "r17", image: foodBeverages, price: 49, rating: 4.3, veg: true, description: "Authentic Indian spiced tea brewed with fresh ginger, cardamom, and cloves" },
  { id: "d18", name: "Idli Sambar", restaurant: "Sagar Ratna", restaurantId: "r16", image: dishSouthIndian, price: 89, rating: 4.1, veg: true, description: "Soft steamed rice cakes served with lentil sambar and coconut chutney" },
  { id: "d19", name: "Chicken Wrap", restaurant: "Faasos", restaurantId: "r18", image: dishNorthIndian, price: 139, rating: 4.0, veg: false, description: "Grilled chicken strips wrapped in soft tortilla with veggies and chipotle sauce" },
  { id: "d20", name: "Cold Coffee", restaurant: "Cafe Coffee Day", restaurantId: "r9", image: foodBeverages, price: 159, rating: 4.1, veg: true, description: "Chilled blended coffee with milk, cream, and a hint of vanilla sweetness" },
];

export const reviews = [
  { user: "Rahul S.", rating: 5, text: "Amazing biryani! Best I've had in Shivamogga. The spices are perfectly balanced.", date: "2 days ago" },
  { user: "Priya M.", rating: 4, text: "Great food quality and quick delivery. The packaging was neat and fresh.", date: "1 week ago" },
  { user: "Karthik R.", rating: 5, text: "Butter chicken was absolutely divine. Will order again for sure!", date: "3 days ago" },
  { user: "Sneha L.", rating: 4, text: "Good variety of healthy options. The quinoa bowl is my go-to lunch.", date: "5 days ago" },
  { user: "Vikram P.", rating: 3, text: "Food was decent but delivery took a bit longer than expected.", date: "1 week ago" },
  { user: "Ananya K.", rating: 5, text: "The momos from Panda Chinese are absolutely addictive! Must try.", date: "3 days ago" },
  { user: "Deepak R.", rating: 4, text: "Theobroma brownies never disappoint. Perfect dessert after dinner.", date: "4 days ago" },
  { user: "Meera S.", rating: 5, text: "Behrouz mutton biryani is royal! Rich flavors and generous portions.", date: "1 day ago" },
];
