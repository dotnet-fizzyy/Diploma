import { IUser } from '../types/user';

export const ManagerRoleRequiredMessage: string = 'Only manager can edit this message';

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
    TeamLead = 'TeamLead',
    Developer = 'Developer',
    Qa = 'Qa',
    DevOps = 'DevOps',
    Architecture = 'Architecture',
    Customer = 'Customer',
}

export const UserInitialState: IUser = {
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

export const CustomerInitialState: IUser = {
    avatarLink: '',
    email: '',
    isActive: true,
    userId: '',
    userName: '',
    userPosition: UserPosition.ProjectManager,
    userRole: UserRole.Manager,
    password: '',
    teamId: '',
};

export const UserPositionRoleMap: Record<UserPosition, UserRole> = {
    [UserPosition.Developer]: UserRole.Engineer,
    [UserPosition.DevOps]: UserRole.Engineer,
    [UserPosition.Architecture]: UserRole.Engineer,
    [UserPosition.Qa]: UserRole.Engineer,
    [UserPosition.TeamLead]: UserRole.Engineer,
    [UserPosition.ProjectManager]: UserRole.Manager,
    [UserPosition.Customer]: UserRole.Manager,
};
