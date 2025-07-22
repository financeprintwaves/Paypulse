
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, Filter } from "lucide-react"

const employeeSalaries = [
  { id: "PP-12345", name: "Jane Doe", designation: "Senior Frontend Developer", branch: "New York (NY-01)", gross: 5750, deductions: 536, net: 5214, outstanding: 750.00 },
  { id: "PP-67890", name: "John Smith", designation: "Backend Developer", branch: "London (LDN-01)", gross: 5200, deductions: 480, net: 4720, outstanding: 0.00 },
  { id: "PP-24680", name: "Alice Johnson", designation: "UI/UX Designer", branch: "New York (NY-01)", gross: 4800, deductions: 450, net: 4350, outstanding: 200.00 },
  { id: "PP-13579", name: "Bob Brown", designation: "Project Manager", branch: "San Francisco (SF-01)", gross: 7200, deductions: 800, net: 6400, outstanding: 1500.00 },
  { id: "PP-97531", name: "Charlie Davis", designation: "DevOps Engineer", branch: "London (LDN-01)", gross: 6500, deductions: 720, net: 5780, outstanding: 120.50 },
];

export default function SalaryReportPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Salary Report</h2>
                    <p className="text-muted-foreground">A detailed overview of employee salaries and outstanding balances.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter by Branch
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>
            </div>
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Employee Salary Details</CardTitle>
                    <CardDescription>All figures are for the current payroll period.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Gross Salary</TableHead>
                                <TableHead>Deductions</TableHead>
                                <TableHead>Net Salary</TableHead>
                                <TableHead className="text-right text-orange-400">Outstanding Balance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employeeSalaries.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className="font-mono">{employee.id}</TableCell>
                                    <TableCell className="font-medium">{employee.name}</TableCell>
                                    <TableCell>${employee.gross.toFixed(2)}</TableCell>
                                    <TableCell>${employee.deductions.toFixed(2)}</TableCell>
                                    <TableCell className="font-semibold text-green-400">${employee.net.toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-bold text-orange-400">${employee.outstanding.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
