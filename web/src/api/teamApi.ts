import { AxiosResponse } from 'axios';
import * as routeConstants from '../constants/routeConstants';
import { ICollectionResponse } from '../types';
import { ITeam } from '../types/teamTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class TeamApi {
    public static async getTeams(): Promise<ITeam[]> {
        const response: AxiosResponse<ICollectionResponse<ITeam>> = await AxiosBaseApi.axiosGet(
            routeConstants.TeamUrls.getUserTeams
        );

        return response.data.items.map(TeamApi.mapToModel);
    }

    public static async createTeam(team: ITeam): Promise<ITeam> {
        const mappedTeam = {
            teamName: team.teamName,
            location: team.location,
            projectId: team.projectId,
        };

        const response: AxiosResponse<ITeam> = await AxiosBaseApi.axiosPost(
            routeConstants.CustomerUrls.createTeam,
            mappedTeam
        );

        return TeamApi.mapToModel(response.data);
    }

    private static mapToModel(data): ITeam {
        return {
            teamId: data.teamId,
            teamName: data.teamName,
            membersCount: data.membersCount,
            projectId: data.projectId,
            location: data.location,
            users: data.users,
        };
    }
}
