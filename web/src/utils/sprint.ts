import { IJsonPatchBody } from '../types';
import { ISprint } from '../types/sprint';
import { ISelectedItem } from '../types/story';

export const getSprintNames = (sprints: ISprint[]): ISelectedItem[] =>
    sprints?.map(
        (sprint) =>
            ({
                key: sprint.sprintId,
                value: sprint.sprintName,
            } as ISelectedItem)
    ) ?? [];

export const createSprintRemoveRequestBody = (sprintId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/sprintId',
        value: sprintId,
    },
];
