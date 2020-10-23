import * as sidebarActions from "../actions/sidebarActions";
import { ISidebarState } from "../store/state";

const initialState: ISidebarState = {
  isVisible: false,
};

export default function sidebarReducer(state = initialState, action: any) {
  switch (action.type) {
    case sidebarActions.SidebarActions.SIDEBAR_HANDLE_VISIBILITY:
      return handleSidebarVisibility(state, action);
    default:
      return state;
  }
}

function handleSidebarVisibility(
  state: ISidebarState,
  action: sidebarActions.ISidebarHandleVisibility
): ISidebarState {
  return {
    ...state,
    isVisible: action.payload,
  };
}
