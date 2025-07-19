
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, PlayCircle, SlidersHorizontal, FileText, CheckCircle, Users, DollarSign, Send, Pencil, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";
import { Separator } from '@/components/ui/separator';

export default function PayrollPage() {
    const [step, setStep] = useState(1);
    const [selectedPeriod, setSelectedPeriod] = useState<{month: string, year: string} | null>({ month: 'July', year: '2024' });

    const handleDownloadSample = (type: 'attendance' | 'overtime') => {
        let csvContent = "data:text/csv;charset=utf-8,";
        let fileName = '';

        if (type === 'attendance') {
            csvContent += "employee_id,date,status\nPP-12345,2024-07-01,Present\nPP-67890,2024-07-01,Absent";
            fileName = 'sample_attendance.csv';
        } else {
            csvContent += "employee_id,date,overtime_hours\nPP-12345,2024-07-05,2.5\nPP-67890,2024-07-08,1";
            fileName = 'sample_overtime.csv';
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link); 
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Run Payroll</h2>
                    <p className="text-muted-foreground">A step-by-step guide to process salaries.</p>
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
                        </CardContent>
                    </Card>

                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>2. Input Data</CardTitle>
                            <CardDescription>Upload attendance and overtime data for the selected period.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="flex flex-col items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <Label>Attendance Data</Label>
                                <p className="text-xs text-muted-foreground">Upload the monthly attendance report (e.g., CSV, Excel).</p>
                                <div className="flex gap-2">
                                    <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload File</Button>
                                    <Button variant="ghost" onClick={() => handleDownloadSample('attendance')}><Download className="mr-2 h-4 w-4"/> Download Sample</Button>
                                </div>
                            </div>
                             <div className="flex flex-col items-start gap-3 p-4 bg-secondary/30 rounded-lg">
                                <Label>Overtime Data</Label>
                                <p className="text-xs text-muted-foreground">Upload the consolidated overtime hours report.</p>
                                <div className="flex gap-2">
                                    <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload File</Button>
                                    <Button variant="ghost" onClick={() => handleDownloadSample('overtime')}><Download className="mr-2 h-4 w-4"/> Download Sample</Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button size="lg" onClick={() => setStep(2)}>
                                <PlayCircle className="mr-2 h-5 w-5"/>
                                Run Payroll Simulation
                            </Button>
                        </CardFooter>
                    </Card>

                    {step >= 2 && (
                         <Card className="bg-card/80 backdrop-blur-sm animate-in fade-in-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><CheckCircle className="text-green-400" />3. Review and Finalize</CardTitle>
                                <CardDescription>Review the summary for <span className="font-bold text-accent">{selectedPeriod?.month} {selectedPeriod?.year}</span> and make any final adjustments.</CardDescription>
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
                                    The payroll has been calculated. You can make final edits to individual salary components before generating slips and processing payments.
                                </p>
                            </CardContent>
                             <CardFooter className="flex justify-between items-center">
                                <Button variant="outline">
                                    <Pencil className="mr-2 h-4 w-4"/>
                                    Make Edits
                                </Button>
                                <div className="flex gap-4">
                                    <Button variant="outline">
                                        <FileText className="mr-2 h-4 w-4"/>
                                        Generate Slips
                                    </Button>
                                    <Button className="bg-green-600 hover:bg-green-700">
                                        <Send className="mr-2 h-4 w-4"/>
                                        Process Payments
                                    </Button>
                                </div>
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
}
