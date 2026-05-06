import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

/**
 * Card container reutilizável. Quando hoverable=true,
 * eleva-se ao passar o mouse — bom para grids de produtos/médicos.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-2xl border border-neutral-200 shadow-soft p-6',
          hoverable &&
            'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
