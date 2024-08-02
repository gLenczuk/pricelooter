'use client';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../core/Alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../core/Dialog';
import { Button } from '../core/Button';
import { FC } from 'react';
import { useToast } from 'hooks/useToast';
import { useDeleteProductMutation } from 'mutations/deleteProductMutation';

interface DeleteProductDialogProps {
    isOpened: boolean;
    setDialogState: (state: boolean) => void;
    selectedProductId: number;
}

export const DeleteProductDialog: FC<DeleteProductDialogProps> = ({ isOpened, setDialogState, selectedProductId }) => {
    const { toast } = useToast();

    const { deleteProduct, isDeletingProduct, deleteProductError } = useDeleteProductMutation({
        onSuccess: () => {
            setDialogState(false);
            toast({
                description: 'Product was deleted successfuly.',
                duration: 5000,
            });
        },
    });

    return (
        <Dialog
            open={isOpened}
            onOpenChange={isOpened => {
                setDialogState(isOpened);
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription className="text-[16px]">
                        This action will delete product and cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                {deleteProductError && !isDeletingProduct && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{deleteProductError.message}</AlertDescription>
                    </Alert>
                )}
                <DialogFooter>
                    <Button
                        onClick={() => setDialogState(false)}
                        variant="outline"
                        disabled={isDeletingProduct}
                        className="mt-2"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => deleteProduct({ productId: selectedProductId })}
                        variant="destructive"
                        disabled={isDeletingProduct}
                        className="mt-2"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
