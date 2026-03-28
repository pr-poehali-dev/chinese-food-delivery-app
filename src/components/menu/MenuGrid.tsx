import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import type { MenuItem, FilterType } from "./types";
import { CATEGORIES } from "./data";

interface MenuGridProps {
  items: MenuItem[];
  activeCategory: string;
  activeFilter: FilterType;
  searchQuery: string;
  onCategoryChange: (cat: string) => void;
  onFilterChange: (filter: FilterType) => void;
  onSearchChange: (value: string) => void;
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (id: number) => void;
  getCartQty: (id: number) => number;
}

export default function MenuGrid({
  items,
  activeCategory,
  activeFilter,
  searchQuery,
  onCategoryChange,
  onFilterChange,
  onSearchChange,
  onAddToCart,
  onRemoveFromCart,
  getCartQty,
}: MenuGridProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    setVisibleItems([]);
    const timers = items.map((item, i) =>
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, item.id]);
      }, i * 60)
    );
    return () => timers.forEach(clearTimeout);
  }, [items]);

  return (
    <>
      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 font-body ${
                  activeCategory === cat
                    ? "btn-gold"
                    : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="w-px h-5 bg-border mx-1 shrink-0" />
            <button
              onClick={() => onFilterChange(activeFilter === "spicy" ? "all" : "spicy")}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 font-body ${
                activeFilter === "spicy"
                  ? "btn-gold"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              🌶️ Острое
            </button>
            <button
              onClick={() => onFilterChange(activeFilter === "popular" ? "all" : "popular")}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 font-body ${
                activeFilter === "popular"
                  ? "btn-gold"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              ⭐ Хиты
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Mobile Search */}
        <div className="sm:hidden mb-6 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5 border border-border">
          <Icon name="Search" size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Найти блюдо..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground w-full font-body"
          />
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="font-display text-xl">Ничего не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => {
              const qty = getCartQty(item.id);
              const isVisible = visibleItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-card border border-border rounded-xl overflow-hidden card-hover group transition-opacity duration-300 ${
                    isVisible ? "opacity-100 animate-fade-in-up" : "opacity-0"
                  }`}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 flex gap-1.5">
                      {item.popular && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full btn-gold font-body">
                          Хит
                        </span>
                      )}
                      {item.spicy && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-900/80 text-red-200 font-body">
                          🌶️ Острое
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <span className="text-xs text-white/60 bg-black/40 px-2 py-0.5 rounded-full font-body">
                        {item.weight}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-foreground leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2 font-body">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-semibold gold-text">
                        {item.price.toLocaleString("ru-RU")} ₽
                      </span>

                      {qty === 0 ? (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="btn-gold px-4 py-1.5 rounded-lg text-sm flex items-center gap-1.5"
                        >
                          <Icon name="Plus" size={14} />
                          В корзину
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRemoveFromCart(item.id)}
                            className="w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-[hsl(var(--gold)/0.4)] transition-colors"
                          >
                            <Icon name="Minus" size={12} className="text-foreground" />
                          </button>
                          <span className="font-body text-sm font-semibold text-foreground w-5 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => onAddToCart(item)}
                            className="w-7 h-7 rounded-lg btn-gold flex items-center justify-center"
                          >
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
