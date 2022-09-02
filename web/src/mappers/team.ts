import { ITeam, ITeamSimpleModel } from '../types/team';

export const mapToTeamModel = (data): ITeam => ({
    teamId: data.teamId,
    teamName: data.teamName,
    membersCount: data.membersCount,
    projectId: data.projectId,
    location: data.location,
    users: data.users,
    creationDate: new Date(data.creationDate),
});

export const mapToSimpleTeamModel = (data): ITeamSimpleModel => ({
    teamId: data.teamId,
    teamName: data.teamName,
    location: data.location,
});
