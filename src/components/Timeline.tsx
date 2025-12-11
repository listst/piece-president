'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TimelineEvent, eventTypeConfig, getConflictById } from '@/data';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  event: TimelineEvent;
  position: 'left' | 'right';
}

function TimelineItem({ event, position }: TimelineItemProps) {
  const config = eventTypeConfig[event.type];
  const conflict = getConflictById(event.conflictId);

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const isCollapse = event.type === 'collapse';

  return (
    <div
      className={cn(
        'relative flex items-center gap-4 mb-8',
        position === 'left' ? 'flex-row-reverse text-right' : 'flex-row text-left',
      )}
    >
      {/* Content card */}
      <div
        className={cn(
          'flex-1 max-w-md p-4 rounded-xl border-2 transition-all',
          'hover:shadow-lg cursor-pointer',
          isCollapse
            ? 'bg-red-50 border-red-300 hover:border-red-500'
            : 'bg-white border-gray-200 hover:border-brown-400',
        )}
      >
        {/* Date and type badge */}
        <div className={cn(
          'flex items-center gap-2 mb-2',
          position === 'left' ? 'justify-end' : 'justify-start',
        )}>
          <span
            className={cn(
              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
              config.color === 'yellow' && 'bg-yellow-100 text-yellow-800',
              config.color === 'green' && 'bg-green-100 text-green-800',
              config.color === 'blue' && 'bg-blue-100 text-blue-800',
              config.color === 'red' && 'bg-red-100 text-red-800',
              config.color === 'orange' && 'bg-orange-100 text-orange-800',
              config.color === 'purple' && 'bg-purple-100 text-purple-800',
            )}
          >
            <span>{config.emoji}</span>
            <span>{config.label}</span>
          </span>
          <time className="text-xs text-gray-500">{formattedDate}</time>
        </div>

        {/* Headline */}
        <h3 className={cn(
          'font-semibold mb-1',
          isCollapse ? 'text-red-800' : 'text-gray-900',
        )}>
          {event.headline}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-2">
          {event.description}
        </p>

        {/* Conflict link */}
        {conflict && (
          <Link
            href={`/zones/${conflict.slug}`}
            className="inline-flex items-center gap-1 text-xs text-brown-600 hover:text-brown-800"
          >
            <span>{conflict.flagEmojis}</span>
            <span>{conflict.shortName}</span>
            <span>→</span>
          </Link>
        )}
      </div>

      {/* Timeline dot */}
      <div
        className={cn(
          'w-4 h-4 rounded-full border-4 z-10',
          isCollapse
            ? 'bg-red-500 border-red-200'
            : 'bg-brown-500 border-brown-200',
        )}
      />

      {/* Spacer for alignment */}
      <div className="flex-1 max-w-md" />
    </div>
  );
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function Timeline({ events, className }: TimelineProps) {
  // Sort by date descending (newest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className={cn('py-8', className)}>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-brown-200 -translate-x-1/2" />

        {/* Events */}
        <div className="relative">
          {sortedEvents.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              position={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

        {/* End marker */}
        <div className="flex justify-center">
          <div className="w-8 h-8 rounded-full bg-brown-300 flex items-center justify-center">
            <span className="text-sm">💩</span>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {sortedEvents.length === 0 && (
        <p className="text-center text-gray-500 italic py-8">
          No events match your filters.
        </p>
      )}
    </section>
  );
}
