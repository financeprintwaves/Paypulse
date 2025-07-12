'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarHeader, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, FileText, User, LogOut, ChevronDown } from 'lucide-react';
import { Logo } from './icons';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/salary-slips', label: 'Salary Slips', icon: FileText },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar collapsible="icon" className="border-r border-border/50">
          <SidebarHeader>
            <div className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <span className="font-headline text-xl font-bold">PayPulse</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={{ children: item.label }}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="justify-start w-full gap-2 p-2 h-auto text-left">
                         <Avatar className="h-9 w-9">
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Jane Doe" data-ai-hint="profile person" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
                            <p className="truncate font-medium">Jane Doe</p>
                            <p className="truncate text-xs text-muted-foreground">jane.doe@example.com</p>
                        </div>
                        <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-1 mb-2">
                    <div className="p-2 text-sm">
                        <p className="font-bold">Branch</p>
                        <p className="text-muted-foreground">New York (NY-01)</p>
                    </div>
                    <Button asChild variant="ghost" className="w-full justify-start text-sm">
                        <Link href="/profile">
                            <User className="mr-2 h-4 w-4" /> My Profile
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" className="w-full justify-start text-sm text-red-400 hover:text-red-400 hover:bg-red-500/10">
                        <Link href="/">
                            <LogOut className="mr-2 h-4 w-4" /> Sign Out
                        </Link>
                    </Button>
                </PopoverContent>
            </Popover>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-background/80 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10 backdrop-blur-sm">
                 <SidebarTrigger className="md:hidden" />
                <div className="flex-1">
                    {/* Page Title can go here */}
                </div>
            </header>
            <main className={cn('font-body')}>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
