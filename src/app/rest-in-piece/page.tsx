import Link from 'next/link';
import { conflicts } from '@/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Cemetery } from '@/components/Tombstone';

export const metadata = {
  title: 'Rest in Piece | The Piece President',
  description: 'A cemetery of collapsed peace deals that didn\'t survive reality.',
};

export default function RestInPiecePage() {
  // Get all collapsed conflicts
  const collapsedDeals = conflicts.filter((c) => c.status === 'collapsed');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brown-900 to-brown-800 text-cream py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6">🪦</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Rest in Piece
            </h1>
            <p className="text-xl text-brown-200 max-w-2xl mx-auto">
              A solemn memorial to the peace deals that promised so much,
              but collapsed under the weight of reality.
            </p>
          </div>
        </section>

        {/* Cemetery Section */}
        <section className="py-16 bg-gradient-to-b from-brown-800 via-brown-700 to-brown-600 relative overflow-hidden">
          {/* Fog effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {collapsedDeals.length > 0 ? (
              <>
                <div className="text-center mb-12">
                  <p className="text-brown-200 text-lg">
                    {collapsedDeals.length} {collapsedDeals.length === 1 ? 'deal' : 'deals'} laid to rest
                  </p>
                </div>
                <Cemetery conflicts={collapsedDeals} />
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-2xl text-brown-200 mb-4">
                  The cemetery stands empty... for now.
                </p>
                <p className="text-brown-300">
                  No deals have completely collapsed yet. But history suggests
                  this won&apos;t stay empty for long.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Epitaph Section */}
        <section className="py-12 bg-brown-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl border-2 border-brown-300 p-8 text-center">
              <h2 className="font-display text-2xl font-bold text-brown-900 mb-4">
                What Makes a Deal &quot;Collapsed&quot;?
              </h2>
              <div className="text-left max-w-2xl mx-auto space-y-3 text-brown-700">
                <p>
                  A peace deal is considered collapsed when:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The ceasefire has been permanently abandoned</li>
                  <li>Fighting has resumed at pre-deal levels or worse</li>
                  <li>One or more parties have officially withdrawn</li>
                  <li>The deal&apos;s core objectives are no longer being pursued</li>
                </ul>
                <p className="mt-4 italic text-sm text-brown-600">
                  Deals rated as &quot;shaky&quot; or &quot;disputed&quot; may be struggling,
                  but they haven&apos;t yet earned a tombstone. We track those separately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-display text-2xl font-bold text-brown-900 mb-6">
              Not All Hope Is Lost
            </h3>
            <p className="text-brown-700 mb-8 max-w-2xl mx-auto">
              While some deals have failed, others are still holding (however shakily).
              Explore the full picture of claimed peace efforts around the world.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-block bg-gold-400 hover:bg-gold-500 text-brown-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                View All Conflicts
              </Link>
              <Link
                href="/trophy-case"
                className="inline-block bg-brown-700 hover:bg-brown-800 text-cream font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                🏆 Visit Trophy Case
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
