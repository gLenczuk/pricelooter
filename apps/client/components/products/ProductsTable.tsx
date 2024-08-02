'use client';
import { ProductShopStatus } from '@pricelooter/types';
import { Badge } from 'components/core/Badge';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from 'components/core/Pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/core/Table';
import { format } from 'date-fns';
import { SquareMousePointer, TrashIcon } from 'lucide-react';
import { usePlatformsQuery } from 'queries/getPlatformsQuery';
import { useUserProductsQuery } from 'queries/getUserProductsQuery';
import { FC, useState } from 'react';

interface ProductsTableProps {
    selectProductId: (productId: number) => void;
    setDeleteProductDialogState: (state: boolean) => void;
}

export const ProductsTable: FC<ProductsTableProps> = ({ selectProductId, setDeleteProductDialogState }) => {
    const [currentPage, setPage] = useState(1);

    const { products, isLoadingProducts, meta } = useUserProductsQuery({ page: currentPage });
    const { platforms } = usePlatformsQuery();

    const totalPages = Math.ceil(meta?.count / 10);

    return (
        <>
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
                                            onClick={() => window.open(product.url, '_blank', 'noopener,noreferrer')}
                                            className="cursor-pointer"
                                            color="gray"
                                            size={20}
                                        ></SquareMousePointer>
                                        <TrashIcon
                                            onClick={() => {
                                                selectProductId(product.id);
                                                setDeleteProductDialogState(true);
                                            }}
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
        </>
    );
};
