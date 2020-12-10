import { IUser, UserPosition, UserRole } from '../types/userTypes';

export const userInitialState: IUser = {
    avatarLink: '',
    email: '',
    isActive: true,
    userId: '',
    userName: '',
    userPosition: UserPosition.Developer,
    userRole: UserRole.Engineer,
    password: '',
    teamId: '',
};

export const userFields = {
    avatarLink: 'avatarLink',
    email: 'email',
    isActive: 'isActive',
    userId: 'userId',
    userName: 'userName',
    userPosition: 'userPosition',
    userRole: 'userRole',
    password: 'password',
};
