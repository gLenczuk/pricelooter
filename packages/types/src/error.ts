export interface ApplicationErrorDTO {
    type: string;
    message: string;
    meta: ApplicationErrorMeta;
}

export interface ApplicationErrorParams {
    message?: string;
    key?: string;
    field?: string;
}

export interface ApplicationErrorMeta {
    status: number;
    field: string | null;
    key: string | null;
}
