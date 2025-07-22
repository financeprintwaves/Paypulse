
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileDown, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SalarySlipDialog } from "@/components/salary-slip"

const salaryData = [
    { month: "June 2024", gross: 5750, deductions: 536, net: 5214, status: "Paid", payments: [{amount: 5214, method: 'WPS', date: '2024-06-30'}] },
    { month: "May 2024", gross: 5700, deductions: 536, net: 5164, status: "Paid", payments: [{amount: 5164, method: 'WPS', date: '2024-05-31'}] },
    { month: "April 2024", gross: 5800, deductions: 536, net: 5264, status: "Paid", payments: [{amount: 5264, method: 'WPS', date: '2024-04-30'}] },
    { month: "March 2024", gross: 5750, deductions: 536, net: 5214, status: "Paid", payments: [{amount: 5214, method: 'WPS', date: '2024-03-31'}] },
    { month: "February 2024", gross: 5750, deductions: 536, net: 5214, status: "Paid", payments: [{amount: 5214, method: 'WPS', date: '2024-02-29'}] },
    { month: "January 2024", gross: 5750, deductions: 536, net: 5214, status: "Paid", payments: [{amount: 5214, method: 'WPS', date: '2024-01-31'}] },
]

const employee = {
    name: "Jane Doe",
    id: "PP-12345",
    designation: "Senior Frontend Developer",
    branchId: "NY-01",
    branchName: "New York"
};

export default function SalarySlipsPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Salary Slips</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Salary History</CardTitle>
                    <CardDescription>A record of all your monthly salary slips.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Month</TableHead>
                                <TableHead>Gross Salary</TableHead>
                                <TableHead>Deductions</TableHead>
                                <TableHead>Net Salary</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {salaryData.map((slip) => (
                                <TableRow key={slip.month}>
                                    <TableCell className="font-medium">{slip.month}</TableCell>
                                    <TableCell>${slip.gross.toFixed(2)}</TableCell>
                                    <TableCell>${slip.deductions.toFixed(2)}</TableCell>
                                    <TableCell className="font-bold text-green-400">${slip.net.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{slip.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <SalarySlipDialog 
                                            employee={employee}
                                            slipData={slip}
                                            trigger={
                                                <Button variant="outline" size="sm" className="mr-2">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    View
                                                </Button>
                                            }
                                        />
                                        <Button variant="ghost" size="sm" className="text-accent hover:text-accent">
                                            <FileDown className="h-4 w-4 mr-2" />
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
