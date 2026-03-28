import { useState } from "react";
import type { CartItem, FilterType, MenuItem } from "@/components/menu/types";
import { MENU } from "@/components/menu/data";
import Header from "@/components/menu/Header";
import HeroSection from "@/components/menu/HeroSection";
import MenuGrid from "@/components/menu/MenuGrid";
import CartSidebar from "@/components/menu/CartSidebar";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MENU.filter((item) => {
    const matchCat = activeCategory === "Все" || item.category === activeCategory;
    const matchFilter =
      activeFilter === "all" ||
      (activeFilter === "spicy" && item.spicy) ||
      (activeFilter === "popular" && item.popular);
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchFilter && matchSearch;
  });

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map((c) => c.id === id ? { ...c, quantity: c.quantity - 1 } : c);
      }
      return prev.filter((c) => c.id !== id);
    });
  };

  const getCartQty = (id: number) => cart.find((c) => c.id === id)?.quantity || 0;

  const handleOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => {
      setOrderPlaced(false);
      setCartOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background font-body relative overflow-x-hidden">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, hsl(43,74%,54%) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, hsl(43,74%,54%) 0%, transparent 70%)" }}
        />
      </div>

      <Header
        totalItems={totalItems}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartOpen={() => setCartOpen(true)}
      />

      <HeroSection />

      <MenuGrid
        items={filtered}
        activeCategory={activeCategory}
        activeFilter={activeFilter}
        searchQuery={searchQuery}
        onCategoryChange={setActiveCategory}
        onFilterChange={setActiveFilter}
        onSearchChange={setSearchQuery}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        getCartQty={getCartQty}
      />

      <CartSidebar
        cart={cart}
        cartOpen={cartOpen}
        orderPlaced={orderPlaced}
        totalItems={totalItems}
        totalPrice={totalPrice}
        onClose={() => setCartOpen(false)}
        onOpen={() => setCartOpen(true)}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onOrder={handleOrder}
      />

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐉</span>
            <span className="font-display gold-text text-lg">Дракон</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-body">
            <span>📞 +7 (999) 123-45-67</span>
            <span>🕐 10:00 – 23:00</span>
          </div>
          <p className="text-xs text-muted-foreground font-body">© 2024 Дракон</p>
        </div>
      </footer>
    </div>
  );
}
