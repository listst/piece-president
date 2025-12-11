import Link from 'next/link';
import { conflicts, mockNews } from '@/data';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhirledPieceGlobe } from '@/components/WhirledPieceGlobe';
import { Gauge } from '@/components/Gauge';
import { FeaturedConflicts } from '@/components/ConflictCard';
import { NewsCarousel } from '@/components/NewsCarousel';

export default function Home() {
  // Calculate overall piece score (average of all conflicts)
  const overallScore = Math.round(
    conflicts.reduce((sum, c) => sum + c.pieceScore, 0) / conflicts.length
  );

  // Get label for overall score
  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Nearly There';
    if (score >= 60) return 'Making Progress';
    if (score >= 40) return 'Half-Baked';
    if (score >= 20) return 'Barely Started';
    return 'Total Mess';
  };

  // Get latest news for homepage carousel (limit to 5)
  const latestNews = mockNews
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Whirled Piece */}
        <section className="bg-gradient-to-b from-brown-50 to-cream py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl md:text-6xl font-bold text-brown-900 mb-4">
                The Piece President
              </h1>
              <p className="text-lg md:text-xl text-brown-700 max-w-3xl mx-auto">
                Tracking Trump&apos;s claimed &quot;peace deals&quot; against reality on the ground.
                Because peace deals should be measured in outcomes, not just handshakes.
              </p>
            </div>

            <WhirledPieceGlobe conflicts={conflicts} className="mb-8" />
          </div>
        </section>

        {/* Overall Piece Score Section */}
        <section className="py-12 bg-white border-y-2 border-brown-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brown-900 mb-6">
              Overall Piece Score
            </h2>
            <p className="text-lg text-brown-700 mb-8 max-w-2xl mx-auto">
              An aggregate assessment of all claimed peace deals, weighted by actual progress
              toward lasting peace.
            </p>

            <div className="flex justify-center mb-6">
              <Gauge value={overallScore} size="lg" animated showValue />
            </div>

            <div className="inline-block">
              <div className="bg-brown-100 border-2 border-brown-300 rounded-xl px-8 py-4">
                <p className="text-sm text-brown-600 uppercase tracking-wider mb-1">
                  Current Status
                </p>
                <p className="font-display text-2xl font-bold text-brown-900">
                  {getScoreLabel(overallScore)}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm text-brown-600 italic">
              Based on {conflicts.length} claimed &quot;peace deals&quot; across the globe
            </p>
          </div>
        </section>

        {/* Featured Conflicts Grid */}
        <section className="py-12 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedConflicts conflicts={conflicts} />
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-brown-900 mb-3">
                Latest Updates
              </h2>
              <p className="text-brown-700">
                Real-time news from the ground, tracking how these &quot;peace deals&quot; are actually going
              </p>
            </div>

            <NewsCarousel items={latestNews} />

            <div className="text-center mt-6">
              <p className="text-xs text-brown-500">
                News updates sourced from Reuters, AP, BBC, CNN, and other verified outlets
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-gradient-to-b from-brown-100 to-brown-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-brown-900 mb-4">
              Dive Deeper into the Data
            </h2>
            <p className="text-brown-700 mb-8 max-w-2xl mx-auto">
              Explore individual conflicts, view the trophy case, or pay your respects at the cemetery
              of collapsed deals. The full story is more complex than any headline.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/peace-by-piece"
                className="inline-block bg-gold-400 hover:bg-gold-500 text-brown-900 font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                📜 View Timeline
              </Link>
              <Link
                href="/trophy-case"
                className="inline-block bg-brown-700 hover:bg-brown-800 text-cream font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                🏆 Trophy Case
              </Link>
              <Link
                href="/rest-in-piece"
                className="inline-block bg-brown-900 hover:bg-black text-cream font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm"
              >
                🪦 Rest in Piece
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
