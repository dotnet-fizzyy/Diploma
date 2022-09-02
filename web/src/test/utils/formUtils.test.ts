import { BaseRegexExpression } from '../../constants';
import { EmailInputFormFieldValidator, InputFormFieldValidator } from '../../utils/forms';

describe('Form utils tests', () => {
    it('Should validate correct input value with corresponding rules', () => {
        //Arrange
        const validString: string = 'hello world';
        const inputValidator: InputFormFieldValidator = new InputFormFieldValidator(validString, 2, 20, true);

        //Act
        const result: string = inputValidator.validate();

        //Assert
        expect(result).toBeFalsy();
    });

    it('Should validate incorrect input value with corresponding rules', () => {
        //Arrange
        const firstInvalidString: string = 'hello@!#$';
        const firstInputValidator: InputFormFieldValidator = new InputFormFieldValidator(
            firstInvalidString,
            2,
            20,
            true,
            BaseRegexExpression
        );

        const secondInvalidString: string = 'h';
        const secondInputValidator: InputFormFieldValidator = new InputFormFieldValidator(
            secondInvalidString,
            2,
            20,
            true,
            BaseRegexExpression
        );

        //Act
        const firstResult: string = firstInputValidator.validate();
        const secondResult: string = secondInputValidator.validate();

        //Assert
        expect(firstResult).toBeTruthy();
        expect(secondResult).toBeTruthy();
    });

    it('Should validate correct email', () => {
        //Arrange
        const email: string = 'hello@mail.com';
        const emailInputValidator: EmailInputFormFieldValidator = new EmailInputFormFieldValidator(email, true);

        //Act
        const result: string = emailInputValidator.validate();

        //Assert
        expect(result).toBeFalsy();
    });

    it('Should validate incorrect email', () => {
        //Arrange
        const firstInvalidString: string = 'hello@mail';
        const firstInputValidator: EmailInputFormFieldValidator = new EmailInputFormFieldValidator(
            firstInvalidString,
            true
        );

        const secondInvalidString: string = 'h';
        const secondInputValidator: EmailInputFormFieldValidator = new EmailInputFormFieldValidator(
            secondInvalidString,
            true
        );

        //Act
        const firstResult: string = firstInputValidator.validate();
        const secondResult: string = secondInputValidator.validate();

        //Assert
        expect(firstResult).toBeTruthy();
        expect(secondResult).toBeTruthy();
    });
});
