import { getFirstNameLetter } from '../../utils';

describe('Utils general tests', () => {
    it('Should take first letter of string', () => {
        //Arrange
        const expectedResult: string = 'n';

        //Act
        const result: string = getFirstNameLetter('name');

        //Act
        expect(result).toEqual(expectedResult);
    });
});
