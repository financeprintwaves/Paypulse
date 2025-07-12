'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Briefcase, MessageSquare } from 'lucide-react';

const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/employees', label: 'Employees', icon: Users },
    { href: '/admin/payroll', label: 'Payroll', icon: Briefcase },
    { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

export function AdminNav() {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center gap-4 text-sm lg:gap-6">
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        'transition-colors hover:text-primary-foreground/80 flex items-center gap-2 px-3 py-2 rounded-md',
                        pathname.startsWith(item.href) ? 'text-primary-foreground bg-primary/20' : 'text-primary-foreground/60'
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}
