# Voxra — Fast, Beautiful Real-Time Messaging App

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?style=flat&logo=capacitor)](https://capacitorjs.com)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Voxra** is a modern, feature-rich real-time messaging web application and Android app — inspired by Telegram and WhatsApp. Built with React, Vite, Supabase, and Capacitor.

---

## 🌐 Live Demo

> [voxra.app](https://voxra.app) _(coming soon)_

---

## 📸 Screenshots

_(Add screenshots here)_

---

## ✨ Features

### 💬 Messaging

- Real-time 1-on-1 chat
- Text, images, and emoji support
- Message auto-delete (1h / 6h / 12h / 24h / 7d / 30d)
- Disappearing messages mode per conversation
- Delete for me / Delete for everyone
- Read receipts

### 👤 User System

- Two-step sign up (details + username)
- Google OAuth sign in
- Forgot password / Reset password
- Email verification (configurable)
- Public / Private profile
- Short bio support
- Username change (5-day cooldown)

### 📊 Status & Posts

- Status updates (12h / 24h / 48h / 72h expiry)
- Posts (7d / 14d / 30d / permanent)
- Background colors, gradients, fonts customization
- Status reactions and replies
- Viewers list for own status
- Visibility control (Contacts / Everyone)

### 🎲 Random Chat

- Omegle-style anonymous matching
- Text and emoji only
- Instant connect / disconnect
- Username display on connect

### 🎨 UI & Themes

- Glassmorphism UI design
- 8 color themes
- Dark mode / Light mode
- Chat bubble styles
- Font size control
- Chat wallpapers

### 🔔 Notifications

- Browser push notifications
- Android push notifications (Capacitor)
- Notification preferences control

### 🛡️ Admin Panel (`/1234/admin`)

- Secure hardcoded login
- User management (view, edit, ban, delete)
- Status & Posts moderation
- Advanced message system (broadcast / direct)
- Message templates
- Scheduled messages
- Read receipts analytics
- App settings control (registration, random chat, status toggle)
- Dark glassmorphism admin UI

---

## 🛠️ Tech Stack

| Layer            | Technology                                        |
| ---------------- | ------------------------------------------------- |
| Frontend         | React 18 + TypeScript                             |
| Build Tool       | Vite 5                                            |
| Styling          | TailwindCSS 3 + Glassmorphism                     |
| State Management | Zustand                                           |
| Backend          | Supabase (PostgreSQL + Realtime + Auth + Storage) |
| Mobile           | Capacitor 5 (Android)                             |
| Charts           | Chart.js + react-chartjs-2                        |
| Routing          | React Router DOM v6                               |
| Data Fetching    | TanStack React Query v5                           |

---

## 📁 Project Structure

```
voxra/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── chat/          # Chat components
│   │   ├── common/        # Shared components
│   │   └── layout/        # Layout components
│   ├── pages/
│   │   ├── admin/         # Admin panel pages
│   │   ├── auth/          # Authentication pages
│   │   ├── chat/          # Chat window
│   │   ├── home/          # Home / chat list
│   │   ├── search/        # Search + Random chat
│   │   ├── settings/      # All settings pages
│   │   └── status/        # Status feed
│   ├── store/             # Zustand state stores
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Supabase client + utils
│   └── styles/            # Theme configurations
├── android/               # Capacitor Android project
├── public/                # Static assets
├── SUPABASE_SETUP.sql     # Database schema
└── capacitor.config.ts    # Capacitor configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Android Studio (for Android build only)

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/CyberNexus-X/Voxera.git
cd Voxera
```

**2. Install dependencies:**

```bash
npm install
```

**3. Setup environment variables:**

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**4. Setup Supabase database:**

- Create a new Supabase project
- Go to SQL Editor
- Run `SUPABASE_SETUP.sql`
- Run `SUPABASE_STATUS_POSTS.sql`
- Enable Google OAuth in Supabase Auth settings

**5. Start development server:**

```bash
npm run dev
```

Open `http://localhost:5173`

---

## 🏗️ Build for Production

### Web Build (cPanel deployment):

```bash
npm run build
```

Upload `dist/` folder to `public_html/` via cPanel File Manager.

Add `.htaccess` for React Router:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_URI} !^/1234/admin
RewriteRule ^ index.html [QSA,L]
```

### Android Build:

```bash
npm run build
npx cap sync android
npx cap open android
```

Generate APK/AAB in Android Studio.

---

## 🗄️ Database Schema

Key tables:

- `users` — user profiles, settings, theme config
- `conversations` — 1-on-1 chat threads
- `messages` — chat messages with auto-delete support
- `statuses` — 12-72 hour expiring status updates
- `posts` — 7-30 day or permanent posts
- `random_chat_sessions` — random chat matching
- `admin_messages` — admin broadcast/direct messages
- `app_settings` — global app configuration

Full schema in `SUPABASE_SETUP.sql`

---

## 📱 Android Setup

Voxra uses Capacitor for Android — Android status bar and navigation buttons remain visible (no fullscreen mode).

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: "com.voxra.app",
  appName: "Voxra",
  webDir: "dist",
  android: {
    backgroundColor: "#FFFFFF",
  },
};
```

Required permissions in `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.CAMERA"/>
```

---

## 🔐 Admin Panel

Access at: `yourdomain.com/1234/admin`

```
Username: admin
Password: khan
```

> ⚠️ Change credentials before production deployment.

**Admin Features:**

- Dashboard with real-time stats
- User management (ban, delete, edit)
- Status & Post moderation
- Advanced messaging system
- App settings control
- Dark glassmorphism UI

---

## 🌍 Deployment

### cPanel Hosting:

1. `npm run build`
2. Upload `dist/` to `public_html/`
3. Add `.htaccess` (see above)
4. Set environment variables

### Supabase:

- Free tier sufficient for development
- Pro tier recommended for production

---

## 🔧 Environment Variables

| Variable                 | Description            | Required |
| ------------------------ | ---------------------- | -------- |
| `VITE_SUPABASE_URL`      | Supabase project URL   | ✅       |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | ✅       |

---

## 📋 Roadmap

- [ ] Voice messages
- [ ] Video calls (WebRTC)
- [ ] Group chats
- [ ] Message reactions
- [ ] Story/Status views analytics
- [ ] Block/Report users
- [ ] iOS support (Capacitor)
- [ ] Desktop app (Electron)
- [ ] End-to-end encryption

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📬 Contact

Project Link: [https://github.com/CyberNexus-X/Voxera](https://github.com/CyberNexus-X/Voxera)

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com) — Open source Firebase alternative
- [Capacitor](https://capacitorjs.com) — Native mobile runtime
- [TailwindCSS](https://tailwindcss.com) — Utility-first CSS
- [React](https://reactjs.org) — UI library
- [Vite](https://vitejs.dev) — Next generation build tool

---

<p align='center'>
  Made with ❤️ by Voxra Team
  <br/>
  <strong>Fast. Beautiful. Connected.</strong>
</p>
