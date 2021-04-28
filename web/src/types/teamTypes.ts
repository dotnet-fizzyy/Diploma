import { IUser } from './userTypes';
import { IWorkSpace } from './workSpaceTypes';

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

export interface ITeamSimpleModel extends IBaseTeam {}

export interface ITeamPage {
    workSpace: IWorkSpace;
    team: ITeam;
}
