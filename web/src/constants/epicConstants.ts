import { IEpic } from '../types/epicTypes';

export const epicInitialState: IEpic = {
    endDate: new Date(),
    epicDescription: '',
    epicId: '',
    epicName: '',
    progress: 0,
    projectId: '',
    startDate: new Date(),
};

export const epicFields = {
    endDate: 'endDate',
    epicDescription: 'epicDescription',
    epicId: 'epicId',
    epicName: 'epicName',
    progress: 'progress',
    projectId: 'projectId',
    startDate: 'startDate',
};
