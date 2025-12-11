import Link from 'next/link';
import { PieceEmoji } from '@/components/PieceEmoji';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-cream p-4">
            <div className="relative">
                <PieceEmoji size="hero" className="mb-8" />
                <div className="absolute -top-4 -right-4 text-4xl animate-bounce">
                    💩
                </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-display text-brown-900 text-center mb-4">
                404: Peace Not Found
            </h1>

            <p className="text-xl text-brown-500 font-body text-center mb-8 max-w-lg">
                This peace deal could not be found. Perhaps it collapsed before you got here?
                Or maybe it was just another phantom negotiation.
            </p>

            <Link
                href="/"
                className="px-8 py-3 bg-gold-400 text-brown-900 font-bold rounded-full hover:bg-gold-300 transition-all border-2 border-brown-900 shadow-[4px_4px_0px_0px_rgba(61,41,20,1)] hover:shadow-[2px_2px_0px_0px_rgba(61,41,20,1)] hover:translate-x-[2px] hover:translate-y-[2px]"
            >
                Return to Reality
            </Link>
        </div>
    );
}
