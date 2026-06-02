export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  details: string[];
  sizes: string[];
  colors: string[];
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviewCount: number;
  brand: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  size: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Address {
  fullName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  addresses: Address[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
  address: Address;
  paymentMethod: string;
  createdAt: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';
