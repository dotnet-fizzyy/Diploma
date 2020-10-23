export const SidebarActions = {
  SIDEBAR_HANDLE_VISIBILITY: "SIDEBAR_HANDLE_VISIBILITY",
};

//interfaces
export interface ISidebarHandleVisibility {
  type: typeof SidebarActions.SIDEBAR_HANDLE_VISIBILITY;
  payload: boolean;
}

//actions
export function sidebarHandleVisibility(
  value: boolean
): ISidebarHandleVisibility {
  return {
    type: SidebarActions.SIDEBAR_HANDLE_VISIBILITY,
    payload: value,
  };
}
