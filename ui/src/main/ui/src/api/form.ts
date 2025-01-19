import { Pagination, SchemaRoot } from "./data";
import { post, get } from "./requester";

export async function formSave(schema: SchemaRoot): Promise<SchemaRoot> {
    return await post<SchemaRoot>('/api/form', schema).then(response => {
        return response.data;
    });
}

export async function getFormList(pagination: Pagination): Promise<SchemaRoot[]> {
    const { page, pageSize } = pagination;    
    return await get<SchemaRoot[]>(`/api/form?page=${page}&pageSize=${pageSize}`).then(response => {
        return response.data;
    });
}

