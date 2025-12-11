# The Piece President

> A satirical website tracking Trump's claimed "peace deals" against reality on the ground.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── globals.css         # Global styles
│   │   └── page.tsx            # Homepage (placeholder)
│   ├── components/             # All React components
│   │   ├── PieceEmoji.tsx      # Mascot component
│   │   ├── Gauge.tsx           # Score gauges
│   │   ├── Badge.tsx           # Status/trophy badges
│   │   ├── ConflictCard.tsx    # Conflict cards & grid
│   │   ├── ClaimQuote.tsx      # Trump quote styling
│   │   ├── RealityCheck.tsx    # Reality facts
│   │   ├── Trophy.tsx          # Trophy display
│   │   ├── Tombstone.tsx       # Cemetery tombstones
│   │   ├── Timeline.tsx        # Event timeline
│   │   ├── NewsFeed.tsx        # News cards & feeds
│   │   └── ARCHITECTURE.ts     # Component specs
│   ├── data/                   # All data & types
│   │   ├── conflicts.ts        # 9 conflicts with metadata
│   │   ├── timeline.ts         # 30+ chronological events
│   │   ├── news.ts             # News system & N8N config
│   │   └── index.ts            # Central exports
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/
│   └── images/
│       └── piece-emoji.png     # Mascot image
└── archive/                    # Old planning files

Total: ~2,800 lines of code
```

## 📊 Current Status

### ✅ Phase 1 Complete
- Next.js 15 initialized with TypeScript
- Tailwind CSS configured (brown/gold/cream palette)
- Google Fonts integrated (Playfair Display + Work Sans)
- All 10 core components built and ready
- All data prepared (9 conflicts, 30+ events, mock news)
- Mascot image deployed
- Development environment tested ✅

### 🚧 Next Steps (Phase 2 - MVP)
See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed roadmap.

**Priority order:**
1. Build Header & Footer components
2. Create Homepage with featured conflicts
3. Build dynamic conflict detail route
4. Add remaining pages (Rest in Piece, Trophy Case, Timeline, About, 404)
5. Deploy to Vercel

**Estimated time to MVP:** ~2.5 hours

## 🎨 Design System

### Colors
- **Brown palette** - Primary UI (50-900)
- **Gold palette** - Trump branding mockery (300-600)
- **Cream** - Background (#FDF6E3)

### Typography
- **Display:** Playfair Display (headlines)
- **Body:** Work Sans (content)

### Key Puns Used
- "Whirled Piece" - Interactive globe
- "Peace by Piece" - Timeline
- "Rest in Piece" - Cemetery
- "Piece of Work" - About page
- "Piece-o-Meter" - Score gauges

## 🌍 The 9 Conflicts

Current status as of data creation:

| Conflict | Score | Status | Trophy |
|----------|-------|--------|--------|
| Gaza | 65 | Shaky | 🥇 Gold |
| Ukraine | 25 | Ongoing | 🎖️ Participation |
| Thailand-Cambodia | 10 | **Collapsed** | 🪦 Tombstone |
| India-Pakistan | 40 | Disputed | 🎖️ Participation |
| Rwanda-DRC | 50 | Too Early | 🥈 Silver |
| Serbia-Kosovo | 70 | No Conflict | 👻 Phantom |
| Egypt-Ethiopia | 50 | No Conflict | 👻 Phantom |
| Israel-Iran | 55 | Shaky | 🥈 Silver |
| Armenia-Azerbaijan | 45 | Shaky | 🥈 Silver |

**Overall Score: 46/100 ("Half-Baked")**

## 📚 Documentation

- **[CLAUDE_CODE_HANDOFF.md](./CLAUDE_CODE_HANDOFF.md)** - Original project brief
- **[IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)** - Detailed implementation guide
- **[src/components/ARCHITECTURE.ts](./src/components/ARCHITECTURE.ts)** - Component specs

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Fonts:** Google Fonts
- **Deployment:** Vercel (ready)

## 🔑 Key Features (Planned)

- ✅ Satirical but factual content
- ✅ Real news integration (N8N webhooks)
- 🚧 Interactive globe with conflict markers
- 🚧 Auto-rotating news carousel
- 🚧 Dynamic conflict detail pages
- 🚧 Timeline of peace deal events
- 🚧 Trophy case with visual states
- 🚧 Cemetery for collapsed deals
- ✅ Mobile-first responsive design

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🚢 Deployment

This project is ready to deploy to Vercel with zero configuration:

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

No environment variables needed for MVP (unless using Mapbox/Google Maps for globe).

## 📄 License

This is a satirical/educational project. All data sources are properly attributed in the code.

---

**Ready to build!** 🎯

The data layer and components are complete. Just needs page assembly and navigation.
