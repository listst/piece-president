# The Piece President - Implementation Plan

**Status:** Next.js initialized ✅ | Ready for MVP development
**Last Updated:** December 11, 2024

---

## 📊 Project Status Overview

### ✅ Completed Setup (Phase 1)
- [x] Next.js 15 project initialized with TypeScript
- [x] Tailwind CSS configured with custom brown/gold/cream palette
- [x] Google Fonts integrated (Playfair Display + Work Sans)
- [x] Mascot image copied to `/public/images/piece-emoji.png`
- [x] All dependencies installed (React 19, Framer Motion, etc.)
- [x] Basic file structure created
- [x] Development environment ready

### 📦 Component Inventory

#### Ready-to-Use Components (10/10)
All components are production-ready and located in `/src/components/`:

| Component | File | Lines | Status | Purpose |
|-----------|------|-------|--------|---------|
| PieceEmoji | PieceEmoji.tsx | 72 | ✅ | Mascot with spin animation |
| Gauge | Gauge.tsx | 172 | ✅ | Animated SVG score gauge |
| StatusBadge | Badge.tsx | 67 | ✅ | Color-coded status pills |
| TrophyBadge | Badge.tsx | - | ✅ | Trophy type indicators |
| ConflictCard | ConflictCard.tsx | 129 | ✅ | Grid cards for conflicts |
| ClaimQuote | ClaimQuote.tsx | 110 | ✅ | Styled Trump quotes |
| RealityCheck | RealityCheck.tsx | 96 | ✅ | Reality fact display |
| Trophy | Trophy.tsx | 194 | ✅ | Visual trophy states |
| Tombstone | Tombstone.tsx | 152 | ✅ | Cemetery tombstones |
| Timeline | Timeline.tsx | 198 | ✅ | Vertical timeline |
| NewsCard/Feed | NewsFeed.tsx | 155 | ✅ | News display system |

#### Components to Build (7 remaining)

| Component | Priority | Complexity | Est. Time | Notes |
|-----------|----------|------------|-----------|-------|
| Header | CRITICAL | Medium | 20 min | Navigation, logo, mobile menu |
| Footer | CRITICAL | Low | 10 min | Links, credits, sources |
| WhirledPieceGlobe | HIGH | High | 30-45 min | Interactive map - see research below |
| NewsCarousel | MEDIUM | Medium | 15 min | Auto-rotating news cards |
| FeaturedConflicts | LOW | Low | 10 min | Grid wrapper for ConflictCard |
| ConflictMap | LOW | Low | 15 min | Simple location marker |
| 404Content | LOW | Trivial | 5 min | Error page layout |

---

## 🗂️ Data Layer Status

### ✅ 100% Complete
Located in `/src/data/`:

- **conflicts.ts** (661 lines) - All 9 conflicts with full metadata
  - Claims, reality checks, scores, coordinates
  - Keywords for news scraping
  - Trophy types and status

- **timeline.ts** (369 lines) - 30+ chronological events
  - Covers all conflicts across 2025
  - Event types: claim, deal-signed, reality-check, collapse, escalation

- **news.ts** (318 lines) - News system ready
  - Mock news data for development
  - N8N webhook integration types
  - Sentiment classification
  - News source database

- **lib/utils.ts** (92 lines) - Utilities ready
  - `cn()`, `formatDate()`, `daysSince()`, `debounce()`, etc.

---

## 📄 Page Implementation Plan

### Priority Order & Architecture

#### 1️⃣ CRITICAL: Homepage (`/`)
**Route:** `/src/app/page.tsx`
**Status:** Placeholder created, needs full implementation
**Est. Time:** 30 minutes

**Components Needed:**
```tsx
- Header (to build)
- WhirledPieceGlobe (to build - see research)
- OverallPieceScore (Gauge wrapper)
- FeaturedConflicts (ConflictCard grid)
- NewsCarousel (to build)
- Footer (to build)
```

**Layout:**
```
┌────────────────────────────────────┐
│          HEADER                    │
├────────────────────────────────────┤
│  🌍 Whirled Piece (Hero)          │
│  [Interactive Globe + Mascot]      │
├────────────────────────────────────┤
│  Overall Piece Score: 46/100       │
│  [Large Gauge - "Half-Baked"]      │
├────────────────────────────────────┤
│  Featured Conflicts (3x3 Grid)     │
│  [ConflictCard × 9]                │
├────────────────────────────────────┤
│  Latest News (Auto-rotating)       │
│  [NewsCarousel]                    │
├────────────────────────────────────┤
│          FOOTER                    │
└────────────────────────────────────┘
```

#### 2️⃣ CRITICAL: Conflict Detail (`/zones/[slug]`)
**Route:** `/src/app/zones/[slug]/page.tsx`
**Status:** Not created
**Est. Time:** 25 minutes

**Components Needed:**
```tsx
- Header
- ConflictMap (simple location marker)
- ClaimQuote (already built)
- RealityCheck (already built)
- Gauge (for Piece-o-Meter)
- NewsFeed (already built)
- Footer
```

**Dynamic Route Setup:**
```typescript
// Generate static params for all 9 conflicts
export async function generateStaticParams() {
  return conflicts.map(c => ({ slug: c.slug }));
}
```

**Layout:**
```
┌────────────────────────────────────┐
│  [Flag] Conflict Name              │
│  Status Badge | Trophy Badge       │
├────────────────────────────────────┤
│  📍 Map Location Indicator         │
├────────────────────────────────────┤
│  🗣️ "The Claim"                    │
│  [ClaimQuote]                      │
├────────────────────────────────────┤
│  ✅ "The Reality"                   │
│  [RealityCheck]                    │
├────────────────────────────────────┤
│  Piece-o-Meter: 65/100             │
│  [Gauge with explanation]          │
├────────────────────────────────────┤
│  📰 News Feed                       │
│  [NewsFeed for this conflict]      │
└────────────────────────────────────┘
```

#### 3️⃣ HIGH: Rest in Piece (`/rest-in-piece`)
**Route:** `/src/app/rest-in-piece/page.tsx`
**Status:** Not created
**Est. Time:** 15 minutes

**Components Needed:**
```tsx
- Header
- Tombstone (already built)
- Cemetery wrapper (simple div with fog effect)
- Footer
```

**Current Collapsed Deals:**
- Thailand-Cambodia (score: 10)
- (More may be added as deals collapse)

**Layout:**
```
┌────────────────────────────────────┐
│  🪦 Rest in Piece                  │
│  A cemetery of collapsed deals     │
├────────────────────────────────────┤
│  [Fog/mist CSS effect]             │
│                                    │
│    🪦              🪦               │
│  Thailand-     [Empty spots        │
│  Cambodia       for future]        │
│                                    │
└────────────────────────────────────┘
```

#### 4️⃣ MEDIUM: Trophy Case (`/trophy-case`)
**Route:** `/src/app/trophy-case/page.tsx`
**Status:** Not created
**Est. Time:** 20 minutes

**Components Needed:**
```tsx
- Header
- Trophy (already built)
- TrophyCase wrapper (glass display effect)
- Footer
```

**Trophy Types:**
- 🥇 Gold: Gaza (legitimate achievement)
- 🥈 Silver: Rwanda-DRC, Israel-Iran, Armenia-Azerbaijan
- 🎖️ Participation: Ukraine, India-Pakistan
- 🪦 Tombstone: Thailand-Cambodia
- 👻 Phantom: Serbia-Kosovo, Egypt-Ethiopia

**Layout:**
```
┌────────────────────────────────────┐
│  🏆 The Trophy Case                │
│  "Participation trophies abound"   │
├────────────────────────────────────┤
│  [Glass case CSS effect]           │
│  ┌─────────────────────────────┐  │
│  │  🥇    🥈    🥈    🥈        │  │
│  │ Gaza  RW-DRC Iran Arm-Az    │  │
│  │                              │  │
│  │  🎖️    🎖️    🪦    👻    👻 │  │
│  │ Ukraine India Thai Serb Egypt│  │
│  └─────────────────────────────┘  │
└────────────────────────────────────┘
```

#### 5️⃣ MEDIUM: Peace by Piece (`/peace-by-piece`)
**Route:** `/src/app/peace-by-piece/page.tsx`
**Status:** Not created
**Est. Time:** 15 minutes

**Components Needed:**
```tsx
- Header
- Timeline (already built)
- Filter buttons (simple state)
- Footer
```

**Features:**
- Display all 30+ events from timeline.ts
- Filter by conflict
- Filter by event type
- Chronological order (most recent first)

#### 6️⃣ LOW: About (`/piece-of-work`)
**Route:** `/src/app/piece-of-work/page.tsx`
**Status:** Not created
**Est. Time:** 10 minutes

**Static Content:**
- Methodology
- Data sources
- About the project
- How scores are calculated
- Contact/feedback

#### 7️⃣ LOW: 404 Page
**Route:** `/src/app/not-found.tsx`
**Status:** Not created
**Est. Time:** 5 minutes

**Simple layout:**
```tsx
<div className="text-center">
  <PieceEmoji size="hero" />
  <h1>This peace deal could not be found</h1>
  <p>Perhaps it collapsed before you got here?</p>
  <Link href="/">Return Home</Link>
</div>
```

---

## 🔌 API Routes Plan

### For MVP: Static Imports
Keep it simple - import from TypeScript files directly.

### Post-MVP: JSON API Routes

#### `/api/conflicts` - GET all conflicts
```typescript
// /src/app/api/conflicts/route.ts
import { conflicts } from '@/data';
export async function GET() {
  return Response.json(conflicts);
}
```

#### `/api/conflicts/[slug]` - GET single conflict
```typescript
// /src/app/api/conflicts/[slug]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const conflict = conflicts.find(c => c.slug === params.slug);
  return Response.json(conflict || { error: 'Not found' });
}
```

#### `/api/news` - GET all news
```typescript
// /src/app/api/news/route.ts
import { mockNews } from '@/data';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conflictId = searchParams.get('conflict');

  const filtered = conflictId
    ? mockNews.filter(n => n.conflictId === conflictId)
    : mockNews;

  return Response.json(filtered);
}
```

#### `/api/news/webhook` - POST from N8N
```typescript
// /src/app/api/news/webhook/route.ts
import { transformN8NPayload, N8NNewsPayload } from '@/data';

export async function POST(request: Request) {
  const payload: N8NNewsPayload = await request.json();
  const newsItems = transformN8NPayload(payload);

  // TODO: Store to database or JSON file
  // For now, just validate and return

  return Response.json({
    success: true,
    count: newsItems.length
  });
}
```

---

## 🌍 Interactive Globe Research

### Requirements
- Display world map with 9 conflict hotspots
- Position PieceEmoji mascot on map
- Click to spin emoji, randomly land on conflict
- Click hotspot to navigate to conflict detail
- Mobile responsive
- Performant (not heavy 3D rendering)

### Option 1: React Simple Maps (RECOMMENDED)
**Library:** `react-simple-maps`
**Pros:**
- ✅ Lightweight SVG-based maps
- ✅ Easy to add markers/pins
- ✅ Great performance
- ✅ Highly customizable
- ✅ Works well on mobile

**Cons:**
- ❌ Less "wow factor" than 3D
- ❌ Static projection (not spinning globe)

**Installation:**
```bash
npm install react-simple-maps
```

**Example Implementation:**
```tsx
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

export function ConflictMap() {
  return (
    <ComposableMap>
      <Geographies geography="/geo/world-110m.json">
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {conflicts.map(conflict => (
        <Marker
          key={conflict.id}
          coordinates={conflict.coordinates}
        >
          {/* Conflict marker */}
        </Marker>
      ))}
    </ComposableMap>
  );
}
```

### Option 2: Mapbox GL JS
**Library:** `react-map-gl`
**Pros:**
- ✅ You have Mapbox account
- ✅ Beautiful interactive maps
- ✅ Smooth zoom/pan
- ✅ 3D buildings/terrain available

**Cons:**
- ❌ Heavier bundle size
- ❌ API key required (rate limits)
- ❌ More complex setup

**Installation:**
```bash
npm install react-map-gl mapbox-gl
```

**Requires:** `.env.local` with `NEXT_PUBLIC_MAPBOX_TOKEN`

### Option 3: Google Maps React
**Library:** `@vis.gl/react-google-maps`
**Pros:**
- ✅ You have Google Maps account
- ✅ Familiar UI
- ✅ Good street view integration

**Cons:**
- ❌ API costs
- ❌ Generic look
- ❌ Less control over styling

### Option 4: React Globe GL (3D)
**Library:** `react-globe.gl`
**Pros:**
- ✅ Stunning 3D globe
- ✅ True "spinning" globe effect
- ✅ "Wow factor" for hero

**Cons:**
- ❌ Heavy bundle (WebGL required)
- ❌ Can be slow on mobile
- ❌ Overkill for MVP

### Option 5: Custom SVG Map (SIMPLEST)
**Pros:**
- ✅ Zero dependencies
- ✅ Full control
- ✅ Lightest weight
- ✅ Perfect for MVP

**Cons:**
- ❌ More manual work
- ❌ No built-in interactions

**Example:**
```tsx
export function SimpleWorldMap() {
  return (
    <svg viewBox="0 0 1000 500" className="w-full h-auto">
      {/* SVG world map paths */}
      {conflicts.map(conflict => (
        <g key={conflict.id}>
          <circle
            cx={coordsToSVG(conflict.coordinates).x}
            cy={coordsToSVG(conflict.coordinates).y}
            r="8"
            className="fill-gold-500 cursor-pointer hover:scale-110"
            onClick={() => router.push(`/zones/${conflict.slug}`)}
          />
        </g>
      ))}
    </svg>
  );
}
```

### 🎯 Recommendation for MVP

**Start with Option 5 (Custom SVG)** for homepage hero, then upgrade to **Option 1 (React Simple Maps)** if you want more polish.

**Implementation Steps:**
1. Find a public domain SVG world map (e.g., from Wikimedia)
2. Add to `/public/maps/world.svg`
3. Create `<WhirledPieceGlobe>` component
4. Position conflict markers using coordinates
5. Add PieceEmoji overlay with spin animation
6. Wire up click handlers

**Time Estimate:** 30-45 minutes for custom SVG version

---

## 🎠 News Carousel Research

### Requirements
- Auto-rotate news cards
- Show 1 card at a time
- Smooth transitions
- Pause on hover
- Mobile swipe support
- Navigation dots/arrows

### Option 1: Framer Motion (RECOMMENDED)
**Already installed!** ✅

**Pros:**
- ✅ Already in dependencies
- ✅ Powerful animations
- ✅ Simple API
- ✅ Great for custom carousels

**Example:**
```tsx
import { motion, AnimatePresence } from 'framer-motion';

export function NewsCarousel({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
      >
        <NewsCard news={items[index]} />
      </motion.div>
    </AnimatePresence>
  );
}
```

### Option 2: Embla Carousel
**Library:** `embla-carousel-react`

**Pros:**
- ✅ Lightweight
- ✅ Touch/swipe support
- ✅ Customizable

**Cons:**
- ❌ Additional dependency
- ❌ More setup than Framer

### Option 3: Swiper
**Library:** `swiper`

**Pros:**
- ✅ Feature-rich
- ✅ Mobile-first

**Cons:**
- ❌ Large bundle size
- ❌ Overkill for simple carousel

### 🎯 Recommendation
**Use Framer Motion** - it's already installed and perfect for auto-rotating cards.

---

## 📱 Mobile-First Responsive Design

### Breakpoints (Tailwind defaults)
- `sm:` 640px - Small tablets
- `md:` 768px - Tablets
- `lg:` 1024px - Laptops
- `xl:` 1280px - Desktops

### Key Responsive Patterns

#### Header Navigation
```tsx
// Mobile: Hamburger menu
// Desktop: Full horizontal nav
<header>
  <div className="md:hidden">
    <HamburgerMenu />
  </div>
  <nav className="hidden md:flex">
    <NavLinks />
  </nav>
</header>
```

#### Featured Conflicts Grid
```tsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {conflicts.map(c => <ConflictCard key={c.id} {...c} />)}
</div>
```

#### Typography Scaling
```tsx
// Mobile: Smaller text
// Desktop: Larger text
<h1 className="text-4xl md:text-5xl lg:text-6xl font-display">
  The Piece President
</h1>
```

---

## 🚀 Deployment Checklist

### Vercel Deployment (Zero Config)

1. **Environment Variables** (if using Mapbox/Google Maps)
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_token
   ```

2. **Build Command:** `npm run build`

3. **Output Directory:** `.next`

4. **Install Command:** `npm install`

5. **Framework:** Next.js (auto-detected)

6. **Node Version:** 22.x (specified in package.json engines)

### Pre-Deployment Testing
- [ ] `npm run build` succeeds locally
- [ ] All pages render correctly
- [ ] Images load properly
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] No console errors

### Performance Optimizations
- [x] Next.js Image component used (automatic optimization)
- [x] Fonts optimized with next/font
- [ ] Implement loading states
- [ ] Add metadata for SEO
- [ ] Enable static generation where possible

---

## 📝 Implementation Timeline

### Estimated Total Time: ~3 hours

#### Phase 1: Core Infrastructure (Complete! ✅)
- ✅ Next.js setup - 15 min
- ✅ Dependencies - 5 min
- ✅ Config files - 10 min
- **Total: 30 minutes**

#### Phase 2: Layout Components (Next)
- Header with navigation - 20 min
- Footer - 10 min
- Mobile menu - 15 min
- **Total: 45 minutes**

#### Phase 3: Homepage
- WhirledPieceGlobe (simple version) - 30 min
- Overall score section - 10 min
- Featured conflicts grid - 10 min
- News carousel - 15 min
- Wire it all together - 10 min
- **Total: 75 minutes**

#### Phase 4: Other Pages
- Conflict detail route - 25 min
- Rest in Piece - 15 min
- Trophy Case - 20 min
- Timeline page - 15 min
- About page - 10 min
- [x] 404 page - 5 min
- **Total: 90 minutes**

#### Phase 5: Polish & Deploy
- [x] Test all routes - 15 min
- [x] Fix bugs - 15 min
- [ ] Deploy to Vercel - 10 min
- **Total: 40 minutes**

**Grand Total: ~4.5 hours from zero to deployed MVP**

---

## 🎨 Design System Reference

### Color Palette
```css
/* Browns - primary */
brown-50: #FDF8F3  /* Lightest background */
brown-100: #F5E6D3 /* Light accent */
brown-500: #8B6914 /* Medium text */
brown-900: #1A1A1A /* Dark text */

/* Gold - Trump branding mockery */
gold-300: #FFE066  /* Light gold */
gold-400: #FFD700  /* Classic gold */
gold-500: #DAA520  /* Medium gold */

/* Cream - main background */
cream: #FDF6E3
```

### Typography Scale
```tsx
// Display (Playfair) - headlines
<h1 className="text-6xl font-display">   // 60px
<h2 className="text-4xl font-display">   // 36px
<h3 className="text-2xl font-display">   // 24px

// Body (Work Sans) - content
<p className="text-lg">    // 18px
<p className="text-base">  // 16px
<p className="text-sm">    // 14px
```

### Spacing System
```tsx
// Use Tailwind spacing scale
gap-4   // 1rem / 16px
gap-6   // 1.5rem / 24px
gap-8   // 2rem / 32px
p-6     // padding 1.5rem
mt-8    // margin-top 2rem
```

---

## 🔮 Post-MVP Enhancements

**Not required for launch, but nice to have:**

1. **Interactive 3D Globe**
   - Upgrade to React Globe GL
   - Spinning globe with conflict markers
   - Click to spin, land on random conflict

2. **Real-time News Integration**
   - Connect N8N webhook
   - Store news in database (Supabase/Vercel Postgres)
   - Auto-update news feeds

3. **Score History**
   - Track score changes over time
   - Show graphs of conflict escalation/de-escalation
   - "Piece-o-Meter" historical data

4. **Social Sharing**
   - Generate OG images for each conflict
   - Twitter/Facebook share cards
   - "Share this deal" buttons

5. **Admin Panel**
   - Update scores manually
   - Add new events to timeline
   - Moderate news items

6. **Analytics**
   - Track which conflicts get most views
   - See user engagement
   - A/B test headlines

---

## 📚 Resources & Links

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Simple Maps](https://www.react-simple-maps.io/)

### Assets Needed
- ✅ Mascot image (already at `/public/images/piece-emoji.png`)
- [ ] World map SVG (find public domain)
- [ ] Favicon (create from mascot)
- [ ] OG image for social sharing

### Data Sources Referenced
All sources are documented in `/src/data/conflicts.ts` with URLs:
- Reuters, AP, BBC, CNN, New York Times
- Government statements
- UN reports
- Think tank analyses

---

## 🎯 Next Steps

1. **Build Header Component**
   - Logo (PieceEmoji + text)
   - Navigation links
   - Hamburger menu for mobile

2. **Build Footer Component**
   - Quick links
   - Data sources
   - "This is satire" disclaimer

3. **Implement Homepage**
   - Start with simple SVG map
   - Add featured conflicts grid
   - Build news carousel with Framer Motion

4. **Create Dynamic Route**
   - Conflict detail template
   - Wire up existing components

5. **Deploy to Vercel**
   - Test production build
   - Share for feedback

---

**Ready to build!** 🚀

All the hard work (data modeling, component architecture) is done. Now it's just assembly and polish.
