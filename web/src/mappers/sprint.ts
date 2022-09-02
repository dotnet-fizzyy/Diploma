import { IFullSprint, ISprint } from '../types/sprint';

export const mapToSprintModel = (data): ISprint => ({
    sprintId: data.sprintId,
    epicId: data.epicId,
    sprintName: data.sprintName,
    startDate: data.startDate,
    endDate: data.endDate,
    creationDate: data.creationDate,
});

export const mapFullSprintToSprint = (fullSprint: IFullSprint): ISprint => ({
    sprintId: fullSprint.sprintId,
    epicId: fullSprint.epicId,
    sprintName: fullSprint.sprintName,
    startDate: fullSprint.startDate,
    endDate: fullSprint.endDate,
    creationDate: fullSprint.creationDate,
});
