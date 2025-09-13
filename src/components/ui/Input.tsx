import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-green/20 focus:border-accent-green/50 disabled:cursor-not-allowed disabled:opacity-50 hover:border-white/30',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
