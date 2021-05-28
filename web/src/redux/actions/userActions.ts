import { IAuthenticationUser, IFullUser, IUpdateUserPassword, IUser } from '../../types/userTypes';

export const UserActions = {
    AUTHENTICATION_REQUEST: 'AUTHENTICATION_REQUEST',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE',
    REGISTRATION_REQUEST: 'REGISTRATION_REQUEST',
    REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS',
    REGISTRATION_FAILURE: 'REGISTRATION_FAILURE',
    CREATE_USER_REQUEST: 'CREATE_USER_REQUEST',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILURE: 'CREATE_USER_FAILURE',
    ADD_USER: 'ADD_USER',
    LOGOUT_USER: 'LOGOUT_USER',
    VERIFY_USER_REQUEST: 'VERIFY_USER_REQUEST',
    VERIFY_USER_SUCCESS: 'VERIFY_USER_SUCCESS',
    VERIFY_USER_FAILURE: 'VERIFY_USER_FAILURE',
    HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION: 'HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION',
    UPDATE_AVATAR_REQUEST: 'UPDATE_AVATAR_REQUEST',
    UPDATE_AVATAR_SUCCESS: 'UPDATE_AVATAR_SUCCESS',
    UPDATE_AVATAR_FAILURE: 'UPDATE_AVATAR_FAILURE',
    UPDATE_USER_PASSWORD_REQUEST: 'UPDATE_USER_PASSWORD_REQUEST',
    UPDATE_USER_PASSWORD_SUCCESS: 'UPDATE_USER_PASSWORD_SUCCESS',
    UPDATE_USER_PASSWORD_FAILURE: 'UPDATE_USER_PASSWORD_FAILURE',
    UPDATE_PROFILE_SETTINGS_REQUEST: 'UPDATE_PROFILE_SETTINGS_REQUEST',
    UPDATE_PROFILE_SETTINGS_SUCCESS: 'UPDATE_PROFILE_SETTINGS_SUCCESS',
    UPDATE_PROFILE_SETTINGS_FAILURE: 'UPDATE_PROFILE_SETTINGS_FAILURE',
    CHANGE_USER_ACTIVITY_STATUS_REQUEST: 'CHANGE_USER_ACTIVITY_STATUS_REQUEST',
    CHANGE_USER_ACTIVITY_STATUS_SUCCESS: 'CHANGE_USER_ACTIVITY_STATUS_SUCCESS',
    CHANGE_USER_ACTIVITY_STATUS_FAILURE: 'CHANGE_USER_ACTIVITY_STATUS_FAILURE',
    CHANGE_USER_PROJECT: 'CHANGE_USER_PROJECT',
    CHANGE_USER_TEAM: 'CHANGE_USER_TEAM',
    REFRESH_USER_TOKEN_REQUEST: 'REFRESH_USER_TOKEN_REQUEST',
    REFRESH_USER_TOKEN_SUCCESS: 'REFRESH_USER_TOKEN_SUCCESS',
    REFRESH_USER_TOKEN_FAILURE: 'REFRESH_USER_TOKEN_FAILURE',
};

/*
Interfaces
 */
export interface IAuthenticationRequest {
    type: typeof UserActions.AUTHENTICATION_REQUEST;
    payload: IAuthenticationUser;
}

export interface IAuthenticationSuccess {
    type: typeof UserActions.AUTHENTICATION_SUCCESS;
    payload: IFullUser;
}

export interface IAuthenticationFailure {
    type: typeof UserActions.AUTHENTICATION_FAILURE;
    payload: Error;
}

export interface IRegistrationRequest {
    type: typeof UserActions.REGISTRATION_REQUEST;
    payload: IAuthenticationUser;
}

export interface IRegistrationSuccess {
    type: typeof UserActions.REGISTRATION_SUCCESS;
}

export interface IRegistrationFailure {
    type: typeof UserActions.REGISTRATION_FAILURE;
    payload: Error;
}

export interface ICreateUserRequest {
    type: typeof UserActions.CREATE_USER_REQUEST;
    payload: IUser;
}

export interface ICreateUserSuccess {
    type: typeof UserActions.CREATE_USER_SUCCESS;
    payload: IUser;
}

export interface ICreateUserFailure {
    type: typeof UserActions.CREATE_USER_FAILURE;
    payload: Error;
}

export interface IAddUser {
    type: typeof UserActions.ADD_USER;
    payload: IFullUser;
}

export interface ILogOutUser {
    type: typeof UserActions.LOGOUT_USER;
}

export interface IVerifyUserRequest {
    type: typeof UserActions.VERIFY_USER_REQUEST;
    payload: string;
}

export interface IVerifyUserSuccess {
    type: typeof UserActions.VERIFY_USER_SUCCESS;
    payload: IFullUser;
}

export interface IVerifyUserFailure {
    type: typeof UserActions.VERIFY_USER_FAILURE;
    payload: Error;
}

export interface IHideCustomerSuccessfulRegistration {
    type: typeof UserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION;
}

export interface IUpdateAvatarRequest {
    type: typeof UserActions.UPDATE_AVATAR_REQUEST;
    payload: {
        file: File;
        userId: string;
    };
}

export interface IUpdateAvatarSuccess {
    type: typeof UserActions.UPDATE_AVATAR_SUCCESS;
    payload: string;
}

export interface IUpdateAvatarFailure {
    type: typeof UserActions.UPDATE_AVATAR_FAILURE;
    payload: Error;
}

export interface IUpdatePasswordRequest {
    type: typeof UserActions.UPDATE_USER_PASSWORD_REQUEST;
    payload: IUpdateUserPassword;
}

export interface IUpdatePasswordSuccess {
    type: typeof UserActions.UPDATE_USER_PASSWORD_SUCCESS;
}

export interface IUpdatePasswordFailure {
    type: typeof UserActions.UPDATE_USER_PASSWORD_FAILURE;
    payload: Error;
}

export interface IUpdateProfileSettingsRequest {
    type: typeof UserActions.UPDATE_PROFILE_SETTINGS_REQUEST;
    payload: IUser;
}

export interface IUpdateProfileSettingsSuccess {
    type: typeof UserActions.UPDATE_PROFILE_SETTINGS_SUCCESS;
    payload: IFullUser;
}

export interface IUpdateProfileSettingsFailure {
    type: typeof UserActions.UPDATE_PROFILE_SETTINGS_FAILURE;
    payload: Error;
}

export interface IChangeUserActivityStatusRequest {
    type: typeof UserActions.CHANGE_USER_ACTIVITY_STATUS_REQUEST;
    payload: {
        userId: string;
        isActive: boolean;
    };
}

export interface IChangeUserActivityStatusSuccess {
    type: typeof UserActions.CHANGE_USER_ACTIVITY_STATUS_SUCCESS;
    payload: string;
}

export interface IChangeUserActivityStatusFailure {
    type: typeof UserActions.CHANGE_USER_ACTIVITY_STATUS_FAILURE;
    payload: Error;
}

export interface IChangeUserTeam {
    type: typeof UserActions.CHANGE_USER_TEAM;
    payload: string;
}

export interface IChangeUserProject {
    type: typeof UserActions.CHANGE_USER_TEAM;
    payload: string;
}

export interface IRefreshUserTokenRequest {
    type: typeof UserActions.REFRESH_USER_TOKEN_REQUEST;
}

export interface IRefreshUserTokeSuccess {
    type: typeof UserActions.REFRESH_USER_TOKEN_SUCCESS;
}

export interface IRefreshUserTokeFailure {
    type: typeof UserActions.REFRESH_USER_TOKEN_FAILURE;
    payload: Error;
}

/*
Actions
 */
export function registrationRequest(userName: string, password: string, email: string): IRegistrationRequest {
    return {
        type: UserActions.REGISTRATION_REQUEST,
        payload: {
            userName,
            password,
            email,
        },
    };
}

export function registrationSuccess(): IRegistrationSuccess {
    return {
        type: UserActions.REGISTRATION_SUCCESS,
    };
}

export function registrationFailure(error: Error): IRegistrationFailure {
    return {
        type: UserActions.REGISTRATION_FAILURE,
        payload: error,
    };
}

export function authenticationRequest(userName: string, password: string): IAuthenticationRequest {
    return {
        type: UserActions.AUTHENTICATION_REQUEST,
        payload: {
            userName,
            password,
        },
    };
}

export function authenticationSuccess(user: IFullUser): IAuthenticationSuccess {
    return {
        type: UserActions.AUTHENTICATION_SUCCESS,
        payload: user,
    };
}

export function authenticationFailure(error: Error): IAuthenticationFailure {
    return {
        type: UserActions.AUTHENTICATION_FAILURE,
        payload: error,
    };
}

export function createUserRequest(user: IUser): ICreateUserRequest {
    return {
        type: UserActions.CREATE_USER_REQUEST,
        payload: user,
    };
}

export function createUserSuccess(user: IUser): ICreateUserSuccess {
    return {
        type: UserActions.CREATE_USER_SUCCESS,
        payload: user,
    };
}

export function createUserFailure(error: Error): ICreateUserFailure {
    return {
        type: UserActions.CREATE_USER_FAILURE,
        payload: error,
    };
}

export function addUser(user: IFullUser): IAddUser {
    return {
        type: UserActions.ADD_USER,
        payload: user,
    };
}

export function logOutUser(): ILogOutUser {
    return {
        type: UserActions.LOGOUT_USER,
    };
}

export function verifyUserRequest(initRoute: string): IVerifyUserRequest {
    return {
        type: UserActions.VERIFY_USER_REQUEST,
        payload: initRoute,
    };
}

export function verifyUserSuccess(user: IFullUser): IVerifyUserSuccess {
    return {
        type: UserActions.VERIFY_USER_SUCCESS,
        payload: user,
    };
}

export function verifyUserFailure(error: Error): IVerifyUserFailure {
    return {
        type: UserActions.VERIFY_USER_FAILURE,
        payload: error,
    };
}

export function hideCustomerSuccessfulRegistration(): IHideCustomerSuccessfulRegistration {
    return {
        type: UserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION,
    };
}

export function updateAvatarRequest(file: File, userId: string): IUpdateAvatarRequest {
    return {
        type: UserActions.UPDATE_AVATAR_REQUEST,
        payload: {
            file,
            userId,
        },
    };
}

export function updateAvatarSuccess(avatarLink: string): IUpdateAvatarSuccess {
    return {
        type: UserActions.UPDATE_AVATAR_SUCCESS,
        payload: avatarLink,
    };
}

export function updateAvatarFailure(error: Error): IUpdateAvatarFailure {
    return {
        type: UserActions.UPDATE_AVATAR_FAILURE,
        payload: error,
    };
}

export function updatePasswordRequest(oldPassword: string, newPassword: string): IUpdatePasswordRequest {
    return {
        type: UserActions.UPDATE_USER_PASSWORD_REQUEST,
        payload: {
            oldPassword,
            newPassword,
        },
    };
}

export function updatePasswordSuccess(): IUpdatePasswordSuccess {
    return {
        type: UserActions.UPDATE_USER_PASSWORD_SUCCESS,
    };
}

export function updatePasswordFailure(error: Error): IUpdatePasswordFailure {
    return {
        type: UserActions.UPDATE_USER_PASSWORD_FAILURE,
        payload: error,
    };
}

export function updateProfileSettingsRequest(user: IUser): IUpdateProfileSettingsRequest {
    return {
        type: UserActions.UPDATE_PROFILE_SETTINGS_REQUEST,
        payload: user,
    };
}

export function updateProfileSettingsSuccess(user: IFullUser): IUpdateProfileSettingsSuccess {
    return {
        type: UserActions.UPDATE_PROFILE_SETTINGS_SUCCESS,
        payload: user,
    };
}

export function updateProfileSettingsFailure(error: Error): IUpdateProfileSettingsFailure {
    return {
        type: UserActions.UPDATE_PROFILE_SETTINGS_FAILURE,
        payload: error,
    };
}

export function changeUserActivityStatusRequest(userId: string, isActive: boolean): IChangeUserActivityStatusRequest {
    return {
        type: UserActions.CHANGE_USER_ACTIVITY_STATUS_REQUEST,
        payload: {
            userId,
            isActive,
        },
    };
}

export function changeUserActivityStatusSuccess(userId: string): IChangeUserActivityStatusSuccess {
    return {
        type: UserActions.CHANGE_USER_ACTIVITY_STATUS_SUCCESS,
        payload: userId,
    };
}

export function changeUserActivityStatusFailure(error: Error): IChangeUserActivityStatusFailure {
    return {
        type: UserActions.CHANGE_USER_ACTIVITY_STATUS_FAILURE,
        payload: error,
    };
}

export function changeUserProject(projectId: string): IChangeUserProject {
    return {
        type: UserActions.CHANGE_USER_PROJECT,
        payload: projectId,
    };
}

export function changeUserTeam(teamId: string): IChangeUserTeam {
    return {
        type: UserActions.CHANGE_USER_TEAM,
        payload: teamId,
    };
}

export function refreshUserTokenRequest(): IRefreshUserTokenRequest {
    return {
        type: UserActions.REFRESH_USER_TOKEN_REQUEST,
    };
}

export function refreshUserTokenSuccess(): IRefreshUserTokenRequest {
    return {
        type: UserActions.REFRESH_USER_TOKEN_SUCCESS,
    };
}

export function refreshUserTokenFailure(error: Error): IRefreshUserTokeFailure {
    return {
        type: UserActions.REFRESH_USER_TOKEN_FAILURE,
        payload: error,
    };
}

export type CurrentUserActionTypes = IAddUser &
    IAuthenticationSuccess &
    IAuthenticationFailure &
    IRegistrationSuccess &
    IVerifyUserRequest &
    IHideCustomerSuccessfulRegistration &
    IUpdateAvatarRequest &
    IUpdateAvatarSuccess &
    IUpdateAvatarFailure &
    IUpdatePasswordRequest &
    IUpdatePasswordSuccess &
    IUpdatePasswordFailure &
    IUpdateProfileSettingsRequest &
    IUpdateProfileSettingsSuccess &
    IUpdateProfileSettingsFailure &
    IChangeUserActivityStatusSuccess &
    IChangeUserProject &
    IChangeUserTeam;
