import { IUser } from '../types/userTypes';

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

export enum UserRole {
    Manager = 'Manager',
    Engineer = 'Engineer',
}

export enum UserPosition {
    ProjectManager = 'Project Manager',
    Lead = 'Lead',
    Developer = 'Developer',
    Qa = 'Qa',
    DevOps = 'DevOps',
    Architecture = 'Architecture',
    Customer = 'Customer',
}
