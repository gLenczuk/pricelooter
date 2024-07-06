import { object, string, number } from 'yup';

export const CreateProductSchema = object({
    platformId: number().required('Platform ID is required.'),
    url: string().required('Product URL is required.').url('Invalid product URL.'),
})
    .noUnknown(true, 'Only keys specified in schema are allowed.')
    .strict(true);
