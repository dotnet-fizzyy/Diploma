import { UserPosition } from '../../constants/user';
import mockedStories from '../../mock/mockedStories';
import { mockedUsers } from '../../mock/mockedUser';
import { ISelectedItem, IStory } from '../../types/story';
import { getFirstNameLetter, validateGuid } from '../../utils';
import { areStoriesEqual } from '../../utils/story';
import { createAvailableUsersDropdownItems } from '../../utils/user';

describe('Utils general tests', () => {
    it('Should take first letter of string', () => {
        //Arrange
        const expectedResult: string = 'n';

        //Act
        const result: string = getFirstNameLetter('name');

        //Act
        expect(result).toEqual(expectedResult);
    });

    it('Should validate strings for GUID', () => {
        //Arrange
        const validGuid: string = '29d3cf56-1e19-4e57-bd52-d30e92245f79';
        const firstInvalidGuid: string = '123_321';
        const secondInvalidGuid: string = '29d3cf56-1e19-4e57-bd52-d30e92245f';

        //Act
        const validResult: boolean = validateGuid(validGuid);
        const firstInvalidResult: boolean = validateGuid(firstInvalidGuid);
        const secondInvalidResult: boolean = validateGuid(secondInvalidGuid);

        //Assert
        expect(validResult).toBeTruthy();
        expect(firstInvalidResult).toBeFalsy();
        expect(secondInvalidResult).toBeFalsy();
    });

    it('Should create new users dropdown list depends on required position', () => {
        //Arrange & Act
        const result: ISelectedItem[] = createAvailableUsersDropdownItems(UserPosition.Developer, mockedUsers);

        //Assert
        expect(result).toEqual([
            {
                key: '',
                value: 'No Owner',
            },
            {
                key: '12345',
                value: 'Dima Yaniuk',
            },
            {
                key: '53321',
                value: 'Ihar Zalatnik',
            },
        ]);
    });

    it('Should confirm that stories are equal', () => {
        //Arrange
        const firstStory: IStory = mockedStories[0];
        const secondStory: IStory = mockedStories[0];

        //Act
        const result = areStoriesEqual(firstStory, secondStory);

        //Assert
        expect(result).toBeTruthy();
    });

    it('Should confirm that stories are not equal', () => {
        //Arrange
        const firstStory: IStory = mockedStories[0];
        const secondStory: IStory = mockedStories[1];

        //Act
        const result = areStoriesEqual(firstStory, secondStory);

        //Assert
        expect(result).toBeFalsy();
    });
});
