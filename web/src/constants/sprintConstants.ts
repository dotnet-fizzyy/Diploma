import { ISprint } from '../types/sprintTypes';

export const InitialSprintState: ISprint = {
    endDate: new Date(),
    epicId: '',
    sprintId: '',
    sprintName: '',
    startDate: new Date(),
};

export const SprintFields = {
    endDate: 'endDate',
    epicId: 'epicId',
    sprintId: 'sprintId',
    sprintName: 'sprintName',
    startDate: 'startDate',
};
