import { IProject } from '../types/projectTypes';

export const ProjectLengthDescriptionMaxLength: number = 250;

export const initialProjectFormValues: IProject = {
    endDate: new Date(),
    startDate: new Date(),
    projectDescription: '',
    projectId: '',
    projectName: '',
};

export const projectFields = {
    projectDescription: 'projectDescription',
    projectId: 'projectId',
    projectName: 'projectName',
    startDate: 'startDate',
    endDate: 'endDate',
};
