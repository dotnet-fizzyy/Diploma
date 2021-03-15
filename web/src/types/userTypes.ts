export interface IUser {
    userId: string;
    password?: string;
    teamId: string;
    userName: string;
    userRole: UserRole;
    userPosition: UserPosition;
    isActive: boolean;
    avatarLink: string;
    email: string;
}

export interface IAuthenticationUser {
    userName: string;
    password: string;
    email?: string;
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
