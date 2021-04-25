export interface IUser {
    userId: string;
    password?: string;
    teamId: string;
    workSpaceId?: string;
    userName: string;
    userRole: UserRole;
    userPosition: UserPosition;
    isActive: boolean;
    avatarLink: string;
    email: string;
    creationDate?: Date;
}

export interface IFullUser extends IUser {
    teams: IUserTeam[];
    projects: IUserProject[];
}

export interface IUserTeam {
    teamId: string;
    teamName: string;
}

export interface IUserProject {
    projectId: string;
    projectName: string;
}

export interface IAuthenticationUser {
    userName: string;
    password: string;
    email?: string;
}

export interface IUpdateUserPassword {
    oldPassword: string;
    newPassword: string;
}

export interface IUserListItem {
    userId: string;
    userName: string;
    avatarLink: string;
}

export enum UserRole {
    ProductOwner = 'Product Owner',
    TeamMaster = 'Team Master',
    Lead = 'Lead',
    Engineer = 'Engineer',
}

export enum UserPosition {
    Developer = 'Developer',
    Qa = 'Qa',
    DevOps = 'DevOps',
    Architecture = 'Architecture',
    Customer = 'Customer',
}
