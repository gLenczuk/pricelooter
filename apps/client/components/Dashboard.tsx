'use client';
import { DashboardHeader } from 'components/DashboardHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/core/Card';
import { useState } from 'react';
import { AddProductDialog } from './products/AddProductDialog';
import { DeleteProductDialog } from './products/DeleteProductDialog';
import { ProductsTable } from './products/ProductsTable';

export const Dashboard = () => {
    const [isCreateProductOpened, openCreateProductDialog] = useState(false);
    const [isDeleteProductOpened, openDeleteProductDialog] = useState(false);
    const [selectedProductId, selectProductId] = useState(0);

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
                        <AddProductDialog isOpened={isCreateProductOpened} setDialogState={openCreateProductDialog} />
                    </CardHeader>
                    <CardContent>
                        <ProductsTable
                            selectProductId={selectProductId}
                            setDeleteProductDialogState={openDeleteProductDialog}
                        />
                        <DeleteProductDialog
                            isOpened={isDeleteProductOpened}
                            setDialogState={openDeleteProductDialog}
                            selectedProductId={selectedProductId}
                        />
                    </CardContent>
                </Card>
            </section>
        </main>
    );
};
