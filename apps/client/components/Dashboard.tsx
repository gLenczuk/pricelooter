'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductShopStatus } from '@pricelooter/types';
import { CreateProductSchema } from '@pricelooter/validator';
import { DashboardHeader } from 'components/DashboardHeader';
import { Alert, AlertTitle, AlertDescription } from 'components/core/Alert';
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
import { useToast } from 'hooks/useToast';
import { AlertCircle, GamepadIcon, LoaderIcon, PlusIcon, ShirtIcon, SquareMousePointer, TrashIcon } from 'lucide-react';
import { useCreateProductMutation } from 'mutations/createProductMutation';
import { useUserProductsQuery } from 'queries/getUserProductsQuery';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { usePlatformsQuery } from 'queries/getPlatformsQuery';

export const Dashboard = () => {
    const [isDialogOpened, openDialog] = useState(false);
    const { toast } = useToast();
    const { createProduct, isCreatingProduct, createProductError } = useCreateProductMutation({
        onSuccess: () => {
            openDialog(false);
            toast({
                description: 'Product was added successfuly.',
                duration: 5000,
            });
        },
    });

    const { products, isLoadingProducts } = useUserProductsQuery();
    const { platforms } = usePlatformsQuery();

    const {
        register,
        formState: { errors: formErrors },
        trigger: validateForm,
        getValues: getFormData,
        setValue: setFormData,
    } = useForm({
        resolver: yupResolver(CreateProductSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setFormData('platformId', 2);

        const isFormValid = await validateForm();
        if (!isFormValid) return;

        const data = getFormData();
        createProduct({
            url: data.url,
            platformId: data.platformId,
        });
    };

    return (
        <main className="min-h-screen bg-gray-50 pb-12">
            <DashboardHeader />
            <section className="max-w-[1440px] mx-auto px-2 mt-6">
                <Card>
                    <CardHeader className="md:flex-row justify-between">
                        <div>
                            <CardTitle className="text-2xl">Products</CardTitle>
                            <CardDescription>Active tracked products added by you.</CardDescription>
                        </div>
                        <Dialog open={isDialogOpened} onOpenChange={isOpened => openDialog(isOpened)}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <PlusIcon />
                                    New
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <form onSubmit={onSubmit}>
                                    <DialogHeader>
                                        <DialogTitle>Add Product</DialogTitle>
                                        <DialogDescription>Start tracking a new product.</DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="url">URL</Label>
                                            <Input id="url" {...register('url')} error={formErrors?.url?.message} />
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
                                    {isCreatingProduct && (
                                        <Alert variant="default">
                                            <LoaderIcon className="h-4 w-4" />
                                            <AlertTitle>Almost done!</AlertTitle>
                                            <AlertDescription>Adding product...</AlertDescription>
                                        </Alert>
                                    )}
                                    {createProductError && !isCreatingProduct && (
                                        <Alert variant="destructive">
                                            <AlertCircle className="h-4 w-4" />
                                            <AlertTitle>Error</AlertTitle>
                                            <AlertDescription>{createProductError.message}</AlertDescription>
                                        </Alert>
                                    )}
                                    <DialogFooter>
                                        <Button type="submit" disabled={isCreatingProduct} className="mt-2">
                                            Create
                                        </Button>
                                    </DialogFooter>
                                </form>
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
                                {!isLoadingProducts &&
                                    products?.length > 0 &&
                                    products?.map(product => {
                                        const productPlatformName = platforms?.find(
                                            platform => platform.id === product.platformId,
                                        ).name;

                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium py-3">{product.id}</TableCell>
                                                <TableCell className="py-3">{product.name}</TableCell>
                                                <TableCell className="py-3">{productPlatformName}</TableCell>
                                                <TableCell className="py-3">
                                                    {product.shopStatus === ProductShopStatus.AVAILABLE ? (
                                                        <Badge className="bg-green-400">Available</Badge>
                                                    ) : (
                                                        <Badge className="bg-red-400">Unavailable</Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-3">
                                                    {product.price / 100} {product.currency}
                                                </TableCell>
                                                <TableCell className="py-3">
                                                    {format(product.scrapedAt, 'dd.MM.yyyy, HH:mm')}
                                                </TableCell>
                                                <TableCell className="py-3">
                                                    {format(product.createdAt, 'dd.MM.yyyy, HH:mm')}
                                                </TableCell>
                                                <TableCell className="flex items-center justify-end">
                                                    <SquareMousePointer
                                                        onClick={() =>
                                                            window.open(product.url, '_blank', 'noopener,noreferrer')
                                                        }
                                                        className="cursor-pointer"
                                                        color="gray"
                                                        size={20}
                                                    ></SquareMousePointer>
                                                    <TrashIcon
                                                        className="cursor-pointer ml-2"
                                                        color="gray"
                                                        size={20}
                                                    ></TrashIcon>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                        <Pagination className="md:justify-end justify-center mt-8">
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
