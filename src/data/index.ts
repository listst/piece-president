/**
 * The Piece President - Data Index
 * 
 * Central export for all data, types, and utilities
 */

// ============================================================================
// CONFLICTS
// ============================================================================
export {
  // Types
  type ConflictStatus,
  type TrophyType,
  type Claim,
  type RealityCheck,
  type Conflict,
  
  // Data
  conflicts,
  SITE_CONFIG,
  
  // Utilities
  getConflictBySlug,
  getConflictById,
  getFeaturedConflicts,
  getConflictsByStatus,
  getCollapsedConflicts,
  getRestInPieceConflicts,
  getOverallPieceScore,
  getConflictCount,
  getAllNewsKeywords,
  getNewsKeywordsForConflict,
} from './conflicts';

// ============================================================================
// TIMELINE
// ============================================================================
export {
  // Types
  type EventType,
  type TimelineEvent,
  
  // Data
  timelineEvents,
  eventTypeConfig,
  
  // Utilities
  getEventsByConflict,
  getEventsByType,
  getImportantEvents,
  getRecentEvents,
  getAllEvents,
  getCollapseEvents,
} from './timeline';

// ============================================================================
// NEWS
// ============================================================================
export {
  // Types
  type NewsSentiment,
  type NewsItem,
  type NewsSource,
  type N8NNewsPayload,
  
  // Data
  newsSources,
  mockNews,
  scrapeConfig,
  
  // Utilities
  getNewsByConflict,
  getLatestNews,
  getNewsBySentiment,
  getNewsSourceInfo,
  getSentimentEmoji,
  getSentimentColor,
  transformN8NPayload,
} from './news';
