<div align="center">
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
    <img src="https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React">
    <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/PHP-8-777BB4?style=flat-square&logo=php" alt="PHP">
    <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql" alt="MySQL">
  </div>

  <h1 style="font-size: 48px; font-weight: 800; letter-spacing: -0.03em; margin: 0;">
    ⚡ Zenith Sport
  </h1>
  <p style="font-size: 18px; color: #666; margin-top: 8px;">
    Modern E-Commerce Platform for Sports Equipment
  </p>
  <p style="font-size: 14px; color: #999;">
    Premium sportswear store inspired by Nike &amp; Adidas — built with Next.js, Tailwind CSS, Framer Motion, PHP &amp; MySQL
  </p>

  <br>

  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-database-setup">Database</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-screenshots">Screenshots</a>

  <br><br>

  <img src="https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&w=1200&q=80" alt="Zenith Sport Hero" style="border-radius: 16px; max-width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.15);">
</div>

---

## ✨ Features

### Frontend
- **Homepage** — Fullscreen hero banner with parallax, featured products, category grid, testimonials carousel, newsletter signup
- **Product Listing** — Filter by category / brand / price range, sort by newest / price / name, responsive grid with loading skeletons
- **Product Detail** — Image gallery, size & color selector, quantity picker, star ratings, reviews, related products
- **Shopping Cart** — Persistent cart (localStorage), quantity controls, price summary, free-shipping threshold indicator
- **Checkout** — 3-step flow: shipping address → payment method → order confirmation
- **User Account** — Profile editor, order history with status tracking (pending / confirmed / shipping / delivered / cancelled), wishlist management, address book
- **Authentication** — Login / Register with demo one-click login, protected routes
- **Search** — Modal overlay with real-time filtering, keyboard navigation, suggestion chips
- **Wishlist** — Heart toggle on cards and detail page, dedicated wishlist page
- **Notifications** — Animated toast system (success / error / info)
- **Responsive** — Fully adaptive: mobile, tablet, desktop
- **Animations** — Framer Motion page transitions, staggered card reveals, micro-interactions
- **SEO** — OpenGraph metadata, semantic HTML

### Backend (PHP + MySQL)
- RESTful JSON API with proper HTTP status codes
- PDO + prepared statements (SQL injection safe)
- Token-based authentication (bearer token)
- Transactional order creation
- CORS headers for cross-origin requests
- Graceful fallback — Next.js API routes fall back to mock data if PHP is unavailable

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | PHP 8+ |
| **Database** | MySQL 8 (via XAMPP) |
| **Auth** | Token-based (bearer token, bcrypt passwords) |
| **State** | React Context (Auth, Cart, Wishlist, Toast) |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 18+ | Next.js runtime |
| PHP | 8.0+ | API backend |
| MySQL | 8.0+ | Database |
| XAMPP | Latest | Apache + PHP + MySQL |

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/zenith-sport.git
cd zenith-sport

# Install Node dependencies
npm install
```

### 2. Database Setup

```bash
# Option A: Via MySQL CLI
mysql -u root < backend/schema.sql

# Option B: Import via phpMyAdmin
# 1. Open http://localhost/phpmyadmin
# 2. Create database "zenith_sport" (utf8mb4_unicode_ci)
# 3. Import backend/schema.sql
```

### 3. Seed Data

```bash
php backend/seed/seed.php
```

This inserts:
- **16 products** across 5 categories and 6 brands
- **12 reviews** with star ratings
- **2 sample orders** with order items
- **1 demo user** with address

### 4. Configure XAMPP

1. Copy the entire `backend/` folder into XAMPP's `htdocs`:
   ```
   C:\xampp\htdocs\zenith-sport\backend\
   ```
2. Start **Apache** and **MySQL** from XAMPP Control Panel
3. Verify API is running:
   ```
   http://localhost:8080/zenith-sport/backend/api/products.php
   ```

> **Note:** The API port (8080) is configured in `src/app/api/*/route.ts`. Adjust if your XAMPP uses a different port.

### 5. Run Development Server

```bash
# Terminal 1: Next.js frontend
npm run dev
# → http://localhost:3000

# XAMPP: Apache + MySQL (keep running in background)
# → PHP API: http://localhost:8080/zenith-sport/backend/api/
```

### 6. Build for Production

```bash
npm run build
npm start
```

---

## 👤 Demo Account

| Field | Value |
|-------|-------|
| **Email** | `demo@zenith.vn` |
| **Password** | `demo123` |
| **Orders** | 2 sample orders (delivered + shipping) |

---

## 📡 API Endpoints

All PHP API endpoints return JSON. The Next.js API routes (`/api/*`) proxy requests to the PHP backend and fall back to mock data if unavailable.

### Products

```http
GET  /api/products                      # List all products
GET  /api/products?category=Giày       # Filter by category
GET  /api/products?brand=Nike          # Filter by brand
GET  /api/products?search=air          # Search by name
GET  /api/products/1                   # Single product + reviews + related
```

### Auth

```http
POST /api/auth
Content-Type: application/json

# Login
{ "action": "login",    "email": "...", "password": "..." }
# Register
{ "action": "register", "name": "...", "email": "...", "password": "..." }
# Profile
{ "action": "profile" }                                  ← requires token
# Update Profile
{ "action": "update",   "name": "...", "email": "..." }   ← requires token
# Add Address
{ "action": "add_address", "fullName": "...", "phone": "...", "street": "...", ... }
# Logout
{ "action": "logout" }
```

### Orders

```http
GET  /api/orders       # List user's orders (requires token)
POST /api/orders       # Create new order (requires token)
```

### Cart

```http
GET    /api/cart                         # List cart items
POST   /api/cart                         # Add item
PUT    /api/cart                         # Update quantity
DELETE /api/cart?productId=1&size=42...  # Remove item
```

### Contact

```http
POST /api/contact
{ "name": "...", "email": "...", "message": "..." }
```

---

## 📁 Project Structure

```
zenith-sport/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Homepage
│   │   ├── products/           # Product listing + detail
│   │   ├── cart/               # Shopping cart
│   │   ├── checkout/           # Multi-step checkout
│   │   ├── login/              # Login / Register
│   │   ├── account/            # User profile + orders
│   │   ├── wishlist/           # Wishlist
│   │   ├── contact/            # Contact form
│   │   ├── api/                # API routes (proxies to PHP)
│   │   ├── error.tsx           # Error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   └── layout.tsx          # Root layout with providers
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive navigation
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ProductCard.tsx     # Product card with animations
│   │   └── ui/                 # UI primitives
│   │       ├── ToastContainer.tsx
│   │       ├── BackToTop.tsx
│   │       ├── Skeleton.tsx
│   │       └── SearchModal.tsx
│   ├── contexts/               # React Context providers
│   │   ├── auth-context.tsx
│   │   ├── wishlist-context.tsx
│   │   └── toast-context.tsx
│   └── lib/
│       ├── types.ts            # TypeScript interfaces
│       ├── data.ts             # Mock product data (fallback)
│       └── cart-context.tsx    # Cart Context with localStorage
├── backend/
│   ├── schema.sql              # Full MySQL schema (8 tables)
│   ├── config/
│   │   └── database.php        # PDO connection + helpers
│   ├── api/
│   │   ├── products.php        # Products CRUD
│   │   ├── auth.php            # Authentication
│   │   ├── orders.php          # Orders with transactions
│   │   ├── cart.php            # Cart management
│   │   └── contact.php         # Contact messages
│   ├── seed/
│   │   └── seed.php            # Data seeder
│   └── .htaccess               # Apache URL rewriting
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#ffffff` | Page background |
| `--foreground` | `#0a0a0a` | Primary text |
| `--primary` | `#dc2626` | Red accent (buttons, badges) |
| Font | Geist (via `next/font`) | Body & headings |
| Radius | `rounded-xl` (12px), `rounded-2xl` (16px) | Cards & containers |

### Color Palette
- **Black/White** — Clean, minimal foundation (Nike-inspired)
- **Red** — Accent color for CTAs, badges, hover states
- **Zinc** — Subtle grays for backgrounds, borders, secondary text

---

## 🖼 Screenshots

| Page | Preview |
|------|---------|
| **Homepage** | Fullscreen hero with gradient overlay, category grid, testimonials |
| **Products** | Sticky filter bar, sorting dropdown, animated cards with stagger |
| **Product Detail** | Image gallery, size/color picker, star ratings, reviews tab |
| **Cart** | Item list with quantity controls, price summary, shipping threshold |
| **Checkout** | 3-step wizard: address → payment → confirmation |
| **Account** | Profile, order history (5 statuses), wishlist, addresses |
| **Login** | Tabbed login/register, one-click demo login |

---

## 🧪 Running Lint & Type Check

```bash
npm run lint       # ESLint
npm run build      # Includes TypeScript check
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes. All product images and brand names belong to their respective owners (Nike, Adidas, Wilson, Beats).

---

<div align="center">
  <p>
    Built with ❤️ by <a href="https://github.com/Hmbown">Hmbown</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js" alt="Next.js">
    <img src="https://img.shields.io/badge/PHP-8-777BB4?style=flat-square&logo=php" alt="PHP">
    <img src="https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql" alt="MySQL">
  </p>
</div>
