'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, MapPin, CreditCard, Package, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';
import { formatPrice } from '@/lib/data';

type Step = 'shipping' | 'payment' | 'confirm';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isLoggedIn, addOrder } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [step, setStep] = useState<Step>('shipping');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    street: '',
    ward: '',
    district: '',
    city: 'TP. Hồ Chí Minh',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-bold text-zinc-900">Vui lòng đăng nhập</h1>
        <p className="text-zinc-500 text-sm mt-2">Bạn cần đăng nhập để thanh toán.</p>
        <Link href="/login" className="mt-6 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors">
          Đăng nhập
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-2xl font-bold text-zinc-900">Giỏ hàng trống</h1>
        <Link href="/products" className="mt-6 px-6 py-3 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors">
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    addOrder({
      items,
      total: totalPrice,
      status: 'pending',
      address,
      paymentMethod,
    });
    clearCart();
    showToast('Đặt hàng thành công!', 'success');
    router.push('/account?tab=orders');
  };

  const steps = [
    { key: 'shipping', label: 'Vận chuyển', icon: MapPin },
    { key: 'payment', label: 'Thanh toán', icon: CreditCard },
    { key: 'confirm', label: 'Xác nhận', icon: Package },
  ];

  const stepIndex = steps.findIndex(s => s.key === step);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Link href="/cart" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" /> Quay lại giỏ hàng
      </Link>

      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">Thanh toán</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mt-8 mb-10">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === stepIndex;
          const isDone = i < stepIndex;
          return (
            <div key={s.key} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                isDone ? 'bg-green-600 text-white' : isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'
              }`}>
                {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className={`h-px w-8 sm:w-16 ${i < stepIndex ? 'bg-green-600' : 'bg-zinc-200'}`} />}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {step === 'shipping' && (
          <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-zinc-900 mb-6">Địa chỉ giao hàng</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-2">Họ tên</label>
                  <input
                    value={address.fullName}
                    onChange={e => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-2">Số điện thoại</label>
                  <input
                    value={address.phone}
                    onChange={e => setAddress({ ...address, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2">Địa chỉ</label>
                <input
                  value={address.street}
                  onChange={e => setAddress({ ...address, street: e.target.value })}
                  placeholder="Số nhà, tên đường"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-2">Phường/Xã</label>
                  <input
                    value={address.ward}
                    onChange={e => setAddress({ ...address, ward: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-2">Quận/Huyện</label>
                  <input
                    value={address.district}
                    onChange={e => setAddress({ ...address, district: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-2">Thành phố</label>
                  <select
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900"
                  >
                    <option>TP. Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                    <option>Hải Phòng</option>
                    <option>Cần Thơ</option>
                  </select>
                </div>
              </div>
            </div>
            <button onClick={() => setStep('payment')} className="mt-8 px-8 py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-2">
              Tiếp tục <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 'payment' && (
          <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-zinc-900 mb-6">Phương thức thanh toán</h2>
            <div className="space-y-3">
              {[
                { id: 'COD', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Trả tiền mặt khi nhận hàng' },
                { id: 'VNPay', label: 'VNPay', desc: 'Thanh toán qua VNPay' },
                { id: 'Momo', label: 'Ví MoMo', desc: 'Thanh toán qua ví MoMo' },
                { id: 'Bank', label: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản qua tài khoản ngân hàng' },
              ].map(pm => (
                <button
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === pm.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === pm.id ? 'border-zinc-900' : 'border-zinc-300'
                  }`}>
                    {paymentMethod === pm.id && <div className="w-3 h-3 bg-zinc-900 rounded-full" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{pm.label}</p>
                    <p className="text-xs text-zinc-500">{pm.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setStep('shipping')} className="px-6 py-3.5 border border-zinc-200 text-sm font-semibold rounded-full hover:bg-zinc-50 transition-colors">
                Quay lại
              </button>
              <button onClick={() => setStep('confirm')} className="px-8 py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors flex items-center gap-2">
                Xem lại đơn hàng <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-lg font-bold text-zinc-900 mb-6">Xác nhận đơn hàng</h2>

            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-3 bg-zinc-50 rounded-xl">
                  <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                    <img src={item.product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-zinc-500">{item.size} / {item.color} × {item.quantity}</p>
                    <p className="text-sm font-bold text-zinc-900 mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-zinc-50 rounded-xl p-5 space-y-2 text-sm mb-6">
              <div className="flex justify-between text-zinc-600"><span>Địa chỉ</span><span className="text-right max-w-[200px]">{address.fullName}, {address.street}, {address.ward}, {address.district}, {address.city}</span></div>
              <div className="flex justify-between text-zinc-600"><span>Thanh toán</span><span>{paymentMethod === 'COD' ? 'Thanh toán khi nhận hàng' : paymentMethod}</span></div>
              <div className="flex justify-between text-zinc-600"><span>Phí vận chuyển</span><span className="text-green-600">Miễn phí</span></div>
              <div className="flex justify-between font-bold text-zinc-900 text-base pt-2 border-t border-zinc-200"><span>Tổng cộng</span><span>{formatPrice(totalPrice)}</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('payment')} className="px-6 py-3.5 border border-zinc-200 text-sm font-semibold rounded-full hover:bg-zinc-50 transition-colors">
                Quay lại
              </button>
              <button onClick={handlePlaceOrder} disabled={loading} className="flex-1 py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Đặt hàng <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
