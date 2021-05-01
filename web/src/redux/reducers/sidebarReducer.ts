import { ISidebarHandleVisibility, ISidebarSetLoadingStatus, SidebarActions } from '../actions/sidebarActions';
import { StoryActions } from '../actions/storiesActions';
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
        case StoryActions.STORY_UPDATE_CHANGES_SUCCESS:
        case StoryActions.STORY_UPDATE_CHANGES_FAILURE:
            return handleDisableLoadingStatusOnError(state);
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

function handleDisableLoadingStatusOnError(state: ISidebarState): ISidebarState {
    return {
        ...state,
        isLoading: false,
    };
}
