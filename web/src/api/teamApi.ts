import { AxiosResponse } from 'axios';
import { TeamUrls } from '../constants/routeConstants';
import { mapToTeamModel } from '../mappers/teamMapper';
import { mapToWorkSpaceModel } from '../mappers/workSpaceMapper';
import { ITeam, ITeamPage } from '../types/teamTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class TeamApi {
    public static async getUserTeamPage(teamId: string): Promise<ITeamPage> {
        const response: AxiosResponse<ITeamPage> = await AxiosBaseApi.axiosGet(`${TeamUrls.getUserTeamPage}/${teamId}`);

        return { workSpace: mapToWorkSpaceModel(response.data.workSpace), team: mapToTeamModel(response.data.team) };
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
