import { AxiosResponse } from 'axios';
import { TeamUrls } from '../constants/routeConstants';
import { mapToTeamModel } from '../mappers/teamMapper';
import { mapToWorkSpaceModel } from '../mappers/workSpaceMapper';
import { ITeam, ITeamPage } from '../types/teamTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class TeamApi {
    public static async getUserTeamPage(teamId: string): Promise<ITeamPage> {
        const response: AxiosResponse<ITeamPage> = await AxiosBaseApi.get(`${TeamUrls.getUserTeamPage}/${teamId}`);

        return { workSpace: mapToWorkSpaceModel(response.data.workSpace), team: mapToTeamModel(response.data.team) };
    }

    public static async createTeam(team: ITeam): Promise<ITeam> {
        const mappedTeam = {
            teamName: team.teamName,
            location: team.location,
            projectId: team.projectId,
        };

        const response: AxiosResponse<ITeam> = await AxiosBaseApi.post(TeamUrls.createTeam, mappedTeam);

        return mapToTeamModel(response.data);
    }

    public static async updateTeam(team: ITeam): Promise<ITeam> {
        const mappedTeam = {
            teamId: team.teamId,
            teamName: team.teamName,
            location: team.location,
            projectId: team.projectId,
            creationDate: new Date(team.creationDate),
        };

        const response: AxiosResponse<ITeam> = await AxiosBaseApi.put(TeamUrls.updateTeam, mappedTeam);

        return mapToTeamModel(response.data);
    }
}
