'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/icons';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Logo className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-3xl font-bold text-primary-foreground">
              PayPulse HR
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your employee portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-id" className="text-primary-foreground/80">Employee ID</Label>
              <Input id="employee-id" placeholder="e.g., PP-12345" defaultValue="PP-12345" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="somepassword" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              <Link href="/dashboard">Login</Link>
            </Button>
            <Button variant="link" size="sm" className="text-muted-foreground">
              Forgot password?
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
