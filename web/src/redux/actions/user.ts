import { IBaseAction } from '../../types';
import { IAuthenticationUser, IFullUser, IUpdateUserPassword, IUser } from '../../types/user';

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
    REFRESH_USER_TOKEN_FAILURE: 'REFRESH_USER_TOKEN_FAILURE',
    CHECK_EMAIL_EXISTENCE_REQUEST: 'CHECK_EMAIL_EXISTENCE_REQUEST',
    CHECK_EMAIL_EXISTENCE_SUCCESS: 'CHECK_EMAIL_EXISTENCE_SUCCESS',
    CHECK_EMAIL_EXISTENCE_FAILURE: 'CHECK_EMAIL_EXISTENCE_FAILURE',
    RESET_EMAIL_EXISTENCE: 'RESET_EMAIL_EXISTENCE',
};

/**
 * Interfaces
 */

export interface IAuthenticationRequest extends IBaseAction {
    payload: IAuthenticationUser;
}

export interface IAuthenticationSuccess extends IBaseAction {
    payload: IFullUser;
}

export interface IAuthenticationFailure extends IBaseAction {
    payload: Error;
}

export interface IRegistrationRequest extends IBaseAction {
    payload: IAuthenticationUser;
}

export interface IRegistrationSuccess extends IBaseAction {}

export interface IRegistrationFailure extends IBaseAction {
    payload: Error;
}

export interface ICreateUserRequest extends IBaseAction {
    payload: IUser;
}

export interface ICreateUserSuccess extends IBaseAction {
    payload: IUser;
}

export interface ICreateUserFailure extends IBaseAction {
    payload: Error;
}

export interface ILogOutUser extends IBaseAction {}

export interface IVerifyUserRequest extends IBaseAction {
    payload: string;
}

export interface IVerifyUserSuccess extends IBaseAction {
    payload: IFullUser;
}

export interface IVerifyUserFailure extends IBaseAction {
    payload: Error;
}

export interface IHideCustomerSuccessfulRegistration extends IBaseAction {}

export interface IUpdateAvatarRequest extends IBaseAction {
    payload: {
        file: File;
        userId: string;
    };
}

export interface IUpdateAvatarSuccess extends IBaseAction {
    payload: string;
}

export interface IUpdateAvatarFailure extends IBaseAction {
    payload: Error;
}

export interface IUpdatePasswordRequest extends IBaseAction {
    payload: IUpdateUserPassword;
}

export interface IUpdatePasswordSuccess extends IBaseAction {}

export interface IUpdatePasswordFailure extends IBaseAction {
    payload: Error;
}

export interface IUpdateProfileSettingsRequest extends IBaseAction {
    payload: IUser;
}

export interface IUpdateProfileSettingsSuccess extends IBaseAction {
    payload: IFullUser;
}

export interface IUpdateProfileSettingsFailure extends IBaseAction {
    payload: Error;
}

export interface IChangeUserActivityStatusRequest extends IBaseAction {
    payload: {
        userId: string;
        isActive: boolean;
    };
}

export interface IChangeUserActivityStatusSuccess extends IBaseAction {
    payload: string;
}

export interface IChangeUserActivityStatusFailure extends IBaseAction {
    payload: Error;
}

export interface IChangeUserTeam extends IBaseAction {
    payload: string;
}

export interface IChangeUserProject extends IBaseAction {
    payload: string;
}

export interface IRefreshUserTokenRequest extends IBaseAction {}

export interface IRefreshUserTokeFailure extends IBaseAction {
    payload: Error;
}

export interface ICheckEmailExistenceRequest extends IBaseAction {
    payload: string;
}

export interface ICheckEmailExistenceSuccess extends IBaseAction {
    payload: boolean;
}

export interface ICheckEmailExistenceFailure extends IBaseAction {
    payload: Error;
}

export interface IResetEmailExistence extends IBaseAction {}

/**
 * Actions
 */

export const registrationRequest = (userName: string, password: string, email: string): IRegistrationRequest => ({
    type: UserActions.REGISTRATION_REQUEST,
    payload: {
        userName,
        password,
        email,
    },
});

export const registrationSuccess = (): IRegistrationSuccess => ({
    type: UserActions.REGISTRATION_SUCCESS,
});

export const registrationFailure = (error: Error): IRegistrationFailure => ({
    type: UserActions.REGISTRATION_FAILURE,
    payload: error,
});

export const authenticationRequest = (email: string, password: string): IAuthenticationRequest => ({
    type: UserActions.AUTHENTICATION_REQUEST,
    payload: {
        email,
        password,
    },
});

export const authenticationSuccess = (user: IFullUser): IAuthenticationSuccess => ({
    type: UserActions.AUTHENTICATION_SUCCESS,
    payload: user,
});

export const authenticationFailure = (error: Error): IAuthenticationFailure => ({
    type: UserActions.AUTHENTICATION_FAILURE,
    payload: error,
});

export const createUserRequest = (user: IUser): ICreateUserRequest => ({
    type: UserActions.CREATE_USER_REQUEST,
    payload: user,
});

export const createUserSuccess = (user: IUser): ICreateUserSuccess => ({
    type: UserActions.CREATE_USER_SUCCESS,
    payload: user,
});

export const createUserFailure = (error: Error): ICreateUserFailure => ({
    type: UserActions.CREATE_USER_FAILURE,
    payload: error,
});

export const logOutUser = (): ILogOutUser => ({
    type: UserActions.LOGOUT_USER,
});

export const verifyUserRequest = (initRoute: string): IVerifyUserRequest => ({
    type: UserActions.VERIFY_USER_REQUEST,
    payload: initRoute,
});

export const verifyUserSuccess = (user: IFullUser): IVerifyUserSuccess => ({
    type: UserActions.VERIFY_USER_SUCCESS,
    payload: user,
});

export const verifyUserFailure = (error: Error): IVerifyUserFailure => ({
    type: UserActions.VERIFY_USER_FAILURE,
    payload: error,
});

export const hideCustomerSuccessfulRegistration = (): IHideCustomerSuccessfulRegistration => ({
    type: UserActions.HIDE_CUSTOMER_SUCCESSFUL_REGISTRATION,
});

export const updateAvatarRequest = (file: File, userId: string): IUpdateAvatarRequest => ({
    type: UserActions.UPDATE_AVATAR_REQUEST,
    payload: {
        file,
        userId,
    },
});

export const updateAvatarSuccess = (avatarLink: string): IUpdateAvatarSuccess => ({
    type: UserActions.UPDATE_AVATAR_SUCCESS,
    payload: avatarLink,
});

export const updateAvatarFailure = (error: Error): IUpdateAvatarFailure => ({
    type: UserActions.UPDATE_AVATAR_FAILURE,
    payload: error,
});

export const updatePasswordRequest = (oldPassword: string, newPassword: string): IUpdatePasswordRequest => ({
    type: UserActions.UPDATE_USER_PASSWORD_REQUEST,
    payload: {
        oldPassword,
        newPassword,
    },
});

export const updatePasswordSuccess = (): IUpdatePasswordSuccess => ({
    type: UserActions.UPDATE_USER_PASSWORD_SUCCESS,
});

export const updatePasswordFailure = (error: Error): IUpdatePasswordFailure => ({
    type: UserActions.UPDATE_USER_PASSWORD_FAILURE,
    payload: error,
});

export const updateProfileSettingsRequest = (user: IUser): IUpdateProfileSettingsRequest => ({
    type: UserActions.UPDATE_PROFILE_SETTINGS_REQUEST,
    payload: user,
});

export const updateProfileSettingsSuccess = (user: IFullUser): IUpdateProfileSettingsSuccess => ({
    type: UserActions.UPDATE_PROFILE_SETTINGS_SUCCESS,
    payload: user,
});

export const updateProfileSettingsFailure = (error: Error): IUpdateProfileSettingsFailure => ({
    type: UserActions.UPDATE_PROFILE_SETTINGS_FAILURE,
    payload: error,
});

export const changeUserActivityStatusRequest = (
    userId: string,
    isActive: boolean
): IChangeUserActivityStatusRequest => ({
    type: UserActions.CHANGE_USER_ACTIVITY_STATUS_REQUEST,
    payload: {
        userId,
        isActive,
    },
});

export const changeUserActivityStatusSuccess = (userId: string): IChangeUserActivityStatusSuccess => ({
    type: UserActions.CHANGE_USER_ACTIVITY_STATUS_SUCCESS,
    payload: userId,
});

export const changeUserActivityStatusFailure = (error: Error): IChangeUserActivityStatusFailure => ({
    type: UserActions.CHANGE_USER_ACTIVITY_STATUS_FAILURE,
    payload: error,
});

export const changeUserProject = (projectId: string): IChangeUserProject => ({
    type: UserActions.CHANGE_USER_PROJECT,
    payload: projectId,
});

export const changeUserTeam = (teamId: string): IChangeUserTeam => ({
    type: UserActions.CHANGE_USER_TEAM,
    payload: teamId,
});

export const refreshUserTokenRequest = (): IRefreshUserTokenRequest => ({
    type: UserActions.REFRESH_USER_TOKEN_REQUEST,
});

export const refreshUserTokenFailure = (error: Error): IRefreshUserTokeFailure => ({
    type: UserActions.REFRESH_USER_TOKEN_FAILURE,
    payload: error,
});

export const checkEmailExistenceRequest = (email: string): ICheckEmailExistenceRequest => ({
    type: UserActions.CHECK_EMAIL_EXISTENCE_REQUEST,
    payload: email,
});

export const checkEmailExistenceSuccess = (emailExists: boolean): ICheckEmailExistenceSuccess => ({
    type: UserActions.CHECK_EMAIL_EXISTENCE_SUCCESS,
    payload: emailExists,
});

export const checkEmailExistenceFailure = (error: Error): ICheckEmailExistenceFailure => ({
    type: UserActions.CHECK_EMAIL_EXISTENCE_FAILURE,
    payload: error,
});

export const resetEmailExistence = (): IResetEmailExistence => ({
    type: UserActions.RESET_EMAIL_EXISTENCE,
});
