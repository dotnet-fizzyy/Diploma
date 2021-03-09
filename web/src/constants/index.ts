import { ILoginForm, IRegistrationForm } from '../types/formTypes';

export const BaseRegexExpression: string = '^[- a-zA-Z0-9]*$';
export const EmailRegexExpression: RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

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
