'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, PlayCircle, SlidersHorizontal, FileText } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label";

export default function PayrollPage() {
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
                            <CardTitle>Start New Payroll</CardTitle>
                            <CardDescription>Select the month and year to begin processing payroll.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div className="space-y-2">
                                    <Label htmlFor="month">Payroll Month</Label>
                                    <Select>
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
                                    <Select>
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
                                <Button size="lg">
                                    <PlayCircle className="mr-2 h-5 w-5"/>
                                    Start Payroll Run
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
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
