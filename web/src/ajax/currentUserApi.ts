import * as routeConstants from '../constants/routeConstants';
import { IAuthenticationUser } from '../types/userTypes';
import { axiosGet, axiosPost } from './index';

export async function getUsers(params?: any) {
    const response = await axiosGet(routeConstants.UsersUrl, params);

    return response.data;
}

export async function getUserByToken() {
    const response = await axiosGet(routeConstants.UsersUrl);

    return response.data;
}

export async function createUser(body: IAuthenticationUser) {
    const response = await axiosPost(routeConstants.customerUrl, body);

    return response.data;
}

export async function authenticate(body: IAuthenticationUser) {
    const response = await axiosPost(routeConstants.TokenUrl, body);

    return response.data;
}
