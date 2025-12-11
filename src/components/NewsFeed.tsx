'use client';

import { NewsItem, NewsSentiment, getSentimentEmoji, getSentimentColor } from '@/data';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  news: NewsItem;
  className?: string;
}

export function NewsCard({ news, className }: NewsCardProps) {
  const publishedDate = new Date(news.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  const sentimentEmoji = getSentimentEmoji(news.sentiment);
  const sentimentColor = getSentimentColor(news.sentiment);
  
  return (
    <article
      className={cn(
        'group bg-white rounded-lg border border-gray-200 p-4',
        'hover:shadow-md hover:border-gray-300 transition-all',
        className
      )}
    >
      {/* Header with source and sentiment */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">
          {news.source}
        </span>
        <div className="flex items-center gap-2">
          <span title={`Sentiment: ${news.sentiment || 'unknown'}`}>
            {sentimentEmoji}
          </span>
          <time className="text-xs text-gray-400">{publishedDate}</time>
        </div>
      </div>
      
      {/* Headline */}
      <a
        href={news.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group-hover:text-brown-700 transition-colors"
      >
        <h4 className="font-medium text-gray-900 line-clamp-2 mb-2">
          {news.headline}
        </h4>
      </a>
      
      {/* Summary */}
      {news.summary && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {news.summary}
        </p>
      )}
      
      {/* Read more link */}
      <a
        href={news.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-3 text-xs text-brown-600 hover:text-brown-800"
      >
        <span>Read full article</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </article>
  );
}

interface NewsFeedProps {
  news: NewsItem[];
  title?: string;
  limit?: number;
  showSentimentFilter?: boolean;
  className?: string;
}

export function NewsFeed({ 
  news, 
  title = 'Latest News', 
  limit = 6,
  showSentimentFilter = false,
  className 
}: NewsFeedProps) {
  // Limit the news items
  const displayedNews = news.slice(0, limit);
  
  if (displayedNews.length === 0) {
    return (
      <section className={cn('py-6', className)}>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 italic">No news available for this conflict.</p>
      </section>
    );
  }
  
  return (
    <section className={cn('py-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">
          Showing {displayedNews.length} of {news.length}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedNews.map((item) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>
    </section>
  );
}

// Horizontal scrolling news ticker
interface NewsTickerProps {
  news: NewsItem[];
  className?: string;
}

export function NewsTicker({ news, className }: NewsTickerProps) {
  if (news.length === 0) return null;
  
  // Duplicate for seamless loop
  const tickerNews = [...news, ...news];
  
  return (
    <div className={cn(
      'overflow-hidden bg-brown-900 text-brown-100 py-3',
      className
    )}>
      <div className="flex animate-marquee hover:pause-animation">
        {tickerNews.map((item, index) => (
          <a
            key={`${item.id}-${index}`}
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 whitespace-nowrap hover:text-white transition-colors"
          >
            <span>{getSentimentEmoji(item.sentiment)}</span>
            <span className="font-medium">{item.headline}</span>
            <span className="text-brown-400">— {item.source}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
