# 🎮 Next Game News — El Nexo del Gaming

A modern, full-stack gaming news platform built with **Next.js 15 App Router**, featuring server-side rendering, a custom editorial design system, and a headless CMS-style admin panel.

---

## 📸 Overview

Next Game News is a gaming journalism site covering reviews, news, guides, and game launches. It is designed with a **premium editorial aesthetic** — gold accents on deep charcoal — and built with performance and accessibility as first-class concerns.

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org/) (App Router) | Framework, SSR, routing |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark / light mode |
| [Swiper.js](https://swiperjs.com/) | Hero banner carousel |
| [ReactMarkdown](https://github.com/remarkjs/react-markdown) | Article body rendering |
| [dayjs](https://day.js.org/) | Relative timestamps |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) | REST API |
| [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | Database + ODM |
| [Joi](https://joi.dev/) | Request validation |
| [Helmet](https://helmetjs.github.io/) | Security headers |
| [CORS](https://github.com/expressjs/cors) | Cross-origin policy |

---

## ✨ Features

- **Server-side rendering** — pages are rendered on the server for fast first paint and SEO
- **Fuzzy search** — client-side fuzzy matching with debouncing and a rich dropdown UI
- **Article pages** — full Markdown rendering with a cinematic hero, featured image, and prose styling
- **Swiper banner** — autoplaying carousel of featured news with console platform icons
- **Analysis sidebar** — curated review thumbnails linking to full articles
- **Load more** — pagination that appends new articles without a full page reload
- **Admin panel** — protected form to create articles with a live Markdown preview
- **Fully typed** — end-to-end TypeScript from API response to component props
- **Accessible** — semantic HTML, ARIA landmarks, keyboard navigation, screen-reader labels throughout

---

## 🗂 Project Structure

```
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Server wrapper (metadata)
│   │   └── AdminForm.tsx         # Client form with Markdown editor
│   ├── analisis/
│   │   └── [postId]/
│   │       └── page.tsx          # Dynamic article page (SSR)
│   ├── components/
│   │   ├── Banner.tsx            # Hero swiper + small news row
│   │   ├── BigNews.tsx           # Large swiper card
│   │   ├── Footer.tsx
│   │   ├── Header.tsx            # Mobile header + logo
│   │   ├── Navbar.tsx            # Desktop navigation + search
│   │   ├── NewsBody.tsx          # Article list + analysis sidebar
│   │   ├── Providers.tsx         # next-themes provider
│   │   └── ScrollToTop.tsx
│   |
│   ├── types/
│   │   └── types.ts              # Shared TypeScript interfaces
│   ├── utils/
│   │   ├── ArticleCard.tsx       # News list item
│   │   ├── ArticleReviewBody.tsx # Full article layout
│   │   ├── BodyNews.tsx          # Paginated article list
│   │   ├── DrawerComponent.tsx   # Mobile nav drawer
│   │   ├── LoadMoreButton.tsx    # Client-side pagination
│   │   ├── ReviewNews.tsx        # Analysis thumbnail grid
│   │   ├── Reviews.tsx           # Single review thumbnail
│   │   ├── SearchBar.tsx         # Fuzzy search with dropdown
│   │   └── SmallNews.tsx         # Small banner card
│   ├── globals.css               # Design tokens + global styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (SSR)
│   └── error.tsx                 # Error boundary UI
```

---

## 🎨 Design System

The design system is defined entirely in `globals.css` using CSS custom properties:

```css
--color-primary:    #b8972a   /* Gold — borders, accents, icons   */
--color-primary-lt: #d4af37   /* Light gold — text, highlights    */
--color-primary-dk: #8a6e1a   /* Dark gold — hover states         */
--color-cream:      #e8d5a3   /* Warm off-white — body text       */
--color-secondary:  #111418   /* Near-black — page background     */
--color-surface:    #1c1f24   /* Dark charcoal — cards, navbar    */
--color-surface-lt: #252930   /* Lighter charcoal — hover states  */

--font-logo:    "Goldman"      /* Site logo                        */
--font-title:   "Bebas Neue"  /* Headlines, card titles           */
--font-article: "Georgia"     /* Body copy, UI labels             */
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A running instance of the [game-news-server](https://github.com/heidenreich20/GameNewsServer)

### Installation

```bash
git clone https://github.com/heidenreich20/NextGameNews
cd NextGameNews
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```bash
# Public — used in both server and client components
NEXT_PUBLIC_API_URL=https://game-news-server.onrender.com

# Private — used only in server components
API_URL=https://game-news-server.onrender.com
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## 🔒 Admin Panel

The admin panel is available at `/admin`. It is excluded from search engine indexing.

To publish an article you will need the `ADMIN_API_KEY` configured on the backend server. Enter it in the API Key field — it is never stored in the frontend bundle or source code.

**Supported fields:**
- Title, author, category, type (Noticia / Análisis / Guía / Lanzamiento)
- Image URL with live preview
- Platform tags (PlayStation, Xbox, Nintendo, PC)
- Article body in **Markdown** with a live preview tab

---

## 🌐 Deployment

The frontend is deployed on **Vercel**. The backend runs on **Render** (free tier).

> ⚠️ The Render free tier spins down after inactivity. The app sends a `/health` ping on boot to wake the server before the first user request arrives.

---

## 📄 API Reference

Base URL: `https://game-news-server.onrender.com`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/news` | — | Paginated news list |
| `GET` | `/news/category` | — | Filter by category |
| `GET` | `/news/:id` | — | Single article by ID |
| `POST` | `/news` | `x-api-key` | Create a new article |

**Query parameters for `GET /news`:**

| Param | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `10` | Results per page |

**Query parameters for `GET /news/category`:**

| Param | Type | Description |
|---|---|---|
| `category` | string | Filter term (case-insensitive regex) |
| `limit` | number | Max results to return |

---

## 👤 Author

**Pablo Heidenreich**
- [LinkedIn](https://www.linkedin.com/in/pablo-heidenreich/)

---

## 📜 License

This project is for portfolio and personal use.