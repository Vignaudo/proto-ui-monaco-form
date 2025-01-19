import axios from 'axios';
import { JSONSchema } from 'monaco-yaml';
import { SchemaRoot } from './data';

const fetchSchema = async () => {
    try {
        const response = await axios.get<string>('/api/schema/schema.json');
        return response.data as JSONSchema;
    } catch (error: unknown) {
        console.error('Error fetching schema:', error);

        const rfc7807Error = {
            type: 'https://example.com/probs/fetch-schema-error',
            title: 'Error fetching schema',
            status: (error as any).response?.status || 500,
            detail: (error as any).response?.data?.detail || 'An unknown error occurred',
            instance: '/api/schema/schema.json'
        };

        throw rfc7807Error;
    }
};

export const convertSchema = async (schemaString: string) => {
    try {
        const response = await axios.post<string>('/api/schema/convert', schemaString, {
            headers: {
                'Content-Type': 'application/x-yaml'
            }
        });
        return response.data as unknown as SchemaRoot;
    } catch (error: unknown) {
        console.error('Error converting schema:', error);

        const rfc7807Error = {
            type: 'https://example.com/probs/convert-schema-error',
            title: 'Error converting schema',
            status: (error as any).response?.status || 500,
            detail: (error as any).response?.data?.detail || 'An unknown error occurred',
            instance: '/api/schema/convert'
        };

        //throw rfc7807Error;
    }
};
export default fetchSchema;