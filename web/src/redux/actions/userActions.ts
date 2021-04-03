import { AuthenticationResponse } from '../../types';
import { IAuthenticationUser, IUser } from '../../types/userTypes';

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
};

//interfaces
export interface IAuthenticationRequest {
    type: typeof UserActions.AUTHENTICATION_REQUEST;
    payload: IAuthenticationUser;
}

export interface IAuthenticationSuccess {
    type: typeof UserActions.AUTHENTICATION_SUCCESS;
    payload: AuthenticationResponse;
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
    payload: IUser;
}

export interface ILogOutUser {
    type: typeof UserActions.LOGOUT_USER;
}

export interface IVerifyUserRequest {
    type: typeof UserActions.VERIFY_USER_REQUEST;
}

export interface IVerifyUserSuccess {
    type: typeof UserActions.VERIFY_USER_SUCCESS;
    payload: IUser;
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

//actions
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

export function authenticationSuccess(authResponse: AuthenticationResponse): IAuthenticationSuccess {
    return {
        type: UserActions.AUTHENTICATION_SUCCESS,
        payload: authResponse,
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

export function addUser(user: IUser): IAddUser {
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

export function verifyUserRequest(): IVerifyUserRequest {
    return {
        type: UserActions.VERIFY_USER_REQUEST,
    };
}

export function verifyUserSuccess(user: IUser): IVerifyUserSuccess {
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
        type: UserActions.UPDATE_AVATAR_FAILURE,
        payload: avatarLink,
    };
}

export function updateAvatarFailure(error: Error): IUpdateAvatarFailure {
    return {
        type: UserActions.UPDATE_AVATAR_FAILURE,
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
    IUpdateAvatarFailure;
