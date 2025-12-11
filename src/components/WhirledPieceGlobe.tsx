'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/navigation';
import { Conflict, SITE_CONFIG } from '@/data';
import { cn } from '@/lib/utils';

interface WhirledPieceGlobeProps {
    conflicts: Conflict[];
    className?: string;
    autoSpin?: boolean;
}

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export function WhirledPieceGlobe({
    conflicts,
    className,
    autoSpin = false,
}: WhirledPieceGlobeProps) {
    const router = useRouter();
    const mapRef = useRef<any>(null);

    // Responsive zoom level based on viewport
    const getInitialZoom = () => {
        if (typeof window === 'undefined') return 2.2;
        return window.innerWidth < 768 ? 1.2 : 2.2;
    };

    const [viewState, setViewState] = useState({
        longitude: 50,
        latitude: 25,
        zoom: getInitialZoom(),
    });
    const [spinning, setSpinning] = useState(autoSpin);
    const spinRef = useRef<NodeJS.Timeout | null>(null);
    const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null);

    // Status colors for hotspots
    const statusColors: Record<string, string> = {
        holding: '#10b981',
        shaky: '#eab308',
        collapsed: '#ef4444',
        disputed: '#f97316',
        'no-conflict': '#6b7280',
        ongoing: '#3b82f6',
        'too-early': '#a855f7',
    };

    // Update zoom on window resize
    useEffect(() => {
        const handleResize = () => {
            const newZoom = getInitialZoom();
            setViewState(prev => ({ ...prev, zoom: newZoom }));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (spinRef.current) {
                cancelAnimationFrame(spinRef.current as unknown as number);
            }
        };
    }, []);

    // Handle user interaction
    const onMove = useCallback((evt: any) => {
        setViewState(evt.viewState);
        if (spinning) {
            setSpinning(false);
        }
    }, [spinning]);

    // Handle hotspot click - fly to location and show panel
    const handleHotspotClick = (conflict: Conflict, e: any) => {
        e.originalEvent.stopPropagation();
        setSelectedConflict(conflict);

        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [conflict.coordinates.lng, conflict.coordinates.lat],
                zoom: 4,
                duration: 1500,
                essential: true
            });
        }
    };

    // Close panel
    const handleClosePanel = () => {
        setSelectedConflict(null);
    };

    // Navigate to conflict detail
    const handleViewDetails = () => {
        if (selectedConflict) {
            router.push(`/zones/${selectedConflict.slug}`);
        }
    };

    // Spin button handler
    const handleSpinClick = () => {
        const randomConflict = conflicts[Math.floor(Math.random() * conflicts.length)];
        setSpinning(false);
        setSelectedConflict(randomConflict);

        if (mapRef.current) {
            mapRef.current.flyTo({
                center: [randomConflict.coordinates.lng, randomConflict.coordinates.lat],
                zoom: 4,
                duration: 3000,
                essential: true
            });
        }
    };

    if (!MAPBOX_TOKEN) {
        return (
            <div className={cn("relative w-full aspect-[2/1] bg-brown-900 flex items-center justify-center text-cream", className)}>
                <div className="text-center p-6">
                    <p className="mb-2">Mapbox Token Missing</p>
                    <p className="text-sm text-brown-300">Please add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local</p>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('relative w-full aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden shadow-2xl border-4 border-gold-400 group', className)}>
            <Map
                ref={mapRef}
                {...viewState}
                onMove={onMove}
                onClick={() => setSelectedConflict(null)} // Close panel on map click
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/satellite-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
                projection={{ name: 'globe' }}
                fog={{
                    range: [0.5, 10],
                    color: '#26180a',
                    'horizon-blend': 0.1,
                    'high-color': '#DAA520',
                    'space-color': '#1a1005',
                    'star-intensity': 0.8
                }}
                terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
            >
                {/* Render Pulsing Hotspots */}
                {conflicts.map((conflict) => {
                    const color = statusColors[conflict.status];
                    const isSelected = selectedConflict?.id === conflict.id;

                    return (
                        <Marker
                            key={conflict.id}
                            longitude={conflict.coordinates.lng}
                            latitude={conflict.coordinates.lat}
                            anchor="center"
                            onClick={(e) => handleHotspotClick(conflict, e)}
                        >
                            <div className="relative cursor-pointer">
                                {/* Outer pulse ring 1 */}
                                <div
                                    className="absolute inset-0 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"
                                    style={{
                                        backgroundColor: color,
                                        opacity: 0.4,
                                        width: isSelected ? '40px' : '32px',
                                        height: isSelected ? '40px' : '32px',
                                        marginLeft: isSelected ? '-20px' : '-16px',
                                        marginTop: isSelected ? '-20px' : '-16px',
                                    }}
                                />

                                {/* Outer pulse ring 2 (delayed) */}
                                <div
                                    className="absolute inset-0 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"
                                    style={{
                                        backgroundColor: color,
                                        opacity: 0.3,
                                        animationDelay: '1s',
                                        width: isSelected ? '40px' : '32px',
                                        height: isSelected ? '40px' : '32px',
                                        marginLeft: isSelected ? '-20px' : '-16px',
                                        marginTop: isSelected ? '-20px' : '-16px',
                                    }}
                                />

                                {/* Core hotspot dot */}
                                <div
                                    className={cn(
                                        "rounded-full shadow-lg transition-all duration-300",
                                        isSelected ? "scale-150" : "hover:scale-125"
                                    )}
                                    style={{
                                        backgroundColor: color,
                                        width: '16px',
                                        height: '16px',
                                        boxShadow: `0 0 16px ${color}, 0 0 32px ${color}50`,
                                        border: '2px solid rgba(255,255,255,0.9)',
                                    }}
                                />
                            </div>
                        </Marker>
                    );
                })}
            </Map>

            {/* Slide-in Panel */}
            <div
                className={cn(
                    "absolute top-0 right-0 h-full w-full md:w-80 bg-brown-900/95 backdrop-blur-md border-l-4 border-gold-400 shadow-2xl transition-transform duration-500 ease-out z-10",
                    selectedConflict ? "translate-x-0" : "translate-x-full"
                )}
            >
                {selectedConflict && (
                    <div className="p-4 md:p-6 h-full flex flex-col overflow-y-auto">
                        {/* Close button */}
                        <button
                            onClick={handleClosePanel}
                            className="absolute top-3 right-3 md:top-4 md:right-4 text-brown-300 hover:text-white transition-colors z-10 bg-brown-800 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Status indicator */}
                        <div className="flex items-center gap-2 mb-4">
                            <div
                                className="w-3 h-3 rounded-full animate-pulse"
                                style={{ backgroundColor: statusColors[selectedConflict.status] }}
                            />
                            <span className="text-sm font-medium text-brown-300">
                                {SITE_CONFIG.statusLabels[selectedConflict.status]}
                            </span>
                        </div>

                        {/* Conflict name */}
                        <h3 className="font-display text-xl md:text-2xl font-bold text-cream mb-2 pr-8">
                            {selectedConflict.name}
                        </h3>

                        {/* Tagline */}
                        <p className="text-gold-400 text-xs md:text-sm italic mb-3 md:mb-4">
                            {selectedConflict.tagline}
                        </p>

                        {/* Piece Score */}
                        <div className="bg-brown-800 rounded-lg p-3 md:p-4 mb-3 md:mb-4 flex-shrink-0">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-brown-300 text-sm">Piece Score</span>
                                <span className="font-display text-2xl font-bold text-gold-400">
                                    {selectedConflict.pieceScore}
                                </span>
                            </div>
                            {/* Score bar */}
                            <div className="h-2 bg-brown-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000"
                                    style={{
                                        width: `${selectedConflict.pieceScore}%`,
                                        backgroundColor: statusColors[selectedConflict.status]
                                    }}
                                />
                            </div>
                        </div>

                        {/* Trophy type */}
                        <div className="text-xs md:text-sm text-brown-300 mb-3 md:mb-4 flex-shrink-0">
                            <span className="text-brown-400">Award: </span>
                            {SITE_CONFIG.trophyLabels[selectedConflict.trophyType]}
                        </div>

                        {/* Reality summary */}
                        <div className="flex-1 overflow-y-auto mb-4">
                            <p className="text-xs md:text-sm text-brown-200 leading-relaxed">
                                {selectedConflict.reality.summary}
                            </p>
                        </div>

                        {/* View details button */}
                        <button
                            onClick={handleViewDetails}
                            className="mt-auto w-full bg-gold-400 hover:bg-gold-500 text-brown-900 font-bold py-2.5 md:py-3 px-4 md:px-6 rounded-lg transition-colors flex-shrink-0 text-sm md:text-base"
                        >
                            View Full Details →
                        </button>
                    </div>
                )}
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <button
                    onClick={handleSpinClick}
                    className="bg-gold-400 hover:bg-gold-500 text-brown-900 font-bold w-14 h-14 rounded-full shadow-xl border-2 border-white transform transition hover:scale-110 active:scale-95 flex items-center justify-center text-2xl"
                    title="Spin the Piece"
                >
                    🎲
                </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 bg-brown-900/80 backdrop-blur-sm rounded-lg p-3 hidden md:block">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    {Object.entries(statusColors).slice(0, 6).map(([status, color]) => (
                        <div key={status} className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-brown-200 capitalize">
                                {status.replace('-', ' ')}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
