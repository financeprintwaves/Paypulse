
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge";

const transactions = [
  { date: "2024-07-25", particulars: "Medical Advance", debit: 300.00, credit: null },
  { date: "2024-07-20", particulars: "Personal Advance", debit: 500.00, credit: null },
  { date: "2024-06-30", particulars: "Salary Deduction - Personal", debit: null, credit: 250.00 },
  { date: "2024-06-30", particulars: "Salary Deduction - Medical", debit: null, credit: 150.00 },
  { date: "2024-06-15", particulars: "Material Purchase (Keyboard)", debit: 75.00, credit: null },
  { date: "2024-05-31", particulars: "Salary Deduction - Personal", debit: null, credit: 250.00 },
];

const chartData = [
  { name: 'Personal Advance', value: 500, fill: 'var(--color-personal)' },
  { name: 'Medical Advance', value: 300, fill: 'var(--color-medical)' },
  { name: 'Other Purchases', value: 75, fill: 'var(--color-other)' },
]

const chartConfig = {
  value: {
    label: 'Amount',
  },
  personal: {
    label: 'Personal',
    color: 'hsl(var(--chart-1))',
  },
  medical: {
    label: 'Medical',
    color: 'hsl(var(--chart-2))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig

export default function StatementPage() {
    let balance = 0;
    const transactionsWithBalance = transactions.map(tx => {
        balance += (tx.debit || 0) - (tx.credit || 0);
        return { ...tx, balance };
    }).reverse();

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Account Statement</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>A detailed log of all your advances and deductions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Particulars</TableHead>
                                    <TableHead className="text-right">Debit</TableHead>
                                    <TableHead className="text-right">Credit</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactionsWithBalance.map((tx, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell className="font-medium">{tx.particulars}</TableCell>
                                        <TableCell className="text-right text-red-400">{tx.debit ? `$${tx.debit.toFixed(2)}` : '-'}</TableCell>
                                        <TableCell className="text-right text-green-400">{tx.credit ? `$${tx.credit.toFixed(2)}` : '-'}</TableCell>
                                        <TableCell className="text-right font-bold">{`$${tx.balance.toFixed(2)}`}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card className="col-span-4 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Advance Breakdown</CardTitle>
                        <CardDescription>A summary of your advances by category.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                         <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                    <CardContent className="mt-4 flex flex-col gap-2 text-sm">
                        <div className="flex items-center justify-between">
                            <span>Total Balance:</span>
                            <span className="font-bold text-lg">${balance.toFixed(2)}</span>
                        </div>
                        <div className="leading-none text-muted-foreground">
                            This is your current outstanding balance.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
