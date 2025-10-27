import { cn } from '../../lib/utils';
import React from 'react';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-soft bg-white dark:bg-slate-900', className)} {...props} />
  );
}