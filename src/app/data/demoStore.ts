import { useEffect, useState } from "react";

export interface CartItem {
  id: number;
  productId: string;
  price: number;
  quantity: number;
  unitKey: string;
  category: string;
}

export interface FarmerProduct {
  id: number;
  productId: string;
  categoryId: string;
  category: string;
  price: number;
  available: number;
  unit: string;
  demand: number;
  status: string;
  image: string;
  message?: string;
  location?: string;
}

export const CART_STORAGE_KEY = "kendyol-cart";
export const CLAIMED_ROUTE_STORAGE_KEY = "kendyol-claimed-route";
export const FARMER_PRODUCTS_STORAGE_KEY = "kendyol-farmer-products";
export const FARMER_PRODUCTS_UPDATED_EVENT = "kendyol-farmer-products-updated";
export const APPROVED_ROUTES_STORAGE_KEY = "kendyol-approved-routes";

export const defaultCartItems: CartItem[] = [
  { id: 1, productId: "tomato", price: 4.5, quantity: 2, unitKey: "product.kg", category: "medium" },
  { id: 2, productId: "spinach", price: 3.2, quantity: 3, unitKey: "product.bunch", category: "sensitive" },
  { id: 3, productId: "chicken_eggs", price: 0.7, quantity: 12, unitKey: "product.piece", category: "durable" },
];

export const defaultFarmerProducts: FarmerProduct[] = [
  { id: 1, productId: "tomato", categoryId: "vegetables", category: "medium", price: 4.5, available: 50, unit: "kq", demand: 45, status: "active", image: "https://images.unsplash.com/photo-1757332334678-e76d258c49c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { id: 2, productId: "spinach", categoryId: "greens", category: "sensitive", price: 3.2, available: 25, unit: "dəstə", demand: 30, status: "low-stock", image: "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { id: 3, productId: "pepper", categoryId: "vegetables", category: "medium", price: 5.5, available: 30, unit: "kq", demand: 25, status: "active", image: "https://images.unsplash.com/photo-1775343963054-11247c9d4d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { id: 4, productId: "cucumber", categoryId: "vegetables", category: "medium", price: 3.5, available: 40, unit: "kq", demand: 35, status: "active", image: "https://images.unsplash.com/photo-1725369865895-0dd4566c8864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
];

function normalizeStoredCart(items: CartItem[]) {
  return items.map((item) =>
    item.productId === "chicken_eggs" && item.price === 8
      ? { ...item, price: 0.7 }
      : item
  );
}

export function readStoredValue<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    const value = JSON.parse(saved) as T;
    return key === CART_STORAGE_KEY
      ? normalizeStoredCart(value as CartItem[]) as T
      : value;
  } catch {
    return fallback;
  }
}

export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStoredValue(key, fallback));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  useEffect(() => {
    const sync = () => setValue(readStoredValue(key, fallback));
    const eventName = key === FARMER_PRODUCTS_STORAGE_KEY ? FARMER_PRODUCTS_UPDATED_EVENT : "storage";
    window.addEventListener(eventName, sync);
    return () => window.removeEventListener(eventName, sync);
  }, [fallback, key]);

  return [value, setValue] as const;
}

export function addCartItem(item: Omit<CartItem, "quantity">, quantity = 1) {
  const cart = readStoredValue<CartItem[]>(CART_STORAGE_KEY, defaultCartItems);
  const existing = cart.find((cartItem) => cartItem.id === item.id);
  const updated = existing
    ? cart.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem)
    : [...cart, { ...item, quantity }];

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("kendyol-cart-updated"));
}

export function getCartCount() {
  return readStoredValue<CartItem[]>(CART_STORAGE_KEY, defaultCartItems)
    .reduce((total, item) => total + item.quantity, 0);
}

export function useCartCount() {
  const [count, setCount] = useState(getCartCount);

  useEffect(() => {
    const sync = () => setCount(getCartCount());
    window.addEventListener("kendyol-cart-updated", sync);
    return () => window.removeEventListener("kendyol-cart-updated", sync);
  }, []);

  return count;
}
