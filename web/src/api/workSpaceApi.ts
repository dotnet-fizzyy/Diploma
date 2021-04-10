import { AxiosResponse } from 'axios';
import { WorkSpaceUrls } from '../constants/routeConstants';
import { IWorkSpace, IWorkSpacePage } from '../types/workSpaceTypes';
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

        return WorkSpaceApi.mapToModel(response.data);
    }

    public static async updateWorkSpace(workSpace: IWorkSpace): Promise<IWorkSpace> {
        const response: AxiosResponse<IWorkSpace> = await AxiosBaseApi.axiosPut(
            WorkSpaceUrls.updateWorkSpace,
            workSpace
        );

        return WorkSpaceApi.mapToModel(response.data);
    }

    private static mapToModel(data: any): IWorkSpace {
        return {
            workSpaceId: data.workSpaceId,
            workSpaceName: data.workSpaceName,
            workSpaceDescription: data.workSpaceDescription,
            creationDate: data.creationDate,
        };
    }
}
