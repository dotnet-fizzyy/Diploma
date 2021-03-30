import * as routeConstants from '../constants/routeConstants';
import { ITeam } from '../types/teamTypes';
import * as axios from './index';

export async function createTeam(team: ITeam) {
    const mappedTeam = {
        teamName: team.teamName,
        location: team.location,
        projectId: team.projectId,
    };

    const response = await axios.axiosPost(routeConstants.CustomerUrls.createTeam, mappedTeam);

    return response.data;
}

export async function getTeams() {
    const response = await axios.axiosGet(routeConstants.TeamUrls.getUserTeams);

    return response.data;
}
