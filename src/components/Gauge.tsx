'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GaugeProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  variant?: 'semicircle' | 'circle';
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { width: 80, height: 50, strokeWidth: 6, fontSize: 14 },
  md: { width: 120, height: 70, strokeWidth: 8, fontSize: 20 },
  lg: { width: 180, height: 100, strokeWidth: 10, fontSize: 28 },
};

// Color stops for the gauge
function getGaugeColor(value: number): string {
  if (value <= 20) return '#D32F2F'; // Red - Total Disaster
  if (value <= 40) return '#FF9800'; // Orange - Mostly False
  if (value <= 60) return '#FFC107'; // Yellow - Half-Baked
  if (value <= 80) return '#8BC34A'; // Light Green - Getting There
  return '#4CAF50'; // Green - Actual Peace?
}

function getGaugeLabel(value: number): string {
  if (value <= 20) return 'Total Disaster';
  if (value <= 40) return 'Mostly False';
  if (value <= 60) return 'Half-Baked';
  if (value <= 80) return 'Getting There';
  return 'Actual Peace?';
}

export function Gauge({
  value,
  size = 'md',
  variant = 'semicircle',
  label,
  showValue = true,
  animated = true,
  className,
}: GaugeProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  const config = sizeConfig[size];
  
  // Animate value on mount
  useEffect(() => {
    if (!animated) {
      setDisplayValue(value);
      return;
    }
    
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, animated]);
  
  // SVG calculations for semicircle
  const centerX = config.width / 2;
  const centerY = config.height;
  const radius = config.width / 2 - config.strokeWidth;
  
  // Arc path for semicircle (180 degrees)
  const startAngle = Math.PI; // 180 degrees (left)
  const endAngle = 0; // 0 degrees (right)
  const valueAngle = startAngle - (displayValue / 100) * Math.PI;
  
  // Calculate arc endpoints
  const startX = centerX + radius * Math.cos(startAngle);
  const startY = centerY + radius * Math.sin(startAngle);
  const endX = centerX + radius * Math.cos(endAngle);
  const endY = centerY + radius * Math.sin(endAngle);
  const valueX = centerX + radius * Math.cos(valueAngle);
  const valueY = centerY + radius * Math.sin(valueAngle);
  
  // Background arc path
  const bgArc = `M ${startX} ${startY} A ${radius} ${radius} 0 0 1 ${endX} ${endY}`;
  
  // Value arc path
  const largeArc = displayValue > 50 ? 1 : 0;
  const valueArc = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 1 ${valueX} ${valueY}`;
  
  const gaugeColor = getGaugeColor(displayValue);
  const gaugeLabel = label || getGaugeLabel(displayValue);
  
  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg
        width={config.width}
        height={config.height + 10}
        viewBox={`0 0 ${config.width} ${config.height + 10}`}
      >
        {/* Background arc */}
        <path
          d={bgArc}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Value arc */}
        <path
          d={valueArc}
          fill="none"
          stroke={gaugeColor}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          style={{
            transition: animated ? 'stroke 0.3s ease' : undefined,
          }}
        />
        
        {/* Value text */}
        {showValue && (
          <text
            x={centerX}
            y={centerY - 5}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={config.fontSize}
            fontWeight="bold"
            fill={gaugeColor}
          >
            {displayValue}
          </text>
        )}
      </svg>
      
      {/* Label */}
      <span
        className="text-sm font-medium mt-1"
        style={{ color: gaugeColor }}
      >
        {gaugeLabel}
      </span>
    </div>
  );
}

// Overall Piece Score variant for homepage
export function OverallPieceScore({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center p-6 bg-cream rounded-xl border-2 border-brown-200">
      <h2 className="text-xl font-display font-bold text-brown-800 mb-4">
        Overall Piece Score
      </h2>
      <Gauge value={score} size="lg" animated />
      <p className="text-sm text-brown-600 mt-4 text-center max-w-xs">
        Aggregate score across all {'"'}peace deals{'"'} based on reality checks
      </p>
    </div>
  );
}
