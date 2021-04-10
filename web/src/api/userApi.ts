import { AxiosResponse } from 'axios';
import * as routeConstants from '../constants/routeConstants';
import { AuthenticationResponse, IJsonPatchBody, TokenType } from '../types';
import { IAuthenticationUser, IFullUser, IUser } from '../types/userTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class UserApi {
    public static async getUserByToken(): Promise<IUser> {
        const response: AxiosResponse<IFullUser> = await AxiosBaseApi.axiosGet(routeConstants.UserUrls.getUserByToken);

        return UserApi.mapToFullUserModel(response.data);
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

        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPost(
            routeConstants.UserUrls.createUser,
            mappedUser
        );

        return UserApi.mapToModel(response.data);
    }

    public static async createCustomer(authUser: IAuthenticationUser): Promise<IUser> {
        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPost(routeConstants.SignUpUrl, authUser);

        return UserApi.mapToModel(response.data);
    }

    public static async authenticate(authUser: IAuthenticationUser): Promise<AuthenticationResponse> {
        const response: AxiosResponse<AuthenticationResponse> = await AxiosBaseApi.axiosPost(
            routeConstants.SignInUrl,
            authUser
        );

        return UserApi.mapToAuthenticationUser(response.data);
    }

    public static async uploadImageOnCloud(file: File): Promise<string> {
        const cloudinaryId: string = process.env.REACT_APP_CLOUDINARY_ID || '';
        const storageFolder: string = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || '';

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', storageFolder);

        const response: AxiosResponse = await AxiosBaseApi.axiosPost(
            routeConstants.getCloudStorageUrl(cloudinaryId),
            formData,
            { headers: null }
        );

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
        };

        const response: AxiosResponse<IUser> = await AxiosBaseApi.axiosPut(
            routeConstants.UserUrls.updateProfileSettings,
            mappedUser
        );

        return UserApi.mapToModel(response.data);
    }

    public static async updateAvatarLink(body: IJsonPatchBody[]): Promise<void> {
        await AxiosBaseApi.axiosPatch(routeConstants.UserUrls.updateAvatarLink, body);
    }

    public static async updatePassword(oldPassword: string, newPassword: string): Promise<void> {
        const body = {
            oldPassword,
            newPassword,
        };

        await AxiosBaseApi.axiosPut(routeConstants.UserUrls.updatePassword, body);
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

    private static mapToFullUserModel(data: any): IFullUser {
        let fullUser: IFullUser = UserApi.mapToModel(data);
        fullUser.projectId = data.projectId;
        fullUser.projectName = data.projectName;
        fullUser.teamName = data.teamName;

        return fullUser;
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
            user: UserApi.mapToFullUserModel(data.user),
        };
    }
}
