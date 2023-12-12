'use client';
import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary';
}

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant = 'primary',
}: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        type='submit'
        variant={variant}
        disabled={pending || disabled}
        className={cn(className)}
      >
        {children}
      </Button>
    </>
  );
};
