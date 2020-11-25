import { IUser, UserPosition, UserRole } from '../types/userTypes';

export const mockedUser: IUser = {
    userId: 'Dima',
    isActive: true,
    email: 'test3@mail.com',
    userName: 'Dima Yaniuk',
    avatarLink: '',
    userPosition: UserPosition.Developer,
    userRole: UserRole.Lead,
};
