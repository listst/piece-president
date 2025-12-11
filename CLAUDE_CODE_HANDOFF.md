# The Piece President - Claude Code Handoff

## 🎯 Project Overview

**The Piece President** is a satirical website that tracks Donald Trump's claimed "peace deals" against reality on the ground. The name is a pun on "peace" - Trump is the "Piece" (💩) President aiming for "peace."

### Core Concept
- Track 9 conflicts Trump claims to have solved
- Display claims vs. reality with news feeds
- Use humor and wit while maintaining factual accuracy
- The mascot is a poop emoji with Trump's hair (image provided)

### Key Puns/Wordplay Used Throughout
- **"Whirled Piece"** - Interactive spinning globe (world + whirled)
- **"Peace by Piece"** - Timeline of events
- **"Rest in Piece"** - Cemetery for collapsed deals
- **"Piece of Work"** - About page
- **"Peace-o-Meter"** - Gauges showing peace scores
- **404: "This peace deal could not be found"**
- **Loading: "Whirling the piece..."**

---

## 📁 Files Provided

You have been given a `src/` folder with the following structure:

```
src/
├── data/
│   ├── conflicts.ts      # All 9 conflicts with full metadata, claims, reality checks
│   ├── timeline.ts       # 30+ chronological events for Peace by Piece
│   ├── news.ts           # News types, mock data, n8n integration config
│   └── index.ts          # Central exports
│
├── components/
│   ├── ARCHITECTURE.ts   # Full component specs and page layouts (READ THIS FIRST)
│   ├── index.ts          # Component exports
│   ├── ui/
│   │   ├── PieceEmoji.tsx    # Mascot component (needs image path update)
│   │   ├── Gauge.tsx         # Score gauges with animation
│   │   └── Badge.tsx         # Status and trophy badges
│   ├── conflicts/
│   │   ├── ConflictCard.tsx  # Card for conflict display
│   │   ├── ClaimQuote.tsx    # Styled Trump quote block
│   │   └── RealityCheck.tsx  # Reality facts display
│   ├── timeline/
│   │   └── Timeline.tsx      # Filterable timeline component
│   ├── trophies/
│   │   └── Trophy.tsx        # Trophy and TrophyCase components
│   ├── cemetery/
│   │   └── Tombstone.tsx     # Tombstone and Cemetery components
│   └── news/
│       └── NewsFeed.tsx      # NewsCard, NewsFeed, NewsTicker
│
├── lib/
│   └── utils.ts          # Utility functions (cn, formatDate, etc.)
│
└── app/
    └── page.tsx          # Partial homepage reference (incomplete)
```

---

## 🚀 Getting Started

### 1. Initialize Next.js Project

```bash
npx create-next-app@latest piece-president --typescript --tailwind --eslint --app --src-dir
cd piece-president
```

### 2. Install Dependencies

```bash
npm install clsx tailwind-merge framer-motion
# Optional for globe: npm install react-simple-maps
```

### 3. Copy Provided Files

Copy the provided `src/data/`, `src/components/`, and `src/lib/` folders into your project.

### 4. Add the Mascot Image

The user has an image of a poop emoji with Trump hair. Save it to:
```
public/images/piece-emoji.png
```

### 5. Update Tailwind Config

Add custom colors to `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#FDF8F3',
          100: '#F5E6D3',
          200: '#E0D5C1',
          300: '#C4A484',
          400: '#A67C52',
          500: '#8B6914',
          600: '#6B4F0F',
          700: '#4A3728',
          800: '#3D2914',
          900: '#1A1A1A',
        },
        gold: {
          300: '#FFE066',
          400: '#FFD700',
          500: '#DAA520',
          600: '#B8860B',
        },
        cream: '#FDF6E3',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Work Sans', '-apple-system', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 6. Add Google Fonts

In `src/app/layout.tsx`:

```typescript
import { Playfair_Display, Work_Sans } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
});

const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-body',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${workSans.variable}`}>
      <body className="font-body bg-cream">{children}</body>
    </html>
  );
}
```

---

## 📄 Pages to Build

### Priority Order:

1. **Homepage (`/`)** - Most important
   - Whirled Piece globe with spinning emoji
   - Overall Piece Score gauge
   - Featured conflicts grid
   - News ticker

2. **Conflict Detail (`/zones/[slug]`)** - Core content
   - Dynamic route for each conflict
   - ClaimQuote, RealityCheck, PieceOMeter
   - News feed for that conflict

3. **Rest in Piece (`/rest-in-piece`)** - High visual impact
   - Cemetery with tombstones for collapsed deals
   - Currently: Thailand-Cambodia

4. **Trophy Case (`/trophy-case`)** - Fun visual
   - Glass display case with all trophies
   - Visual states (gold, silver, cracked, ghostly)

5. **Peace by Piece (`/peace-by-piece`)** - Timeline
   - Filterable timeline of events
   - All 30+ events from timeline.ts

6. **About (`/piece-of-work`)** - Simple
   - Methodology, sources, explanation

7. **404 Page** - Quick win
   - "This peace deal could not be found"
   - Sad PieceEmoji

---

## 🎨 Design Direction

### Aesthetic
- **Satirical but substantive** - Funny but factual
- **Tacky gold/brown palette** - Mocking opulence
- **Editorial quality** - Not cheap-looking despite humor
- **Mobile-first responsive**

### Key Visual Elements
- The poop emoji mascot should be prominent
- Gold accents for "Trump branding" mockery
- Red for collapsed/failed deals
- Glass effect for trophy case
- Fog/mist for cemetery
- Cracked textures for shaky deals

### Typography
- **Display (headlines):** Playfair Display - mock gravitas
- **Body:** Work Sans - clean readability

---

## 📊 Data Structure Quick Reference

### Conflict Statuses
- `holding` - Ceasefire actually working (green)
- `shaky` - Fragile/violated (yellow)
- `collapsed` - Deal fell apart (red) 
- `disputed` - Country disputes Trump's role (orange)
- `no-conflict` - There was no war to end (gray)
- `ongoing` - Negotiations, no deal yet (blue)
- `too-early` - Too recent to evaluate (purple)

### Trophy Types
- `gold` - Legitimate achievement (Gaza)
- `silver` - Partial credit
- `participation` - Disputed/minimal role
- `tombstone` - Collapsed deal (Thailand-Cambodia)
- `phantom` - No actual conflict existed

### Current Scores (as of data creation)
| Conflict | Score | Status | Trophy |
|----------|-------|--------|--------|
| Gaza | 65 | shaky | gold |
| Ukraine | 25 | ongoing | participation |
| Thailand-Cambodia | 10 | **collapsed** | tombstone |
| India-Pakistan | 40 | disputed | participation |
| Rwanda-DRC | 50 | too-early | silver |
| Serbia-Kosovo | 70 | no-conflict | phantom |
| Egypt-Ethiopia | 50 | no-conflict | phantom |
| Israel-Iran | 55 | shaky | silver |
| Armenia-Azerbaijan | 45 | shaky | silver |

**Overall Score: ~46/100 ("Half-Baked")**

---

## 🌍 Whirled Piece Globe Implementation

The homepage hero should have an interactive element where:

1. User sees a world map/globe with conflict hotspots marked
2. The PieceEmoji mascot is positioned on the map
3. Clicking "Spin" makes the emoji spin and randomly land on a conflict
4. Clicking a hotspot or the landed conflict goes to its detail page

**Options for implementation:**
- Simple: SVG world map with positioned dots
- Medium: `react-simple-maps` with markers
- Advanced: `react-globe.gl` for 3D globe

Start simple - an SVG map with CSS animations works fine for MVP.

---

## 🔌 N8N Integration (Future)

The user has an n8n news scraper. The `src/data/news.ts` file includes:

- `N8NNewsPayload` type - expected webhook payload shape
- `transformN8NPayload()` - transforms n8n data to app format
- `scrapeConfig` - keywords per conflict for scraping

For MVP, use the `mockNews` data. Later, create an API route:

```typescript
// src/app/api/news/route.ts
import { NextResponse } from 'next/server';
import { transformN8NPayload, N8NNewsPayload } from '@/data';

export async function POST(request: Request) {
  const payload: N8NNewsPayload = await request.json();
  const newsItems = transformN8NPayload(payload);
  // Store to database or JSON file
  return NextResponse.json({ success: true, count: newsItems.length });
}
```

---

## ✅ Component Checklist

### Ready to Use (just need styling tweaks)
- [x] PieceEmoji - Update image path
- [x] Gauge / OverallPieceScore
- [x] StatusBadge / TrophyBadge
- [x] ConflictCard / FeaturedConflicts
- [x] ClaimQuote
- [x] RealityCheck
- [x] Timeline
- [x] Trophy / TrophyCase
- [x] Tombstone / Cemetery
- [x] NewsCard / NewsFeed / NewsTicker

### Need to Build
- [ ] Header with navigation
- [ ] Footer
- [ ] Mobile menu
- [ ] WhirledPieceGlobe (interactive map)
- [ ] ConflictMap (simple location indicator)
- [ ] Layout wrapper
- [ ] 404 page content

---

## 🏃 Quick Start Commands

```bash
# After setup, run development server
npm run dev

# Build for production
npm run build

# The site should be deployable to Vercel with zero config
```

---

## 📝 Notes for Claude Code

1. **Read `ARCHITECTURE.ts` first** - It has ASCII layouts for each page

2. **The data is comprehensive** - All conflicts, events, and mock news are ready

3. **Components are functional** - They just need to be wired into pages

4. **Start with homepage** - Get the core loop working first

5. **The humor should be dry** - Let the data speak for itself; the juxtaposition of claims vs. reality IS the joke

6. **Mobile matters** - Many users will share this on social media

7. **Keep it fast** - Static generation where possible, the data doesn't change often

8. **The mascot image** - User needs to provide this; it's a poop emoji with blonde Trump hair

---

## 🎯 MVP Definition

A successful MVP has:
1. ✅ Homepage with featured conflicts and overall score
2. ✅ Individual conflict pages with claims vs. reality
3. ✅ Rest in Piece cemetery (Thailand-Cambodia is there)
4. ✅ Working navigation between pages
5. ✅ Mobile responsive
6. ✅ Deployable to Vercel

Nice to have but not required for MVP:
- Interactive spinning globe (can be static map)
- News ticker animation
- Trophy case with full animations
- Timeline filters
- API integration with n8n

---

Good luck! This project has good bones - the data layer is solid and components are mostly built. Focus on wiring it together into a cohesive, deployable site.

**Remember: The best satire is accurate.** Let the facts do the heavy lifting.
