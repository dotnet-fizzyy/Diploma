import { ISprint } from '../types/sprintTypes';

export const initialSprintState: ISprint = {
    endDate: new Date(),
    epicId: '',
    progress: 0,
    sprintId: '',
    sprintName: '',
    startDate: new Date(),
};

export const sprintFields = {
    endDate: 'endDate',
    epicId: 'epicId',
    progress: 'progress',
    sprintId: 'sprintId',
    sprintName: 'sprintName',
    startDate: 'startDate',
};
