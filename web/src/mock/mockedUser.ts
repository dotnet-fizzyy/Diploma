import { IUser, UserPosition, UserRole } from '../types/userTypes';

const mockedUser: IUser = {
    userId: 'Dima',
    isActive: true,
    email: 'test3@mail.com',
    userName: 'Dima Yaniuk',
    avatarLink: '',
    userPosition: UserPosition.Developer,
    userRole: UserRole.Lead,
};

export default mockedUser;
