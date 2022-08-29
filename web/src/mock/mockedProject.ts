import { IProject, IProjectSimpleModel } from '../types/project';

export const mockedProject: IProject = {
    endDate: new Date(2020, 12, 1),
    projectDescription: 'Diploma project',
    projectId: '12345',
    projectName: 'Scrum board',
    startDate: new Date(2020, 10, 1),
};

export const mockedProjectList: IProjectSimpleModel[] = [
    {
        projectId: '12345',
        projectName: 'Scrum board',
        startDate: new Date(),
        endDate: new Date(),
    },
    {
        projectId: '54321',
        projectName: 'Test board',
        startDate: new Date(),
        endDate: new Date(),
    },
    {
        projectId: '09876',
        projectName: 'Test project123',
        startDate: new Date(),
        endDate: new Date(),
    },
];
