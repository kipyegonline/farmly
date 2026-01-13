# 🌱 Farmly

A modern, animated blog platform focused on sustainable agriculture, organic farming, and eco-friendly practices. Built with Next.js 15+ App Router, Mantine UI, and Contentful CMS.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.1+-blue?style=flat-square&logo=typescript)
![Mantine](https://img.shields.io/badge/Mantine-7.14+-339af0?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3+-38bdf8?style=flat-square&logo=tailwindcss)
![Contentful](https://img.shields.io/badge/Contentful-CMS-2478CC?style=flat-square&logo=contentful)

---

## ✨ Features

### Core Functionality

- 📰 **Article Management** — Dynamic articles fetched from Contentful CMS
- 🔍 **Pagination** — Reusable pagination component with custom hook (15 articles/page, 10 popular/page)
- 🌓 **Dark Mode** — Unified dark/light mode syncing system preference, Mantine, and Tailwind
- 📱 **Fully Responsive** — Mobile-first design with adaptive layouts

### UI/UX

- 🎨 **Animated Gradient Text** — Eye-catching sweeping gradient headlines
- ⬆️ **Scroll to Top** — Smooth scroll-to-top button using Mantine Affix
- 📊 **Loading States** — Skeleton loaders for better perceived performance
- 🚫 **Empty States** — Reusable empty state component with 4 variants (empty, error, no-results, coming-soon)
- 🔄 **Route Progress** — Visual navigation progress indicator
- ✉️ **Newsletter** — Animated footer with FormSubmit newsletter subscription

### Technical

- ⚡ **React Query** — Efficient data fetching with caching (5min stale time)
- 🖼️ **Contentful Images** — Optimized image loading with Next.js Image component
- 📝 **Rich Text Rendering** — Full Contentful rich text support
- 🎭 **View Transitions** — Smooth page transitions with View Transitions API

---

## 🗂️ Project Structure

```
farmly/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (server component)
│   ├── providers.tsx             # Client providers (Mantine, React Query, global UI)
│   ├── page.tsx                  # Home page (server component)
│   ├── home.tsx                  # Home page client component
│   ├── globals.css               # Global styles & animations
│   ├── ColorSchemeSync.tsx       # Syncs Mantine ↔ Tailwind dark mode
│   ├── not-found.tsx             # Global 404 page
│   ├── [article]/                # Dynamic article routes
│   │   ├── page.tsx              # Article page
│   │   ├── page.client.tsx       # Article client component
│   │   └── not-found.tsx         # Article 404
│   ├── posts/[slug]/             # Legacy post routes
│   └── api/                      # API routes
│       ├── draft/                # Draft mode
│       ├── disable-draft/        # Disable draft mode
│       └── revalidate/           # On-demand revalidation
│
├── components/
│   ├── Hero.tsx                  # Hero section
│   ├── RouterProgress.tsx        # Navigation progress bar
│   ├── Article/
│   │   ├── Article.tsx           # Single article component
│   │   └── Articlelist.tsx       # Article list with cards
│   ├── Header/
│   │   ├── index.tsx             # Main header wrapper
│   │   ├── DesktopHeader.tsx     # Desktop navigation
│   │   ├── MobileHeader.tsx      # Mobile navigation
│   │   └── MobileDrawer.tsx      # Mobile menu drawer
│   ├── Homepage/
│   │   └── index.tsx             # Homepage layout
│   ├── Sidebar/
│   │   └── index.tsx             # Sidebar with categories & popular articles
│   └── ui/
│       ├── Footer.tsx            # Animated footer with newsletter
│       ├── ScrollToTop.tsx       # Scroll to top button
│       ├── EmptyState.tsx        # Reusable empty/error states
│       └── PaginatedList.tsx     # Reusable pagination component
│
├── lib/
│   ├── api.ts                    # Contentful API functions
│   ├── constants.ts              # App constants
│   ├── utils.tsx                 # Utility functions & hooks (usePagination)
│   ├── contentful-image.tsx      # Contentful image component
│   ├── richtextrenderer.tsx      # Rich text rendering
│   └── markdown.tsx              # Markdown utilities
│
├── types/
│   └── types.ts                  # TypeScript type definitions
│
└── public/                       # Static assets
    └── site.webmanifest          # PWA manifest
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Contentful account with API keys

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kipyegonline/farmly
   cd farmly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
   CONTENTFUL_PREVIEW_SECRET=your_preview_secret
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

### Available Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start development server        |
| `npm run build` | Build for production            |
| `npm run start` | Start production server         |
| `npm run setup` | Set up Contentful content model |

---

## 🛠️ Tech Stack

| Category          | Technology                           |
| ----------------- | ------------------------------------ |
| **Framework**     | Next.js 15+ (App Router)             |
| **Language**      | TypeScript 5.1+                      |
| **UI Library**    | Mantine 7.14                         |
| **Styling**       | Tailwind CSS 3.3                     |
| **CMS**           | Contentful                           |
| **Data Fetching** | React Query (TanStack)               |
| **Icons**         | Lucide React                         |
| **Date Handling** | date-fns, dayjs                      |
| **Rich Text**     | @contentful/rich-text-react-renderer |

---

## 🌙 Dark Mode Architecture

Farmly uses a unified dark mode system that syncs:

1. **System Preference** → Mantine auto-detects via `defaultColorScheme="auto"`
2. **Toggle Button** → Uses `useMantineColorScheme().toggleColorScheme()`
3. **Mantine Components** → Automatically respond to color scheme
4. **Tailwind `dark:` Classes** → `ColorSchemeSync` component adds/removes `dark` class on `<html>`

```tsx
// The sync happens in ColorSchemeSync.tsx
const computedColorScheme = useComputedColorScheme("light");

useEffect(() => {
  document.documentElement.classList.toggle(
    "dark",
    computedColorScheme === "dark"
  );
}, [computedColorScheme]);
```

---

## 📦 Key Components

### `usePagination` Hook

Reusable pagination logic for any list:

```tsx
const { currentItems, activePage, setActivePage, totalPages } = usePagination(
  items,
  15
);
```

### `EmptyState` Component

4 variants for different scenarios:

- `empty` — No content yet
- `error` — Something went wrong
- `no-results` — Search returned nothing
- `coming-soon` — Feature in development

### `PaginatedList` Component

Wraps any list with pagination UI and handles empty states automatically.

---

## 🗺️ Roadmap

This is a growing project! Planned features include:

- [ ] **Search Functionality** — Full-text search across articles
- [ ] **Categories & Tags** — Filter articles by topic
- [ ] **Comments System** — Reader engagement
- [ ] **Author Profiles** — Dedicated author pages
- [ ] **Social Sharing** — Share articles on social media
- [ ] **Reading Progress** — Progress bar for articles
- [ ] **Bookmarks** — Save articles for later
- [ ] **PWA Support** — Offline reading capability
- [ ] **Analytics Dashboard** — Content performance metrics
- [ ] **Multi-language Support** — i18n implementation

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Mantine](https://mantine.dev/) for the beautiful UI components
- [Contentful](https://www.contentful.com/) for the headless CMS
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for the beautiful icons

---

<p align="center">
  Made with 💚 for sustainable agriculture
</p>
