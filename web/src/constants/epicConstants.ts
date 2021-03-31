import { IEpic } from '../types/epicTypes';

export const epicInitialState: IEpic = {
    endDate: new Date(),
    epicDescription: '',
    epicId: '',
    epicName: '',
    projectId: '',
    startDate: new Date(),
};

export const epicFields = {
    endDate: 'endDate',
    epicDescription: 'epicDescription',
    epicId: 'epicId',
    epicName: 'epicName',
    projectId: 'projectId',
    startDate: 'startDate',
};
