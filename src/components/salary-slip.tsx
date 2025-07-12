'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { generateLetterhead } from "@/app/actions";
import { Logo } from './icons';

interface Employee {
    name: string;
    id: string;
    designation: string;
    branchId: string;
    branchName: string;
}

interface SlipData {
    month: string;
    gross: number;
    deductions: number;
    net: number;
}

interface SalarySlipDialogProps {
    employee: Employee;
    slipData: SlipData;
    trigger: React.ReactNode;
}

export function SalarySlipDialog({ employee, slipData, trigger }: SalarySlipDialogProps) {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [paymentDate, setPaymentDate] = useState('');

    useEffect(() => {
        if (isOpen) {
            setPaymentDate(new Date().toLocaleDateString());
            const fetchLetterhead = async () => {
                setLoading(true);
                setLogoUrl(null);
                try {
                    const result = await generateLetterhead({
                        branchId: employee.branchId,
                        employeeName: employee.name,
                    });
                    if (result && 'letterheadLogoDataUri' in result) {
                        setLogoUrl(result.letterheadLogoDataUri);
                    } else {
                        console.error('Failed to get letterhead');
                    }
                } catch (error) {
                    console.error('Error fetching letterhead:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchLetterhead();
        }
    }, [isOpen, employee.branchId, employee.name]);

    const earnings = [
        { name: "Basic Salary", amount: 3500 },
        { name: "House Rent Allowance (HRA)", amount: 1750 },
        { name: "Special Allowance", amount: 500 },
    ];
    const deductions = [
        { name: "Provident Fund (PF)", amount: 210 },
        { name: "Professional Tax", amount: 200 },
        { name: "Advance Repayment", amount: 126 },
    ];

    const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
    const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
    const netSalary = totalEarnings - totalDeductions;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[800px] bg-card/90 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Salary Slip for {slipData.month}</DialogTitle>
                    <DialogDescription>
                        This is a legally binding document. Please review carefully.
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6 border rounded-lg" id="salary-slip">
                    <header className="flex justify-between items-center pb-4 border-b">
                        <div className="flex items-center gap-4">
                            {loading ? (
                                <Skeleton className="h-16 w-16 rounded-md" />
                            ) : logoUrl ? (
                                <Image src={logoUrl} alt={`${employee.branchName} Branch Logo`} width={64} height={64} />
                            ) : (
                                <Logo className="h-16 w-16 text-primary" />
                            )}
                            <div>
                                <h1 className="text-2xl font-headline font-bold text-primary">PayPulse HR</h1>
                                <p className="text-muted-foreground">{employee.branchName} Branch</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-lg font-semibold">Salary Slip</h2>
                            <p className="text-sm text-muted-foreground">{slipData.month}</p>
                        </div>
                    </header>
                    <section className="grid grid-cols-2 gap-4 py-4">
                        <div>
                            <p className="font-semibold">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.designation}</p>
                            <p className="text-sm text-muted-foreground">Employee ID: {employee.id}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-sm text-muted-foreground">Payment Date: {paymentDate}</p>
                        </div>
                    </section>
                    <Separator />
                    <section className="grid md:grid-cols-2 gap-8 py-4">
                        <div>
                            <h3 className="font-semibold mb-2 text-green-400">Earnings</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {earnings.map(item => (
                                        <TableRow key={item.name}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                         <div>
                            <h3 className="font-semibold mb-2 text-red-400">Deductions</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {deductions.map(item => (
                                        <TableRow key={item.name}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </section>
                     <Separator />
                     <section className="grid md:grid-cols-2 gap-8 py-4 bg-secondary/30 rounded-lg mt-4 px-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="font-semibold">Total Earnings:</span>
                                <span>${totalEarnings.toFixed(2)}</span>
                            </div>
                             <div className="flex justify-between">
                                <span className="font-semibold">Total Deductions:</span>
                                <span>${totalDeductions.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end justify-center">
                            <p className="text-sm text-muted-foreground">Net Salary</p>
                            <p className="text-3xl font-bold font-headline text-green-400">${netSalary.toFixed(2)}</p>
                        </div>
                     </section>
                </div>
                <Button className="mt-4 w-full bg-accent hover:bg-accent/80" onClick={() => window.print()}>Download Slip</Button>
            </DialogContent>
        </Dialog>
    )
}
