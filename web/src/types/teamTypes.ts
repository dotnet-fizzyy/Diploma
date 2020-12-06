import { IUser } from './userTypes';

export interface ITeam {
    users: IUser[];
    projectId?: string;
    teamId: string;
    teamName: string;
    location: string;
    membersCount: number;
}
