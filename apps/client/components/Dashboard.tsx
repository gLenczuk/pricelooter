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
import { AlertCircle, GamepadIcon, LoaderIcon, PlusIcon, SquareMousePointer, TrashIcon } from 'lucide-react';
import { useCreateProductMutation } from 'mutations/createProductMutation';
import { useUserProductsQuery } from 'queries/getUserProductsQuery';
import { FormEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { usePlatformsQuery } from 'queries/getPlatformsQuery';

export const Dashboard = () => {
    const [isDialogOpened, openDialog] = useState(false);
    const [currentPage, setPage] = useState(1);
    const { toast } = useToast();
    const { createProduct, isCreatingProduct, createProductError } = useCreateProductMutation({
        onSuccess: () => {
            openDialog(false);
            resetFormData();
            toast({
                description: 'Product was added successfuly.',
                duration: 5000,
            });
        },
    });

    const { products, isLoadingProducts, meta } = useUserProductsQuery({ page: currentPage });
    const { platforms } = usePlatformsQuery();
    const categories = [{ name: 'Gaming', icon: <GamepadIcon className="mr-2" /> }];

    const totalPages = Math.ceil(meta?.count / 10);

    const {
        register,
        formState: { errors: formErrors },
        trigger: validateForm,
        getValues: getFormData,
        reset: resetFormData,
        control,
    } = useForm({
        resolver: yupResolver(CreateProductSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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
                        <Dialog
                            open={isDialogOpened}
                            onOpenChange={isOpened => {
                                openDialog(isOpened);
                                resetFormData();
                            }}
                        >
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
                                            <Controller
                                                control={control}
                                                name="platformId"
                                                render={({ field: { onChange, value } }) => (
                                                    <Select
                                                        onValueChange={value => onChange(Number(value))}
                                                        value={value?.toString()}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a platform" />
                                                        </SelectTrigger>
                                                        {formErrors.platformId && (
                                                            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-600 ml-auto">
                                                                {formErrors.platformId.message}
                                                            </span>
                                                        )}
                                                        <SelectContent>
                                                            {categories.map(category => {
                                                                const platformsForCategory = platforms.filter(
                                                                    platform => platform.category === category.name,
                                                                );

                                                                return (
                                                                    <SelectGroup key={category.name}>
                                                                        <SelectLabel className="flex items-center pl-4">
                                                                            {category.icon} {category.name}
                                                                        </SelectLabel>
                                                                        {platformsForCategory.map(platform => (
                                                                            <SelectItem
                                                                                key={platform.id}
                                                                                value={platform.id.toString()}
                                                                                className="pl-8"
                                                                            >
                                                                                {platform.name}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectGroup>
                                                                );
                                                            })}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
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
                        <div className="flex items-center justify-between mt-8">
                            <span className="text-[15px] text-slate-500 font-medium">
                                {currentPage !== 1 ? (currentPage - 1) * 10 + 1 : meta?.count > 0 ? 1 : 0} -{' '}
                                {currentPage * 10 > meta?.count ? meta?.count : currentPage * 10} of {meta?.count}
                            </span>
                            <div>
                                <Pagination className="md:justify-end justify-center">
                                    <PaginationContent>
                                        <PaginationItem
                                            onClick={() => {
                                                if (currentPage === 1) return;
                                                setPage(currentPage - 1);
                                            }}
                                        >
                                            <PaginationPrevious className="cursor-pointer" />
                                        </PaginationItem>
                                        <PaginationItem
                                            onClick={() => {
                                                if (currentPage === totalPages || meta?.count <= 0) return;
                                                setPage(currentPage + 1);
                                            }}
                                        >
                                            <PaginationNext className="cursor-pointer" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
};
