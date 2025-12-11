/**
 * The Piece President - News Data Types
 * 
 * Types and utilities for news feed from n8n scraper
 */

export type NewsSentiment = 'positive' | 'negative' | 'neutral';

export interface NewsItem {
  id: string;
  conflictId: string;
  headline: string;
  summary?: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;     // ISO date
  scrapedAt: string;       // ISO date
  sentiment?: NewsSentiment;
  imageUrl?: string;
}

export interface NewsSource {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  bias?: 'left' | 'center' | 'right';
  reliability: 'high' | 'medium' | 'low';
}

// ============================================================================
// TRUSTED NEWS SOURCES
// ============================================================================

export const newsSources: NewsSource[] = [
  { id: 'reuters', name: 'Reuters', domain: 'reuters.com', reliability: 'high', bias: 'center' },
  { id: 'ap', name: 'Associated Press', domain: 'apnews.com', reliability: 'high', bias: 'center' },
  { id: 'bbc', name: 'BBC', domain: 'bbc.com', reliability: 'high', bias: 'center' },
  { id: 'aljazeera', name: 'Al Jazeera', domain: 'aljazeera.com', reliability: 'high', bias: 'center' },
  { id: 'cnn', name: 'CNN', domain: 'cnn.com', reliability: 'medium', bias: 'left' },
  { id: 'nyt', name: 'New York Times', domain: 'nytimes.com', reliability: 'high', bias: 'left' },
  { id: 'wsj', name: 'Wall Street Journal', domain: 'wsj.com', reliability: 'high', bias: 'right' },
  { id: 'guardian', name: 'The Guardian', domain: 'theguardian.com', reliability: 'high', bias: 'left' },
  { id: 'time', name: 'TIME', domain: 'time.com', reliability: 'high', bias: 'center' },
  { id: 'axios', name: 'Axios', domain: 'axios.com', reliability: 'high', bias: 'center' },
  { id: 'politico', name: 'Politico', domain: 'politico.com', reliability: 'high', bias: 'center' },
];

// ============================================================================
// MOCK NEWS DATA (Replace with n8n scraper data)
// ============================================================================

export const mockNews: NewsItem[] = [
  // Thailand-Cambodia - Collapse coverage
  {
    id: 'tc-1',
    conflictId: 'thailand-cambodia',
    headline: 'Thai-Cambodia Border Clashes Resume, At Least 12 Dead',
    summary: 'Fighting erupts weeks after Trump-brokered peace accord signed in Malaysia.',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/thailand-cambodia-clashes',
    publishedAt: '2025-12-09T14:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'negative',
  },
  {
    id: 'tc-2',
    conflictId: 'thailand-cambodia',
    headline: 'Trump\'s Thailand-Cambodia Peace Deal Unravels',
    summary: 'Peace agreement suspended after Thai soldier maimed by landmine.',
    source: 'Reuters',
    sourceUrl: 'https://reuters.com/world/asia/thailand-cambodia-peace',
    publishedAt: '2025-12-08T10:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'negative',
  },
  {
    id: 'tc-3',
    conflictId: 'thailand-cambodia',
    headline: 'Thousands Flee as Thailand-Cambodia Fighting Intensifies',
    summary: 'Refugees streaming across border as artillery fire continues.',
    source: 'Al Jazeera',
    sourceUrl: 'https://aljazeera.com/news/thailand-cambodia',
    publishedAt: '2025-12-09T18:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'negative',
  },
  
  // Ukraine-Russia - Ongoing negotiations
  {
    id: 'ur-1',
    conflictId: 'ukraine',
    headline: 'Kushner, Witkoff Meet Putin in Moscow Push for Peace',
    summary: 'Trump\'s son-in-law and envoy arrive in Russia for direct talks.',
    source: 'CNN',
    sourceUrl: 'https://cnn.com/kushner-moscow',
    publishedAt: '2025-12-01T16:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'neutral',
  },
  {
    id: 'ur-2',
    conflictId: 'ukraine',
    headline: 'Ukraine Says It Won\'t Accept Troop Limits in Any Peace Deal',
    summary: 'Kyiv rejects key provision of Trump\'s 28-point plan.',
    source: 'Reuters',
    sourceUrl: 'https://reuters.com/ukraine-troop-limits',
    publishedAt: '2025-12-05T12:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'negative',
  },
  {
    id: 'ur-3',
    conflictId: 'ukraine',
    headline: 'Russian Drones Penetrate NATO Airspace as Talks Continue',
    summary: 'Poland and Romania report airspace violations amid peace negotiations.',
    source: 'BBC',
    sourceUrl: 'https://bbc.com/news/russia-drones-nato',
    publishedAt: '2025-12-07T09:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'negative',
  },
  
  // Gaza - Ceasefire holding
  {
    id: 'gz-1',
    conflictId: 'gaza',
    headline: 'Hamas Returns Remains of Israeli Soldier Under Ceasefire Deal',
    summary: 'Remains of Hadar Goldin returned, marking progress in peace agreement.',
    source: 'Associated Press',
    sourceUrl: 'https://apnews.com/gaza-hostage-remains',
    publishedAt: '2025-12-08T11:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'positive',
  },
  {
    id: 'gz-2',
    conflictId: 'gaza',
    headline: 'Gaza Reconstruction Plans Stall Over Governance Questions',
    summary: 'Countries hesitant to commit troops until Hamas disarmament clarified.',
    source: 'TIME',
    sourceUrl: 'https://time.com/gaza-reconstruction',
    publishedAt: '2025-12-06T14:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'neutral',
  },
  
  // India-Pakistan - Disputed
  {
    id: 'ip-1',
    conflictId: 'india-pakistan',
    headline: 'India Again Denies Trump Role in Kashmir Ceasefire',
    summary: 'Foreign ministry reiterates: "No third party mediation."',
    source: 'Reuters',
    sourceUrl: 'https://reuters.com/india-denies-trump',
    publishedAt: '2025-12-04T08:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'neutral',
  },
  
  // Rwanda-DRC - New deal
  {
    id: 'rd-1',
    conflictId: 'rwanda-drc',
    headline: 'Rwanda, DRC Leaders Sign Peace Deal at White House',
    summary: 'Kagame praises Trump\'s "even-handed" approach.',
    source: 'BBC',
    sourceUrl: 'https://bbc.com/rwanda-drc-trump',
    publishedAt: '2025-12-04T20:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'positive',
  },
  {
    id: 'rd-2',
    conflictId: 'rwanda-drc',
    headline: 'Violence Continues in Eastern Congo Despite Peace Framework',
    summary: 'Hundreds killed since June agreement, humanitarian groups report.',
    source: 'Al Jazeera',
    sourceUrl: 'https://aljazeera.com/eastern-congo-violence',
    publishedAt: '2025-12-03T15:00:00Z',
    scrapedAt: '2025-12-10T08:00:00Z',
    sentiment: 'negative',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getNewsByConflict(conflictId: string): NewsItem[] {
  return mockNews
    .filter(n => n.conflictId === conflictId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getLatestNews(limit: number = 10): NewsItem[] {
  return [...mockNews]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getNewsBySentiment(sentiment: NewsSentiment): NewsItem[] {
  return mockNews.filter(n => n.sentiment === sentiment);
}

export function getNewsSourceInfo(sourceName: string): NewsSource | undefined {
  return newsSources.find(s => 
    s.name.toLowerCase() === sourceName.toLowerCase()
  );
}

// Sentiment analysis helper (for display)
export function getSentimentEmoji(sentiment?: NewsSentiment): string {
  switch (sentiment) {
    case 'positive': return '✅';
    case 'negative': return '❌';
    case 'neutral': return '➖';
    default: return '❓';
  }
}

export function getSentimentColor(sentiment?: NewsSentiment): string {
  switch (sentiment) {
    case 'positive': return 'green';
    case 'negative': return 'red';
    case 'neutral': return 'gray';
    default: return 'gray';
  }
}

// ============================================================================
// N8N INTEGRATION TYPES
// ============================================================================

/**
 * Shape of data expected from n8n webhook
 * Your n8n workflow should POST to /api/news with this shape
 */
export interface N8NNewsPayload {
  items: Array<{
    conflictId: string;
    headline: string;
    summary?: string;
    source: string;
    url: string;
    publishedAt: string;
    sentiment?: NewsSentiment;
  }>;
  scrapedAt: string;
}

/**
 * Transform n8n payload to NewsItem format
 */
export function transformN8NPayload(payload: N8NNewsPayload): NewsItem[] {
  return payload.items.map((item, index) => ({
    id: `n8n-${Date.now()}-${index}`,
    conflictId: item.conflictId,
    headline: item.headline,
    summary: item.summary,
    source: item.source,
    sourceUrl: item.url,
    publishedAt: item.publishedAt,
    scrapedAt: payload.scrapedAt,
    sentiment: item.sentiment,
  }));
}

// ============================================================================
// NEWS SEARCH KEYWORDS PER CONFLICT (for n8n scraper)
// ============================================================================

export const scrapeConfig = {
  conflicts: {
    'gaza': {
      keywords: ['Gaza ceasefire', 'Israel Hamas peace', 'Gaza reconstruction', 'Trump Gaza plan'],
      sources: ['reuters', 'ap', 'aljazeera', 'bbc', 'time'],
    },
    'ukraine': {
      keywords: ['Ukraine Russia peace', 'Trump Putin', 'Ukraine ceasefire talks', 'Kushner Moscow'],
      sources: ['reuters', 'ap', 'bbc', 'cnn', 'wsj'],
    },
    'thailand-cambodia': {
      keywords: ['Thailand Cambodia border', 'Thai Cambodia clash', 'Cambodia Thailand fighting'],
      sources: ['reuters', 'ap', 'aljazeera', 'bbc'],
    },
    'india-pakistan': {
      keywords: ['India Pakistan', 'Kashmir ceasefire', 'India Pakistan relations'],
      sources: ['reuters', 'ap', 'bbc', 'guardian'],
    },
    'rwanda-drc': {
      keywords: ['Rwanda DRC peace', 'Congo Rwanda', 'M23 rebels', 'Eastern Congo'],
      sources: ['reuters', 'ap', 'aljazeera', 'bbc'],
    },
    'serbia-kosovo': {
      keywords: ['Serbia Kosovo', 'Kosovo tensions', 'Balkans'],
      sources: ['reuters', 'ap', 'bbc', 'politico'],
    },
    'egypt-ethiopia': {
      keywords: ['GERD dam', 'Nile dam dispute', 'Egypt Ethiopia'],
      sources: ['reuters', 'ap', 'aljazeera'],
    },
    'israel-iran': {
      keywords: ['Israel Iran', 'Iran Israel conflict'],
      sources: ['reuters', 'ap', 'bbc', 'time'],
    },
    'armenia-azerbaijan': {
      keywords: ['Armenia Azerbaijan', 'Nagorno Karabakh', 'Armenia Azerbaijan peace'],
      sources: ['reuters', 'ap', 'bbc'],
    },
  },
  
  // Scrape interval in minutes
  interval: 60,
  
  // Max items per conflict per scrape
  maxItemsPerConflict: 5,
};
