import Link from 'next/link';
import { conflicts } from '@/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrophyCase } from '@/components/Trophy';

export const metadata = {
  title: 'Trophy Case | The Piece President',
  description: 'A collection of trophies earned (or not) from claimed peace deals around the world.',
};

export default function TrophyCasePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gold-400 to-gold-500 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6">🏆</div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-900 mb-4">
              The Trophy Case
            </h1>
            <p className="text-xl text-brown-800 max-w-2xl mx-auto">
              A glittering display of achievements (claimed), participation ribbons (earned),
              and a few trophies that definitely shouldn&apos;t be here.
            </p>
          </div>
        </section>

        {/* Trophy Explanation */}
        <section className="py-12 bg-white border-b-2 border-brown-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6 text-center">
              Understanding the Awards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cream border-2 border-gold-400 rounded-xl p-6">
                <div className="text-3xl mb-2">🥇</div>
                <h3 className="font-display text-lg font-bold text-brown-900 mb-2">
                  Gold Trophy
                </h3>
                <p className="text-sm text-brown-700">
                  Legitimate achievements. A ceasefire that&apos;s actually holding,
                  or measurable progress toward peace.
                </p>
              </div>

              <div className="bg-cream border-2 border-brown-300 rounded-xl p-6">
                <div className="text-3xl mb-2">🥈</div>
                <h3 className="font-display text-lg font-bold text-brown-900 mb-2">
                  Silver Trophy
                </h3>
                <p className="text-sm text-brown-700">
                  Partial credit. Some progress made, but the situation remains fragile
                  or the role was less central than claimed.
                </p>
              </div>

              <div className="bg-cream border-2 border-brown-200 rounded-xl p-6">
                <div className="text-3xl mb-2">🎖️</div>
                <h3 className="font-display text-lg font-bold text-brown-900 mb-2">
                  Participation Trophy
                </h3>
                <p className="text-sm text-brown-700">
                  For showing up. The role is disputed, minimal, or the conflict
                  is still very much ongoing despite the claims.
                </p>
              </div>

              <div className="bg-cream border-2 border-brown-200 rounded-xl p-6">
                <div className="text-3xl mb-2">👻</div>
                <h3 className="font-display text-lg font-bold text-brown-900 mb-2">
                  Phantom Trophy
                </h3>
                <p className="text-sm text-brown-700">
                  For conflicts that didn&apos;t really exist. Can&apos;t solve a
                  problem that wasn&apos;t happening.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trophy Display */}
        <section className="py-16 bg-gradient-to-b from-brown-50 to-cream">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <TrophyCase conflicts={conflicts} />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-y-2 border-brown-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-8 text-center">
              Trophy Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  trophy: 'Gold',
                  count: conflicts.filter((c) => c.trophyType === 'gold').length,
                  emoji: '🥇',
                },
                {
                  trophy: 'Silver',
                  count: conflicts.filter((c) => c.trophyType === 'silver').length,
                  emoji: '🥈',
                },
                {
                  trophy: 'Participation',
                  count: conflicts.filter((c) => c.trophyType === 'participation').length,
                  emoji: '🎖️',
                },
                {
                  trophy: 'Phantom',
                  count: conflicts.filter((c) => c.trophyType === 'phantom').length,
                  emoji: '👻',
                },
              ].map((stat) => (
                <div
                  key={stat.trophy}
                  className="bg-cream border-2 border-brown-200 rounded-xl p-6 text-center"
                >
                  <div className="text-4xl mb-2">{stat.emoji}</div>
                  <div className="text-3xl font-display font-bold text-brown-900 mb-1">
                    {stat.count}
                  </div>
                  <div className="text-sm text-brown-600">{stat.trophy}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-display text-2xl font-bold text-brown-900 mb-6">
              See the Full Details
            </h3>
            <p className="text-brown-700 mb-8 max-w-2xl mx-auto">
              Each trophy tells a story. Dive into individual conflicts to see
              the claims, the reality, and how we arrived at these awards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-block bg-gold-400 hover:bg-gold-500 text-brown-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                View All Conflicts
              </Link>
              <Link
                href="/peace-by-piece"
                className="inline-block bg-brown-700 hover:bg-brown-800 text-cream font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                📜 View Timeline
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
