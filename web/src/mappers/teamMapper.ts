import { ITeam, ITeamListItem } from '../types/teamTypes';

export function mapToTeamModel(data): ITeam {
    return {
        teamId: data.teamId,
        teamName: data.teamName,
        membersCount: data.membersCount,
        projectId: data.projectId,
        location: data.location,
        users: data.users,
    };
}

export function mapToSimpleTeamModel(data): ITeamListItem {
    return {
        teamId: data.teamId,
        teamName: data.teamName,
    };
}
