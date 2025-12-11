'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FilterDropdownProps {
    label: string;
    options: { id: string; label: string }[];
    selectedIds: string[];
    onSelect: (ids: string[]) => void;
    className?: string;
}

export function FilterDropdown({
    label,
    options,
    selectedIds,
    onSelect,
    className,
}: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelect(selectedIds.filter((item) => item !== id));
        } else {
            onSelect([...selectedIds, id]);
        }
    };

    const getButtonLabel = () => {
        if (selectedIds.length === 0) return label;
        if (selectedIds.length === 1) {
            const option = options.find(opt => opt.id === selectedIds[0]);
            return option ? option.label : label;
        }
        return `${selectedIds.length} selected`;
    };

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-between w-full sm:w-[200px] px-3 py-2 text-sm bg-white border rounded-md shadow-sm transition-colors",
                    "hover:bg-brown-50 focus:outline-none focus:ring-2 focus:ring-gold-400",
                    isOpen ? "border-gold-400 ring-1 ring-gold-400" : "border-brown-200"
                )}
            >
                <span className={cn("truncate font-medium", selectedIds.length === 0 && "text-brown-600")}>
                    {getButtonLabel()}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn("w-4 h-4 ml-2 text-brown-400 transition-transform", isOpen && "transform rotate-180")}
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-[200px] mt-1 bg-white border border-brown-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="p-1">
                        <button
                            onClick={() => {
                                onSelect([]);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "relative flex items-center w-full px-2 py-1.5 text-sm rounded-sm select-none outline-none cursor-pointer",
                                "hover:bg-brown-50 hover:text-brown-900 border-b border-brown-100 mb-1",
                                selectedIds.length === 0 ? "bg-brown-50 font-medium text-brown-900" : "text-brown-700"
                            )}
                        >
                            Clear Filters
                        </button>
                        {options.map((option) => {
                            const isSelected = selectedIds.includes(option.id);
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => toggleOption(option.id)}
                                    className={cn(
                                        "relative flex items-center w-full px-2 py-1.5 text-sm rounded-sm select-none outline-none cursor-pointer",
                                        "hover:bg-brown-50 hover:text-brown-900",
                                        isSelected ? "bg-brown-50 font-medium text-brown-900" : "text-brown-700"
                                    )}
                                >
                                    <div className={cn(
                                        "mr-2 flex items-center justify-center w-4 h-4 border rounded",
                                        isSelected ? "bg-gold-400 border-gold-400 text-brown-900" : "border-brown-300"
                                    )}>
                                        {isSelected && (
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="truncate">{option.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
