/**
 * The Piece President - Conflict Data
 * 
 * Tracking Trump's claimed "peace deals" against reality
 * Data sourced from: TIME, CNN, AP, Al Jazeera, PolitiFact, FactCheck.org
 * Last updated: December 2024
 */

// ============================================================================
// TYPES
// ============================================================================

export type ConflictStatus =
  | 'holding'      // Ceasefire/deal actually holding
  | 'shaky'        // Deal exists but fragile/violated
  | 'collapsed'    // Deal has fallen apart
  | 'disputed'     // Country disputes Trump's role
  | 'no-conflict'  // There was no war to end
  | 'ongoing'      // Negotiations ongoing, no deal yet
  | 'too-early';   // Too recent to evaluate

export type TrophyType =
  | 'gold'         // Legitimate achievement
  | 'silver'       // Partial credit
  | 'participation'// Disputed/minimal role
  | 'tombstone'    // Collapsed deal
  | 'phantom';     // No actual conflict existed

export interface Claim {
  date: string;           // ISO date string
  quote: string;          // What Trump said
  source: string;         // Where he said it
  sourceUrl?: string;     // Link to source
}

export interface RealityCheck {
  summary: string;        // Current situation summary
  lastUpdated: string;    // ISO date string
  keyFacts: string[];     // Bullet points of reality
  disputedBy?: string;    // Who disputes the claim
  casualties?: {
    since: string;        // Since what date
    count: string;        // Approximate count
    source: string;       // Source for data
  };
}

export interface Conflict {
  // Identity
  id: string;
  slug: string;
  name: string;
  shortName: string;
  emoji: string;
  flagEmojis: string;
  parties: string[];
  region: string;

  // Map coordinates (approximate center of conflict)
  coordinates: {
    lat: number;
    lng: number;
  };

  // The Claim
  claim: Claim;

  // Status & Scoring
  status: ConflictStatus;
  pieceScore: number;     // 0-100, higher = more "peaceful"
  trophyType: TrophyType;

  // Reality
  reality: RealityCheck;

  // For news scraping
  newsKeywords: string[];

  // Witty tagline for the site
  tagline: string;

  // Is this one of the "big" ones to feature prominently?
  featured: boolean;
}

// ============================================================================
// CONFLICT DATA
// ============================================================================

export const conflicts: Conflict[] = [
  // -------------------------------------------------------------------------
  // GAZA / ISRAEL-HAMAS - His most legitimate claim
  // -------------------------------------------------------------------------
  {
    id: 'gaza',
    slug: 'gaza',
    name: 'Israel-Hamas / Gaza',
    shortName: 'Gaza',
    emoji: '🕊️',
    flagEmojis: '🇮🇱🇵🇸',
    parties: ['Israel', 'Hamas', 'Palestine'],
    region: 'Middle East',

    coordinates: {
      lat: 31.5,
      lng: 34.47,
    },

    claim: {
      date: '2025-10-01',
      quote: "We ended the war in Gaza. We have a 20-point peace plan that Israel has accepted.",
      source: 'White House Press Briefing',
      sourceUrl: 'https://www.whitehouse.gov',
    },

    status: 'shaky',
    pieceScore: 65,
    trophyType: 'gold',

    reality: {
      summary: 'Ceasefire is holding but fragile. Future phases unclear. Hamas has not fully disarmed. Governance and reconstruction plans remain undefined.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Ceasefire came into force October 2025 after Trump\'s 20-point plan',
        'Hamas returned remains of Israeli soldier Hadar Goldin in December',
        'Over 70,000 Palestinians killed according to Gaza Health Ministry',
        'Second phase negotiations on disarmament, governance still pending',
        '"Board of Peace" proposed to oversee reconstruction',
        'Countries hesitant to commit troops until Hamas disarms',
      ],
      casualties: {
        since: '2023-10-07',
        count: '70,000+ Palestinians, 2,000+ Israelis',
        source: 'Gaza Health Ministry / IDF',
      },
    },

    newsKeywords: ['Gaza ceasefire', 'Israel Hamas', 'Gaza peace', 'Trump Gaza plan'],

    tagline: 'His actual trophy - but the fine print is still being written',

    featured: true,
  },

  // -------------------------------------------------------------------------
  // UKRAINE-RUSSIA - The big one he hasn't solved
  // -------------------------------------------------------------------------
  {
    id: 'ukraine',
    slug: 'ukraine-russia',
    name: 'Ukraine-Russia',
    shortName: 'Ukraine',
    emoji: '⚔️',
    flagEmojis: '🇺🇦🇷🇺',
    parties: ['Ukraine', 'Russia'],
    region: 'Eastern Europe',

    coordinates: {
      lat: 48.5,
      lng: 35.0,
    },

    claim: {
      date: '2025-11-20',
      quote: "We are making a serious effort to find a solution that will end the war in Ukraine, the same way we ended the war in Gaza.",
      source: 'White House Official Statement',
      sourceUrl: 'https://www.axios.com/2025/11/20/trump-ukraine-peace-plan-28-points-russia',
    },

    status: 'ongoing',
    pieceScore: 25,
    trophyType: 'participation',

    reality: {
      summary: 'War continues. 28-point plan proposed but not agreed. Ukraine has tentatively accepted framework. Russia making additional demands. Kushner and Witkoff dispatched to Moscow.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Trump promised to end war in 24 hours - now in month 11',
        '28-point plan includes U.S. recognition of occupied territories as Russian',
        'Plan proposes 600,000 troop limit on Ukraine\'s military',
        'Ukraine says it "will not accept any limits on its right to self-defense"',
        'Trump met Putin in Anchorage, Alaska in August 2025',
        'Jared Kushner and Steve Witkoff leading negotiations',
        'War crimes amnesty proposed for all parties',
      ],
    },

    newsKeywords: ['Ukraine Russia peace', 'Trump Putin', 'Ukraine ceasefire', 'Ukraine war'],

    tagline: '24 hours turned into 11 months and counting',

    featured: true,
  },

  // -------------------------------------------------------------------------
  // THAILAND-CAMBODIA - The perfect "Rest in Piece" example
  // -------------------------------------------------------------------------
  {
    id: 'thailand-cambodia',
    slug: 'thailand-cambodia',
    name: 'Thailand-Cambodia Border Conflict',
    shortName: 'Thai-Cambodia',
    emoji: '💀',
    flagEmojis: '🇹🇭🇰🇭',
    parties: ['Thailand', 'Cambodia'],
    region: 'Southeast Asia',

    coordinates: {
      lat: 14.4,
      lng: 103.5,
    },

    claim: {
      date: '2025-07-28',
      quote: "After the involvement of President Donald J. Trump... peace has been achieved between Thailand and Cambodia.",
      source: 'Truth Social / White House Statement',
    },

    status: 'collapsed',
    pieceScore: 10,
    trophyType: 'tombstone',

    reality: {
      summary: 'COLLAPSED. Fighting resumed December 2025. Thai soldier maimed by landmine Nov 10. Artillery and mortar fire exchanged Dec 7-9. Peace accord suspended by Thailand.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Kuala Lumpur Peace Accord signed October 2025 with Trump present',
        'Thai soldier maimed by landmine November 10, 2025',
        'Thailand suspended peace agreement implementation',
        'Cambodian officials reported Thai artillery fire December 7',
        'At least 12 killed in renewed December fighting',
        'Thousands displaced as clashes continued',
        'Nearly 50 killed in original July fighting before "peace"',
        'Trump said he\'d make "a phone call" to stop it again',
      ],
      casualties: {
        since: '2025-07-01',
        count: '60+ killed, 300,000+ displaced',
        source: 'AP / Reuters',
      },
    },

    newsKeywords: ['Thailand Cambodia', 'Thai Cambodia border', 'Cambodia Thailand fighting'],

    tagline: '🪦 REST IN PIECE - First resident of the cemetery',

    featured: true,
  },

  // -------------------------------------------------------------------------
  // INDIA-PAKISTAN - Disputed credit
  // -------------------------------------------------------------------------
  {
    id: 'india-pakistan',
    slug: 'india-pakistan',
    name: 'India-Pakistan',
    shortName: 'India-Pakistan',
    emoji: '🏆',
    flagEmojis: '🇮🇳🇵🇰',
    parties: ['India', 'Pakistan'],
    region: 'South Asia',

    coordinates: {
      lat: 33.7,
      lng: 74.8,
    },

    claim: {
      date: '2025-06-17',
      quote: "I stopped the War between India and Pakistan. They were going at it.",
      source: 'Truth Social / Rally Speech',
    },

    status: 'disputed',
    pieceScore: 40,
    trophyType: 'participation',

    reality: {
      summary: 'India explicitly and officially denies any U.S. role. Pakistan credits Trump. India says ceasefire was reached bilaterally with "no third party intervention." Trump imposed 50% tariff on India partly in response to being denied credit.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Pahalgam terror attack killed 26 civilians April 22, 2025',
        'India launched Operation Sindoor May 7, targeting Pakistan',
        'Four days of intense drone and missile strikes followed',
        'Ceasefire reached May 10, 2025',
        'India: "India does not and will never accept mediation"',
        'Modi told Trump directly that India reached agreement bilaterally',
        'Trump imposed 50% tariff on India in August - partly retaliation',
        'Pakistan nominated Trump for Nobel Peace Prize',
      ],
      disputedBy: 'India - officially denies any U.S. role',
    },

    newsKeywords: ['India Pakistan', 'Kashmir', 'India Pakistan ceasefire'],

    tagline: 'Participation trophy - India would like a word',

    featured: true,
  },

  // -------------------------------------------------------------------------
  // RWANDA-DRC - Too early to tell
  // -------------------------------------------------------------------------
  {
    id: 'rwanda-drc',
    slug: 'rwanda-drc',
    name: 'Rwanda - Democratic Republic of Congo',
    shortName: 'Rwanda-DRC',
    emoji: '📝',
    flagEmojis: '🇷🇼🇨🇩',
    parties: ['Rwanda', 'Democratic Republic of Congo'],
    region: 'Central Africa',

    coordinates: {
      lat: -1.9,
      lng: 29.8,
    },

    claim: {
      date: '2025-12-04',
      quote: "This is a Great Day for Africa and, quite frankly, a Great Day for the World!",
      source: 'Truth Social / White House Signing Ceremony',
    },

    status: 'too-early',
    pieceScore: 50,
    trophyType: 'silver',

    reality: {
      summary: 'Peace deal signed at White House December 4, 2025. Too early to evaluate. Hundreds of civilians estimated killed since June signing of earlier framework. Violence has continued in eastern DRC.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Leaders Kagame and Tshisekedi signed deal at White House',
        'Kagame praised Trump as "even-handed"',
        'Conflict in region has lasted over 30 years',
        'Previous temporary peace deal signed in June was shaky',
        'Hundreds of civilians killed since June agreement',
        'Violence in eastern DRC has continued',
        'M23 rebel group backed by Rwanda remains a factor',
      ],
    },

    newsKeywords: ['Rwanda DRC', 'Congo Rwanda', 'DRC peace', 'M23'],

    tagline: 'Ink still wet - check back in a few months',

    featured: false,
  },

  // -------------------------------------------------------------------------
  // SERBIA-KOSOVO - Exaggerated/No war brewing
  // -------------------------------------------------------------------------
  {
    id: 'serbia-kosovo',
    slug: 'serbia-kosovo',
    name: 'Serbia-Kosovo',
    shortName: 'Serbia-Kosovo',
    emoji: '🤷',
    flagEmojis: '🇷🇸🇽🇰',
    parties: ['Serbia', 'Kosovo'],
    region: 'Balkans',

    coordinates: {
      lat: 42.6,
      lng: 21.0,
    },

    claim: {
      date: '2025-06-27',
      quote: "Serbia was — they were getting ready to go to war... I won't mention that it's Kosovo, but it's Kosovo. But they were going to have a big time war, and we stopped it.",
      source: 'Oval Office Press Conference',
    },

    status: 'no-conflict',
    pieceScore: 70,
    trophyType: 'phantom',

    reality: {
      summary: 'No active conflict since the 1990s. No evidence war was actually brewing. Kosovo\'s president backed Trump\'s claim but details are "classified." Serbia\'s president denies any war plans. EU and NATO are primary mediators in the region.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Last actual war was in the 1990s',
        'Kosovo President Osmani said Serbia had plans - but details "classified"',
        'Serbia President Vucic denies any war plans',
        'Tensions exist but no imminent conflict was evident',
        '2020 Trump-brokered economic deal largely not implemented',
        'EU and NATO remain primary regional mediators',
        'Serbia facing domestic issues with student protests',
        'Professor: "little evidence a potential war was brewing"',
      ],
      disputedBy: 'Serbia - denies war plans',
    },

    newsKeywords: ['Serbia Kosovo', 'Kosovo Serbia tensions', 'Balkans'],

    tagline: 'Stopping wars that don\'t exist: easy mode',

    featured: false,
  },

  // -------------------------------------------------------------------------
  // EGYPT-ETHIOPIA - There was literally no war
  // -------------------------------------------------------------------------
  {
    id: 'egypt-ethiopia',
    slug: 'egypt-ethiopia',
    name: 'Egypt-Ethiopia (GERD Dam Dispute)',
    shortName: 'Egypt-Ethiopia',
    emoji: '🚫',
    flagEmojis: '🇪🇬🇪🇹',
    parties: ['Egypt', 'Ethiopia'],
    region: 'North Africa',

    coordinates: {
      lat: 11.2,
      lng: 35.1,
    },

    claim: {
      date: '2025-06-20',
      quote: "I won't get a Nobel Peace Prize for keeping Peace between Egypt and Ethiopia (A massive Ethiopian built dam, stupidly financed by the United States of America, substantially reduces the water flowing into The Nile River)",
      source: 'Truth Social',
    },

    status: 'no-conflict',
    pieceScore: 50,
    trophyType: 'phantom',

    reality: {
      summary: 'There was no war. This is a diplomatic dispute over the Grand Ethiopian Renaissance Dam (GERD) on the Nile. Ethiopia called Trump\'s remarks "reckless." No peace deal exists - the dam dispute remains unresolved.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'This is a dam/water rights dispute, NOT a war',
        'Grand Ethiopian Renaissance Dam recently completed',
        'Ethiopia called Trump\'s 2020 remarks "reckless"',
        'No peace deal or resolution on the table',
        'Egypt concerned about Nile water flow',
        'Tensions exist but no military conflict',
        'Trump in 2020 suggested Egypt might "blow up" the dam',
        'Dispute remains ongoing with no U.S.-brokered solution',
      ],
    },

    newsKeywords: ['GERD dam', 'Nile dam', 'Egypt Ethiopia dam', 'Ethiopia dam dispute'],

    tagline: 'Dam it, that\'s not a war!',

    featured: false,
  },

  // -------------------------------------------------------------------------
  // ISRAEL-IRAN - Multiple mediators involved
  // -------------------------------------------------------------------------
  {
    id: 'israel-iran',
    slug: 'israel-iran',
    name: 'Israel-Iran',
    shortName: 'Israel-Iran',
    emoji: '🛑',
    flagEmojis: '🇮🇱🇮🇷',
    parties: ['Israel', 'Iran'],
    region: 'Middle East',

    coordinates: {
      lat: 32.0,
      lng: 53.0,
    },

    claim: {
      date: '2025-07-01',
      quote: "We stopped the war between Israel and Iran.",
      source: 'Rally Speech',
    },

    status: 'shaky',
    pieceScore: 55,
    trophyType: 'silver',

    reality: {
      summary: 'Fighting ended after 12 days in June 2025. Trump told Netanyahu to limit strikes. However, Iran, Qatar, and France were also involved in de-escalation. Israeli attack on Iran actually disrupted ongoing U.S.-Iran nuclear negotiations.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Israeli attack on Iran in June 2025 started the conflict',
        'Attack disrupted ongoing U.S.-Iran nuclear negotiations',
        'Fighting lasted approximately 12 days',
        'Trump told Netanyahu to limit strikes',
        'Iran, Qatar, and France all involved in de-escalation',
        'Trump administration didn\'t object when Israel sidelined their diplomacy',
        'Underlying tensions remain unresolved',
        'Iran nuclear program status unclear',
      ],
    },

    newsKeywords: ['Israel Iran', 'Iran Israel conflict', 'Israel Iran attack'],

    tagline: 'Multiple cooks in this kitchen',

    featured: false,
  },

  // -------------------------------------------------------------------------
  // ARMENIA-AZERBAIJAN - On paper only
  // -------------------------------------------------------------------------
  {
    id: 'armenia-azerbaijan',
    slug: 'armenia-azerbaijan',
    name: 'Armenia-Azerbaijan',
    shortName: 'Armenia-Azerbaijan',
    emoji: '📄',
    flagEmojis: '🇦🇲🇦🇿',
    parties: ['Armenia', 'Azerbaijan'],
    region: 'South Caucasus',

    coordinates: {
      lat: 40.0,
      lng: 47.0,
    },

    claim: {
      date: '2025-08-15',
      quote: "Armenia and Azerbaijan - we got that done too.",
      source: 'Rally Speech',
    },

    status: 'shaky',
    pieceScore: 45,
    trophyType: 'silver',

    reality: {
      summary: 'U.S.-brokered peace framework signed August 2025. Experts call it "historic milestone" on paper. However, no concrete plan for 100,000+ Armenian refugees from Nagorno-Karabakh. Azerbaijan demanding Armenian constitutional changes.',
      lastUpdated: '2025-12-10',
      keyFacts: [
        'Peace framework signed in early August 2025',
        '35-year conflict - significant if it holds',
        'No plan for 100,000+ Armenian refugees who fled in 2023',
        'Azerbaijan demanding Armenia change constitution',
        'Nagorno-Karabakh effectively under Azerbaijani control',
        'Implementation details remain unclear',
        'Experts cautiously optimistic but skeptical',
      ],
    },

    newsKeywords: ['Armenia Azerbaijan', 'Nagorno Karabakh', 'Armenia Azerbaijan peace'],

    tagline: 'A real framework - but the details are devilish',

    featured: false,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getConflictBySlug(slug: string): Conflict | undefined {
  return conflicts.find(c => c.slug === slug);
}

export function getConflictById(id: string): Conflict | undefined {
  return conflicts.find(c => c.id === id);
}

export function getFeaturedConflicts(): Conflict[] {
  return conflicts.filter(c => c.featured);
}

export function getConflictsByStatus(status: ConflictStatus): Conflict[] {
  return conflicts.filter(c => c.status === status);
}

export function getCollapsedConflicts(): Conflict[] {
  return conflicts.filter(c => c.status === 'collapsed');
}

export function getRestInPieceConflicts(): Conflict[] {
  return conflicts.filter(c => c.trophyType === 'tombstone');
}

export function getOverallPieceScore(): number {
  const total = conflicts.reduce((sum, c) => sum + c.pieceScore, 0);
  return Math.round(total / conflicts.length);
}

export function getConflictCount(): {
  total: number;
  holding: number;
  shaky: number;
  collapsed: number;
  disputed: number;
  noConflict: number;
  ongoing: number;
} {
  return {
    total: conflicts.length,
    holding: conflicts.filter(c => c.status === 'holding').length,
    shaky: conflicts.filter(c => c.status === 'shaky').length,
    collapsed: conflicts.filter(c => c.status === 'collapsed').length,
    disputed: conflicts.filter(c => c.status === 'disputed').length,
    noConflict: conflicts.filter(c => c.status === 'no-conflict').length,
    ongoing: conflicts.filter(c => c.status === 'ongoing').length,
  };
}

// ============================================================================
// SITE COPY & CONSTANTS
// ============================================================================

export const SITE_CONFIG = {
  name: 'The Piece President',
  tagline: 'Tracking the "peace deals" one flush at a time',
  description: 'An honest tracker of Trump\'s claimed peace achievements vs. reality on the ground.',

  // Status labels for display
  statusLabels: {
    'holding': '✅ Holding',
    'shaky': '⚠️ Shaky',
    'collapsed': '💀 Collapsed',
    'disputed': '🤷 Disputed',
    'no-conflict': '🚫 No War Existed',
    'ongoing': '⏳ Ongoing',
    'too-early': '📝 Too Early',
  } as Record<ConflictStatus, string>,

  // Trophy display names
  trophyLabels: {
    'gold': '🏆 Gold Trophy',
    'silver': '🥈 Silver Trophy',
    'participation': '🎀 Participation Ribbon',
    'tombstone': '🪦 Rest in Piece',
    'phantom': '👻 Phantom Achievement',
  } as Record<TrophyType, string>,

  // Section titles
  sections: {
    peaceBYPiece: 'Peace by Piece',
    whirledPiece: 'Whirled Piece',
    trophyCase: 'The Trophy Case',
    restInPiece: 'Rest in Piece',
    pieceOfWork: 'Piece of Work',
  },

  // 404 message
  notFound: 'This peace deal could not be found.',

  // Loading message
  loading: 'Whirling the piece...',
};

// ============================================================================
// NEWS KEYWORDS FOR N8N SCRAPER
// ============================================================================

export function getAllNewsKeywords(): string[] {
  const allKeywords = conflicts.flatMap(c => c.newsKeywords);
  return [...new Set(allKeywords)]; // Remove duplicates
}

export function getNewsKeywordsForConflict(id: string): string[] {
  const conflict = getConflictById(id);
  return conflict?.newsKeywords || [];
}
