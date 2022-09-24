import { BaseRegexExpression } from '../../constants';
import { validateEmailInputFormField, validateInputFormField } from '../../utils/forms';

describe('Form utils tests', () => {
    it('Should validate correct input value with corresponding rules', () => {
        //Arrange
        const value = 'hello world';
        const isRequired = true;
        const minLength = 2;
        const maxLength = 20;

        //Act
        const result = validateInputFormField(value, isRequired, minLength, maxLength);

        //Assert
        expect(result).toBe('');
    });

    it.each([{ value: 'hello@!#$' }, { value: 'h' }, { value: null }, { value: undefined }])(
        'Should validate incorrect input value with corresponding rules',
        ({ value }) => {
            //Arrange
            const isRequired = true;
            const minLength = 2;
            const maxLength = 20;

            //Act
            const result = validateInputFormField(value, isRequired, minLength, maxLength, BaseRegexExpression);

            //Assert
            expect(result).toBeTruthy();
        }
    );

    it('Should validate correct email', () => {
        //Arrange
        const email = 'hello@mail.com';
        const isRequired = true;

        //Act
        const result = validateEmailInputFormField(email, isRequired);

        //Assert
        expect(result).toBeFalsy();
    });

    it.each([{ value: null }, { value: 'hello@mail' }, { value: 'h' }])(
        'Should validate incorrect email',
        ({ value }) => {
            //Arrange
            const isRequired = true;

            //Act
            const result = validateEmailInputFormField(value, isRequired);

            //Assert
            expect(result).toBeTruthy();
        }
    );
});
