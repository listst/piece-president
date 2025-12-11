import { RealityCheck as RealityCheckType } from '@/data';
import { cn } from '@/lib/utils';

interface RealityCheckProps {
  reality: RealityCheckType;
  className?: string;
}

export function RealityCheck({ reality, className }: RealityCheckProps) {
  const lastUpdated = new Date(reality.lastUpdated).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  
  return (
    <section
      className={cn(
        'bg-white border-2 border-blue-200 rounded-xl p-6',
        className
      )}
    >
      {/* Section label */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
          <span>🔍</span>
          Reality Check
        </span>
        <span className="text-xs text-gray-500">
          Updated {lastUpdated}
        </span>
      </div>
      
      {/* Summary */}
      <p className="text-gray-800 text-lg leading-relaxed mb-6">
        {reality.summary}
      </p>
      
      {/* Disputed By callout */}
      {reality.disputedBy && (
        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6 rounded-r-lg">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-semibold text-orange-800">Disputed Credit</p>
              <p className="text-orange-700 text-sm mt-1">
                {reality.disputedBy}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Key Facts */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span>📋</span>
          Key Facts
        </h4>
        <ul className="space-y-2">
          {reality.keyFacts.map((fact, index) => (
            <li 
              key={index}
              className="flex items-start gap-3 text-gray-700"
            >
              <span className="text-blue-500 mt-1">•</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Casualties (if available) */}
      {reality.casualties && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <span>📊</span>
            Human Cost
          </h4>
          <p className="text-red-700">
            <span className="font-bold">{reality.casualties.count}</span>
            <span className="text-sm ml-2">
              (since {new Date(reality.casualties.since).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })})
            </span>
          </p>
          <p className="text-xs text-red-600 mt-1">
            Source: {reality.casualties.source}
          </p>
        </div>
      )}
    </section>
  );
}
