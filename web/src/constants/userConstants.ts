import { IUser, UserPosition, UserRole } from '../types/userTypes';

export const UserInitialState: IUser = {
    avatarLink: '',
    email: '',
    isActive: true,
    userId: '',
    userName: '',
    userPosition: 'Developer' as UserPosition,
    userRole: 'Engineer' as UserRole,
    password: '',
    teamId: '',
};

export const CustomerInitialState: IUser = {
    avatarLink: '',
    email: '',
    isActive: true,
    userId: '',
    userName: '',
    userPosition: 'Customer' as UserPosition,
    userRole: 'ProductOwner' as UserRole,
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

export const passwordUpdateFields = {
    password: 'password',
    newPassword: 'newPassword',
    repeatedPassword: 'repeatedPassword',
};
