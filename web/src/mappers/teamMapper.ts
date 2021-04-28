import { ITeam, ITeamSimpleModel } from '../types/teamTypes';

export function mapToTeamModel(data: any): ITeam {
    return {
        teamId: data.teamId,
        teamName: data.teamName,
        membersCount: data.membersCount,
        projectId: data.projectId,
        location: data.location,
        users: data.users,
        creationDate: new Date(data.creationDate),
    };
}

export function mapToSimpleTeamModel(data: any): ITeamSimpleModel {
    return {
        teamId: data.teamId,
        teamName: data.teamName,
    };
}
