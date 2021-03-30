import axios, { AxiosInstance } from 'axios';

function getAxiosInstance(): AxiosInstance {
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

export async function axiosGet(url: string, params?: any) {
    return await getAxiosInstance().get(url, params);
}

export async function axiosPost(url: string, body?: any) {
    return await getAxiosInstance().post(url, body);
}

export async function axiosPut(url: string, body?: any) {
    return await getAxiosInstance().put(url, body);
}

export async function axiosDelete(url: string, params: any) {
    return await getAxiosInstance().delete(url, params);
}

export async function axiosPatch(url: string, body: any) {
    return await getAxiosInstance().patch(url, body);
}
