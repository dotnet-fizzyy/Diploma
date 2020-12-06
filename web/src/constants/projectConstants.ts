import { IProject } from '../types/projectTypes';

export const initialProjectState: IProject = {
    endDate: new Date(),
    startDate: new Date(),
    projectDescription: '',
    projectId: '',
    projectName: '',
    customer: null,
};

export const projectFields = {
    projectDescription: 'projectDescription',
    projectId: 'projectId',
    projectName: 'projectName',
    startDate: 'startDate',
    endDate: 'endDate',
};
