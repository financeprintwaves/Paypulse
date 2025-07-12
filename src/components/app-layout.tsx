'use client';

import * as React from 'react';
import { Menubar } from '@/components/menubar';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Menubar />
      <main className={cn('font-body flex-1')}>{children}</main>
    </div>
  );
}
