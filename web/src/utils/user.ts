import { AccessTokenLocalStorageField, RefreshTokenLocalStorageField } from '../constants';
import { ProjectPosition, UserRole } from '../constants/user';
import { IJsonPatchBody } from '../types';
import { ISelectedItem } from '../types/story';
import { IUser } from '../types/user';

export const createUserPositionDropdownItems = (): ISelectedItem[] =>
    Object.entries(ProjectPosition).map(([key, value]) => ({
        key,
        value,
    }));

export const createRequestBodyForUserUpdateLink = (userId: string, avatarLink: string): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/userId',
        value: userId,
    },
    {
        op: 'add',
        path: '/avatarLink',
        value: avatarLink,
    },
];

export const createRequestBodyForUserChangeStatus = (userId: string, isActive: boolean): IJsonPatchBody[] => [
    {
        op: 'add',
        path: '/userId',
        value: userId,
    },
    {
        op: 'add',
        path: '/isActive',
        value: String(isActive),
    },
];

export const createAvailableUsersDropdownItems = (requiredPosition: ProjectPosition, users: IUser[]): ISelectedItem[] =>
    users.reduce(
        (acc, user) =>
            user.userPosition && ProjectPosition[user.userPosition] === requiredPosition
                ? [...acc, { key: user.userId, value: user.userName } as ISelectedItem]
                : acc,
        [{ key: '', value: 'No Owner' } as ISelectedItem]
    );

export const isUserCustomer = (userRole: string, userPosition: string): boolean =>
    UserRole[userRole] === UserRole.Manager && ProjectPosition[userPosition] === ProjectPosition.Customer;

export const isUserProjectManager = (userRole: string, userPosition: string): boolean =>
    UserRole[userRole] === UserRole.Manager && ProjectPosition[userPosition] === ProjectPosition.ProjectManager;

export const setCredentialsToLocalStorage = (accessToken: string, refreshToken: string): void => {
    localStorage.setItem(AccessTokenLocalStorageField, accessToken);
    localStorage.setItem(RefreshTokenLocalStorageField, refreshToken);
};
export const clearCredentialsFromLocalStorage = (): void => {
    localStorage.removeItem(AccessTokenLocalStorageField);
    localStorage.removeItem(RefreshTokenLocalStorageField);
};
