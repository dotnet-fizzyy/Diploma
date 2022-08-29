import { ISprint } from '../types/sprint';

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
