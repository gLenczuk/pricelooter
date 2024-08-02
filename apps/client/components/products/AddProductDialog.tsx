'use client';
import { Button } from '../core/Button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../core/Dialog';
import { AlertCircle, LoaderIcon, PlusIcon, GamepadIcon } from 'lucide-react';
import { Label } from '../core/Label';
import { Input } from '../core/Input';
import { Controller, useForm } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../core/Select';
import { Alert, AlertDescription, AlertTitle } from '../core/Alert';
import { FC, FormEvent } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProductSchema } from '@pricelooter/validator';
import { useCreateProductMutation } from 'mutations/createProductMutation';
import { useToast } from 'hooks/useToast';
import { usePlatformsQuery } from 'queries/getPlatformsQuery';

interface AddProductDialogProps {
    isOpened: boolean;
    setDialogState: (state: boolean) => void;
}

export const AddProductDialog: FC<AddProductDialogProps> = ({ isOpened, setDialogState }) => {
    const { toast } = useToast();

    const { platforms } = usePlatformsQuery();
    const categories = [{ name: 'Gaming', icon: <GamepadIcon className="mr-2" /> }];

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

    const { createProduct, isCreatingProduct, createProductError } = useCreateProductMutation({
        onSuccess: () => {
            setDialogState(false);
            resetFormData();
            toast({
                description: 'Product was added successfuly.',
                duration: 5000,
            });
        },
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

    const renderSelectContent = () => {
        return categories.map(category => {
            const platformsForCategory = platforms.filter(platform => platform.category === category.name);

            return (
                <SelectGroup key={category.name}>
                    <SelectLabel className="flex items-center pl-4">
                        {category.icon} {category.name}
                    </SelectLabel>
                    {platformsForCategory.map(platform => (
                        <SelectItem key={platform.id} value={platform.id.toString()} className="pl-8">
                            {platform.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            );
        });
    };

    return (
        <Dialog
            open={isOpened}
            onOpenChange={isOpened => {
                setDialogState(isOpened);
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
                                    <Select onValueChange={value => onChange(Number(value))} value={value?.toString()}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a platform" />
                                        </SelectTrigger>
                                        {formErrors.platformId && (
                                            <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-600 ml-auto">
                                                {formErrors.platformId.message}
                                            </span>
                                        )}
                                        <SelectContent>{renderSelectContent()}</SelectContent>
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
    );
};
