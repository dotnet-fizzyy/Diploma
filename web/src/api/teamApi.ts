import { AxiosResponse } from 'axios';
import { TeamUrls } from '../constants/routeConstants';
import { mapToTeamModel } from '../mappers/teamMapper';
import { ITeam } from '../types/teamTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class TeamApi {
    public static async getUserTeamPage(teamId: string): Promise<ITeam> {
        const response: AxiosResponse<ITeam> = await AxiosBaseApi.axiosGet(`${TeamUrls.getUserTeamPage}/${teamId}`);

        return mapToTeamModel(response);
    }

    public static async createTeam(team: ITeam): Promise<ITeam> {
        const mappedTeam = {
            teamName: team.teamName,
            location: team.location,
            projectId: team.projectId,
        };

        const response: AxiosResponse<ITeam> = await AxiosBaseApi.axiosPost(TeamUrls.createTeam, mappedTeam);

        return mapToTeamModel(response.data);
    }
}
