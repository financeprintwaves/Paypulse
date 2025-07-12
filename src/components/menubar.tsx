
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Menubar as MenubarPrimitive,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, FileText, User, LogOut, FilePieChart } from 'lucide-react';
import { Logo } from './icons';
import { cn } from '@/lib/utils';

export function Menubar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/salary-slips', label: 'Salary Slips', icon: FileText },
    { href: '/statement', label: 'Statement', icon: FilePieChart },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/dashboard" className="flex items-center gap-2 mr-6">
          <Logo className="w-8 h-8 text-primary" />
          <span className="font-headline text-xl font-bold">PayPulse</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === item.href ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <MenubarPrimitive>
            <MenubarMenu>
              <MenubarTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Jane Doe" data-ai-hint="profile person" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </MenubarTrigger>
              <MenubarContent align="end" forceMount>
                <MenubarItem disabled>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Jane Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      jane.doe@example.com
                    </p>
                     <p className="text-xs leading-none text-muted-foreground pt-1">
                      Branch: New York (NY-01)
                    </p>
                  </div>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                </MenubarItem>
                <MenubarItem asChild>
                   <Link href="/" className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </MenubarPrimitive>
        </div>
      </div>
    </header>
  );
}
