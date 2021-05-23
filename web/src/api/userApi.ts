import { AxiosResponse } from 'axios';
import { getCloudStorageUrl, SignInUrl, SignUpUrl, UserUrls } from '../constants/routeConstants';
import { mapToFullUserModel, mapToUserModel } from '../mappers/userMapper';
import { AuthenticationResponse, IJsonPatchBody, TokenType } from '../types';
import { IAuthenticationUser, IFullUser, IUser } from '../types/userTypes';
import { createRequestBodyForUserChangeStatus } from '../utils/userUtils';
import AxiosBaseApi from './axiosBaseApi';

export default class UserApi {
    public static async getUserByToken(): Promise<IUser> {
        const response: AxiosResponse<IFullUser> = await AxiosBaseApi.axiosGet(UserUrls.getUserByToken);

        return mapToFullUserModel(response.data);
    }

    public static async createUser(user: IUser): Promise<IUser> {
        const mappedUser = {
            userName: user.userName,
            password: user.password,
            workSpaceId: user.workSpaceId,
            email: user.email,
            userRole: user.userRole.toString(),
            userPosition: user.userPosition.toString(),
            teamId: user.teamId,
            isActive: true,
        };

        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPost(UserUrls.createUser, mappedUser);

        return mapToUserModel(response.data);
    }

    public static async createCustomer(authUser: IAuthenticationUser): Promise<IUser> {
        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPost(SignUpUrl, authUser);

        return mapToUserModel(response.data);
    }

    public static async authenticate(authUser: IAuthenticationUser): Promise<AuthenticationResponse> {
        const response: AxiosResponse<AuthenticationResponse> = await AxiosBaseApi.axiosPost(SignInUrl, authUser);

        return UserApi.mapToAuthenticationUser(response.data);
    }

    public static async uploadImageOnCloud(file: File): Promise<string> {
        const cloudinaryId: string = process.env.REACT_APP_CLOUDINARY_ID || '';
        const storageFolder: string = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '';

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', storageFolder);

        const response: AxiosResponse = await AxiosBaseApi.axiosPost(getCloudStorageUrl(cloudinaryId), formData, {
            headers: null,
        });

        return response.data.secure_url;
    }

    public static async updateUser(user: IUser): Promise<IUser> {
        const mappedUser = {
            userId: user.userId,
            userName: user.userName,
            email: user.email,
            userRole: user.userRole.toString(),
            userPosition: user.userPosition.toString(),
            teamId: user.teamId,
            workSpaceId: user.workSpaceId,
            avatarLink: user.avatarLink,
            isActive: user.isActive,
            creationDate: user.creationDate,
        };

        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPut(UserUrls.updateProfileSettings, mappedUser);

        return mapToUserModel(response.data);
    }

    public static async updateAvatarLink(body: IJsonPatchBody[]): Promise<void> {
        await AxiosBaseApi.axiosPatch(UserUrls.updateAvatarLink, body);
    }

    public static async updatePassword(oldPassword: string, newPassword: string): Promise<void> {
        const body = {
            oldPassword,
            newPassword,
        };

        await AxiosBaseApi.axiosPut(UserUrls.updatePassword, body);
    }

    public static async changeActivityStatus(userId: string, isActive: boolean): Promise<void> {
        const body = createRequestBodyForUserChangeStatus(userId, isActive);

        await AxiosBaseApi.axiosPatch(UserUrls.changeStatus, body);
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
            user: mapToFullUserModel(data.user),
        };
    }
}
