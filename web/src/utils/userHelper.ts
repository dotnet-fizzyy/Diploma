import { ISelectedItem } from '../types/storyTypes';
import { UserPosition, UserRole } from '../types/userTypes';

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
