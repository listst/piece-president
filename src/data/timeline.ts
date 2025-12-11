/**
 * The Piece President - Timeline Events
 * 
 * Chronological events for the "Peace by Piece" timeline
 * All events sourced from news reports
 */

export type EventType = 
  | 'claim'           // Trump made a claim
  | 'deal-signed'     // Actual deal/agreement signed
  | 'reality-check'   // News contradicting claims
  | 'collapse'        // Deal fell apart
  | 'escalation'      // Violence resumed/increased
  | 'negotiation';    // Ongoing talks

export interface TimelineEvent {
  id: string;
  date: string;           // ISO date
  conflictId: string;     // References conflict
  type: EventType;
  headline: string;
  description: string;
  source?: string;
  sourceUrl?: string;
  important: boolean;     // Feature prominently?
}

export const timelineEvents: TimelineEvent[] = [
  // -------------------------------------------------------------------------
  // 2025 TIMELINE
  // -------------------------------------------------------------------------
  
  // JANUARY
  {
    id: 'trump-inauguration',
    date: '2025-01-20',
    conflictId: 'ukraine',
    type: 'claim',
    headline: 'Trump Inaugurated, Promises Ukraine Peace in 24 Hours',
    description: 'Donald Trump sworn in as 47th President. Campaign promise to end Ukraine war "in 24 hours" begins its clock.',
    source: 'Multiple',
    important: true,
  },
  
  // APRIL
  {
    id: 'pahalgam-attack',
    date: '2025-04-22',
    conflictId: 'india-pakistan',
    type: 'escalation',
    headline: 'Pahalgam Terror Attack Kills 26 in Kashmir',
    description: 'Terror attack in Pahalgam, Kashmir kills 26 civilians, setting stage for India-Pakistan conflict.',
    source: 'AP',
    important: true,
  },
  
  // MAY
  {
    id: 'india-operation-sindoor',
    date: '2025-05-07',
    conflictId: 'india-pakistan',
    type: 'escalation',
    headline: 'India Launches Operation Sindoor Against Pakistan',
    description: 'India launches military operation targeting terror infrastructure in Pakistan and PoK.',
    source: 'Reuters',
    important: true,
  },
  {
    id: 'india-pakistan-ceasefire',
    date: '2025-05-10',
    conflictId: 'india-pakistan',
    type: 'deal-signed',
    headline: 'India-Pakistan Ceasefire Reached',
    description: 'After 4 days of drone and missile strikes, ceasefire reached. India says NO third-party involvement. Pakistan credits Trump.',
    source: 'AP / Reuters',
    important: true,
  },
  
  // JUNE
  {
    id: 'rwanda-drc-june-deal',
    date: '2025-06-15',
    conflictId: 'rwanda-drc',
    type: 'deal-signed',
    headline: 'Rwanda-DRC Temporary Peace Framework Signed',
    description: 'Initial peace framework signed between Rwanda and DRC. Experts call it "significant but shaky."',
    source: 'BBC',
    important: false,
  },
  {
    id: 'india-denies-trump',
    date: '2025-06-17',
    conflictId: 'india-pakistan',
    type: 'reality-check',
    headline: 'India Officially Denies Trump\'s Role in Ceasefire',
    description: 'Modi tells Trump directly: "India does not and will never accept mediation." Trump takes offense.',
    source: 'Indian Government Readout',
    important: true,
  },
  {
    id: 'trump-ethiopia-egypt-claim',
    date: '2025-06-20',
    conflictId: 'egypt-ethiopia',
    type: 'claim',
    headline: 'Trump Claims He\'s "Keeping Peace" Between Egypt and Ethiopia',
    description: 'Trump claims credit for preventing Egypt-Ethiopia war. Reality: it\'s a dam dispute, not a war.',
    source: 'Truth Social',
    important: false,
  },
  {
    id: 'israel-iran-conflict-starts',
    date: '2025-06-15',
    conflictId: 'israel-iran',
    type: 'escalation',
    headline: 'Israel Attacks Iran, Disrupting U.S. Negotiations',
    description: 'Israeli strike on Iran disrupts ongoing U.S.-Iran nuclear talks. 12-day conflict begins.',
    source: 'CNN',
    important: true,
  },
  {
    id: 'israel-iran-ceasefire',
    date: '2025-06-27',
    conflictId: 'israel-iran',
    type: 'deal-signed',
    headline: 'Israel-Iran Conflict Ends After 12 Days',
    description: 'Trump tells Netanyahu to limit strikes. Iran, Qatar, France also involved in de-escalation.',
    source: 'Multiple',
    important: true,
  },
  {
    id: 'trump-serbia-kosovo-claim',
    date: '2025-06-27',
    conflictId: 'serbia-kosovo',
    type: 'claim',
    headline: 'Trump Claims He Stopped Serbia-Kosovo War',
    description: '"They were going to have a big time war, and we stopped it." Serbia denies any war plans.',
    source: 'Oval Office Press Conference',
    important: false,
  },
  
  // JULY
  {
    id: 'thailand-cambodia-july-clash',
    date: '2025-07-24',
    conflictId: 'thailand-cambodia',
    type: 'escalation',
    headline: 'Thailand Launches Airstrikes on Cambodia',
    description: 'Border dispute erupts into most intense fighting in over a decade. Nearly 50 killed.',
    source: 'AP',
    important: true,
  },
  {
    id: 'trump-six-wars-claim',
    date: '2025-07-28',
    conflictId: 'ukraine',
    type: 'claim',
    headline: 'Trump: "I\'ve Stopped Six Wars"',
    description: '"I\'m averaging about a war a month." PolitiFact rates claim Mostly False.',
    source: 'Speech in Turnberry, Scotland',
    important: true,
  },
  {
    id: 'thailand-cambodia-july-ceasefire',
    date: '2025-07-28',
    conflictId: 'thailand-cambodia',
    type: 'deal-signed',
    headline: 'Thailand-Cambodia Ceasefire Announced',
    description: 'Trump announces ceasefire. Malaysia and China also involved in mediation.',
    source: 'White House',
    important: true,
  },
  
  // AUGUST
  {
    id: 'trump-india-tariff',
    date: '2025-08-01',
    conflictId: 'india-pakistan',
    type: 'reality-check',
    headline: 'Trump Imposes 50% Tariff on India',
    description: 'Punishing tariff partly in retaliation for India denying Trump credit for ceasefire.',
    source: 'Reuters',
    important: true,
  },
  {
    id: 'armenia-azerbaijan-framework',
    date: '2025-08-10',
    conflictId: 'armenia-azerbaijan',
    type: 'deal-signed',
    headline: 'Armenia-Azerbaijan Peace Framework Signed',
    description: 'U.S.-brokered framework for 35-year conflict. No plan for 100,000+ refugees.',
    source: 'State Department',
    important: true,
  },
  {
    id: 'trump-putin-anchorage',
    date: '2025-08-15',
    conflictId: 'ukraine',
    type: 'negotiation',
    headline: 'Trump Meets Putin in Anchorage',
    description: 'First Trump-Putin meeting of second term. Framework discussions begin.',
    source: 'White House',
    important: true,
  },
  
  // SEPTEMBER
  {
    id: 'trump-un-seven-wars',
    date: '2025-09-23',
    conflictId: 'ukraine',
    type: 'claim',
    headline: 'Trump at UN: Claims Credit for 7 Wars',
    description: 'Address to UN General Assembly. PolitiFact: "Mostly False"',
    source: 'UN General Assembly',
    important: true,
  },
  
  // OCTOBER
  {
    id: 'gaza-ceasefire-begins',
    date: '2025-10-01',
    conflictId: 'gaza',
    type: 'deal-signed',
    headline: 'Gaza Ceasefire Takes Effect',
    description: 'Trump\'s 20-point plan implemented. Israel accepts, Hamas implementation unclear.',
    source: 'White House',
    important: true,
  },
  {
    id: 'thailand-cambodia-kuala-lumpur',
    date: '2025-10-15',
    conflictId: 'thailand-cambodia',
    type: 'deal-signed',
    headline: 'Kuala Lumpur Peace Accord Signed',
    description: 'Trump attends ASEAN summit for formal signing. Experts already doubt longevity.',
    source: 'ASEAN / AP',
    important: true,
  },
  
  // NOVEMBER
  {
    id: 'thailand-landmine',
    date: '2025-11-10',
    conflictId: 'thailand-cambodia',
    type: 'escalation',
    headline: 'Thai Soldier Maimed by Landmine',
    description: 'Thailand accuses Cambodia of planting new landmines. Peace agreement suspended.',
    source: 'Thai Government',
    important: true,
  },
  {
    id: 'ukraine-28-point-plan',
    date: '2025-11-20',
    conflictId: 'ukraine',
    type: 'negotiation',
    headline: 'Trump\'s 28-Point Ukraine Plan Revealed',
    description: 'Plan includes U.S. recognition of occupied territories, troop limits. Ukraine tentatively accepts.',
    source: 'Axios',
    important: true,
  },
  
  // DECEMBER
  {
    id: 'kushner-witkoff-moscow',
    date: '2025-12-01',
    conflictId: 'ukraine',
    type: 'negotiation',
    headline: 'Kushner and Witkoff Dispatched to Moscow',
    description: 'Trump sends son-in-law and business associate to negotiate with Putin.',
    source: 'CNN',
    important: true,
  },
  {
    id: 'rwanda-drc-white-house',
    date: '2025-12-04',
    conflictId: 'rwanda-drc',
    type: 'deal-signed',
    headline: 'Rwanda-DRC Leaders Sign Deal at White House',
    description: 'Kagame and Tshisekedi sign peace deal. Trump: "Great Day for Africa!"',
    source: 'White House',
    important: true,
  },
  {
    id: 'trump-fifa-prize',
    date: '2025-12-05',
    conflictId: 'gaza',
    type: 'claim',
    headline: 'Trump Receives "FIFA Peace Prize"',
    description: 'Ceremony at Kennedy Center. Trump continues Nobel Prize complaints.',
    source: 'AP',
    important: false,
  },
  {
    id: 'thailand-cambodia-collapse',
    date: '2025-12-07',
    conflictId: 'thailand-cambodia',
    type: 'collapse',
    headline: '💀 Thailand-Cambodia Peace COLLAPSES',
    description: 'Thai artillery fire reported at border. At least 12 killed. Thousands fleeing. Deal is dead.',
    source: 'AP / Al Jazeera',
    important: true,
  },
  {
    id: 'gaza-goldin-remains',
    date: '2025-12-08',
    conflictId: 'gaza',
    type: 'deal-signed',
    headline: 'Hamas Returns Israeli Soldier\'s Remains',
    description: 'Remains of soldier Hadar Goldin returned as part of ceasefire. Positive sign.',
    source: 'AP',
    important: false,
  },
  {
    id: 'trump-eight-wars-claim',
    date: '2025-12-10',
    conflictId: 'ukraine',
    type: 'claim',
    headline: 'Trump: "In 10 Months, I Ended Eight Wars"',
    description: 'Rally in Pennsylvania. Mentions he\'ll call Thailand and Cambodia "tomorrow."',
    source: 'Rally Speech',
    important: true,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getEventsByConflict(conflictId: string): TimelineEvent[] {
  return timelineEvents
    .filter(e => e.conflictId === conflictId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getEventsByType(type: EventType): TimelineEvent[] {
  return timelineEvents.filter(e => e.type === type);
}

export function getImportantEvents(): TimelineEvent[] {
  return timelineEvents.filter(e => e.important);
}

export function getRecentEvents(days: number = 30): TimelineEvent[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  return timelineEvents
    .filter(e => new Date(e.date) >= cutoff)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllEvents(): TimelineEvent[] {
  return [...timelineEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function getCollapseEvents(): TimelineEvent[] {
  return timelineEvents.filter(e => e.type === 'collapse');
}

// Event type display config
export const eventTypeConfig: Record<EventType, { label: string; emoji: string; color: string }> = {
  'claim': { label: 'Trump Claim', emoji: '📢', color: 'yellow' },
  'deal-signed': { label: 'Deal Signed', emoji: '✍️', color: 'green' },
  'reality-check': { label: 'Reality Check', emoji: '🔍', color: 'blue' },
  'collapse': { label: 'COLLAPSED', emoji: '💀', color: 'red' },
  'escalation': { label: 'Escalation', emoji: '🔥', color: 'orange' },
  'negotiation': { label: 'Negotiations', emoji: '🤝', color: 'purple' },
};
