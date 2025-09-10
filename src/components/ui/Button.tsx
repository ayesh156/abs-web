'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:pointer-events-none disabled:opacity-50 group relative overflow-hidden',
  {
    variants: {
      variant: {
        primary:
          'bg-white text-black hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]',
        secondary:
          'border border-white/20 text-white hover:bg-white/10 hover:border-white/40 hover:scale-[1.02]',
        ghost: 'text-white hover:bg-white/10 hover:scale-[1.02]',
        outline:
          'border-2 border-white text-white hover:bg-white hover:text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]',
        magnetic:
          'bg-white text-black hover:bg-white/90 hover:scale-[1.05] transition-transform duration-150 ease-out cursor-none',
      },
      size: {
        sm: 'h-8 px-4 text-xs rounded-lg',
        md: 'h-10 px-6 py-2 rounded-xl',
        lg: 'h-12 px-8 py-3 text-base rounded-2xl',
        xl: 'h-14 px-10 py-4 text-lg rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
