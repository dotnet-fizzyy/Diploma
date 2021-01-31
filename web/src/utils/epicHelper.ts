import { IEpic } from '../types/epicTypes';
import { IFullSprint, ISprint } from '../types/sprintTypes';

export function findCurrentEpic(epics: IEpic[]): IEpic {
    const sortedEpics = epics.sort((a, b) => {
        if (a.startDate < b.startDate) {
            return 1;
        }

        if (a.startDate > b.startDate) {
            return -1;
        }

        return 0;
    });

    return sortedEpics[0];
}

export function mapFullSprintToSprint(fullSprint: IFullSprint): ISprint {
    return {
        sprintId: fullSprint.sprintId,
        epicId: fullSprint.epicId,
        sprintName: fullSprint.sprintName,
        startDate: fullSprint.startDate,
        endDate: fullSprint.endDate,
        progress: fullSprint.progress,
    } as ISprint;
}
