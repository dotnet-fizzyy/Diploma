import * as routeConstants from '../constants/routeConstants';
import { IAuthenticationUser, IUser } from '../types/userTypes';
import { axiosGet, axiosPost } from './index';

export async function getUsers(params?: any) {
    const response = await axiosGet(routeConstants.UsersUrl, params);

    return response.data;
}

export async function getUserByToken() {
    const response = await axiosGet(routeConstants.UsersUrl);

    return response.data;
}

export async function createUser(user: IUser) {
    const mappedUser = {
        userName: user.userName,
        password: user.password,
        email: user.email,
        userRole: user.userRole.toString(),
        userPosition: user.userPosition.toString(),
        teamId: user.teamId,
        isActive: true,
    };

    const response = await axiosPost(routeConstants.UsersUrl, mappedUser);

    return response.data;
}

export async function createCustomer(body: IAuthenticationUser) {
    const response = await axiosPost(routeConstants.SignUpUrl, body);

    return response.data;
}

export async function authenticate(body: IAuthenticationUser) {
    const response = await axiosPost(routeConstants.SignInUrl, body);

    return response.data;
}
