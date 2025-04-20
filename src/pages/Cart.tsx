
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// Sample cart items - in a real app, this would be managed with state management
const initialCartItems = [
  {
    id: 1,
    name: "Summer Floral Dress",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1515372039744-b13f739c273a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 79.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = React.useState(initialCartItems);
  const [promoCode, setPromoCode] = React.useState("");

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0; // Free shipping over $100
  const total = subtotal + shipping;

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "discount") {
      toast.success("Promo code applied! 10% discount");
    } else {
      toast.error("Invalid promo code");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Simple Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-primary">
              VIZIFIT
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold flex items-center">
            <ShoppingCart className="mr-2" /> Your Cart
          </h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2" size={16} />
              Continue Shopping
            </Link>
          </Button>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4 gap-4">
                  {/* Product Image */}
                  <div className="w-full sm:w-24 h-24 overflow-hidden rounded">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Unit Price: ${item.price.toFixed(2)}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Price and Remove */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between mt-2 sm:mt-0">
                    <span className="font-semibold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="flex mt-4 mb-6">
                <Input 
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="rounded-r-none"
                />
                <Button onClick={applyPromoCode} className="rounded-l-none">
                  Apply
                </Button>
              </div>
              
              <Button className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link to="/">Start Shopping</Link>
            </Button>
          </div>
        )}
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} VIZIFIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
