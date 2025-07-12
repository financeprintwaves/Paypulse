import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Employee Profile</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
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
                </div>
                <div className="md:col-span-2">
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
                </div>
            </div>
        </div>
    )
}
