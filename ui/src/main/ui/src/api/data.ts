interface RFC7807Error {
    type: string;
    title: string;
    status: number;
    detail: string;
    instance: string;
}

export interface SchemaRoot {
    id?: string;
    name: string;
    fields: Field[];
}
export interface Field {
    id?: string;
    name: string;
    label: string;
    helpText?: string;
    type: string;
    choices?: string[];
    format: string;
    description: string;
    defaultValue?: string;
    required: boolean;
    secret: boolean;
    multiline: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

export interface Pagination {
    page: number;
    pageSize: number;
}
