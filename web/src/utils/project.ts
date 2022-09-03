import { IJsonPatchBody } from '../types';

export const createProjectRemoveRequestBody = (projectId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/projectId',
        value: projectId,
    },
];
