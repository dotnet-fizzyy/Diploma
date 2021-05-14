import { ISelectTabItem } from '../components/header/general-tab/SelectTab';
import { ILoginForm, IProfilePasswordUpdateForm, IRegistrationForm } from '../types/formTypes';

export const BaseRegexExpression: RegExp = /^[- a-zA-Z0-9]*$/;
export const EmailRegexExpression: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const GuidRegexExpression: RegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
export const AccessTokenLocalStorageField: string = 'access_token';
export const RefreshTokenLocalStorageField: string = 'refresh_token';
export const DateFormat: string = 'DD/MM/YYYY';
export const PasswordsAreNotSameErrorMessage: string = 'Passwords are not equal';
export const UnspecifiedValue = 'Unspecified';

export enum TabLinkOptions {
    WORKSPACE = 'Workspace',
    BOARD = 'Board',
    PROJECT = 'Project',
    TEAM = 'Team',
    CHARTS = 'Charts',
}

export const TabLinkItems: ISelectTabItem[] = [
    {
        key: TabLinkOptions.WORKSPACE,
        value: TabLinkOptions.WORKSPACE,
    },
    {
        key: TabLinkOptions.BOARD,
        value: TabLinkOptions.BOARD,
    },
    {
        key: TabLinkOptions.PROJECT,
        value: TabLinkOptions.PROJECT,
    },
    {
        key: TabLinkOptions.TEAM,
        value: TabLinkOptions.TEAM,
    },
    {
        key: TabLinkOptions.CHARTS,
        value: TabLinkOptions.CHARTS,
    },
];

export const LoginFormConstants = {
    name: 'name',
    password: 'password',
};

export const RegistrationFormConstants = {
    name: 'name',
    email: 'email',
    password: 'password',
    repeatedPassword: 'repeatedPassword',
};

export const InitialLoginFormValues: ILoginForm = {
    name: '',
    password: '',
};

export const InitialRegistrationFormValues: IRegistrationForm = {
    name: '',
    email: '',
    password: '',
    repeatedPassword: '',
};

export const InitialProfileUpdatePassword: IProfilePasswordUpdateForm = {
    password: '',
    newPassword: '',
    repeatedPassword: '',
};

export enum StartPageTypes {
    LOGIN = 'LOGIN',
    REGISTRATION = 'REGISTRATION',
}

export enum SidebarTypes {
    STORY_DESCRIPTION = 'STORY_DESCRIPTION',
    STORY_REMOVE = 'STORY_REMOVE',
}
