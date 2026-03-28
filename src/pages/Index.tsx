import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  spicy?: boolean;
  popular?: boolean;
  weight: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const MENU: MenuItem[] = [
  {
    id: 1,
    name: "Утка по-пекински",
    description: "Хрустящая кожа, нежное мясо, блинчики мандарин, соус хойсин",
    price: 1490,
    category: "Горячее",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/b0ee820c-26d4-46af-8c83-71fbd07c85f1.jpg",
    popular: true,
    weight: "680 г",
  },
  {
    id: 2,
    name: "Дим-сам ассорти",
    description: "Восемь видов паровых пельменей с морепродуктами и мясом",
    price: 890,
    category: "Закуски",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/d9635336-9f92-4e54-a2e2-620f5f55af8c.jpg",
    popular: true,
    weight: "320 г",
  },
  {
    id: 3,
    name: "Острый хот-пот",
    description: "Пряный бульон с говядиной вагю, морепродуктами и грибами",
    price: 1290,
    category: "Горячее",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/8101dc8a-496a-4c68-b290-e60701883dc6.jpg",
    spicy: true,
    weight: "900 г",
  },
  {
    id: 4,
    name: "Лапша вок с креветками",
    description: "Яичная лапша, тигровые креветки, бок-чой, устричный соус",
    price: 790,
    category: "Лапша и рис",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/6a050aab-5a01-488a-8d30-41e470ae5d96.jpg",
    weight: "420 г",
  },
  {
    id: 5,
    name: "Свинина кисло-сладкая",
    description: "Нежная свинина во фритюре, болгарский перец, ананас",
    price: 690,
    category: "Горячее",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/b0ee820c-26d4-46af-8c83-71fbd07c85f1.jpg",
    weight: "380 г",
  },
  {
    id: 6,
    name: "Жареный рис с яйцом",
    description: "Рис на сковороде вок, яйцо, зелёный лук, соевый соус",
    price: 450,
    category: "Лапша и рис",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/6a050aab-5a01-488a-8d30-41e470ae5d96.jpg",
    weight: "350 г",
  },
  {
    id: 7,
    name: "Пельмени цзяоцзы",
    description: "Паровые пельмени со свининой и имбирём, соус чили",
    price: 520,
    category: "Закуски",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/d9635336-9f92-4e54-a2e2-620f5f55af8c.jpg",
    spicy: true,
    weight: "260 г",
  },
  {
    id: 8,
    name: "Говядина с устрицей",
    description: "Тонкие ломтики говядины с брокколи в устричном соусе",
    price: 890,
    category: "Горячее",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/8101dc8a-496a-4c68-b290-e60701883dc6.jpg",
    weight: "400 г",
  },
  {
    id: 9,
    name: "Суп с тофу и вакаме",
    description: "Традиционный бульон, мягкий тофу, водоросли вакаме",
    price: 320,
    category: "Супы",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/8101dc8a-496a-4c68-b290-e60701883dc6.jpg",
    weight: "300 мл",
  },
  {
    id: 10,
    name: "Том-ям с морепродуктами",
    description: "Острый суп с кокосовым молоком, кальмаром и мидиями",
    price: 620,
    category: "Супы",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/8101dc8a-496a-4c68-b290-e60701883dc6.jpg",
    spicy: true,
    weight: "350 мл",
  },
  {
    id: 11,
    name: "Чай пуэр",
    description: "Выдержанный прессованный чай с глубоким землистым вкусом",
    price: 280,
    category: "Напитки",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/d9635336-9f92-4e54-a2e2-620f5f55af8c.jpg",
    weight: "300 мл",
  },
  {
    id: 12,
    name: "Личи с мятой",
    description: "Свежие личи с мятным сиропом и колотым льдом",
    price: 350,
    category: "Напитки",
    image: "https://cdn.poehali.dev/projects/179fc1f2-05cc-4608-998f-952658d5956d/files/d9635336-9f92-4e54-a2e2-620f5f55af8c.jpg",
    weight: "350 мл",
  },
];

const CATEGORIES = ["Все", "Горячее", "Закуски", "Лапша и рис", "Супы", "Напитки"];

type FilterType = "all" | "spicy" | "popular";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const filtered = MENU.filter((item) => {
    const matchCat = activeCategory === "Все" || item.category === activeCategory;
    const matchFilter =
      activeFilter === "all" ||
      (activeFilter === "spicy" && item.spicy) ||
      (activeFilter === "popular" && item.popular);
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchFilter && matchSearch;
  });

  useEffect(() => {
    setVisibleItems([]);
    const timers = filtered.map((item, i) =>
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, item.id]);
      }, i * 60)
    );
    return () => timers.forEach(clearTimeout);
  }, [activeCategory, activeFilter, searchQuery]);

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

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐉</span>
            <div>
              <h1 className="font-display text-xl font-semibold leading-none gold-text tracking-wide">
                Дракон
              </h1>
              <p className="text-xs text-muted-foreground font-body tracking-widest uppercase">
                Китайская кухня
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 w-64 border border-border">
            <Icon name="Search" size={14} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Найти блюдо..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground w-full font-body"
            />
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 btn-gold px-4 py-2 rounded-lg text-sm font-semibold"
          >
            <Icon name="ShoppingBag" size={16} />
            <span className="hidden sm:inline">Корзина</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-background text-[hsl(var(--gold))] text-xs flex items-center justify-center font-bold border border-[hsl(var(--gold))]">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="relative z-10">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3 animate-fade-in-up stagger-1">
              Доставка от 45 минут
            </p>
            <h2 className="font-display text-5xl sm:text-7xl font-light leading-none mb-4 animate-fade-in-up stagger-2">
              <span className="gold-gradient">Искусство</span>
              <br />
              <span className="text-foreground">китайской кухни</span>
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed animate-fade-in-up stagger-3 font-body">
              Традиционные рецепты, отборные ингредиенты, доставка прямо к вашему столу
            </p>
            <div className="flex items-center gap-6 mt-8 animate-fade-in-up stagger-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} className="gold-text" />
                <span>45–60 мин</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Star" size={14} className="gold-text" />
                <span>4.9 рейтинг</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Package" size={14} className="gold-text" />
                <span>Бесплатно от 800 ₽</span>
              </div>
            </div>
          </div>
          <div className="absolute right-8 top-0 bottom-0 items-center opacity-5 pointer-events-none select-none hidden lg:flex">
            <span className="font-display text-[200px] leading-none gold-text">龍</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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
              onClick={() => setActiveFilter(activeFilter === "spicy" ? "all" : "spicy")}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 font-body ${
                activeFilter === "spicy"
                  ? "btn-gold"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              🌶️ Острое
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === "popular" ? "all" : "popular")}
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

      {/* Menu Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="sm:hidden mb-6 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5 border border-border">
          <Icon name="Search" size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Найти блюдо..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground w-full font-body"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="font-display text-xl">Ничего не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item) => {
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
                          onClick={() => addToCart(item)}
                          className="btn-gold px-4 py-1.5 rounded-lg text-sm flex items-center gap-1.5"
                        >
                          <Icon name="Plus" size={14} />
                          В корзину
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-[hsl(var(--gold)/0.4)] transition-colors"
                          >
                            <Icon name="Minus" size={12} className="text-foreground" />
                          </button>
                          <span className="font-body text-sm font-semibold text-foreground w-5 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
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

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col animate-slide-in-right shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div>
                <h2 className="font-display text-2xl gold-text">Корзина</h2>
                <p className="text-xs text-muted-foreground font-body">
                  {totalItems}{" "}
                  {totalItems === 1 ? "позиция" : totalItems < 5 ? "позиции" : "позиций"}
                </p>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center hover:border-[hsl(var(--gold)/0.3)] transition-colors"
              >
                <Icon name="X" size={14} className="text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {orderPlaced ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="text-6xl">🎉</div>
                  <h3 className="font-display text-2xl gold-text">Заказ принят!</h3>
                  <p className="text-muted-foreground font-body text-sm">
                    Ваш заказ передан на кухню. Ожидайте доставку через 45–60 минут.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <span className="text-5xl">🛍️</span>
                  <h3 className="font-display text-xl text-muted-foreground">Корзина пуста</h3>
                  <p className="text-sm text-muted-foreground font-body">Добавьте блюда из меню</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="btn-gold px-6 py-2 rounded-lg text-sm font-semibold"
                  >
                    К меню
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-secondary rounded-xl border border-border"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-semibold text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-body">{item.weight}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-body text-sm font-semibold gold-text">
                          {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center hover:border-[hsl(var(--gold)/0.3)] transition-colors"
                          >
                            <Icon name="Minus" size={10} className="text-foreground" />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center font-body text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-6 h-6 rounded btn-gold flex items-center justify-center"
                          >
                            <Icon name="Plus" size={10} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!orderPlaced && cart.length > 0 && (
              <div className="p-5 border-t border-border space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-muted-foreground">Сумма заказа</span>
                  <span className="font-display text-xl font-semibold text-foreground">
                    {totalPrice.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                {totalPrice < 800 ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg p-3 border border-border">
                    <Icon name="Package" size={12} className="gold-text shrink-0" />
                    <span>
                      До бесплатной доставки ещё{" "}
                      <span className="gold-text font-semibold">
                        {(800 - totalPrice).toLocaleString("ru-RU")} ₽
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 rounded-lg p-3 border border-green-400/20">
                    <Icon name="CheckCircle" size={12} className="shrink-0" />
                    <span>Бесплатная доставка включена!</span>
                  </div>
                )}
                <button
                  onClick={handleOrder}
                  className="w-full btn-gold py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <Icon name="ShoppingBag" size={16} />
                  Оформить заказ · {totalPrice.toLocaleString("ru-RU")} ₽
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile sticky cart */}
      {totalItems > 0 && !cartOpen && (
        <div className="fixed bottom-6 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="w-full btn-gold py-4 rounded-2xl flex items-center justify-between px-5 shadow-2xl"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-background text-[hsl(var(--gold))] text-xs flex items-center justify-center font-bold">
                {totalItems}
              </span>
              <span className="font-semibold text-sm">Корзина</span>
            </div>
            <span className="font-display text-base font-semibold">
              {totalPrice.toLocaleString("ru-RU")} ₽
            </span>
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🐉</span>
            <span className="font-display gold-text text-lg">Дракон</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-body">
            <span className="flex items-center gap-1.5">
              <Icon name="Phone" size={13} className="gold-text" /> +7 (999) 123-45-67
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="Clock" size={13} className="gold-text" /> 10:00 – 23:00
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-body">© 2024 Дракон</p>
        </div>
      </footer>
    </div>
  );
}
