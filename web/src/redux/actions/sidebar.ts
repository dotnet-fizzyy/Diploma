import { SidebarTypes } from '../../constants';
import { IBaseAction } from '../../types';

export const SidebarActions = {
    SIDEBAR_HANDLE_VISIBILITY: 'SIDEBAR_HANDLE_VISIBILITY',
    SIDEBAR_CHANGE_TYPE: 'SIDEBAR_CHANGE_TYPE',
};

/**
 * Interfaces
 */

export interface ISidebarHandleVisibility extends IBaseAction {
    payload: {
        type?: SidebarTypes;
        isVisible: boolean;
    };
}

export interface ISidebarChangeType extends IBaseAction {
    payload: SidebarTypes;
}

/**
 * Actions
 */

export const sidebarHandleVisibility = (type: SidebarTypes | null, isVisible: boolean): ISidebarHandleVisibility => ({
    type: SidebarActions.SIDEBAR_HANDLE_VISIBILITY,
    payload: {
        type,
        isVisible,
    },
});

export const sidebarChangeType = (value: SidebarTypes): ISidebarChangeType => ({
    type: SidebarActions.SIDEBAR_CHANGE_TYPE,
    payload: value,
});
