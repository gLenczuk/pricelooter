import NodeEventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { Language, PlatformDTO, ProductDTO, UserDTO } from '@pricelooter/types';

export type UserEvent = { user: UserDTO; language: Language };
export type PlatformEvent = { platform: PlatformDTO; language: Language };
export type ProductEvent = { product: ProductDTO; language: Language };

type EventEmitterEvents = {
    ON_USER_CREATED: (event: UserEvent) => void | Promise<void>;
    ON_PLATFORM_CREATED: (event: PlatformEvent) => void | Promise<void>;
    ON_PRODUCT_CREATED: (event: ProductEvent) => void | Promise<void>;
};

export const SyncEventEmitter = new NodeEventEmitter() as TypedEmitter<EventEmitterEvents>;
