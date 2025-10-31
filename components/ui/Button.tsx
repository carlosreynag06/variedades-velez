// components/ui/button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

// Define button styles based on globals.css and master plan
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] focus-visible:ring-[var(--focus-ring)]/50 disabled:opacity-60 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--primary)] text-white shadow-sm hover:bg-[var(--primary-600)] active:scale-[1.02]',
        secondary:
          'border border-[var(--secondary)] text-[var(--secondary)] bg-transparent shadow-sm hover:bg-[var(--secondary)]/10',
        outline:
          'border border-[var(--border)] text-[var(--text-secondary)] bg-transparent shadow-sm hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]',
        ghost:
          'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]',
        danger:
          'bg-[var(--danger)] text-white shadow-sm hover:bg-[var(--danger)]/85',
        link: 'text-[var(--primary)] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2.5',
        sm: 'h-9 rounded-[var(--radius-sm)] px-3',
        lg: 'h-11 rounded-[var(--radius-md)] px-5 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Define props for the component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// Create the component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Export the component and variants
export { Button, buttonVariants };