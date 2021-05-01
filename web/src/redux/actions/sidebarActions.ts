export const SidebarActions = {
    SIDEBAR_HANDLE_VISIBILITY: 'SIDEBAR_HANDLE_VISIBILITY',
    SIDEBAR_SET_LOADING_STATUS: 'SIDEBAR_SET_LOADING_STATUS',
};

/*
Interfaces
 */
export interface ISidebarHandleVisibility {
    type: typeof SidebarActions.SIDEBAR_HANDLE_VISIBILITY;
    payload: boolean;
}

export interface ISidebarSetLoadingStatus {
    type: typeof SidebarActions.SIDEBAR_SET_LOADING_STATUS;
    payload: boolean;
}

/*
Actions
 */
export function sidebarHandleVisibility(value: boolean): ISidebarHandleVisibility {
    return {
        type: SidebarActions.SIDEBAR_HANDLE_VISIBILITY,
        payload: value,
    };
}

export function sidebarSetLoadingStatus(value: boolean): ISidebarSetLoadingStatus {
    return {
        type: SidebarActions.SIDEBAR_SET_LOADING_STATUS,
        payload: value,
    };
}
