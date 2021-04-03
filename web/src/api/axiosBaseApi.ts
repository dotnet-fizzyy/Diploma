import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export default class AxiosBaseApi {
    private static getAxiosInstance(): AxiosInstance {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');

        return axios.create({
            responseType: 'json',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                RefreshToken: refreshToken,
                'Content-Type': 'application/json',
            },
        });
    }

    public static async axiosGet(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().get(url, config);
    }

    public static async axiosPost(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().post(url, body, config);
    }

    public static async axiosPut(url: string, body?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().put(url, body, config);
    }

    public static async axiosDelete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().delete(url, config);
    }

    public static async axiosPatch(url: string, body: any, config?: AxiosRequestConfig): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().patch(url, body, config);
    }
}
