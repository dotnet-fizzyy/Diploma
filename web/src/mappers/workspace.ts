import { IWorkSpace } from '../types/workspace';

export const mapToWorkSpaceModel = (data): IWorkSpace => ({
    workSpaceId: data.workSpaceId,
    workSpaceName: data.workSpaceName,
    workSpaceDescription: data.workSpaceDescription,
    creationDate: new Date(data.creationDate),
});
