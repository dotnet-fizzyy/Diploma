import { IWorkSpace } from '../types/workspace';

export function mapToWorkSpaceModel(data: any): IWorkSpace {
    return {
        workSpaceId: data.workSpaceId,
        workSpaceName: data.workSpaceName,
        workSpaceDescription: data.workSpaceDescription,
        creationDate: new Date(data.creationDate),
    };
}
