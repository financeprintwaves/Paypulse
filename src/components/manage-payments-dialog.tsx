
'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, Save, XCircle } from 'lucide-react';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

type Payment = {
    amount: number;
    method: 'WPS' | 'Cash' | 'Online' | string;
    date: string;
};

interface ManagePaymentsDialogProps {
    employee: { id: string; name: string; net: number; payments: Payment[] };
    onUpdatePayments: (employeeId: string, newPayments: Payment[]) => void;
    trigger: React.ReactNode;
}

export function ManagePaymentsDialog({ employee, onUpdatePayments, trigger }: ManagePaymentsDialogProps) {
    const [payments, setPayments] = useState<Payment[]>(employee.payments);
    const [newPayment, setNewPayment] = useState({ amount: '', method: 'WPS', date: new Date().toISOString().split('T')[0]});

    const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
    const remainingAmount = employee.net - totalPaid;

    const handleAddPayment = () => {
        if (newPayment.amount && parseFloat(newPayment.amount) > 0) {
            setPayments([...payments, { ...newPayment, amount: parseFloat(newPayment.amount) }]);
            setNewPayment({ amount: '', method: 'WPS', date: new Date().toISOString().split('T')[0] });
        }
    }

    const handleRemovePayment = (index: number) => {
        setPayments(payments.filter((_, i) => i !== index));
    }

    const handleSaveChanges = () => {
        onUpdatePayments(employee.id, payments);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-card/90 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle>Manage Payments for {employee.name}</DialogTitle>
                    <DialogDescription>
                        Track salary payments for the period. Net salary is ${employee.net.toFixed(2)}.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-3 gap-4 text-center my-4">
                    <div className="p-4 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Net Salary</p>
                        <p className="mt-1 text-2xl font-bold text-primary">${employee.net.toFixed(2)}</p>
                    </div>
                     <div className="p-4 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Total Paid</p>
                        <p className="mt-1 text-2xl font-bold text-green-400">${totalPaid.toFixed(2)}</p>
                    </div>
                     <div className="p-4 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground">Remaining</p>
                        <p className="mt-1 text-2xl font-bold text-orange-400">${remainingAmount.toFixed(2)}</p>
                    </div>
                </div>
                
                <Separator />

                <div className="mt-4">
                    <h4 className="font-semibold mb-2">Add New Payment</h4>
                    <div className="grid grid-cols-4 gap-4 items-end">
                        <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" type="number" placeholder="e.g. 1000" value={newPayment.amount} onChange={e => setNewPayment({...newPayment, amount: e.target.value})} />
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="method">Method</Label>
                            <Select value={newPayment.method} onValueChange={value => setNewPayment({...newPayment, method: value})}>
                                <SelectTrigger id="method">
                                    <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="WPS">WPS</SelectItem>
                                    <SelectItem value="Cash">Cash</SelectItem>
                                    <SelectItem value="Online">Online</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2 col-span-2 md:col-span-1">
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" value={newPayment.date} onChange={e => setNewPayment({...newPayment, date: e.target.value})} />
                        </div>
                        <Button onClick={handleAddPayment} className="col-span-2 md:col-span-1">
                            <PlusCircle className="mr-2 h-4 w-4" /> Add
                        </Button>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Recorded Payments</h4>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((p, i) => (
                                <TableRow key={i}>
                                    <TableCell>{p.date}</TableCell>
                                    <TableCell><Badge variant="secondary">{p.method}</Badge></TableCell>
                                    <TableCell className="text-right font-medium">${p.amount.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400" onClick={() => handleRemovePayment(i)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {payments.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-muted-foreground">No payments recorded yet.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <DialogFooter className="mt-6">
                    <DialogClose asChild>
                        <Button variant="outline"><XCircle className="mr-2 h-4 w-4"/> Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={handleSaveChanges}><Save className="mr-2 h-4 w-4"/> Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
