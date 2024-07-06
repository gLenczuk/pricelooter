import { object, string } from 'yup';

export const CreatePlatformSchema = object({
    name: string().required('Platform name is required.'),
    category: string().required('Category is required.'),
    url: string().required('URL is required.').url('Invalid platform URL.'),
})
    .noUnknown(true, 'Only keys specified in schema are allowed.')
    .strict(true);
