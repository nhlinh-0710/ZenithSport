'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Package2, Heart, MapPin, LogOut, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useToast } from '@/contexts/toast-context';
import { formatPrice } from '@/lib/data';
import { Order, Address, CartItem } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses';

function getStatusConfig(status: string) {
  switch (status) {
    case 'pending': return { label: 'Chờ xác nhận', icon: Package, color: 'text-yellow-500 bg-yellow-50' };
    case 'confirmed': return { label: 'Đã xác nhận', icon: CheckCircle, color: 'text-blue-500 bg-blue-50' };
    case 'shipping': return { label: 'Đang giao', icon: Truck, color: 'text-blue-500 bg-blue-50' };
    case 'delivered': return { label: 'Đã giao', icon: CheckCircle, color: 'text-green-500 bg-green-50' };
    case 'cancelled': return { label: 'Đã hủy', icon: XCircle, color: 'text-red-500 bg-red-50' };
    default: return { label: 'Không xác định', icon: Package, color: 'text-zinc-500 bg-zinc-50' };
  }
}

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as Tab) || 'profile';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const { user, logout, orders, updateProfile } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { showToast } = useToast();

  const [editing, setEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    if (user) setProfileForm({ name: user.name, email: user.email, phone: user.phone }); // eslint-disable-line react-hooks/set-state-in-effect
  }, [user]);

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'profile', label: 'Hồ sơ', icon: User },
    { key: 'orders', label: 'Đơn hàng', icon: Package2 },
    { key: 'wishlist', label: 'Yêu thích', icon: Heart },
    { key: 'addresses', label: 'Địa chỉ', icon: MapPin },
  ];

  const handleSaveProfile = () => {
    updateProfile({ name: profileForm.name, email: profileForm.email, phone: profileForm.phone });
    setEditing(false);
    showToast('Cập nhật hồ sơ thành công', 'success');
  };

  const handleLogout = () => {
    logout();
    showToast('Đã đăng xuất', 'info');
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-bold text-zinc-900">Vui lòng đăng nhập</h1>
        <Link href="/login" className="mt-6 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full">Đăng nhập</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center">
          <span className="text-white text-xl font-bold uppercase">{user.name?.charAt(0) || 'U'}</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-zinc-900">{user.name}</h1>
          <p className="text-sm text-zinc-500">{user.email}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mb-8">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
                activeTab === tab.key ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-zinc-900">Thông tin cá nhân</h2>
                <button onClick={() => setEditing(!editing)} className="text-xs font-semibold text-zinc-600 underline hover:text-zinc-900">
                  {editing ? 'Hủy' : 'Chỉnh sửa'}
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Họ tên', value: profileForm.name, key: 'name' as const },
                  { label: 'Email', value: profileForm.email, key: 'email' as const },
                  { label: 'Số điện thoại', value: profileForm.phone, key: 'phone' as const },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-semibold text-zinc-700 mb-2">{field.label}</label>
                    {editing ? (
                      <input
                        value={field.value}
                        onChange={e => setProfileForm({ ...profileForm, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-zinc-50 rounded-xl text-sm text-zinc-700">{field.value || 'Chưa cập nhật'}</p>
                    )}
                  </div>
                ))}
                {editing && (
                  <button onClick={handleSaveProfile} className="w-full py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors">
                    Lưu thay đổi
                  </button>
                )}
              </div>
              <button onClick={handleLogout} className="mt-8 flex items-center gap-2 text-sm text-red-500 hover:text-red-600 transition-colors">
                <LogOut className="w-4 h-4" /> Đăng xuất
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h2 className="text-lg font-bold text-zinc-900 mb-6">Đơn hàng của tôi</h2>
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-zinc-50 rounded-2xl">
                <Package2 className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">Chưa có đơn hàng nào</p>
                <Link href="/products" className="mt-4 inline-block text-sm text-zinc-900 underline">Mua sắm ngay</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: Order) => {
                  const config = getStatusConfig(order.status);
                  const StatusIcon = config.icon;
                  return (
                    <div key={order.id} className="bg-white border border-zinc-100 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-xs text-zinc-500">Mã đơn: <span className="font-mono font-semibold text-zinc-900">{order.id}</span></p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${config.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {config.label}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item: CartItem) => (
                          <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-zinc-50 rounded-lg overflow-hidden shrink-0">
                              <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-zinc-900 truncate">{item.product.name}</p>
                              <p className="text-xs text-zinc-500">{item.size} / {item.color} × {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-zinc-900">{formatPrice(item.product.price * item.quantity)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
                        <span className="text-xs text-zinc-500">{order.paymentMethod}</span>
                        <span className="text-sm font-bold text-zinc-900">Tổng: {formatPrice(order.total)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'wishlist' && (
          <motion.div key="wishlist" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <h2 className="text-lg font-bold text-zinc-900 mb-6">Sản phẩm yêu thích</h2>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-12 bg-zinc-50 rounded-2xl">
                <Heart className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm text-zinc-500">Chưa có sản phẩm yêu thích</p>
                <Link href="/products" className="mt-4 inline-block text-sm text-zinc-900 underline">Khám phá ngay</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {wishlistItems.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'addresses' && (
          <motion.div key="addresses" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-zinc-900">Địa chỉ giao hàng</h2>
              <button className="text-xs font-semibold text-zinc-600 underline hover:text-zinc-900">+ Thêm địa chỉ</button>
            </div>
            {user.addresses.length === 0 ? (
              <p className="text-sm text-zinc-500">Chưa có địa chỉ nào.</p>
            ) : (
              <div className="space-y-3">
                {user.addresses.map((addr: Address, i: number) => (
                  <div key={i} className="p-4 bg-zinc-50 rounded-xl">
                    <p className="text-sm font-semibold text-zinc-900">{addr.fullName} · {addr.phone}</p>
                    <p className="text-xs text-zinc-500 mt-1">{addr.street}, {addr.ward}, {addr.district}, {addr.city}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-900 rounded-full animate-spin" />
      </div>
    }>
      <AccountContent />
    </Suspense>
  );
}
