import { AxiosResponse } from 'axios';
import { WorkSpaceUrls } from '../constants/routeConstants';
import { mapToStorySimpleModel } from '../mappers/storyMappers';
import { mapToSimpleUserModel } from '../mappers/userMapper';
import { mapToWorkSpaceModel } from '../mappers/workSpaceMapper';
import { ISearchResults, IWorkSpace, IWorkSpacePage } from '../types/workSpaceTypes';
import AxiosBaseApi from './axiosBaseApi';

export default class WorkSpaceApi {
    public static async getUserWorkSpace(): Promise<IWorkSpacePage> {
        const response: AxiosResponse<IWorkSpacePage> = await AxiosBaseApi.axiosGet(WorkSpaceUrls.workSpacePage);

        return response.data;
    }

    public static async createWorkSpace(workSpace: IWorkSpace): Promise<IWorkSpace> {
        const mappedWorkSpace = {
            workSpaceName: workSpace.workSpaceName,
            workSpaceDescription: workSpace.workSpaceDescription,
        };

        const response: AxiosResponse<IWorkSpace> = await AxiosBaseApi.axiosPost(
            WorkSpaceUrls.createWorkSpace,
            mappedWorkSpace
        );

        return mapToWorkSpaceModel(response.data);
    }

    public static async updateWorkSpace(workSpace: IWorkSpace): Promise<IWorkSpace> {
        const response: AxiosResponse<IWorkSpace> = await AxiosBaseApi.axiosPut(
            WorkSpaceUrls.updateWorkSpace,
            workSpace
        );

        return mapToWorkSpaceModel(response.data);
    }

    public static async getWorkSpaceItemsBySearchTerm(searchTerm: string, teamIds: string[]): Promise<ISearchResults> {
        const response: AxiosResponse<ISearchResults> = await AxiosBaseApi.axiosGet(
            `${WorkSpaceUrls.getSearchItems}?term=${searchTerm}&teamIds=${teamIds.join('&teamIds=')}`
        );

        return WorkSpaceApi.mapSearchResultItems(response.data);
    }

    private static mapSearchResultItems(data): ISearchResults {
        return {
            users: data.users && data.users.length ? data.users.map(mapToSimpleUserModel) : [],
            stories: data.stories && data.stories.length ? data.stories.map(mapToStorySimpleModel) : [],
        };
    }
}
