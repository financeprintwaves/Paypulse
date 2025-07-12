'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, PlusCircle, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"


const employees = [
  { id: "PP-12345", name: "Jane Doe", designation: "Senior Frontend Developer", branch: "New York (NY-01)", status: "Active" },
  { id: "PP-67890", name: "John Smith", designation: "Backend Developer", branch: "London (LDN-01)", status: "Active" },
  { id: "PP-24680", name: "Alice Johnson", designation: "UI/UX Designer", branch: "New York (NY-01)", status: "On Leave" },
  { id: "PP-13579", name: "Bob Brown", designation: "Project Manager", branch: "San Francisco (SF-01)", status: "Active" },
  { id: "PP-97531", name: "Charlie Davis", designation: "DevOps Engineer", branch: "London (LDN-01)", status: "Resigned" },
];

export default function ManageEmployeesPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Manage Employees</h2>
                    <p className="text-muted-foreground">View, edit, and create employees.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/employees/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Employee
                    </Link>
                </Button>
            </div>
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Employee List</CardTitle>
                    <CardDescription>A list of all employees in the system.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((employee) => (
                                <TableRow key={employee.id}>
                                    <TableCell className="font-mono">{employee.id}</TableCell>
                                    <TableCell className="font-medium">{employee.name}</TableCell>
                                    <TableCell>{employee.designation}</TableCell>
                                    <TableCell>{employee.branch}</TableCell>
                                    <TableCell>
                                        <Badge variant={employee.status === 'Active' ? 'secondary' : 'destructive'} className={employee.status === 'Active' ? "bg-green-500/20 text-green-300" : employee.status === 'On Leave' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}>
                                            {employee.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-400">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
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
