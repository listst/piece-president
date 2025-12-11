import Link from 'next/link';
import { PieceEmoji } from '@/components/PieceEmoji';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brown-900 text-brown-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <PieceEmoji size="sm" />
              <h3 className="font-display text-lg font-bold text-gold-400">
                The Piece President
              </h3>
            </div>
            <p className="text-sm text-brown-300 leading-relaxed">
              A satirical yet factual tracker of claimed &quot;peace deals&quot; vs.
              real-world outcomes. Because sometimes the best way to understand
              the truth is through a little humor.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold-400 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/peace-by-piece"
                  className="text-sm text-brown-300 hover:text-gold-400 transition-colors"
                >
                  Peace by Piece Timeline
                </Link>
              </li>
              <li>
                <Link
                  href="/trophy-case"
                  className="text-sm text-brown-300 hover:text-gold-400 transition-colors"
                >
                  Trophy Case
                </Link>
              </li>
              <li>
                <Link
                  href="/rest-in-piece"
                  className="text-sm text-brown-300 hover:text-gold-400 transition-colors"
                >
                  Rest in Piece
                </Link>
              </li>
              <li>
                <Link
                  href="/piece-of-work"
                  className="text-sm text-brown-300 hover:text-gold-400 transition-colors"
                >
                  About / Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Data & Disclaimer */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold-400 uppercase tracking-wider mb-4">
              Data Sources
            </h4>
            <p className="text-xs text-brown-300 leading-relaxed mb-4">
              All claims and reality checks are sourced from Reuters, AP, BBC,
              CNN, New York Times, government statements, and verified news outlets.
            </p>
            <p className="text-xs text-brown-400 italic">
              ⚠️ This is a satirical project. While we strive for factual accuracy,
              the presentation is designed for comedic effect.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-brown-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-brown-400">
              © {currentYear} The Piece President. All rights reserved.
            </p>
            <p className="text-xs text-brown-500">
              Built with satire, powered by facts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
