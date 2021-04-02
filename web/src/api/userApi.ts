import { AxiosResponse } from 'axios';
import * as routeConstants from '../constants/routeConstants';
import { AuthenticationResponse, TokenType } from '../types';
import { IAuthenticationUser, IUser } from '../types/userTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class UserApi {
    public static async getUserByToken(): Promise<IUser> {
        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosGet(routeConstants.UsersUrl);

        return UserApi.mapToModel(response.data);
    }

    public static async createUser(user: IUser): Promise<IUser> {
        const mappedUser = {
            userName: user.userName,
            password: user.password,
            email: user.email,
            userRole: user.userRole.toString(),
            userPosition: user.userPosition.toString(),
            teamId: user.teamId,
            isActive: true,
        };

        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPost(routeConstants.UsersUrl, mappedUser);

        return UserApi.mapToModel(response.data);
    }

    public static async createCustomer(authUser: IAuthenticationUser): Promise<IUser> {
        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPost(routeConstants.SignUpUrl, authUser);

        return UserApi.mapToModel(response.data);
    }

    public static async authenticate(authUser: IAuthenticationUser): Promise<AuthenticationResponse> {
        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPost(routeConstants.SignInUrl, authUser);

        return UserApi.mapToAuthenticationUser(response.data);
    }

    private static mapToModel(data: any): IUser {
        return {
            userId: data.userId,
            userName: data.userName,
            password: data.password,
            email: data.email,
            userRole: data.userRole,
            userPosition: data.userPosition,
            teamId: data.teamId,
            isActive: data.isActive,
            avatarLink: data.avatarLink,
            workSpaceId: data.workSpaceId,
        };
    }

    private static mapToAuthenticationUser(data: any): AuthenticationResponse {
        return {
            accessToken: {
                type: TokenType[data.accessToken.type],
                value: data.accessToken.value,
            },
            refreshToken: {
                type: TokenType[data.refreshToken.type],
                value: data.refreshToken.value,
            },
            user: UserApi.mapToModel(data.user),
        };
    }
}
