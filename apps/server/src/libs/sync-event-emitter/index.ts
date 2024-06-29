import NodeEventEmitter from 'events';
import TypedEmitter from 'typed-emitter';
import { Language, UserDTO } from '@pricelooter/types';

export type UserEvent = { user: UserDTO; language: Language };

type EventEmitterEvents = {
    ON_USER_CREATED: (event: UserEvent) => void | Promise<void>;
};

export const SyncEventEmitter = new NodeEventEmitter() as TypedEmitter<EventEmitterEvents>;
