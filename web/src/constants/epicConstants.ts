import { IEpicFormTypes } from '../types/epicTypes';

export const EpicInitialState: IEpicFormTypes = {
    endDate: new Date(),
    epicDescription: '',
    epicId: '',
    epicName: '',
    projectId: '',
    startDate: new Date(),
};

export const EpicFields = {
    endDate: 'endDate',
    epicDescription: 'epicDescription',
    epicId: 'epicId',
    epicName: 'epicName',
    projectId: 'projectId',
    startDate: 'startDate',
};
