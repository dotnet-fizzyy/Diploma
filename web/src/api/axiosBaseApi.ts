import axios, { AxiosInstance, AxiosResponse } from 'axios';

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

    public static async axiosGet(url: string, params?: any): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().get(url, params);
    }

    public static async axiosPost(url: string, body?: any): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().post(url, body);
    }

    public static async axiosPut(url: string, body?: any): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().put(url, body);
    }

    public static async axiosDelete(url: string, params: any): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().delete(url, params);
    }

    public static async axiosPatch(url: string, body: any): Promise<AxiosResponse> {
        return await AxiosBaseApi.getAxiosInstance().patch(url, body);
    }
}
