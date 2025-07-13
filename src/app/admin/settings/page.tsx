'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Upload, PlusCircle, Save } from "lucide-react"

const branches = [
    { id: "NY-01", name: "New York", letterhead: "ny_letterhead.png" },
    { id: "LDN-01", name: "London", letterhead: "ldn_letterhead.png" },
    { id: "SF-01", name: "San Francisco", letterhead: "sf_letterhead.png" },
];

export default function SystemSettingsPage() {
    return (
        <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary">System Settings</h2>
                <p className="text-muted-foreground">Manage company-wide configurations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Branch Management</CardTitle>
                            <CardDescription>Manage your company's branches and their letterheads.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Branch ID</TableHead>
                                        <TableHead>Branch Name</TableHead>
                                        <TableHead>Letterhead</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {branches.map((branch) => (
                                        <TableRow key={branch.id}>
                                            <TableCell className="font-mono">{branch.id}</TableCell>
                                            <TableCell>
                                                <Input defaultValue={branch.name} />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground truncate w-32">{branch.letterhead}</span>
                                                    <Button variant="outline" size="sm">
                                                        <Upload className="mr-2 h-4 w-4"/>
                                                        Change
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Save</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="border-t pt-6">
                             <div className="w-full space-y-4">
                                <h4 className="font-semibold text-primary-foreground">Add New Branch</h4>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="newBranchId">New Branch ID</Label>
                                        <Input id="newBranchId" placeholder="e.g., TK-01"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="newBranchName">New Branch Name</Label>
                                        <Input id="newBranchName" placeholder="e.g., Tokyo"/>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button>
                                        <PlusCircle className="mr-2 h-4 w-4"/>
                                        Add Branch
                                    </Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                 <div className="lg:col-span-1">
                     <Card className="bg-card/80 backdrop-blur-sm sticky top-24">
                        <CardHeader>
                            <CardTitle>Basic Settings</CardTitle>
                            <CardDescription>General payroll and company settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="auto-deduct" className="flex flex-col space-y-1">
                                    <span>Auto-deduct loan balance</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Automatically deduct outstanding loan balances from monthly salary.
                                    </span>
                                </Label>
                                <Switch id="auto-deduct" defaultChecked/>
                            </div>
                             <div className="flex items-center justify-between">
                                <Label htmlFor="email-notify" className="flex flex-col space-y-1">
                                    <span>Email Notifications</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Send email notifications when payroll is processed.
                                    </span>
                                </Label>
                                <Switch id="email-notify" defaultChecked/>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="financial-year">Financial Year Start</Label>
                                <Input id="financial-year" type="month" defaultValue="2024-04"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">
                                <Save className="mr-2 h-4 w-4"/>
                                Save Basic Settings
                            </Button>
                        </CardFooter>
                    </Card>
                 </div>
            </div>
        </div>
    )
}
