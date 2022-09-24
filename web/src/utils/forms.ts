import { BaseRegexExpression, EmailRegexExpression } from '../constants';
import { isEmpty, isNotEmpty, matchesRegex } from './index';

const validateEmptyInputFormField = (value: string, isRequired?: boolean): string => {
    let error: string = '';

    if (isRequired && isEmpty(value)) {
        error = 'This field is required';

        return error;
    }

    return error;
};

export const validateInputFormField = (
    value: string,
    isRequired?: boolean,
    minLength?: number,
    maxLength?: number,
    regex?: string | RegExp
): string => {
    let error: string = validateEmptyInputFormField(value, isRequired);

    if (isNotEmpty(error)) {
        return error;
    }

    if (isNotEmpty(regex) && !matchesRegex(value, BaseRegexExpression)) {
        error = 'This field contains prohibited symbols';

        return error;
    }

    if (isNotEmpty(minLength) && value.length < minLength) {
        error = `The min length of this field is ${minLength} symbols`;

        return error;
    }

    if (isNotEmpty(maxLength) && value.length > maxLength) {
        error = `The max length of this field is ${maxLength} symbols`;

        return error;
    }

    return error;
};

export const validateEmailInputFormField = (value: string, isRequired?: boolean) => {
    let error: string = validateEmptyInputFormField(value, isRequired);

    if (error) {
        return error;
    }

    if (!matchesRegex(value, EmailRegexExpression)) {
        error = 'Incorrect email format';

        return error;
    }

    return error;
};
