'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, DollarSign, AlertTriangle } from "lucide-react"
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// Placeholder data - in a real app, this would be fetched based on the [id] param
const employeeData = {
  id: "PP-12345", 
  name: "Jane Doe",
  outstandingBalance: 750.00,
  earnings: {
    basic: 3500,
    hra: 1750,
    da: 500,
    bonus: 250,
    ot: 150
  },
  deductions: {
    absent: 0,
    medical: 150,
    damage: 0,
    others: 200
  }
};


export default function EditEmployeeSalaryPage({ params }: { params: { id: string }}) {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/employees">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Edit Employee Salary</h2>
                    <p className="text-muted-foreground">Editing details for {employeeData.name} ({params.id})</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-green-400">Earnings</CardTitle>
                            <CardDescription>Update monthly earnings components.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="basic">Basic Salary</Label>
                                <Input id="basic" type="number" defaultValue={employeeData.earnings.basic} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="hra">HRA/FDA</Label>
                                <Input id="hra" type="number" defaultValue={employeeData.earnings.hra} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="da">Dearness Allowance</Label>
                                <Input id="da" type="number" defaultValue={employeeData.earnings.da} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="bonus">Bonus</Label>
                                <Input id="bonus" type="number" defaultValue={employeeData.earnings.bonus} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="ot">OT Earning</Label>
                                <Input id="ot" type="number" defaultValue={employeeData.earnings.ot} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-red-400">Deductions</CardTitle>
                            <CardDescription>Update monthly deduction components.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="absent">Absent</Label>
                                <Input id="absent" type="number" defaultValue={employeeData.deductions.absent} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="medical">Medical</Label>
                                <Input id="medical" type="number" defaultValue={employeeData.deductions.medical} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="damage">Damage</Label>
                                <Input id="damage" type="number" defaultValue={employeeData.deductions.damage} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="others">Others</Label>
                                <Input id="others" type="number" defaultValue={employeeData.deductions.others} />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                     <Card className="bg-card/80 backdrop-blur-sm sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle className="text-orange-400" />
                                Financial Summary
                            </CardTitle>
                            <CardDescription>Current outstanding balance for the employee.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-muted-foreground">Outstanding Advance Balance</p>
                            <p className="text-4xl font-bold text-orange-400">${employeeData.outstandingBalance.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter>
                             <Button variant="outline" className="w-full">View Full Statement</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
