import { AccessTokenLocalStorageField, GuidRegexExpression, RefreshTokenLocalStorageField } from '../constants';
import { UserPosition, UserRole } from '../constants/userConstants';
import { IJsonPatchBody } from '../types';

export function setCredentialsToLocalStorage(accessToken: string, refreshToken: string): void {
    localStorage.setItem(AccessTokenLocalStorageField, accessToken);
    localStorage.setItem(RefreshTokenLocalStorageField, refreshToken);
}

export function clearCredentialsFromLocalStorage(): void {
    localStorage.removeItem(AccessTokenLocalStorageField);
    localStorage.removeItem(RefreshTokenLocalStorageField);
}

export function getFirstNameLetter(userName: string): string {
    return userName ? userName.slice(0, 1) : '';
}

export const validateGuid = (value: string): boolean => GuidRegexExpression.test(value);

export const isUserCustomer = (userRole: string, userPosition: string): boolean =>
    UserRole[userRole] === UserRole.Manager && UserPosition[userPosition] === UserPosition.Customer;

export const isUserProjectManager = (userRole: string, userPosition: string): boolean =>
    UserRole[userRole] === UserRole.Manager && UserPosition[userPosition] === UserPosition.ProjectManager;

export const createEpicRemoveRequestBody = (epicId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/epicId',
        value: epicId,
    },
];

export const createSprintRemoveRequestBody = (sprintId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/sprintId',
        value: sprintId,
    },
];

export const createTeamRemoveRequestBody = (teamId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/teamId',
        value: teamId,
    },
];

export const createProjectRemoveRequestBody = (projectId: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/projectId',
        value: projectId,
    },
];
