import { cn } from '../../lib/utils';
import React from 'react';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded bg-slate-200 dark:bg-slate-800', className)} {...props} />;
}