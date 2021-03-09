import { BaseRegexExpression, EmailRegexExpression } from '../constants';

abstract class FormFieldValidator {
    protected readonly _value: string;
    protected readonly _required?: boolean;

    protected constructor(value: string, required?: boolean) {
        this._value = value;
        this._required = required ? required : true;
    }

    protected validateBase(): string {
        let error: string = '';

        if (this._required && !this._value) {
            error = 'This field is required';

            return error;
        }

        return error;
    }

    protected abstract validate(): string;
}

export class InputFormFieldValidator extends FormFieldValidator {
    private readonly _minLength: number;
    private readonly _maxLength: number;
    private readonly _regex: string | RegExp;

    public constructor(
        value: string,
        minLength?: number,
        maxLength?: number,
        required?: boolean,
        regex?: string | RegExp
    ) {
        super(value, required);

        this._minLength = minLength;
        this._maxLength = maxLength;
        this._regex = regex;
    }

    public validate(): string {
        let error: string = super.validateBase();

        if (error) {
            return error;
        }

        if (this._regex && !RegExp(BaseRegexExpression).test(this._value)) {
            error = 'This field contains prohibited symbols';

            return error;
        }

        if (this._minLength && this._value.length < this._minLength) {
            error = `The min length of this field is ${this._minLength} symbols`;

            return error;
        }

        if (this._maxLength && this._value.length > this._maxLength) {
            error = `The max length of this field is ${this._maxLength} symbols`;

            return error;
        }

        return error;
    }
}

export class EmailInputFormFieldValidator extends FormFieldValidator {
    public constructor(value: string, required?: boolean) {
        super(value, required);
    }

    public validate(): string {
        let error: string = super.validateBase();

        if (!RegExp(EmailRegexExpression).test(this._value)) {
            error = 'Incorrect email format';

            return error;
        }

        return error;
    }
}
