import { IWorkSpaceTable, IWorkSpaceTableItem } from '../types/workSpaceTypes';

export const mockedWorkSpaceTableItem: IWorkSpaceTableItem = {
    project: {
        projectId: '12345',
        projectName: 'Scrum board',
    },
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
    customer: {
        userId: '12345',
        userName: 'Dima Yaniuk',
        avatarLink: '',
    },
};

export const mockedWorkSpaceTable: IWorkSpaceTable = {
    items: [mockedWorkSpaceTableItem],
};
