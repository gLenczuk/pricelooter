import { DashboardHeader } from 'components/DashboardHeader';
import { Badge } from 'components/core/Badge';
import { Button } from 'components/core/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/core/Card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from 'components/core/Dialog';
import { Input } from 'components/core/Input';
import { Label } from 'components/core/Label';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from 'components/core/Pagination';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from 'components/core/Select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/core/Table';
import { GamepadIcon, PlusIcon, ShirtIcon, SquareMousePointer, TrashIcon } from 'lucide-react';

const DashboardPage = () => {
    return (
        <main className="min-h-screen bg-gray-50 pb-12">
            <DashboardHeader />
            <section className="max-w-[1200px] mx-auto px-2 mt-6">
                <Card>
                    <CardHeader className="md:flex-row justify-between">
                        <div>
                            <CardTitle className="text-2xl">Products</CardTitle>
                            <CardDescription>Active tracked products added by you.</CardDescription>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <PlusIcon />
                                    New
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add Product</DialogTitle>
                                    <DialogDescription>Start tracking a new product.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="url">URL</Label>
                                        <Input id="url" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Platform</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a platform" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel className="flex items-center">
                                                        <GamepadIcon className="mr-2"></GamepadIcon>
                                                        Gaming
                                                    </SelectLabel>
                                                    <SelectItem value="1" className="pl-12">
                                                        Unity Asset Store
                                                    </SelectItem>
                                                    <SelectItem value="2" className="pl-12">
                                                        Steam
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel className="flex items-center">
                                                        <ShirtIcon size={22} className="mr-2"></ShirtIcon>
                                                        Fashion
                                                    </SelectLabel>
                                                    <SelectItem value="3" className="pl-12">
                                                        Zalando
                                                    </SelectItem>
                                                    <SelectItem value="4" className="pl-12">
                                                        CCC
                                                    </SelectItem>
                                                    <SelectItem value="5" className="pl-12">
                                                        Sizeer
                                                    </SelectItem>
                                                </SelectGroup>
                                                <SelectGroup>
                                                    <SelectLabel className="flex items-center">Others</SelectLabel>
                                                    <SelectItem value="6" className="pl-12">
                                                        Amazon
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Create</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Platform</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Scraped At</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium py-3">1</TableCell>
                                    <TableCell className="py-3">Easy Save</TableCell>
                                    <TableCell className="py-3">Unity Asset Store</TableCell>
                                    <TableCell className="py-3">
                                        <Badge className="bg-green-400">Available</Badge>
                                    </TableCell>
                                    <TableCell className="py-3">50.00€</TableCell>
                                    <TableCell className="py-3">29.06.2024, 12:00</TableCell>
                                    <TableCell className="py-3">28.06.2024, 11:47</TableCell>
                                    <TableCell className="flex items-center justify-end">
                                        <SquareMousePointer
                                            className="cursor-pointer"
                                            color="gray"
                                            size={20}
                                        ></SquareMousePointer>
                                        <TrashIcon className="cursor-pointer ml-2" color="gray" size={20}></TrashIcon>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium py-3">2</TableCell>
                                    <TableCell className="py-3">HTTP/2</TableCell>
                                    <TableCell className="py-3">Unity Asset Store</TableCell>
                                    <TableCell className="py-3">
                                        <Badge className="bg-red-400">Unavailable</Badge>
                                    </TableCell>
                                    <TableCell className="py-3">45.00€</TableCell>
                                    <TableCell className="py-3">29.06.2024, 12:00</TableCell>
                                    <TableCell className="py-3">29.06.2024, 10:47</TableCell>
                                    <TableCell className="flex items-center justify-end">
                                        <SquareMousePointer
                                            className="cursor-pointer"
                                            color="gray"
                                            size={20}
                                        ></SquareMousePointer>
                                        <TrashIcon className="cursor-pointer ml-2" color="gray" size={20}></TrashIcon>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium py-3">3</TableCell>
                                    <TableCell className="py-3">Mockingbird Book</TableCell>
                                    <TableCell className="py-3">Amazon</TableCell>
                                    <TableCell className="py-3">
                                        <Badge className="bg-green-400">Available</Badge>
                                    </TableCell>
                                    <TableCell className="py-3">9.99€</TableCell>
                                    <TableCell className="py-3">29.06.2024, 12:00</TableCell>
                                    <TableCell className="py-3">29.06.2024, 15:47</TableCell>
                                    <TableCell className="flex items-center justify-end">
                                        <SquareMousePointer
                                            className="cursor-pointer"
                                            color="gray"
                                            size={20}
                                        ></SquareMousePointer>
                                        <TrashIcon className="cursor-pointer ml-2" color="gray" size={20}></TrashIcon>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium py-3">4</TableCell>
                                    <TableCell className="py-3">Diablo IV</TableCell>
                                    <TableCell className="py-3">Steam</TableCell>
                                    <TableCell className="py-3">
                                        <Badge className="bg-green-400">Available</Badge>
                                    </TableCell>
                                    <TableCell className="py-3">39.99€</TableCell>
                                    <TableCell className="py-3">29.06.2024, 12:00</TableCell>
                                    <TableCell className="py-3">29.06.2024, 15:47</TableCell>
                                    <TableCell className="flex items-center justify-end">
                                        <SquareMousePointer
                                            className="cursor-pointer"
                                            color="gray"
                                            size={20}
                                        ></SquareMousePointer>
                                        <TrashIcon className="cursor-pointer ml-2" color="gray" size={20}></TrashIcon>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <Pagination className="justify-end mt-8">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious className="cursor-pointer" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink className="cursor-pointer">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink className="cursor-pointer" isActive>
                                        2
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink className="cursor-pointer">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext className="cursor-pointer" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
};

export default DashboardPage;
