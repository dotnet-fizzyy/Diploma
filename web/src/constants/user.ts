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

export enum ProjectPosition {
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
    userPosition: ProjectPosition.Developer,
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
    userPosition: ProjectPosition.ProjectManager,
    userRole: UserRole.Manager,
    password: '',
    teamId: '',
};

export const UserPositionRoleMap: Record<ProjectPosition, UserRole> = {
    [ProjectPosition.Developer]: UserRole.Engineer,
    [ProjectPosition.DevOps]: UserRole.Engineer,
    [ProjectPosition.Architecture]: UserRole.Engineer,
    [ProjectPosition.Qa]: UserRole.Engineer,
    [ProjectPosition.TeamLead]: UserRole.Engineer,
    [ProjectPosition.ProjectManager]: UserRole.Manager,
    [ProjectPosition.Customer]: UserRole.Manager,
};
