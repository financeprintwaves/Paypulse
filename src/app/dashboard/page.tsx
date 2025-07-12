import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BarChart, CreditCard, Users, Banknote } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

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

const transactions = [
  { id: 1, type: "Salary Credit", date: "2024-06-30", amount: 5214, status: "Completed" },
  { id: 2, type: "Advance Deduction", date: "2024-06-15", amount: -500, status: "Completed" },
  { id: 3, type: "Medical Deduction", date: "2024-06-10", amount: -250, status: "Completed" },
  { id: 4, type: "Overtime Payout", date: "2024-06-05", amount: 300, status: "Completed" },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Salary (This Month)</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground text-green-400" />
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
            <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">+5 hours from last month</p>
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
            <CardTitle className="font-headline">Recent Transactions</CardTitle>
            <CardDescription>An overview of your recent account activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <div className="font-medium">{transaction.type}</div>
                      <Badge variant="outline" className={transaction.status === 'Completed' ? "text-green-400 border-green-400/50" : "text-yellow-400 border-yellow-400/50"}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className={`text-right ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
