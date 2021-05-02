import { UserPosition, UserRole } from '../constants/userConstants';
import { IUser, IUserListItem } from '../types/userTypes';

export const mockedUser: IUser = {
    userId: '12345',
    isActive: true,
    email: 'test3@mail.com',
    userName: 'Dima Yaniuk',
    avatarLink: '',
    userPosition: UserPosition.Developer,
    userRole: UserRole.Lead,
    teamId: '',
};

export const mockedUsers: IUser[] = [
    mockedUser,
    {
        userId: '53321',
        isActive: true,
        email: 'test2@mail.com',
        userName: 'Ihar Zalatnik',
        avatarLink: '',
        userPosition: UserPosition.Developer,
        userRole: UserRole.Engineer,
        teamId: '',
    },
    {
        userId: '67890',
        isActive: true,
        email: 'test1@mail.com',
        userName: 'Oleg Ryazin',
        avatarLink: '',
        userPosition: UserPosition.Qa,
        userRole: UserRole.Engineer,
        teamId: '',
    },
    {
        userId: '09876',
        isActive: true,
        email: 'test4@mail.com',
        userName: 'Nikolai Ulasevich',
        avatarLink: '',
        userPosition: UserPosition.Developer,
        userRole: UserRole.TeamMaster,
        teamId: '',
    },
];

export const usersList: IUserListItem[] = [
    {
        userId: '12345',
        userName: 'Dima Yaniuk',
        avatarLink: '',
    },
    {
        userId: '67890',
        userName: 'Oleg Ryazin',
        avatarLink: '',
    },
    {
        userId: '53321',
        userName: 'Ihar Zalatnik',
        avatarLink: '',
    },
    {
        userId: '09876',
        userName: 'Nikolai Ulasevich',
        avatarLink: '',
    },
];
