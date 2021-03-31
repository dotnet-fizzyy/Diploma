import { ISprint } from '../types/sprintTypes';

export const initialSprintState: ISprint = {
    endDate: new Date(),
    epicId: '',
    sprintId: '',
    sprintName: '',
    startDate: new Date(),
};

export const sprintFields = {
    endDate: 'endDate',
    epicId: 'epicId',
    sprintId: 'sprintId',
    sprintName: 'sprintName',
    startDate: 'startDate',
};
