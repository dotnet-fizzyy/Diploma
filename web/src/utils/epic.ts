import { IJsonPatchBody } from '../types';

export const createEpicRemoveRequestBody = (epicId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/epicId',
        value: epicId,
    },
];
