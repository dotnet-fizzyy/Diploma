import { IJsonPatchBody } from '../types';

export const createTeamRemoveRequestBody = (teamId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/teamId',
        value: teamId,
    },
];
