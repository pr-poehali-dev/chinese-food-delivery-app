import Icon from "@/components/ui/icon";

interface HeaderProps {
  totalItems: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onCartOpen: () => void;
}

export default function Header({ totalItems, searchQuery, onSearchChange, onCartOpen }: HeaderProps) {
  return (
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
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground w-full font-body"
          />
        </div>

        <button
          onClick={onCartOpen}
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
  );
}
