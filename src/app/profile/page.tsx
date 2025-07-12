'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, AlertTriangle, ShieldCheck, FileWarning, Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const initialDocuments = [
    { name: "Passport", expiryDate: "2028-10-22", status: "active", icon: FileText },
    { name: "Resident ID", expiryDate: "2024-08-15", status: "expiring", icon: FileText },
    { name: "Joining Letter", expiryDate: "N/A", status: "active", icon: FileText },
    { name: "Warning Letter", expiryDate: "N/A", status: "active", icon: FileWarning },
    { name: "Re-joining Letter", expiryDate: "N/A", status: "active", icon: FileText },
];

const getStatusFromDate = (expiryDate: string | null): "active" | "expiring" | "expired" => {
    if (!expiryDate || expiryDate === 'N/A') return 'active';
    const now = new Date();
    const expiry = new Date(expiryDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);

    if (expiry < now) return 'expired';
    if (expiry <= thirtyDaysFromNow) return 'expiring';
    return 'active';
}

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "active":
            return "bg-green-500/20 text-green-300 border-green-500/30";
        case "expiring":
            return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
        case "expired":
            return "bg-red-500/20 text-red-300 border-red-500/30";
        default:
            return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case "active":
            return <ShieldCheck className="h-4 w-4 text-green-400" />;
        case "expiring":
            return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
        case "expired":
            return <FileWarning className="h-4 w-4 text-red-400" />;
        default:
            return null;
    }
}

export default function ProfilePage() {
    const [employeeDocuments, setEmployeeDocuments] = useState(initialDocuments.map(doc => ({ ...doc, status: getStatusFromDate(doc.expiryDate) })));
    const [newDocument, setNewDocument] = useState({ name: '', expiryDate: '', file: null as File | null });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setNewDocument(prev => ({ ...prev, file: e.target.files?.[0] || null }));
        }
    }

    const handleAddDocument = () => {
        if (newDocument.name && newDocument.file) {
            const newDoc = {
                name: newDocument.name,
                expiryDate: newDocument.expiryDate || 'N/A',
                status: getStatusFromDate(newDocument.expiryDate),
                icon: FileText
            };
            setEmployeeDocuments(prev => [...prev, newDoc]);
            setNewDocument({ name: '', expiryDate: '', file: null });
        }
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Employee Profile</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 space-y-8">
                    <Card>
                        <CardHeader className="items-center text-center">
                            <Avatar className="h-24 w-24 mb-4">
                                <AvatarImage src="https://placehold.co/100x100.png" alt="Jane Doe" data-ai-hint="profile person" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <CardTitle className="font-headline">Jane Doe</CardTitle>
                            <CardDescription>PP-12345</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full">Upload New Photo</Button>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Documents</CardTitle>
                            <CardDescription>Manage and review employee documents.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Expiry</TableHead>
                                        <TableHead className="text-right">View</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employeeDocuments.map((doc) => (
                                        <TableRow key={doc.name}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                 {getStatusIcon(doc.status)}
                                                {doc.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn("capitalize", getStatusBadgeVariant(doc.status))}>
                                                    {doc.expiryDate}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Details</CardTitle>
                            <CardDescription>Update your personal information here.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" defaultValue="Jane Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue="jane.doe@example.com" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" defaultValue="+1 (123) 456-7890" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input id="dob" type="date" defaultValue="1990-05-15" />
                                </div>
                            </div>

                             <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" defaultValue="123 Main St, Anytown, USA 12345" />
                            </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="designation">Designation</Label>
                                    <Input id="designation" defaultValue="Senior Frontend Developer" disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch">Branch</Label>
                                    <Input id="branch" defaultValue="New York (NY-01)" disabled />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button className="bg-accent hover:bg-accent/90">Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Upload New Document</CardTitle>
                            <CardDescription>For admin use only. Upload documents to this employee's profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="docName">Document Name</Label>
                                <Input id="docName" placeholder="e.g., Visa Copy" value={newDocument.name} onChange={e => setNewDocument(prev => ({...prev, name: e.target.value}))} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="docExpiry">Expiry Date (Optional)</Label>
                                <Input id="docExpiry" type="date" value={newDocument.expiryDate} onChange={e => setNewDocument(prev => ({...prev, expiryDate: e.target.value}))}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="docFile">File</Label>
                                <Input id="docFile" type="file" onChange={handleFileUpload} />
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleAddDocument} disabled={!newDocument.name || !newDocument.file}>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Upload Document
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
