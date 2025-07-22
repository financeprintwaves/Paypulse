
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Filter, MoreHorizontal, Pencil, Wallet } from "lucide-react"
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ManagePaymentsDialog } from '@/components/manage-payments-dialog';

const initialEmployeeSalaries = [
  { id: "PP-12345", name: "Jane Doe", designation: "Senior Frontend Developer", branch: "New York (NY-01)", gross: 5750, deductions: 536, net: 5214, outstanding: 750.00, payments: [{amount: 1000, method: 'WPS', date: '2024-07-28'}] },
  { id: "PP-67890", name: "John Smith", designation: "Backend Developer", branch: "London (LDN-01)", gross: 5200, deductions: 480, net: 4720, outstanding: 0.00, payments: [{amount: 4720, method: 'Online', date: '2024-07-28'}] },
  { id: "PP-24680", name: "Alice Johnson", designation: "UI/UX Designer", branch: "New York (NY-01)", gross: 4800, deductions: 450, net: 4350, outstanding: 200.00, payments: [{amount: 2000, method: 'WPS', date: '2024-07-28'}, {amount: 2150, method: 'Cash', date: '2024-07-29'}] },
  { id: "PP-13579", name: "Bob Brown", designation: "Project Manager", branch: "San Francisco (SF-01)", gross: 7200, deductions: 800, net: 6400, outstanding: 1500.00, payments: [] },
  { id: "PP-97531", name: "Charlie Davis", designation: "DevOps Engineer", branch: "London (LDN-01)", gross: 6500, deductions: 720, net: 5780, outstanding: 120.50, payments: [{amount: 5780, method: 'WPS', date: '2024-07-28'}] },
];

type Payment = {
    amount: number;
    method: 'WPS' | 'Cash' | 'Online' | string;
    date: string;
};

type EmployeeSalary = typeof initialEmployeeSalaries[0];

export default function SalaryReportPage() {
    const [employeeSalaries, setEmployeeSalaries] = useState(initialEmployeeSalaries);

    const getPaymentStatus = (net: number, payments: Payment[]) => {
        const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
        if (totalPaid === 0) return { text: "Unpaid", variant: "destructive" as const, remaining: net };
        if (totalPaid >= net) return { text: "Paid", variant: "secondary" as const, remaining: 0 };
        return { text: "Partially Paid", variant: "default" as const, remaining: net - totalPaid };
    }

    const handleUpdatePayments = (employeeId: string, newPayments: Payment[]) => {
        setEmployeeSalaries(prev => 
            prev.map(emp => emp.id === employeeId ? {...emp, payments: newPayments} : emp)
        );
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Salary Report</h2>
                    <p className="text-muted-foreground">A detailed overview of employee salaries and outstanding balances for <span className="text-accent font-semibold">July 2024</span>.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>
            </div>
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Employee Salary Details</CardTitle>
                    <CardDescription>All figures are for the current payroll period. Use the actions menu to manage payments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Net Salary</TableHead>
                                <TableHead>Paid Amount</TableHead>
                                <TableHead>Remaining</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead className="text-right">Outstanding Balance</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employeeSalaries.map((employee) => {
                                const paymentStatus = getPaymentStatus(employee.net, employee.payments);
                                const totalPaid = employee.payments.reduce((acc, p) => acc + p.amount, 0);

                                return (
                                <TableRow key={employee.id}>
                                    <TableCell>
                                        <div className="font-medium">{employee.name}</div>
                                        <div className="text-xs text-muted-foreground font-mono">{employee.id}</div>
                                    </TableCell>
                                    <TableCell className="font-semibold">${employee.net.toFixed(2)}</TableCell>
                                    <TableCell className="text-green-400">${totalPaid.toFixed(2)}</TableCell>
                                    <TableCell className="text-orange-400">${paymentStatus.remaining.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={paymentStatus.variant}
                                            className={
                                                paymentStatus.variant === 'destructive' ? "bg-red-500/20 text-red-300" :
                                                paymentStatus.variant === 'secondary' ? "bg-green-500/20 text-green-300" :
                                                "bg-yellow-500/20 text-yellow-300"
                                            }
                                        >
                                            {paymentStatus.text}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-orange-400">${employee.outstanding.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                         <ManagePaymentsDialog 
                                            employee={employee}
                                            onUpdatePayments={handleUpdatePayments}
                                            trigger={
                                                <Button>
                                                    <Wallet className="mr-2 h-4 w-4"/>
                                                    Manage Payments
                                                </Button>
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

