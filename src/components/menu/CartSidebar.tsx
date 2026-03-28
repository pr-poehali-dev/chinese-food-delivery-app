import { useState } from "react";
import Icon from "@/components/ui/icon";
import type { CartItem, MenuItem } from "./types";
import { useYookassa, openPaymentPage } from "@/components/extensions/yookassa/useYookassa";

const YOOKASSA_API_URL = "https://functions.poehali.dev/150b8c8f-7708-4cbb-b720-94541b18477d";

interface CartSidebarProps {
  cart: CartItem[];
  cartOpen: boolean;
  orderPlaced: boolean;
  totalItems: number;
  totalPrice: number;
  onClose: () => void;
  onOpen: () => void;
  onAdd: (item: MenuItem) => void;
  onRemove: (id: number) => void;
  onOrder: () => void;
}

export default function CartSidebar({
  cart,
  cartOpen,
  orderPlaced,
  totalItems,
  totalPrice,
  onClose,
  onOpen,
  onAdd,
  onRemove,
  onOrder,
}: CartSidebarProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { createPayment, isLoading } = useYookassa({
    apiUrl: YOOKASSA_API_URL,
    onError: () => setEmailError("Ошибка при создании платежа. Попробуйте ещё раз."),
  });

  const handlePay = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Введите корректный email для чека");
      return;
    }
    setEmailError("");
    const returnUrl = window.location.origin + "/?payment=success";
    const response = await createPayment({
      amount: totalPrice,
      userEmail: email,
      returnUrl,
      cartItems: cart.map((item) => ({
        id: String(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    });
    if (response?.payment_url) {
      onOrder();
      openPaymentPage(response.payment_url);
    }
  };

  return (
    <>
      {/* Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
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
                onClick={onClose}
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
                    onClick={onClose}
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
                            onClick={() => onRemove(item.id)}
                            className="w-6 h-6 rounded bg-background border border-border flex items-center justify-center hover:border-[hsl(var(--gold)/0.3)] transition-colors"
                          >
                            <Icon name="Minus" size={10} className="text-foreground" />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center font-body text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onAdd(item)}
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
                <div className="space-y-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                    placeholder="Email для чека"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[hsl(var(--gold)/0.5)]"
                  />
                  {emailError && (
                    <p className="text-xs text-red-400 font-body">{emailError}</p>
                  )}
                </div>
                <button
                  onClick={handlePay}
                  disabled={isLoading}
                  className="w-full btn-gold py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Icon name="CreditCard" size={16} />
                  {isLoading ? "Создаём заказ..." : `Оплатить · ${totalPrice.toLocaleString("ru-RU")} ₽`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile sticky button */}
      {totalItems > 0 && !cartOpen && (
        <div className="fixed bottom-6 left-4 right-4 z-40 sm:hidden">
          <button
            onClick={onOpen}
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
    </>
  );
}