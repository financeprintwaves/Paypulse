
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, PlusCircle, Eye } from "lucide-react"
import Link from "next/link";
import { useToast } from '@/hooks/use-toast';

const employees = [
  { id: "PP-12345", name: "Jane Doe" },
  { id: "PP-67890", name: "John Smith" },
  { id: "PP-24680", name: "Alice Johnson" },
  { id: "PP-13579", name: "Bob Brown" },
  { id: "PP-97531", name: "Charlie Davis" },
];

const initialTransactions = [
    { id: 1, date: '2024-07-30', employeeName: 'Jane Doe', employeeId: 'PP-12345', type: 'Advance', amount: 500.00 },
    { id: 2, date: '2024-07-29', employeeName: 'John Smith', employeeId: 'PP-67890', type: 'Medical', amount: 150.00 },
    { id: 3, date: '2024-07-28', employeeName: 'Bob Brown', employeeId: 'PP-13579', type: 'Deduction', amount: 75.00 },
];

export default function AddTransactionPage() {
    const { toast } = useToast();
    const [transactions, setTransactions] = useState(initialTransactions);
    const [transactionType, setTransactionType] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddTransaction = () => {
        if (!transactionType || !selectedEmployeeId || !amount) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Please fill out all fields to add a transaction.',
            });
            return;
        }

        const employee = employees.find(e => e.id === selectedEmployeeId);
        if (!employee) return;

        const newTransaction = {
            id: transactions.length + 1,
            date: new Date().toISOString().split('T')[0],
            employeeName: employee.name,
            employeeId: employee.id,
            type: transactionType,
            amount: parseFloat(amount)
        };

        setTransactions(prev => [newTransaction, ...prev]);

        toast({
            title: 'Success!',
            description: `Transaction for ${employee.name} has been added.`,
        });

        // Reset form
        setTransactionType('');
        setSelectedEmployeeId('');
        setAmount('');
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/dashboard">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Add New Transaction</h2>
                    <p className="text-muted-foreground">Record a new financial transaction for an employee.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card className="bg-card/80 backdrop-blur-sm sticky top-24">
                        <CardHeader>
                            <CardTitle>Transaction Details</CardTitle>
                            <CardDescription>Select type, employee, and amount.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Transaction Type</Label>
                                <Select value={transactionType} onValueChange={setTransactionType}>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Select a transaction type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Advance">Advance</SelectItem>
                                        <SelectItem value="Medical">Medical</SelectItem>
                                        <SelectItem value="Deduction">Deduction</SelectItem>
                                        <SelectItem value="Suspension">Suspension</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="employee">Employee</Label>
                                <Select value={selectedEmployeeId} onValueChange={setSelectedEmployeeId}>
                                    <SelectTrigger id="employee">
                                        <SelectValue placeholder="Select an employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employees.map(emp => (
                                            <SelectItem key={emp.id} value={emp.id}>{emp.name} ({emp.id})</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" type="number" placeholder="e.g., 500.00" value={amount} onChange={e => setAmount(e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button onClick={handleAddTransaction}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Transaction
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Recent Transactions</CardTitle>
                            <CardDescription>History of the latest recorded transactions.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Employee</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map(tx => (
                                        <TableRow key={tx.id}>
                                            <TableCell>{tx.date}</TableCell>
                                            <TableCell>
                                                <div className="font-medium">{tx.employeeName}</div>
                                                <div className="text-xs text-muted-foreground font-mono">{tx.employeeId}</div>
                                            </TableCell>
                                            <TableCell>{tx.type}</TableCell>
                                            <TableCell className="text-right font-semibold text-orange-400">${tx.amount.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4"/>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
