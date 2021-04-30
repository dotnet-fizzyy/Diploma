import { ISprint } from '../types/sprintTypes';

export function mapToSprintModel(data): ISprint {
    return {
        sprintId: data.sprintId,
        epicId: data.epicId,
        sprintName: data.sprintName,
        startDate: data.startDate,
        endDate: data.endDate,
    };
}
