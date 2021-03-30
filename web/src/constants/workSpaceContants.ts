import { IWorkSpaceForm } from '../types/formTypes';

export const InitialWorkSpaceFormValues: IWorkSpaceForm = {
    workSpaceId: '',
    workSpaceName: '',
    workSpaceDescription: '',
    creationDate: new Date(),
};

export const WorkSpaceFields = {
    workSpaceId: 'workSpaceId',
    workSpaceName: 'workSpaceName',
    workSpaceDescription: 'workSpaceDescription',
};
