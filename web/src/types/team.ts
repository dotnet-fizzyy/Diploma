import { IUser } from './user';
import { IWorkSpace } from './workspace';

interface IBaseTeam {
    teamId: string;
    teamName: string;
    creationDate?: Date;
    location: string;
}

export interface ITeam extends IBaseTeam {
    users: IUser[];
    projectId?: string;
    membersCount: number;
}

export interface ITeamSimpleModel extends IBaseTeam {}

export interface ITeamPage {
    workSpace: IWorkSpace;
    team: ITeam;
}
