import { ISidebarHandleVisibility, ISidebarSetLoadingStatus, SidebarActions } from '../actions/sidebarActions';
import { ISidebarState } from '../store/state';

const initialState: ISidebarState = {
    isVisible: false,
    isLoading: false,
};

export default function sidebarReducer(state = initialState, action) {
    switch (action.type) {
        case SidebarActions.SIDEBAR_HANDLE_VISIBILITY:
            return handleSidebarVisibility(state, action);
        case SidebarActions.SIDEBAR_SET_LOADING_STATUS:
            return handleSetLoadingStatus(state, action);
        default:
            return state;
    }
}

function handleSidebarVisibility(state: ISidebarState, action: ISidebarHandleVisibility): ISidebarState {
    return {
        ...state,
        isVisible: action.payload,
    };
}

function handleSetLoadingStatus(state: ISidebarState, action: ISidebarSetLoadingStatus): ISidebarState {
    return {
        ...state,
        isLoading: action.payload,
    };
}
