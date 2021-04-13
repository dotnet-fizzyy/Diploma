import { IUser } from './userTypes';

interface IBaseTeam {
    teamId: string;
    teamName: string;
    creationDate?: Date;
}

export interface ITeam extends IBaseTeam {
    users: IUser[];
    projectId?: string;
    location: string;
    membersCount: number;
}

export interface ITeamListItem extends IBaseTeam {}
