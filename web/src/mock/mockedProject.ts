import { IProject, IProjectListItem } from '../types/projectTypes';

export const mockedProject: IProject = {
    endDate: new Date(2020, 12, 1),
    projectDescription: 'Diploma project',
    projectId: '12345',
    projectName: 'Scrum board',
    startDate: new Date(2020, 10, 1),
};

export const mockedProjectList: IProjectListItem[] = [
    {
        projectId: '12345',
        projectName: 'Scrum board',
    },
    {
        projectId: '54321',
        projectName: 'Test board',
    },
    {
        projectId: '09876',
        projectName: 'Test project123',
    },
];
