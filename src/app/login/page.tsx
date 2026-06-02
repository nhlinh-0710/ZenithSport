'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useToast } from '@/contexts/toast-context';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const { login, register } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
        showToast('Đăng nhập thành công!', 'success');
      } else {
        await register(form.name, form.email, form.phone, form.password);
        showToast('Đăng ký thành công!', 'success');
      }
      router.push('/');
    } catch {
      showToast('Có lỗi xảy ra, vui lòng thử lại', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login('demo@zenith.vn', 'demo123');
      showToast('Đăng nhập demo thành công!', 'success');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 sm:py-20">
      <div className="w-full max-w-md mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">Z</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</h1>
          <p className="text-sm text-zinc-500 mt-2">
            {isLogin ? 'Chào mừng trở lại với Zenith Sport' : 'Tạo tài khoản mới'}
          </p>
        </motion.div>

        <div className="flex bg-zinc-100 rounded-full p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all ${isLogin ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all ${!isLogin ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500'}`}
          >
            Đăng ký
          </button>
        </div>

        <motion.form key={isLogin ? 'login' : 'register'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2">Họ tên</label>
              <input
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-400"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2">Số điện thoại</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => update('phone', e.target.value)}
                placeholder="0912345678"
                className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-400"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-2">Mật khẩu</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => update('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 pr-12 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors placeholder:text-zinc-400"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900" />
                <span className="text-zinc-600">Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-zinc-600 underline hover:text-zinc-900">Quên mật khẩu?</button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>{isLogin ? 'Đăng nhập' : 'Đăng ký'} <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </motion.form>

        {isLogin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4">
            <button
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-3.5 border border-zinc-300 text-zinc-700 text-sm font-semibold rounded-full hover:bg-zinc-50 transition-colors flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-yellow-500" />
              Đăng nhập nhanh (Demo)
            </button>
          </motion.div>
        )}

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center text-sm text-zinc-500">
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-zinc-900 font-semibold underline hover:text-red-600 transition-colors">
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </motion.p>
      </div>
    </div>
  );
}
