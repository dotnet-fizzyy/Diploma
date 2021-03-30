import { WorkSpaceUrls } from '../constants/routeConstants';
import { IWorkSpace } from '../types/workSpaceTypes';
import { axiosGet, axiosPost } from './axiosBaseApi';

export default class WorkSpaceApi {
    public static async getUserWorkSpace(): Promise<IWorkSpace> {
        const response = await axiosGet(WorkSpaceUrls.userWorkSpace);

        return WorkSpaceApi.mapToModel(response.data);
    }

    public static async createWorkSpace(workSpace: IWorkSpace): Promise<IWorkSpace> {
        const mappedWorkSpace = {
            workSpaceName: workSpace.workSpaceName,
            workSpaceDescription: workSpace.workSpaceDescription,
        };

        const response = await axiosPost(WorkSpaceUrls.createWorkSpace, mappedWorkSpace);

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
