/**
 * The Piece President - Component Architecture
 * 
 * This file documents the component structure for the site.
 * Use this as a guide when building with Claude Code.
 */

// ============================================================================
// DIRECTORY STRUCTURE
// ============================================================================

/*
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with fonts, metadata
│   ├── page.tsx                  # Homepage with Whirled Piece globe
│   ├── globals.css               # Global styles, Tailwind config
│   ├── peace-by-piece/
│   │   └── page.tsx              # Timeline page
│   ├── zones/
│   │   └── [slug]/
│   │       └── page.tsx          # Individual conflict pages
│   ├── trophy-case/
│   │   └── page.tsx              # Trophy display
│   ├── rest-in-piece/
│   │   └── page.tsx              # Cemetery for collapsed deals
│   ├── piece-of-work/
│   │   └── page.tsx              # About/methodology
│   └── api/
│       └── news/
│           └── route.ts          # API endpoint for n8n webhook
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Site header with nav
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Navigation.tsx        # Main navigation
│   │   └── MobileMenu.tsx        # Mobile nav drawer
│   │
│   ├── home/
│   │   ├── WhirledPieceGlobe.tsx # Spinning globe/map with emoji
│   │   ├── OverallPieceScore.tsx # Main gauge showing overall score
│   │   ├── FeaturedConflicts.tsx # Grid of featured conflict cards
│   │   └── NewsTicker.tsx        # Scrolling news ticker
│   │
│   ├── conflicts/
│   │   ├── ConflictCard.tsx      # Card for conflict display
│   │   ├── ConflictDetail.tsx    # Full conflict page content
│   │   ├── ClaimQuote.tsx        # Styled Trump quote block
│   │   ├── RealityCheck.tsx      # Reality facts display
│   │   ├── PieceOMeter.tsx       # Individual conflict gauge
│   │   ├── StatusBadge.tsx       # Status indicator badge
│   │   └── ConflictMap.tsx       # Map showing conflict location
│   │
│   ├── timeline/
│   │   ├── Timeline.tsx          # Main timeline component
│   │   ├── TimelineEvent.tsx     # Individual event item
│   │   └── TimelineFilters.tsx   # Filter by type/conflict
│   │
│   ├── trophies/
│   │   ├── TrophyCase.tsx        # Grid of trophies
│   │   ├── Trophy.tsx            # Individual trophy with states
│   │   └── TrophyModal.tsx       # Click to see details
│   │
│   ├── cemetery/
│   │   ├── Cemetery.tsx          # Rest in Piece graveyard
│   │   └── Tombstone.tsx         # Individual tombstone
│   │
│   ├── news/
│   │   ├── NewsFeed.tsx          # News list for a conflict
│   │   ├── NewsCard.tsx          # Individual news item
│   │   └── SentimentIndicator.tsx # Pos/neg/neutral indicator
│   │
│   └── ui/
│       ├── PieceEmoji.tsx        # The mascot emoji component
│       ├── SpinningLoader.tsx    # Loading spinner (spinning emoji)
│       ├── Gauge.tsx             # Reusable gauge component
│       ├── Badge.tsx             # Reusable badge
│       ├── Card.tsx              # Base card component
│       ├── Button.tsx            # Styled button
│       ├── Tooltip.tsx           # Hover tooltips
│       └── Modal.tsx             # Modal dialog
│
├── data/                         # Our data files
│   ├── conflicts.ts
│   ├── timeline.ts
│   ├── news.ts
│   └── index.ts
│
├── lib/
│   ├── utils.ts                  # Utility functions
│   └── constants.ts              # Constants and config
│
├── hooks/
│   ├── useConflict.ts            # Hook for conflict data
│   ├── useNews.ts                # Hook for news data
│   └── useAnimation.ts           # Animation helpers
│
└── types/
    └── index.ts                  # Shared TypeScript types

*/

// ============================================================================
// COMPONENT SPECIFICATIONS
// ============================================================================

export const componentSpecs = {
  // ---------------------------------------------------------------------------
  // LAYOUT COMPONENTS
  // ---------------------------------------------------------------------------
  
  Header: {
    description: 'Site header with logo, navigation, and overall piece score',
    props: {},
    features: [
      'Sticky header on scroll',
      'PieceEmoji as logo that spins on hover',
      'Navigation links to main sections',
      'Mobile hamburger menu',
      'Overall Piece Score badge in header',
    ],
  },

  Navigation: {
    description: 'Main navigation menu',
    props: {},
    links: [
      { href: '/', label: 'Whirled Piece', icon: '🌍' },
      { href: '/peace-by-piece', label: 'Peace by Piece', icon: '📅' },
      { href: '/trophy-case', label: 'Trophy Case', icon: '🏆' },
      { href: '/rest-in-piece', label: 'Rest in Piece', icon: '🪦' },
      { href: '/piece-of-work', label: 'About', icon: '💩' },
    ],
  },

  // ---------------------------------------------------------------------------
  // HOME PAGE COMPONENTS
  // ---------------------------------------------------------------------------

  WhirledPieceGlobe: {
    description: 'Interactive globe/map with spinning emoji that lands on conflicts',
    props: {
      conflicts: 'Conflict[]',
      onConflictSelect: '(conflict: Conflict) => void',
    },
    features: [
      'SVG world map or simple globe visualization',
      'Conflict hotspots marked with pulsing dots',
      'PieceEmoji that spins when "Spin" button clicked',
      'Emoji lands on random conflict after spin',
      'Click hotspot to go to conflict detail',
      'Tooltip on hover showing conflict name and status',
    ],
    animations: [
      'Spin animation for emoji (rotate 360° multiple times)',
      'Bounce/land animation when stopping',
      'Pulse animation on hotspots',
    ],
  },

  OverallPieceScore: {
    description: 'Main gauge showing aggregate peace score',
    props: {
      score: 'number', // 0-100
    },
    features: [
      'Semi-circular gauge',
      'Color gradient from red (0) to green (100)',
      'Animated fill on load',
      'Current score displayed prominently',
      'Witty label based on score range',
    ],
    scoreLabels: {
      '0-20': 'Total Disaster',
      '21-40': 'Mostly False',
      '41-60': 'Half-Baked',
      '61-80': 'Getting There',
      '81-100': 'Actual Peace?',
    },
  },

  FeaturedConflicts: {
    description: 'Grid of featured conflict cards',
    props: {
      conflicts: 'Conflict[]',
    },
    features: [
      'Responsive grid (1 col mobile, 2 tablet, 3+ desktop)',
      'ConflictCard for each featured conflict',
      'Sort by status or score',
    ],
  },

  NewsTicker: {
    description: 'Horizontally scrolling news headlines',
    props: {
      news: 'NewsItem[]',
    },
    features: [
      'Auto-scrolling marquee effect',
      'Pause on hover',
      'Click to go to source',
      'Sentiment color coding',
    ],
  },

  // ---------------------------------------------------------------------------
  // CONFLICT COMPONENTS
  // ---------------------------------------------------------------------------

  ConflictCard: {
    description: 'Card displaying conflict summary',
    props: {
      conflict: 'Conflict',
      variant: '"compact" | "full"',
    },
    features: [
      'Flag emojis and conflict name',
      'Status badge',
      'Piece score mini-gauge',
      'Trophy type indicator',
      'Latest claim quote (truncated)',
      'Link to detail page',
    ],
  },

  ConflictDetail: {
    description: 'Full conflict page content',
    props: {
      conflict: 'Conflict',
      news: 'NewsItem[]',
      events: 'TimelineEvent[]',
    },
    sections: [
      'Header with flags, name, status',
      'ClaimQuote block',
      'RealityCheck facts',
      'PieceOMeter gauge',
      'ConflictMap',
      'NewsFeed',
      'Related timeline events',
    ],
  },

  ClaimQuote: {
    description: 'Styled block showing Trump quote',
    props: {
      claim: 'Claim',
    },
    features: [
      'Large quotation marks',
      'Quote text prominently displayed',
      'Date and source below',
      'Optional link to source',
      'Tacky gold/brown styling',
    ],
  },

  RealityCheck: {
    description: 'Facts contradicting or contextualizing claims',
    props: {
      reality: 'RealityCheck',
    },
    features: [
      'Summary paragraph',
      'Bulleted key facts',
      '"Disputed by" callout if applicable',
      'Casualty data if available',
      'Last updated date',
    ],
  },

  PieceOMeter: {
    description: 'Gauge showing peace score for single conflict',
    props: {
      score: 'number',
      status: 'ConflictStatus',
      size: '"sm" | "md" | "lg"',
    },
    features: [
      'Circular or semi-circular gauge',
      'Color based on status',
      'Animated on scroll into view',
      'Score number in center',
    ],
  },

  StatusBadge: {
    description: 'Colored badge showing conflict status',
    props: {
      status: 'ConflictStatus',
      size: '"sm" | "md"',
    },
    colors: {
      'holding': 'green',
      'shaky': 'yellow',
      'collapsed': 'red',
      'disputed': 'orange',
      'no-conflict': 'gray',
      'ongoing': 'blue',
      'too-early': 'purple',
    },
  },

  // ---------------------------------------------------------------------------
  // TIMELINE COMPONENTS
  // ---------------------------------------------------------------------------

  Timeline: {
    description: 'Vertical timeline of events',
    props: {
      events: 'TimelineEvent[]',
      filters: 'TimelineFilters',
    },
    features: [
      'Vertical line connecting events',
      'Events alternate left/right on desktop',
      'Filter by event type',
      'Filter by conflict',
      'Scroll to date',
    ],
  },

  TimelineEvent: {
    description: 'Single event on timeline',
    props: {
      event: 'TimelineEvent',
    },
    features: [
      'Date prominently displayed',
      'Event type badge with emoji',
      'Headline and description',
      'Link to related conflict',
      'Collapse events get special styling (tombstone)',
    ],
  },

  // ---------------------------------------------------------------------------
  // TROPHY COMPONENTS
  // ---------------------------------------------------------------------------

  TrophyCase: {
    description: 'Display case of all trophies',
    props: {
      conflicts: 'Conflict[]',
    },
    features: [
      'Grid of Trophy components',
      'Filter by trophy type',
      'Sort by score',
      'Glass case aesthetic',
    ],
  },

  Trophy: {
    description: 'Individual trophy with visual states',
    props: {
      conflict: 'Conflict',
      onClick: '() => void',
    },
    states: {
      'gold': 'Shiny gold trophy, polished',
      'silver': 'Silver trophy, slightly less shiny',
      'participation': 'Small ribbon, "I tried" energy',
      'tombstone': 'Gray tombstone with RIP',
      'phantom': 'Transparent/ghostly trophy',
    },
    features: [
      'Visual state based on trophy type',
      'Hover shows conflict name',
      'Click opens TrophyModal',
      'Cracked/tarnished effect for shaky deals',
    ],
  },

  // ---------------------------------------------------------------------------
  // CEMETERY COMPONENTS
  // ---------------------------------------------------------------------------

  Cemetery: {
    description: 'Graveyard for collapsed peace deals',
    props: {
      conflicts: 'Conflict[]', // filtered to collapsed only
    },
    features: [
      'Dark, somber styling',
      'Grid of Tombstone components',
      'Fog/mist effect (CSS)',
      'Ambient "spooky" feel',
    ],
  },

  Tombstone: {
    description: 'Memorial for a collapsed deal',
    props: {
      conflict: 'Conflict',
    },
    features: [
      'Tombstone shape (SVG or CSS)',
      'Conflict name as epitaph',
      '"R.I.P." header',
      'Birth date (deal signed) to death date (collapsed)',
      'Brief cause of death',
      'Click for full details',
    ],
  },

  // ---------------------------------------------------------------------------
  // NEWS COMPONENTS
  // ---------------------------------------------------------------------------

  NewsFeed: {
    description: 'List of news items for a conflict',
    props: {
      conflictId: 'string',
      limit: 'number',
    },
    features: [
      'Fetches news from API or static data',
      'NewsCard for each item',
      'Load more button',
      'Filter by sentiment',
      'Auto-refresh option',
    ],
  },

  NewsCard: {
    description: 'Individual news item display',
    props: {
      news: 'NewsItem',
    },
    features: [
      'Headline (link to source)',
      'Source name and date',
      'Summary if available',
      'SentimentIndicator',
    ],
  },

  SentimentIndicator: {
    description: 'Visual indicator of news sentiment',
    props: {
      sentiment: 'NewsSentiment',
    },
    features: [
      'Emoji indicator (✅ ❌ ➖)',
      'Color coding',
      'Tooltip explaining sentiment',
    ],
  },

  // ---------------------------------------------------------------------------
  // UI COMPONENTS
  // ---------------------------------------------------------------------------

  PieceEmoji: {
    description: 'The mascot - poop emoji with Trump hair',
    props: {
      size: '"sm" | "md" | "lg" | "xl"',
      spinning: 'boolean',
      onClick: '() => void',
    },
    features: [
      'Uses the uploaded image as source',
      'CSS spin animation when spinning=true',
      'Multiple size variants',
      'Hover effect',
    ],
  },

  SpinningLoader: {
    description: 'Loading state with spinning mascot',
    props: {
      text: 'string', // default: "Whirling the piece..."
    },
    features: [
      'PieceEmoji with spinning=true',
      'Loading text below',
      'Centered in container',
    ],
  },

  Gauge: {
    description: 'Reusable gauge component',
    props: {
      value: 'number', // 0-100
      size: '"sm" | "md" | "lg"',
      variant: '"semicircle" | "circle" | "linear"',
      colors: '{ low: string, mid: string, high: string }',
      label: 'string',
      animated: 'boolean',
    },
    features: [
      'SVG-based gauge',
      'Gradient fill',
      'Animated on mount',
      'Value displayed in center',
      'Customizable colors',
    ],
  },
};

// ============================================================================
// PAGE SPECIFICATIONS
// ============================================================================

export const pageSpecs = {
  home: {
    route: '/',
    title: 'The Piece President',
    description: 'Tracking Trump\'s claimed peace deals vs reality',
    components: [
      'WhirledPieceGlobe',
      'OverallPieceScore',
      'FeaturedConflicts',
      'NewsTicker',
    ],
    layout: `
      ┌─────────────────────────────────────┐
      │            HEADER                   │
      ├─────────────────────────────────────┤
      │                                     │
      │      WHIRLED PIECE GLOBE            │
      │      (with spin button)             │
      │                                     │
      ├─────────────────────────────────────┤
      │      OVERALL PIECE SCORE            │
      │      (gauge + witty label)          │
      ├─────────────────────────────────────┤
      │                                     │
      │      FEATURED CONFLICTS             │
      │      (grid of cards)                │
      │                                     │
      ├─────────────────────────────────────┤
      │      NEWS TICKER                    │
      ├─────────────────────────────────────┤
      │            FOOTER                   │
      └─────────────────────────────────────┘
    `,
  },

  peaceBYPiece: {
    route: '/peace-by-piece',
    title: 'Peace by Piece | The Piece President',
    description: 'Timeline of Trump\'s peace claims and reality',
    components: [
      'Timeline',
      'TimelineFilters',
    ],
    layout: `
      ┌─────────────────────────────────────┐
      │            HEADER                   │
      ├─────────────────────────────────────┤
      │  Page Title: "Peace by Piece"       │
      │  Subtitle: "A chronological flush"  │
      ├─────────────────────────────────────┤
      │  FILTERS (type, conflict)           │
      ├─────────────────────────────────────┤
      │                                     │
      │         TIMELINE                    │
      │         |                           │
      │    ●────┼─── Event                  │
      │         │                           │
      │    ●────┼─── Event                  │
      │         │                           │
      │    💀───┼─── COLLAPSE Event         │
      │         |                           │
      │                                     │
      ├─────────────────────────────────────┤
      │            FOOTER                   │
      └─────────────────────────────────────┘
    `,
  },

  conflictDetail: {
    route: '/zones/[slug]',
    title: '[Conflict Name] | The Piece President',
    components: [
      'ConflictDetail',
      'ClaimQuote',
      'RealityCheck',
      'PieceOMeter',
      'ConflictMap',
      'NewsFeed',
    ],
    layout: `
      ┌─────────────────────────────────────┐
      │            HEADER                   │
      ├─────────────────────────────────────┤
      │  🇺🇦🇷🇺 Ukraine-Russia              │
      │  [Status Badge]  [Trophy Type]      │
      ├─────────────────────────────────────┤
      │                                     │
      │  "THE CLAIM"                        │
      │  ┌─────────────────────────────┐    │
      │  │  "Quote from Trump..."     │    │
      │  │        - Source, Date      │    │
      │  └─────────────────────────────┘    │
      │                                     │
      ├──────────────┬──────────────────────┤
      │ PIECE-O-METER│   REALITY CHECK      │
      │   [GAUGE]    │   • Fact 1           │
      │     45       │   • Fact 2           │
      │              │   • Fact 3           │
      │              │   ⚠️ Disputed by X   │
      ├──────────────┴──────────────────────┤
      │                                     │
      │        CONFLICT MAP                 │
      │        (location highlight)         │
      │                                     │
      ├─────────────────────────────────────┤
      │  LATEST NEWS                        │
      │  ┌─────┐ ┌─────┐ ┌─────┐           │
      │  │Card │ │Card │ │Card │           │
      │  └─────┘ └─────┘ └─────┘           │
      ├─────────────────────────────────────┤
      │            FOOTER                   │
      └─────────────────────────────────────┘
    `,
  },

  trophyCase: {
    route: '/trophy-case',
    title: 'Trophy Case | The Piece President',
    components: [
      'TrophyCase',
      'Trophy',
      'TrophyModal',
    ],
    layout: `
      ┌─────────────────────────────────────┐
      │            HEADER                   │
      ├─────────────────────────────────────┤
      │  Page Title: "The Trophy Case"      │
      │  Subtitle: "Achievements unlocked?" │
      ├─────────────────────────────────────┤
      │  FILTERS (trophy type)              │
      ├─────────────────────────────────────┤
      │  ┌──────────────────────────────┐   │
      │  │     GLASS DISPLAY CASE       │   │
      │  │                              │   │
      │  │  🏆   🥈   🎀   🪦   👻      │   │
      │  │  Gaza Iran Ind.  Thai Egypt  │   │
      │  │                              │   │
      │  │  🎀   🥈   📝   🪦          │   │
      │  │  Ukr. Arm. DRC   ...         │   │
      │  │                              │   │
      │  └──────────────────────────────┘   │
      ├─────────────────────────────────────┤
      │            FOOTER                   │
      └─────────────────────────────────────┘
    `,
  },

  restInPiece: {
    route: '/rest-in-piece',
    title: 'Rest in Piece | The Piece President',
    components: [
      'Cemetery',
      'Tombstone',
    ],
    layout: `
      ┌─────────────────────────────────────┐
      │            HEADER                   │
      ├─────────────────────────────────────┤
      │                                     │
      │  ☁️  REST IN PIECE  ☁️              │
      │  "Where peace deals go to die"      │
      │                                     │
      │  ~~~~ fog effect ~~~~               │
      │                                     │
      │     ┌─────┐         ┌─────┐        │
      │     │ RIP │         │ RIP │        │
      │     │     │         │     │        │
      │     │Thai-│         │ ??? │        │
      │     │Camb.│         │     │        │
      │     └──┬──┘         └──┬──┘        │
      │  ~~~~~~│~~~~~~~~~~~~~~~│~~~~~~     │
      │                                     │
      ├─────────────────────────────────────┤
      │            FOOTER                   │
      └─────────────────────────────────────┘
    `,
  },

  pieceOfWork: {
    route: '/piece-of-work',
    title: 'About | The Piece President',
    sections: [
      'What is this?',
      'Methodology',
      'Data Sources',
      'Why "Piece"?',
      'Contact/Feedback',
    ],
  },

  notFound: {
    route: '/404',
    title: '404 | The Piece President',
    message: 'This peace deal could not be found.',
    features: [
      'Sad PieceEmoji',
      'Witty 404 message',
      'Link back home',
    ],
  },
};

// ============================================================================
// STYLING GUIDE
// ============================================================================

export const stylingGuide = {
  colors: {
    // Primary palette
    primary: {
      brown: '#8B6914',      // Poop-adjacent gold
      darkBrown: '#4A3728',  // Dark brown
      gold: '#FFD700',       // Tacky opulence gold
      cream: '#FDF6E3',      // Background cream
    },
    
    // Status colors
    status: {
      holding: '#4CAF50',    // Green
      shaky: '#FFC107',      // Yellow/Amber
      collapsed: '#D32F2F',  // Red
      disputed: '#FF9800',   // Orange
      noConflict: '#9E9E9E', // Gray
      ongoing: '#2196F3',    // Blue
      tooEarly: '#9C27B0',   // Purple
    },
    
    // Sentiment colors
    sentiment: {
      positive: '#4CAF50',
      negative: '#D32F2F',
      neutral: '#9E9E9E',
    },
    
    // UI colors
    ui: {
      background: '#FDF6E3',
      surface: '#FFFFFF',
      text: '#1A1A1A',
      textMuted: '#666666',
      border: '#E0D5C1',
    },
  },
  
  typography: {
    // Display font for headlines - something with character
    display: '"Playfair Display", Georgia, serif',
    
    // Body font - clean and readable
    body: '"Work Sans", -apple-system, sans-serif',
    
    // Monospace for quotes
    mono: '"JetBrains Mono", monospace',
  },
  
  spacing: {
    // Use Tailwind's spacing scale
    // Key breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
  },
  
  effects: {
    // Glass effect for trophy case
    glass: 'backdrop-blur-md bg-white/30 border border-white/20',
    
    // Fog effect for cemetery
    fog: 'bg-gradient-to-t from-gray-900/50 to-transparent',
    
    // Spin animation
    spin: 'animate-spin',
    
    // Pulse for hotspots
    pulse: 'animate-pulse',
  },
};
