import { ISprint } from '../types/sprintTypes';

export function mapToSprintModel(data): ISprint {
    return {
        sprintId: data.sprint,
        epicId: data.epicId,
        sprintName: data.sprintName,
        startDate: data.startDate,
        endDate: data.endDate,
    };
}
