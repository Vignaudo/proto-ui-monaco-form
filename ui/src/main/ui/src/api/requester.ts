import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8080/';

const createAxiosInstance = (): AxiosInstance => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const instance = axios.create({
        headers
    });

    instance.interceptors.response.use(
        response => response,
        error => {
            // Handle errors globally
            console.error('API error:', error);
            return Promise.reject(error);
        }
    );

    return instance;
};

const axiosInstance = createAxiosInstance();

export const get = async <T>(endpoint: string, params?: any): Promise<AxiosResponse<T>> => {
    try {
        const response = await axiosInstance.get(endpoint, { params });
        return response;
    } catch (error) {
        throw error;
    }
};

export const post = async <T>(endpoint: string, data: any): Promise<AxiosResponse<T>> => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response;
    } catch (error) {
        throw error;
    }
};

export const put = async <T>(endpoint: string, data: any): Promise<AxiosResponse<T>> => {
    try {
        const response = await axiosInstance.put(endpoint, data);
        return response;
    } catch (error) {
        throw error;
    }
};