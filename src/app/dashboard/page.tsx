
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BarChart as BarChartIcon, CreditCard, Users, Landmark, FileText, Megaphone } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { getLoanEligibility } from '../actions';
import { Skeleton } from '@/components/ui/skeleton';

const chartData = [
  { month: "Jan", salary: 18600 },
  { month: "Feb", salary: 30500 },
  { month: "Mar", salary: 23700 },
  { month: "Apr", salary: 27300 },
  { month: "May", salary: 20900 },
  { month: "Jun", salary: 21400 },
]

const chartConfig = {
  salary: {
    label: "Salary",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

const updates = [
    { id: 1, title: "Office Re-opens Monday", date: "2024-07-29", content: "Reminder: The office will re-open for all staff on Monday, August 5th. Please ensure you have your new ID cards." },
    { id: 2, title: "Quarterly Performance Review", date: "2024-07-25", content: "Q3 performance reviews are scheduled for the last week of August. Please coordinate with your managers." },
    { id: 3, title: "New Health Insurance Policy", date: "2024-07-20", content: "We have updated our health insurance policy. Please review the new document shared via email." },
];

export default function DashboardPage() {
    const [loanAmount, setLoanAmount] = useState<number | null>(null);
    const [loadingLoan, setLoadingLoan] = useState(true);

    useEffect(() => {
        async function fetchLoanEligibility() {
            setLoadingLoan(true);
            try {
                const result = await getLoanEligibility({ 
                    employeeId: "PP-12345", 
                    currentSalary: 5214,
                    outstandingBalance: 750, 
                });
                if ('eligibleAmount' in result) {
                    setLoanAmount(result.eligibleAmount);
                } else {
                    console.error("Could not fetch loan eligibility:", result.error);
                    setLoanAmount(0);
                }
            } catch (error) {
                 console.error("Error fetching loan eligibility:", error);
                 setLoanAmount(0);
            } finally {
                setLoadingLoan(false);
            }
        }

        fetchLoanEligibility();
    }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Salary (This Month)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,214.00</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Advance Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$750.00</div>
            <p className="text-xs text-muted-foreground">Remaining balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$750.00</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan Eligibility</CardTitle>
            <Landmark className="h-4 w-4 text-muted-foreground text-blue-400" />
          </CardHeader>
          <CardContent>
            {loadingLoan ? (
              <Skeleton className="h-8 w-32" />
            ) : (
                <>
                    <div className="text-2xl font-bold">${loanAmount?.toFixed(2) ?? '0.00'}</div>
                    <p className="text-xs text-muted-foreground">Based on your profile</p>
                </>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Salary Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={chartData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                <Tooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="salary" fill="var(--color-salary)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <Megaphone className="h-6 w-6 text-accent"/>
                Company Updates
            </CardTitle>
            <CardDescription>Recent circulars and announcements.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                {updates.map((update) => (
                    <div key={update.id} className="flex items-start gap-4">
                       <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-primary-foreground">{update.title}</p>
                            <p className="text-sm text-muted-foreground">{update.content}</p>
                            <p className="text-xs text-muted-foreground/80 mt-1">{update.date}</p>
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
