import express, { Response as ExpressResponse, Request as ExpressRequest } from 'express';
import { getApplicationConfig } from '../../config';
import { withSchemaValidation } from '../../middlewares/withSchemaValidation';
import { ExtendedExpressSession, TypedExpressRequest } from '../../types';
import withAsyncHandler from 'express-async-handler';
import { CreateProductSchema } from '@pricelooter/validator';
import { CreateProductRequest, EmptyResponse, GetProductsResponse } from '@pricelooter/types';
import { withSessionAuthentication } from '../../middlewares/withSessionAuthentication';
import { productController } from './product.controller';
import { CreateProductResponse } from '@pricelooter/types';
import { SyncEventEmitter } from '../../libs/sync-event-emitter';

export const productRouter = express.Router();

export const CREATE_PRODUCT_ENDPOINT = '/api/v1/products';
export const GET_PRODUCTS_ENDPOINT = '/api/v1/products/me';
export const DELETE_PRODUCT_ENDPOINT = '/api/v1/products/:id';

productRouter.post(
    CREATE_PRODUCT_ENDPOINT,
    withSchemaValidation(CreateProductSchema),
    withSessionAuthentication,
    withAsyncHandler(
        async (req: TypedExpressRequest<CreateProductRequest>, res: ExpressResponse<CreateProductResponse>) => {
            const product = await productController.createProduct({
                body: req.body,
                session: req.session as ExtendedExpressSession,
                config: getApplicationConfig(),
            });

            SyncEventEmitter.emit('ON_PRODUCT_CREATED', { product });

            res.status(201).json({
                body: { product },
                key: 'product_created',
                meta: {},
            });
        },
    ),
);

productRouter.get(
    GET_PRODUCTS_ENDPOINT,
    withSessionAuthentication,
    withAsyncHandler(async (req: ExpressRequest, res: ExpressResponse<GetProductsResponse>) => {
        const { products, totalProductsCount } = await productController.getProducts({
            body: {
                page: Number(req.query.page) ?? 1,
            },
            session: req.session as ExtendedExpressSession,
            config: getApplicationConfig(),
        });

        res.status(200).json({
            body: { products },
            key: 'products_found',
            meta: {
                count: totalProductsCount,
            },
        });
    }),
);

productRouter.delete(
    DELETE_PRODUCT_ENDPOINT,
    withSessionAuthentication,
    withAsyncHandler(async (req: ExpressRequest, res: ExpressResponse<EmptyResponse>) => {
        const response = await productController.deleteProduct({
            body: {
                productId: Number(req.params.id),
            },
            session: req.session as ExtendedExpressSession,
            config: getApplicationConfig(),
        });

        res.status(200).json({
            body: response,
            key: 'product_deleted',
            meta: {},
        });
    }),
);
