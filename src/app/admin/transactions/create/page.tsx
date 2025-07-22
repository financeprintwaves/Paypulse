
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, PlusCircle } from "lucide-react"
import Link from "next/link";

const employees = [
  { id: "PP-12345", name: "Jane Doe" },
  { id: "PP-67890", name: "John Smith" },
  { id: "PP-24680", name: "Alice Johnson" },
  { id: "PP-13579", name: "Bob Brown" },
  { id: "PP-97531", name: "Charlie Davis" },
];

export default function AddTransactionPage() {
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

            <Card className="bg-card/80 backdrop-blur-sm max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Transaction Details</CardTitle>
                    <CardDescription>Select the transaction type, employee, and amount.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="type">Transaction Type</Label>
                        <Select>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select a transaction type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="advance">Advance</SelectItem>
                                <SelectItem value="medical">Medical</SelectItem>
                                <SelectItem value="deduction">Deduction</SelectItem>
                                <SelectItem value="suspension">Suspension</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="employee">Employee</Label>
                        <Select>
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
                        <Input id="amount" type="number" placeholder="e.g., 500.00" />
                    </div>
                </CardContent>
                <CardFooter className="justify-end">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Transaction
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
