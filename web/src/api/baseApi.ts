import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class AxiosBaseApi {
    public static async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().get(url, config);
    }

    public static async post(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().post(url, body, config);
    }

    public static async put(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().put(url, body, config);
    }

    public static async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().delete(url, config);
    }

    public static async patch(url: string, body: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().patch(url, body, config);
    }

    private static getAxiosInstance(): AxiosInstance {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        return axios.create({
            responseType: 'json',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'x-refresh-token': refreshToken,
                'Content-Type': 'application/json',
            },
        });
    }
}
