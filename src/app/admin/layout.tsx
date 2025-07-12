import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '../globals.css';
import './admin.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Admin - PayPulse HR',
  description: 'Admin Panel for PayPulse HR',
};

function AdminHeader() {
    return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/admin/dashboard" className="flex items-center gap-3 mr-6">
          <Logo className="w-8 h-8 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">PayPulse Admin</span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-accent">
                     <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="admin person" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      admin@paypulse.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/admin" className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                    </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
    )
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={cn('antialiased admin-bg', inter.variable, spaceGrotesk.variable)}>
        <div className="min-h-screen flex flex-col">
            <AdminHeader />
            <main>{children}</main>
        </div>
        <Toaster />
      </div>
  );
}
