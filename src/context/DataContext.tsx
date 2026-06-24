import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Product, Offer, Category } from '../types';

interface DataContextValue {
  products: Product[];
  setProducts: (p: Product[]) => void;
  addProduct: (p: Product) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  categories: Category[];
  offers: Offer[];
  setOffers: (o: Offer[]) => void;
  addOffer: (o: Offer) => void;
  toggleOffer: (id: string) => void;
  deleteOffer: (id: string) => void;
}

const defaultCategories: Category[] = [
  { id: 'c1', name: 'All', image: '' },
  { id: 'c2', name: 'Outerwear', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&q=80' },
  { id: 'c3', name: 'Accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80' },
  { id: 'c4', name: 'Tops', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a11?w=400&q=80' },
  { id: 'c5', name: 'Bottoms', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80' },
  { id: 'c6', name: 'Dresses', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80' },
  { id: 'c7', name: 'Premium Outerwear', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
];

const defaultProducts: Product[] = [
  { id: '1', name: 'Glacier Parka', category: 'Premium Outerwear', price: 50000, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80', description: 'Engineered for the modern explorer. Aerospace-grade thermal insulation with crystalline-infused outer shell.', sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Arctic Blue', hex: '#7dd3fc' }, { name: 'Charcoal', hex: '#36454f' }, { name: 'Snow', hex: '#f5f5f5' }] },
  { id: '2', name: 'Silk Scarf', category: 'Accessories', price: 18000, originalPrice: 26000, image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80', description: 'Handwoven silk scarf with abstract ice-fractal patterns. Ethereal and sophisticated.', sizes: ['One Size'], colors: [{ name: 'Ivory', hex: '#fffff0' }, { name: 'Silver', hex: '#c0c0c0' }, { name: 'Navy', hex: '#000080' }] },
  { id: '3', name: 'Structured Linen Blazer', category: 'Outerwear', price: 35600, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400&q=80', description: 'Tailored linen blazer with a structured silhouette. Perfect for elevated casual.', sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Oatmeal', hex: '#f5f0e1' }, { name: 'Black', hex: '#1a1a1a' }] },
  { id: '4', name: 'Signature Leather Tote', category: 'Accessories', price: 48000, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80', description: 'Italian full-grain leather tote with gold-toned hardware. A timeless investment.', sizes: ['One Size'], colors: [{ name: 'Cognac', hex: '#d2b48c' }, { name: 'Black', hex: '#1a1a1a' }] },
  { id: '5', name: 'Merino Wool Turtleneck', category: 'Tops', price: 15200, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a11?w=400&q=80', description: 'Ultra-fine Merino wool turtleneck. Ribbed cuffs and hem for a refined finish.', sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: [{ name: 'Cream', hex: '#fffdd0' }, { name: 'Black', hex: '#1a1a1a' }, { name: 'Burgundy', hex: '#800020' }] },
  { id: '6', name: 'Pleated Midi Skirt', category: 'Bottoms', price: 18000, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80', description: 'Elegant pleated midi skirt in lightweight crepe. Moves beautifully with every step.', sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Forest', hex: '#228b22' }, { name: 'Navy', hex: '#000080' }, { name: 'Black', hex: '#1a1a1a' }] },
  { id: '7', name: 'Cashmere Blend Coat', category: 'Outerwear', price: 72000, originalPrice: 96000, image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=400&q=80', description: 'Luxurious cashmere blend coat with a tailored fit. Investment dressing at its finest.', sizes: ['S', 'M', 'L'], colors: [{ name: 'Camel', hex: '#c19a6b' }, { name: 'Charcoal', hex: '#36454f' }] },
  { id: '8', name: 'Silk Evening Gown', category: 'Dresses', price: 88000, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&q=80', description: 'Exquisite silk evening gown with a flowing silhouette. Timeless elegance.', sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Ivory', hex: '#fffff0' }, { name: 'Black', hex: '#1a1a1a' }, { name: 'Burgundy', hex: '#800020' }] },
];

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [offers, setOffers] = useState<Offer[]>([
    { id: 'o1', title: 'Нова колекція', description: 'Знижка 20% на весь верхній одяг', discount: 20, code: 'WINTER20', active: true },
    { id: 'o2', title: 'Безкоштовна доставка', description: 'Безкоштовна доставка при замовленні від 20000₴', discount: 0, code: 'FREESHIP', active: true },
  ]);

  const addProduct = (p: Product) => setProducts((prev) => [...prev, p]);
  const updateProduct = (id: string, p: Partial<Product>) => setProducts((prev) => prev.map((x) => x.id === id ? { ...x, ...p } : x));
  const deleteProduct = (id: string) => setProducts((prev) => prev.filter((x) => x.id !== id));

  const addOffer = (o: Offer) => setOffers((prev) => [...prev, o]);
  const toggleOffer = (id: string) => setOffers((prev) => prev.map((o) => o.id === id ? { ...o, active: !o.active } : o));
  const deleteOffer = (id: string) => setOffers((prev) => prev.filter((o) => o.id !== id));

  return <DataContext.Provider value={{ products, setProducts, addProduct, updateProduct, deleteProduct, categories: defaultCategories, offers, setOffers, addOffer, toggleOffer, deleteOffer }}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
