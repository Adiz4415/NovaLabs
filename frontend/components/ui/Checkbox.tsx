import * as React from "react";

import { cn } from "@/lib/utils";

/** Props accepted by the {@link Checkbox} component. */
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Themed checkbox input built on top of a native `<input type="checkbox">` element.
 *
 * Forwarded refs point to the underlying HTML input element.
 */
const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border border-input bg-background ring-offset-background focus:ring-ring focus:ring-2 focus:ring-offset-2",
        className
      )}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
