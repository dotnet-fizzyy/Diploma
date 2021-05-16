import { UserPosition, UserRole } from '../constants/userConstants';
import { IJsonPatchBody } from '../types';
import { ISelectedItem } from '../types/storyTypes';
import { IUser } from '../types/userTypes';

export function createUserRoleDropdownItems(): ISelectedItem[] {
    return Object.entries(UserRole).map((x) => {
        return {
            key: x[0],
            value: x[1],
        } as ISelectedItem;
    });
}

export function createUserPositionDropdownItems(): ISelectedItem[] {
    return Object.entries(UserPosition).map((x) => {
        return {
            key: x[0],
            value: x[1],
        } as ISelectedItem;
    });
}

export function createRequestBodyForUserUpdateLink(userId: string, avatarLink: string): IJsonPatchBody[] {
    return [
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
}

export function createRequestBodyForUserChangeStatus(userId: string, isActive: boolean): IJsonPatchBody[] {
    return [
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
}

export function createAvailableUsersDropdownItems(requiredPosition: UserPosition, users: IUser[]): ISelectedItem[] {
    return users.reduce(
        (acc, x) =>
            x.userPosition && UserPosition[x.userPosition] === requiredPosition
                ? [...acc, { key: x.userId, value: x.userName } as ISelectedItem]
                : acc,
        [{ key: '', value: 'No Owner' } as ISelectedItem]
    );
}
