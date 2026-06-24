export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  condition: string;
  sizes: string[];
  colors: { name: string; hex: string; image?: string }[];
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  code: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Collection {
  enabled: boolean;
  image: string;
  title: string;
  subtitle: string;
  tag: string;
}
