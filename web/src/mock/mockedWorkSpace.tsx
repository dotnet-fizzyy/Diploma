import { IWorkSpacePageProject } from '../types/workspace';

export const mockedWorkSpaceTableItem: IWorkSpacePageProject = {
    projectId: '12345',
    projectName: 'Scrum board',
    startDate: new Date(),
    endDate: new Date(),
    teams: [
        {
            teamId: '54321',
            teamName: 'Team Team Team',
            location: 'Minsk',
        },
        {
            teamId: '098765',
            teamName: 'Awesome Team',
            location: 'Minsk',
        },
    ],
};

export const mockedWorkSpaceTable: IWorkSpacePageProject[] = [mockedWorkSpaceTableItem];
