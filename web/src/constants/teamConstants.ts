import { ITeam } from '../types/teamTypes';

export const initialTeamState: ITeam = {
    membersCount: 0,
    teamId: '',
    teamName: '',
    users: [],
    location: '',
    projectId: null,
};

export const teamStateFields = {
    teamName: 'teamName',
    membersCount: 'membersCount',
    teamId: 'teamId',
    location: 'location',
    projectId: 'projectId',
};
