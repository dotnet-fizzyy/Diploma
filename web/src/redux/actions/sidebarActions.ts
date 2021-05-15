import { SidebarTypes } from '../../constants';

export const SidebarActions = {
    SIDEBAR_HANDLE_VISIBILITY: 'SIDEBAR_HANDLE_VISIBILITY',
    SIDEBAR_CHANGE_TYPE: 'SIDEBAR_CHANGE_TYPE',
};

/*
Interfaces
 */
export interface ISidebarHandleVisibility {
    type: typeof SidebarActions.SIDEBAR_HANDLE_VISIBILITY;
    payload: {
        type?: SidebarTypes;
        isVisible: boolean;
    };
}

export interface ISidebarChangeType {
    type: typeof SidebarActions.SIDEBAR_CHANGE_TYPE;
    payload: SidebarTypes;
}

/*
Actions
 */
export function sidebarHandleVisibility(type: SidebarTypes | null, isVisible: boolean): ISidebarHandleVisibility {
    return {
        type: SidebarActions.SIDEBAR_HANDLE_VISIBILITY,
        payload: {
            type,
            isVisible,
        },
    };
}

export function sidebarChangeType(value: SidebarTypes): ISidebarChangeType {
    return {
        type: SidebarActions.SIDEBAR_CHANGE_TYPE,
        payload: value,
    };
}
