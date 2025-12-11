import { notFound } from 'next/navigation';
import Link from 'next/link';
import { conflicts, mockNews } from '@/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StatusBadge, TrophyBadge } from '@/components/Badge';
import { Gauge } from '@/components/Gauge';
import { ClaimQuote } from '@/components/ClaimQuote';
import { RealityCheck } from '@/components/RealityCheck';
import { NewsFeed } from '@/components/NewsFeed';

// Generate static params for all conflicts
export async function generateStaticParams() {
  return conflicts.map((conflict) => ({
    slug: conflict.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conflict = conflicts.find((c) => c.slug === slug);

  if (!conflict) {
    return {
      title: 'Conflict Not Found',
    };
  }

  return {
    title: `${conflict.name} | The Piece President`,
    description: conflict.tagline,
  };
}

export default async function ConflictDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const conflict = conflicts.find((c) => c.slug === slug);

  if (!conflict) {
    notFound();
  }

  // Get news for this specific conflict
  const conflictNews = mockNews.filter((news) => news.conflictId === conflict.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-cream">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-brown-100 to-cream py-12 border-b-2 border-brown-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Flag & Title */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{conflict.flagEmojis}</div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-900 mb-3">
                {conflict.name}
              </h1>
              <p className="text-xl text-brown-700 italic mb-6">{conflict.tagline}</p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-3">
                <StatusBadge status={conflict.status} size="md" />
                <TrophyBadge type={conflict.trophyType} size="md" />
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-white rounded-xl border-2 border-brown-200 p-6 text-center">
              <p className="text-sm text-brown-600 uppercase tracking-wider mb-2">Location</p>
              <p className="text-brown-900 font-semibold">
                {conflict.coordinates.lat.toFixed(2)}°{conflict.coordinates.lat >= 0 ? 'N' : 'S'},{' '}
                {conflict.coordinates.lng.toFixed(2)}°{conflict.coordinates.lng >= 0 ? 'E' : 'W'}
              </p>
            </div>
          </div>
        </section>

        {/* The Claim */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6 text-center">
              🗣️ The Claim
            </h2>
            <ClaimQuote claim={conflict.claim} />
          </div>
        </section>

        {/* The Reality */}
        <section className="py-12 bg-cream">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6 text-center">
              ✅ The Reality
            </h2>
            <RealityCheck reality={conflict.reality} />
          </div>
        </section>

        {/* Piece-o-Meter */}
        <section className="py-12 bg-white border-y-2 border-brown-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6">
              Piece-o-Meter
            </h2>
            <p className="text-lg text-brown-700 mb-8 max-w-2xl mx-auto">
              Our assessment of how well this &quot;peace deal&quot; is actually working, based on
              verifiable facts and expert analysis.
            </p>

            <div className="flex justify-center mb-6">
              <Gauge value={conflict.pieceScore} size="lg" animated showValue />
            </div>

            <div className="inline-block">
              <div className="bg-brown-100 border-2 border-brown-300 rounded-xl px-8 py-4">
                <p className="text-sm text-brown-600 uppercase tracking-wider mb-1">Status</p>
                <p className="font-display text-2xl font-bold text-brown-900 capitalize">
                  {conflict.status.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* News Feed */}
        {conflictNews.length > 0 && (
          <section className="py-12 bg-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-display text-3xl font-bold text-brown-900 mb-6 text-center">
                📰 Latest News
              </h2>
              <p className="text-center text-brown-700 mb-8">
                What&apos;s actually happening on the ground
              </p>
              <NewsFeed news={conflictNews} limit={5} />
            </div>
          </section>
        )}

        {/* Related Conflicts */}
        <section className="py-12 bg-brown-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-display text-2xl font-bold text-brown-900 mb-4">
              Explore Other Conflicts
            </h3>
            <p className="text-brown-700 mb-6">
              See how other &quot;peace deals&quot; are faring around the world
            </p>
            <Link
              href="/"
              className="inline-block bg-gold-400 hover:bg-gold-500 text-brown-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
            >
              ← Back to All Conflicts
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
