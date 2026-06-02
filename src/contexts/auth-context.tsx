'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, Address, Order } from '@/lib/types';
import { getInitialOrders, generateOrderId } from '@/lib/data';

const USER_KEY = 'zenith-user';
const ORDERS_KEY = 'zenith-orders';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Address) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'userId' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const defaultUser: User = {
  id: 'user-demo',
  email: 'demo@zenith.vn',
  name: 'Nguyễn Văn A',
  phone: '0912345678',
  addresses: [
    {
      fullName: 'Nguyễn Văn A',
      phone: '0912345678',
      street: '123 Nguyễn Huệ',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
    },
  ],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

function saveUser(user: User) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(USER_KEY, JSON.stringify(user)); } catch { /* ignore */ }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadUser();
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(saved);
      const savedOrders = localStorage.getItem(ORDERS_KEY);
      if (savedOrders) {
        try { setOrders(JSON.parse(savedOrders)); } catch { setOrders(getInitialOrders(saved.id)); }
      } else {
        setOrders(getInitialOrders(saved.id));
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && user) {
      saveUser(user);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }, [user, orders, hydrated]);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Mock login - any email/password works, or use demo account
    await new Promise(r => setTimeout(r, 600));
    const newUser: User = {
      ...defaultUser,
      email,
      id: 'user-' + Date.now(),
    };
    setUser(newUser);
    const initialOrders = getInitialOrders(newUser.id);
    setOrders(initialOrders);
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, phone: string, _password: string): Promise<boolean> => {
    await new Promise(r => setTimeout(r, 600));
    const newUser: User = {
      id: 'user-' + Date.now(),
      email,
      name,
      phone,
      addresses: [],
    };
    setUser(newUser);
    setOrders([]);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOrders([]);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(ORDERS_KEY);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : prev);
  }, []);

  const addAddress = useCallback((address: Address) => {
    setUser(prev => prev ? { ...prev, addresses: [...prev.addresses, address] } : prev);
  }, []);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      userId: user?.id || 'unknown',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [user]);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }, []);

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn: !!user, login, register, logout, updateProfile, addAddress,
      orders, addOrder, updateOrderStatus,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
