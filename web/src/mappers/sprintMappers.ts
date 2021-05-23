import { IFullSprint, ISprint } from '../types/sprintTypes';

export function mapToSprintModel(data): ISprint {
    return {
        sprintId: data.sprintId,
        epicId: data.epicId,
        sprintName: data.sprintName,
        startDate: data.startDate,
        endDate: data.endDate,
        creationDate: data.creationDate,
    };
}

export function mapFullSprintToSprint(fullSprint: IFullSprint): ISprint {
    return {
        sprintId: fullSprint.sprintId,
        epicId: fullSprint.epicId,
        sprintName: fullSprint.sprintName,
        startDate: fullSprint.startDate,
        endDate: fullSprint.endDate,
        creationDate: fullSprint.creationDate,
    } as ISprint;
}
