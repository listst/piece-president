import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PieceEmoji } from '@/components/PieceEmoji';

export const metadata = {
  title: 'Piece of Work | About The Piece President',
  description: 'Learn about our methodology, data sources, and the satirical approach behind The Piece President.',
};

export default function PieceOfWorkPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-brown-100 to-cream py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <PieceEmoji size="xl" className="mx-auto mb-6" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-brown-900 mb-4">
              Piece of Work
            </h1>
            <p className="text-xl text-brown-700">
              Our methodology for tracking a real piece of work.
            </p>
          </div>
        </section>

        {/* What This Is */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6">
              What Is This?
            </h2>
            <div className="prose prose-brown max-w-none">
              <p className="text-brown-700 leading-relaxed mb-4">
                <strong>The Piece President</strong> is a satirical website that tracks claimed
                &quot;peace deals&quot; against what&apos;s actually happening on the ground. The name
                is a deliberate pun—piece (💩) vs. peace—reflecting the gap between rhetoric
                and reality.
              </p>
              <p className="text-brown-700 leading-relaxed mb-4">
                We track 9 conflicts where peace deals have been announced, measuring them
                against verifiable facts: casualty reports, ceasefire violations, expert analysis,
                and statements from the parties involved.
              </p>
              <p className="text-brown-700 leading-relaxed">
                Our goal isn&apos;t just to mock—it&apos;s to hold claims accountable. Peace is too
                important to accept at face value.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-12 bg-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6">
              How We Score Deals
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-brown-900 mb-2">1. Identify the Claim</h3>
                <p className="text-brown-700 leading-relaxed">
                  We document the exact quote, date, and source of peace deal claims. Every
                  statement is attributed with a link to the original source.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-brown-900 mb-2">2. Check the Reality</h3>
                <p className="text-brown-700 leading-relaxed">
                  We gather facts from multiple credible sources: Reuters, AP, BBC, CNN, government
                  statements, UN reports, and regional news outlets. We look for:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-brown-700 ml-4">
                  <li>Has violence stopped or reduced?</li>
                  <li>Are ceasefire terms being followed?</li>
                  <li>What do local parties say about the deal?</li>
                  <li>What do independent experts assess?</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-brown-900 mb-2">3. Assign a Score (0-100)</h3>
                <p className="text-brown-700 leading-relaxed mb-2">
                  Our &quot;Piece Score&quot; reflects how well the claimed peace is holding:
                </p>
                <ul className="space-y-1 text-sm text-brown-700 ml-4">
                  <li><strong>80-100:</strong> Ceasefire holding, measurable progress</li>
                  <li><strong>60-79:</strong> Fragile peace, some violations but mostly stable</li>
                  <li><strong>40-59:</strong> Shaky, disputed, or too early to assess</li>
                  <li><strong>20-39:</strong> Ongoing conflict, minimal impact</li>
                  <li><strong>0-19:</strong> Collapsed or never existed</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-brown-900 mb-2">4. Award Trophies</h3>
                <p className="text-brown-700 leading-relaxed">
                  Based on scores and circumstances, we assign trophies: Gold (legitimate),
                  Silver (partial credit), Participation (disputed role), Phantom (no actual
                  conflict), or Tombstone (collapsed).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6">
              Data Sources
            </h2>
            <p className="text-brown-700 mb-6">
              All data is sourced from credible, verifiable outlets:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'Reuters',
                'Associated Press',
                'BBC',
                'CNN',
                'New York Times',
                'Wall Street Journal',
                'Al Jazeera',
                'The Guardian',
                'UN Reports',
                'Government Statements',
                'Think Tank Analyses',
                'Local News Outlets',
              ].map((source) => (
                <div
                  key={source}
                  className="bg-cream border border-brown-200 rounded-lg p-3 text-center text-sm text-brown-700"
                >
                  {source}
                </div>
              ))}
            </div>
            <p className="text-sm text-brown-600 mt-6 italic">
              Every claim and reality check includes source links. Click through to verify for yourself.
            </p>
          </div>
        </section>

        {/* Why Satire? */}
        <section className="py-12 bg-brown-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6">
              Why Satire?
            </h2>
            <p className="text-brown-700 leading-relaxed mb-4">
              Satire isn&apos;t about being flippant—it&apos;s about cutting through the noise.
              When political claims are wrapped in ceremony and spectacle, straightforward
              fact-checking can feel dry and disconnected.
            </p>
            <p className="text-brown-700 leading-relaxed mb-4">
              By using humor, we highlight the absurdity of claiming credit for peace deals that
              haven&apos;t delivered peace. The juxtaposition of claims vs. reality IS the joke.
              We let the facts speak for themselves.
            </p>
            <p className="text-brown-700 leading-relaxed">
              Our mascot—a poop emoji with Trump&apos;s hair—is deliberately ridiculous. But the
              data behind it is thoroughly researched and sourced. The best satire is accurate.
            </p>
          </div>
        </section>

        {/* Disclaimers */}
        <section className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-6">
              Disclaimers & Limitations
            </h2>
            <ul className="space-y-3 text-brown-700">
              <li>
                <strong>This is satire:</strong> While we strive for factual accuracy, the presentation
                is intentionally humorous and critical.
              </li>
              <li>
                <strong>Scores are subjective:</strong> Our &quot;Piece Scores&quot; are editorial
                assessments based on available data, not scientific measurements.
              </li>
              <li>
                <strong>Data lags reality:</strong> Conflicts evolve quickly. We update as new
                information becomes available, but there may be delays.
              </li>
              <li>
                <strong>Not comprehensive:</strong> We focus on high-profile claimed deals, not every
                diplomatic effort globally.
              </li>
              <li>
                <strong>No political affiliation:</strong> This project critiques claims regardless
                of party or ideology. Bad peace deals deserve scrutiny.
              </li>
            </ul>
          </div>
        </section>

        {/* Contact/Feedback */}
        <section className="py-12 bg-gradient-to-b from-cream to-brown-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl font-bold text-brown-900 mb-4">
              Feedback & Corrections
            </h2>
            <p className="text-brown-700 mb-6">
              If you spot an error, have updated information, or want to suggest a conflict
              to track, we want to hear from you. Accuracy matters.
            </p>
            <div className="bg-white border-2 border-brown-300 rounded-xl p-6">
              <p className="text-brown-900 font-semibold mb-2">
                Contact us with corrections or feedback
              </p>
              <p className="text-sm text-brown-600">
                (Contact information would go here - email, form, etc.)
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-brown-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="font-display text-2xl font-bold text-brown-900 mb-6">
              Ready to Explore the Data?
            </h3>
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
