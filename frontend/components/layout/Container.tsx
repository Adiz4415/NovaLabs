import React from "react";
import { twMerge } from "tailwind-merge";

/**
 * LayoutContainer — a responsive max-width wrapper for page content.
 * Applies max-w-7xl with responsive horizontal padding.
 * Use as the outermost layout wrapper inside page components.
 */
const LayoutContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={twMerge("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
};

export default LayoutContainer;
