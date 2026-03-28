import Icon from "@/components/ui/icon";

export default function HeroSection() {
  return (
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
  );
}
