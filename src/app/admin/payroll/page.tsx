'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, PlayCircle, SlidersHorizontal, FileText, CheckCircle, Users, DollarSign, Send } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';

export default function PayrollPage() {
    const [selectedPeriod, setSelectedPeriod] = useState<{month: string, year: string} | null>(null);

    const handleStartPayroll = () => {
        // In a real app, you'd fetch data for this period
        setSelectedPeriod({ month: 'July', year: '2024' });
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Run Payroll</h2>
                    <p className="text-muted-foreground">Process and manage employee salaries.</p>
                </div>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-2 space-y-8">
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>1. Select Payroll Period</CardTitle>
                            <CardDescription>Select the month and year to begin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="space-y-2">
                                    <Label htmlFor="month">Payroll Month</Label>
                                    <Select defaultValue="07">
                                        <SelectTrigger id="month">
                                            <SelectValue placeholder="Select Month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="07">July</SelectItem>
                                            <SelectItem value="08">August</SelectItem>
                                            <SelectItem value="09">September</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year">Payroll Year</Label>
                                    <Select defaultValue="2024">
                                        <SelectTrigger id="year">
                                            <SelectValue placeholder="Select Year" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="2024">2024</SelectItem>
                                            <SelectItem value="2025">2025</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button size="lg" onClick={handleStartPayroll}>
                                    <PlayCircle className="mr-2 h-5 w-5"/>
                                    Load Payroll Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {selectedPeriod && (
                         <Card className="bg-card/80 backdrop-blur-sm animate-in fade-in-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-400" />2. Review and Process</CardTitle>
                                <CardDescription>Review the summary for <span className="font-bold text-accent">{selectedPeriod.month} {selectedPeriod.year}</span> and proceed with actions.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="p-4 bg-secondary/30 rounded-lg">
                                        <Users className="h-6 w-6 mx-auto text-primary" />
                                        <p className="mt-2 text-2xl font-bold">142</p>
                                        <p className="text-xs text-muted-foreground">Employees</p>
                                    </div>
                                    <div className="p-4 bg-secondary/30 rounded-lg">
                                        <DollarSign className="h-6 w-6 mx-auto text-green-400" />
                                        <p className="mt-2 text-2xl font-bold">$740,388.00</p>
                                        <p className="text-xs text-muted-foreground">Total Payout</p>
                                    </div>
                                     <div className="p-4 bg-secondary/30 rounded-lg">
                                        <DollarSign className="h-6 w-6 mx-auto text-red-400" />
                                        <p className="mt-2 text-2xl font-bold">$76,112.00</p>
                                        <p className="text-xs text-muted-foreground">Total Deductions</p>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                 <p className="text-sm text-muted-foreground">
                                    Once you have verified the data, you can generate salary slips for all employees and then proceed to process the payments.
                                </p>
                            </CardContent>
                             <CardFooter className="flex justify-end gap-4">
                                <Button variant="outline">
                                    <FileText className="mr-2 h-4 w-4"/>
                                    Generate Slips
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    <Send className="mr-2 h-4 w-4"/>
                                    Process Payments
                                </Button>
                            </CardFooter>
                        </Card>
                    )}

                </div>
                 <div className="md:col-span-1 space-y-8">
                     <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Payroll History</CardTitle>
                            <CardDescription>View and download past payroll reports.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex justify-between items-center p-3 rounded-md bg-secondary/30">
                                <div>
                                    <p className="font-semibold">June 2024</p>
                                    <p className="text-xs text-muted-foreground">Completed</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Report
                                </Button>
                           </div>
                            <div className="flex justify-between items-center p-3 rounded-md bg-secondary/30">
                                <div>
                                    <p className="font-semibold">May 2024</p>
                                    <p className="text-xs text-muted-foreground">Completed</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Report
                                </Button>
                           </div>
                            <div className="flex justify-between items-center p-3 rounded-md bg-secondary/30">
                                <div>
                                    <p className="font-semibold">April 2024</p>
                                    <p className="text-xs text-muted-foreground">Completed</p>
                                </div>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Report
                                </Button>
                           </div>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    )
