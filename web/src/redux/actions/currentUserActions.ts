import { AuthenticationResponse } from '../../types';
import { IAuthenticationUser, IUser } from '../../types/userTypes';

export const CurrentUserActions = {
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
};

//interfaces
export interface IAuthenticationRequest {
    type: typeof CurrentUserActions.AUTHENTICATION_REQUEST;
    payload: IAuthenticationUser;
}

export interface IAuthenticationSuccess {
    type: typeof CurrentUserActions.AUTHENTICATION_SUCCESS;
    payload: AuthenticationResponse;
}

export interface IAuthenticationFailure {
    type: typeof CurrentUserActions.AUTHENTICATION_FAILURE;
    payload: Error;
}

export interface IRegistrationRequest {
    type: typeof CurrentUserActions.REGISTRATION_REQUEST;
    payload: IAuthenticationUser;
}

export interface IRegistrationSuccess {
    type: typeof CurrentUserActions.REGISTRATION_SUCCESS;
}

export interface IRegistrationFailure {
    type: typeof CurrentUserActions.REGISTRATION_FAILURE;
    payload: Error;
}

export interface ICreateUserRequest {
    type: typeof CurrentUserActions.CREATE_USER_REQUEST;
    payload: IUser;
}

export interface ICreateUserSuccess {
    type: typeof CurrentUserActions.CREATE_USER_SUCCESS;
    payload: IUser;
}

export interface ICreateUserFailure {
    type: typeof CurrentUserActions.CREATE_USER_FAILURE;
    payload: Error;
}

export interface IAddUser {
    type: typeof CurrentUserActions.ADD_USER;
    payload: IUser;
}

export interface ILogOutUser {
    type: typeof CurrentUserActions.LOGOUT_USER;
}

export interface IVerifyUserRequest {
    type: typeof CurrentUserActions.VERIFY_USER_REQUEST;
}

export interface IVerifyUserSuccess {
    type: typeof CurrentUserActions.VERIFY_USER_SUCCESS;
    payload: IUser;
}

export interface IVerifyUserFailure {
    type: typeof CurrentUserActions.VERIFY_USER_FAILURE;
    payload: Error;
}

export interface IHideCustomerSuccessfulRegistration {
    type: typeof CurrentUserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION;
}

//actions
export function registrationRequest(userName: string, password: string): IRegistrationRequest {
    return {
        type: CurrentUserActions.REGISTRATION_REQUEST,
        payload: {
            userName,
            password,
        },
    };
}

export function registrationSuccess(): IRegistrationSuccess {
    return {
        type: CurrentUserActions.REGISTRATION_SUCCESS,
    };
}

export function registrationFailure(error: Error): IRegistrationFailure {
    return {
        type: CurrentUserActions.REGISTRATION_FAILURE,
        payload: error,
    };
}

export function authenticationRequest(userName: string, password: string): IAuthenticationRequest {
    return {
        type: CurrentUserActions.AUTHENTICATION_REQUEST,
        payload: {
            userName,
            password,
        },
    };
}

export function authenticationSuccess(authResponse: AuthenticationResponse): IAuthenticationSuccess {
    return {
        type: CurrentUserActions.AUTHENTICATION_SUCCESS,
        payload: authResponse,
    };
}

export function authenticationFailure(error: Error): IAuthenticationFailure {
    return {
        type: CurrentUserActions.AUTHENTICATION_FAILURE,
        payload: error,
    };
}

export function createUserRequest(user: IUser): ICreateUserRequest {
    return {
        type: CurrentUserActions.CREATE_USER_REQUEST,
        payload: user,
    };
}

export function createUserSuccess(user: IUser): ICreateUserSuccess {
    return {
        type: CurrentUserActions.CREATE_USER_SUCCESS,
        payload: user,
    };
}

export function createUserFailure(error: Error): ICreateUserFailure {
    return {
        type: CurrentUserActions.CREATE_USER_FAILURE,
        payload: error,
    };
}

export function addUser(user: IUser): IAddUser {
    return {
        type: CurrentUserActions.ADD_USER,
        payload: user,
    };
}

export function logOutUser(): ILogOutUser {
    return {
        type: CurrentUserActions.LOGOUT_USER,
    };
}

export function verifyUserRequest(): IVerifyUserRequest {
    return {
        type: CurrentUserActions.VERIFY_USER_REQUEST,
    };
}

export function verifyUserSuccess(user: IUser): IVerifyUserSuccess {
    return {
        type: CurrentUserActions.VERIFY_USER_SUCCESS,
        payload: user,
    };
}

export function verifyUserFailure(error: Error): IVerifyUserFailure {
    return {
        type: CurrentUserActions.VERIFY_USER_FAILURE,
        payload: error,
    };
}

export function hideCustomerSuccessfulRegistration(): IHideCustomerSuccessfulRegistration {
    return {
        type: CurrentUserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION,
    };
}

export type CurrentUserActionTypes = IAddUser &
    IAuthenticationSuccess &
    IAuthenticationFailure &
    IRegistrationSuccess &
    IHideCustomerSuccessfulRegistration;
