import { AxiosResponse } from 'axios';
import { WorkSpaceUrls } from '../constants/routeConstants';
import { mapToProjectSimpleModel } from '../mappers/projectMapper';
import { mapToSimpleTeamModel } from '../mappers/teamMapper';
import { mapToWorkSpaceModel } from '../mappers/workSpaceMapper';
import { ISearchResults, IWorkSpace, IWorkSpacePage } from '../types/workSpaceTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class WorkSpaceApi {
    public static async getUserWorkSpace(): Promise<IWorkSpacePage> {
        const response: AxiosResponse<IWorkSpacePage> = await AxiosBaseApi.get(WorkSpaceUrls.workSpacePage);

        return response.data;
    }

    public static async createWorkSpace(workSpace: IWorkSpace): Promise<IWorkSpace> {
        const mappedWorkSpace = {
            workSpaceName: workSpace.workSpaceName,
            workSpaceDescription: workSpace.workSpaceDescription,
        };

        const response: AxiosResponse<IWorkSpace> = await AxiosBaseApi.post(
            WorkSpaceUrls.createWorkSpace,
            mappedWorkSpace
        );

        return mapToWorkSpaceModel(response.data);
    }

    public static async updateWorkSpace(workSpace: IWorkSpace): Promise<IWorkSpace> {
        const response: AxiosResponse<IWorkSpace> = await AxiosBaseApi.put(WorkSpaceUrls.updateWorkSpace, workSpace);

        return mapToWorkSpaceModel(response.data);
    }

    public static async getWorkSpaceItemsBySearchTerm(searchTerm: string, teamIds: string[]): Promise<ISearchResults> {
        const response: AxiosResponse<ISearchResults> = await AxiosBaseApi.get(
            `${WorkSpaceUrls.getSearchItems}?term=${searchTerm}&teamIds=${teamIds.join('&teamIds=')}`
        );

        return WorkSpaceApi.mapSearchResultItems(response.data);
    }

    private static mapSearchResultItems(data): ISearchResults {
        return {
            projects: data.projects && data.projects.length ? data.projects.map(mapToProjectSimpleModel) : [],
            teams: data.teams && data.teams.length ? data.teams.map(mapToSimpleTeamModel) : [],
        };
    }
}
