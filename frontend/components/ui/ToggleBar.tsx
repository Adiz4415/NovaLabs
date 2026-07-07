'use client';

import { cn } from '@/utils/cn';

/** Props for the {@link ToggleBar} component. */
interface ToggleBarProps {
  /** Toggleable options rendered as tabs in the bar. */
  options: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  /** Currently selected option id. */
  value: string;
  /** Invoked with the selected option id when a tab is clicked. */
  onChange: (value: string) => void;
  /** Optional extra classes merged onto the tablist container. */
  className?: string;
}

/**
 * Pill-style tab bar used to switch between mutually exclusive options,
 * commonly between alternative auth methods such as password and OTP.
 */
export function ToggleBar({ options, value, onChange, className }: ToggleBarProps) {
  return (
    <div
      className={cn('flex rounded-lg bg-gray-100 p-1', className)}
      role="tablist"
      aria-label="Login method selection"
    >
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          role="tab"
          aria-selected={value === option.id}
          aria-controls={`${option.id}-panel`}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
            value === option.id
              ? 'bg-[#2563EB] text-white shadow-sm focus:ring-[#3b82f6]'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:ring-gray-400'
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}
