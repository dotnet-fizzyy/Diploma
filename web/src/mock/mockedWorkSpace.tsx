import { IWorkSpacePageProject } from '../types/workSpaceTypes';

export const mockedWorkSpaceTableItem: IWorkSpacePageProject = {
    projectId: '12345',
    projectName: 'Scrum board',
    teams: [
        {
            teamId: '54321',
            teamName: 'Team Team Team',
        },
        {
            teamId: '098765',
            teamName: 'Awesome Team',
        },
    ],
};

export const mockedWorkSpaceTable: IWorkSpacePageProject[] = [mockedWorkSpaceTableItem];
