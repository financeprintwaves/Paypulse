import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, Megaphone, Settings, Briefcase, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Admin Dashboard</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/employees">
            <Card className="bg-card/80 backdrop-blur-sm hover:border-accent transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-primary-foreground">
                    Manage Employees
                    </CardTitle>
                    <Users className="h-5 w-5 text-accent" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">142</div>
                    <p className="text-xs text-muted-foreground">
                    Total active employees
                    </p>
                </CardContent>
            </Card>
        </Link>
        <Link href="/admin/payroll">
            <Card className="bg-card/80 backdrop-blur-sm hover:border-accent transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary-foreground">
                Run Payroll
                </CardTitle>
                <Briefcase className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
                 <div className="text-2xl font-bold">&nbsp;</div>
                <p className="text-xs text-muted-foreground">
                Process monthly salaries
                </p>
            </CardContent>
            </Card>
        </Link>
        <Link href="/admin/messages">
            <Card className="bg-card/80 backdrop-blur-sm hover:border-accent transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary-foreground">
                Support Messages
                </CardTitle>
                <MessageSquare className="h-5 w-5 text-accent" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                New unread messages
                </p>
            </CardContent>
            </Card>
        </Link>
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary-foreground">
              System Settings
            </CardTitle>
            <Settings className="h-5 w-5 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">&nbsp;</div>
            <p className="text-xs text-muted-foreground">
              Configure payroll and policies
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
        </CardHeader>
        <CardContent>
            <p>This is your central hub for managing the PayPulse application. Use the navigation above to manage employees, run payroll, or view support messages.</p>
        </CardContent>
      </Card>
    </div>
  )
}
