import { cn } from '../../lib/utils';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 transition-colors disabled:opacity-50 disabled:pointer-events-none';
  const styles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    outline: 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800',
  };
  return <button className={cn(base, styles[variant], className)} {...props} />;
}