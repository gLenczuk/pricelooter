import { CreateProductRequest, EmptyObject } from '@pricelooter/types';
import { ControllerRequest } from '../../types';
import { platformService } from '../platform/platform.service';
import { AuthenticationError, ExistingResourceError, NotFoundError } from '@pricelooter/exceptions';
import { productService } from './product.service';

const createProduct = async (req: ControllerRequest<CreateProductRequest>) => {
    if (!req.session.user) throw new AuthenticationError({ message: 'Cannot find session user.' });
    const { url, platformId } = req.body;

    const products = await productService.findManyProducts({
        filter: {
            url,
            userId: req.session.user.id,
        },
    });

    if (products.length > 0)
        throw new ExistingResourceError({
            message: `Product (${products[0].name}) already exists for User (${req.session.user.id})`,
        });

    const platform = await platformService.findUniquePlatform({ id: platformId });

    if (!platform) throw new NotFoundError({ message: `Cannot find platform for given ID (${platformId}).` });

    return productService.createProduct({
        platformId: platform.id,
        platformName: platform.name,
        url,
        userId: req.session.user.id,
    });
};

const getProducts = async (req: ControllerRequest<EmptyObject>) => {
    if (!req.session.user) throw new AuthenticationError({ message: 'Cannot find session user.' });

    return productService.findManyProducts({
        filter: {
            userId: req.session.user.id,
        },
    });
};

export const productController = {
    createProduct,
    getProducts,
};
