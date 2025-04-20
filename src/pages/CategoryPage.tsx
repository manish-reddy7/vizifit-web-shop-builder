import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, ShoppingCart, Menu } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
};

// Sample product data - in a real app, this would come from an API
const allProducts: Product[] = [
  {
    id: 1,
    name: "Summer Floral Dress",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1515372039744-b13f739c273a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    category: "women",
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    category: "men",
  },
  {
    id: 3,
    name: "Striped Cotton T-Shirt",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    category: "kids",
  },
  {
    id: 4,
    name: "High-Rise Slim Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1604176424619-ec9c5df513ee?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    category: "women",
  },
  {
    id: 5,
    name: "Casual Oxford Shirt",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    category: "men",
  },
  {
    id: 6,
    name: "Colorful Kids Hoodie",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400",
    category: "kids",
  },
];

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  // Filter products based on the category
  const filteredProducts = allProducts.filter(
    product => product.category === categoryId
  );

  // Format category name for display (capitalize first letter)
  const formattedCategoryName = categoryId 
    ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1)
    : "Products";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header (same as on Index page) */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-primary">
              VIZIFIT
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/category/women" className="text-sm font-medium hover:text-primary">
                Women
              </Link>
              <Link to="/category/men" className="text-sm font-medium hover:text-primary">
                Men
              </Link>
              <Link to="/category/kids" className="text-sm font-medium hover:text-primary">
                Kids
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="p-2 rounded-full hover:bg-gray-100">
                <User size={20} />
              </Link>
              <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100">
                <ShoppingCart size={20} />
              </Link>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Category Title and Back Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">{formattedCategoryName}'s Collection</h1>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                  <div className="mt-3">
                    <Button className="w-full">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">VIZIFIT</h3>
              <p className="text-gray-400">Your one-stop fashion destination for women, men, and kids.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/category/women" className="hover:text-white">Women</Link></li>
                <li><Link to="/category/men" className="hover:text-white">Men</Link></li>
                <li><Link to="/category/kids" className="hover:text-white">Kids</Link></li>
                <li><Link to="/" className="hover:text-white">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-white">FAQs</Link></li>
                <li><Link to="/" className="hover:text-white">Shipping & Returns</Link></li>
                <li><Link to="/" className="hover:text-white">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.045-1.064.218-1.504.344-1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} VIZIFIT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
