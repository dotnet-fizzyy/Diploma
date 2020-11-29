import * as routeConstants from '../constants/routeConstants';
import { IAuthenticationUser } from '../types/userTypes';
import { axiosGet, axiosPost } from './index';

export async function getUsers(params?: any) {
    const response = await axiosGet(routeConstants.UsersUrl, params);

    return response.data;
}

export async function test(params?: any) {
    const response = await axiosGet('https://jsonplaceholder.typicode.com/posts', params);

    const testData = response.data;

    return testData;
}

export async function authenticate(body: IAuthenticationUser) {
    const response = await axiosPost(routeConstants.TokenUrl, body);

    return response.data;
}
