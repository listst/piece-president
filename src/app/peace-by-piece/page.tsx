'use client';

import { useState } from 'react';
import Link from 'next/link';
import { timelineEvents, conflicts } from '@/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Timeline } from '@/components/Timeline';
import { cn } from '@/lib/utils';

import { FilterDropdown } from '@/components/FilterDropdown';

export default function PeaceByPiecePage() {
  const [selectedConflicts, setSelectedConflicts] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

  // Filter events based on selections
  const filteredEvents = timelineEvents.filter((event) => {
    if (selectedConflicts.length > 0 && !selectedConflicts.includes(event.conflictId)) return false;
    if (selectedEventTypes.length > 0 && !selectedEventTypes.includes(event.type)) return false;
    return true;
  });

  // Get unique event types and format for dropdown
  const eventTypeOptions = Array.from(new Set(timelineEvents.map((e) => e.type))).map(type => ({
    id: type,
    label: type.replace('-', ' ')
  }));

  // Format conflicts for dropdown
  const conflictOptions = conflicts.map(c => ({
    id: c.id,
    label: c.shortName
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brown-100 to-cream py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6">📜</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-900 mb-4">
              Peace by Piece
            </h1>
            <p className="text-xl text-brown-700 max-w-2xl mx-auto">
              A chronological journey through claims, deals, reality checks, and
              the occasional collapse. History, piece by piece.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="py-4 bg-white border-b-2 border-brown-200 sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

              <div className="flex flex-row gap-3 items-center w-full sm:w-auto">
                <FilterDropdown
                  label="Filter Conflict"
                  options={conflictOptions}
                  selectedIds={selectedConflicts}
                  onSelect={setSelectedConflicts}
                  className="w-full sm:w-[200px]"
                />

                <FilterDropdown
                  label="Filter Type"
                  options={eventTypeOptions}
                  selectedIds={selectedEventTypes}
                  onSelect={setSelectedEventTypes}
                  className="w-full sm:w-[200px]"
                />
              </div>

              {/* Results count */}
              <div className="text-xs text-brown-500 font-medium whitespace-nowrap hidden sm:block">
                Showing {filteredEvents.length} events
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-8 bg-cream">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredEvents.length > 0 ? (
              <Timeline events={filteredEvents} />
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-brown-700 mb-2">
                  No events match your filters
                </p>
                <button
                  onClick={() => {
                    setSelectedConflicts([]);
                    setSelectedEventTypes([]);
                  }}
                  className="text-gold-600 hover:text-gold-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Explanation Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6 text-center">
              Understanding the Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cream border-2 border-brown-200 rounded-xl p-6">
                <h3 className="font-semibold text-brown-900 mb-2">📣 Claims</h3>
                <p className="text-sm text-brown-700">
                  Official statements about peace deals, ceasefires, or breakthroughs.
                </p>
              </div>
              <div className="bg-cream border-2 border-brown-200 rounded-xl p-6">
                <h3 className="font-semibold text-brown-900 mb-2">🤝 Deals Signed</h3>
                <p className="text-sm text-brown-700">
                  Formal agreements, treaties, or ceasefires officially enacted.
                </p>
              </div>
              <div className="bg-cream border-2 border-brown-200 rounded-xl p-6">
                <h3 className="font-semibold text-brown-900 mb-2">✅ Reality Checks</h3>
                <p className="text-sm text-brown-700">
                  Facts on the ground that confirm or contradict the official narrative.
                </p>
              </div>
              <div className="bg-cream border-2 border-brown-200 rounded-xl p-6">
                <h3 className="font-semibold text-brown-900 mb-2">💥 Escalations</h3>
                <p className="text-sm text-brown-700">
                  Renewed violence or setbacks that undermine peace efforts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brown-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-display text-2xl font-bold text-brown-900 mb-6">
              Explore Individual Conflicts
            </h3>
            <p className="text-brown-700 mb-8 max-w-2xl mx-auto">
              Get the full picture for each conflict, including claims, reality, and scores.
            </p>
            <Link
              href="/"
              className="inline-block bg-gold-400 hover:bg-gold-500 text-brown-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
            >
              View All Conflicts
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
