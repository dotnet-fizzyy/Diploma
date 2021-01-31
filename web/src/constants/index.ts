import { ILoginForm, IRegistrationForm } from '../types/formTypes';

export const BaseRegexExpression: string = '[A-Za-z-,.!?:_@ ][A-Za-z0-9-,.!?:_@ ]*';

export const LoginFormConstants = {
    name: 'name',
    password: 'password',
};

export const RegistrationFormConstants = {
    name: 'name',
    password: 'password',
    repeatedPassword: 'repeatedPassword',
};

export const InitialLoginFormValues: ILoginForm = {
    name: '',
    password: '',
};

export const InitialRegistrationFormValues: IRegistrationForm = {
    name: '',
    password: '',
    repeatedPassword: '',
};
