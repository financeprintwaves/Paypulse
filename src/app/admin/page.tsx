'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Logo className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl font-bold text-primary">
              PayPulse Admin
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to the administrator panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground/80">Email</Label>
              <Input id="email" placeholder="admin@example.com" defaultValue="admin@paypulse.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="secureadminpassword" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/admin/dashboard">Login</Link>
            </Button>
             <Button variant="link" size="sm" asChild className="text-muted-foreground">
              <Link href="/">Return to Employee Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
