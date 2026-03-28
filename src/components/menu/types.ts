export interface MenuItem {
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

export interface CartItem extends MenuItem {
  quantity: number;
}

export type FilterType = "all" | "spicy" | "popular";
