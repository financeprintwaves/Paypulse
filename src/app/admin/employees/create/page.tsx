'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, UserPlus } from "lucide-react"
import Link from "next/link";

export default function CreateEmployeePage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center gap-4">
                 <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/employees">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Create New Employee</h2>
                    <p className="text-muted-foreground">Fill out the form to add a new employee to the system.</p>
                </div>
            </div>

            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Employee Details</CardTitle>
                    <CardDescription>All fields are required.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" placeholder="e.g., John Smith" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="employeeId">Employee ID</Label>
                                <Input id="employeeId" placeholder="Auto-generated or manual input" />
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="e.g., john.smith@paypulse.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="designation">Designation</Label>
                                <Input id="designation" placeholder="e.g., Senior Software Engineer" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="branch">Branch</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ny-01">New York (NY-01)</SelectItem>
                                        <SelectItem value="ldn-01">London (LDN-01)</SelectItem>
                                        <SelectItem value="sf-01">San Francisco (SF-01)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="joiningDate">Date of Joining</Label>
                                <Input id="joiningDate" type="date" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="salary">Monthly Net Salary</Label>
                                <Input id="salary" type="number" placeholder="e.g., 5000" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" placeholder="123 Main Street, Anytown, USA 12345" />
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button type="submit">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Create Employee
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
