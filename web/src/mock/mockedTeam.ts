import { ITeam } from '../types/teamTypes';
import { IUser, UserPosition, UserRole } from '../types/userTypes';

const mockedTeam: ITeam = {
    location: 'Minsk',
    membersCount: 5,
    teamId: 'testId',
    teamName: 'Team-Flex',
    users: [
        {
            userId: 'Oleg',
            isActive: true,
            email: 'test@mail.com',
            userName: 'Oleg Ryazin',
            avatarLink: '',
            userPosition: UserPosition.Developer,
            userRole: UserRole.Engineer,
        } as IUser,
        {
            userId: 'Igor',
            isActive: true,
            email: 'test2@mail.com',
            userName: 'Oleg Ryazin',
            avatarLink: '',
            userPosition: UserPosition.Qa,
            userRole: UserRole.Engineer,
        } as IUser,
        {
            userId: 'Dima',
            isActive: true,
            email: 'test3@mail.com',
            userName: 'Dima Yaniuk',
            avatarLink: '',
            userPosition: UserPosition.Developer,
            userRole: UserRole.Lead,
        } as IUser,
        {
            userId: 'Kolya',
            isActive: true,
            email: 'test4@mail.com',
            userName: 'Nikolai Ulasevich',
            avatarLink: '',
            userPosition: UserPosition.Architecture,
            userRole: UserRole.Engineer,
        } as IUser,
    ],
};

export default mockedTeam;
