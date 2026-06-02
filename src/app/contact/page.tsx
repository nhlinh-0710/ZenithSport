'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Clock } from 'lucide-react';
import { useToast } from '@/contexts/toast-context';

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1000));
    setSending(false);
    setForm({ name: '', email: '', subject: '', message: '' });
    showToast('Tin nhắn đã được gửi thành công!', 'success');
  };

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <span className="text-red-600 text-xs font-semibold uppercase tracking-[0.2em]">Liên hệ</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mt-2">Chúng tôi luôn sẵn sàng hỗ trợ</h1>
        <p className="text-zinc-500 text-sm mt-3 max-w-lg mx-auto">
          Bạn có câu hỏi? Hãy gửi tin nhắn cho chúng tôi, đội ngũ Zenith Sport sẽ phản hồi trong vòng 24h.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2">Họ tên</label>
                <input
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2">Chủ đề</label>
              <input
                value={form.subject}
                onChange={e => update('subject', e.target.value)}
                placeholder="VD: Hỏi về sản phẩm"
                className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-2">Nội dung</label>
              <textarea
                value={form.message}
                onChange={e => update('message', e.target.value)}
                rows={5}
                placeholder="Viết tin nhắn của bạn..."
                className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 resize-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <><Send className="w-4 h-4" /> Gửi tin nhắn</>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {[
            { icon: MapPin, title: 'Địa chỉ', desc: '123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh' },
            { icon: Phone, title: 'Điện thoại', desc: '1900 1234 56' },
            { icon: Mail, title: 'Email', desc: 'info@zenithsport.vn' },
            { icon: Clock, title: 'Giờ làm việc', desc: 'Thứ 2 - Chủ nhật: 8:00 - 21:00' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-4 p-5 bg-zinc-50 rounded-xl">
              <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-zinc-700" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-900">{item.title}</h4>
                <p className="text-sm text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}

          <div className="p-5 bg-zinc-900 rounded-xl text-white">
            <h4 className="text-sm font-bold mb-2">Zenith Sport - Đồng hành cùng bạn</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Chúng tôi cam kết mang đến sản phẩm chính hãng chất lượng cao nhất cùng dịch vụ khách hàng tốt nhất.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
