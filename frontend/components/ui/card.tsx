import * as React from "react";

import { cn } from "@/lib/utils";

/** Props for the {@link Card} root container. */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Themed card container with rounded corners and a subtle shadow.
 * Forwarded refs attach to the underlying `<div>` element.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/** Props for the {@link CardHeader} section. */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Top section of a card, typically used to stack a title and description.
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/** Props for the {@link CardTitle} heading. */
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Heading rendered inside {@link CardHeader}.
 */
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/** Props for the {@link CardDescription} body text. */
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Subtle supporting text shown beneath a {@link CardTitle}.
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

/** Props for the {@link CardContent} body region. */
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Main content area of a card, rendered between header and footer.
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

/** Props for the {@link CardFooter} region. */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Bottom action area of a card, typically used for buttons.
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
