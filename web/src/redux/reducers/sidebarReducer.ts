import { ISidebarChangeType, ISidebarHandleVisibility, SidebarActions } from '../actions/sidebarActions';
import { StoryActions } from '../actions/storiesActions';
import { ISidebarState } from '../store/state';

const initialState: ISidebarState = {
    isVisible: false,
    isLoading: false,
    type: null,
};

export default function sidebarReducer(state = initialState, action) {
    switch (action.type) {
        case SidebarActions.SIDEBAR_HANDLE_VISIBILITY:
            return handleSidebarVisibility(state, action);
        case StoryActions.STORY_UPDATE_CHANGES_REQUEST:
        case StoryActions.REMOVE_STORY_REQUEST:
            return handleEnableLoadingStatusOnRequest(state);
        case SidebarActions.SIDEBAR_CHANGE_TYPE:
            return handleChangeType(state, action);
        case StoryActions.STORY_UPDATE_CHANGES_FAILURE:
        case StoryActions.STORY_UPDATE_CHANGES_SUCCESS:
        case StoryActions.REMOVE_STORY_FAILURE:
            return handleDisableLoadingStatus(state);
        case StoryActions.REMOVE_STORY_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

function handleSidebarVisibility(state: ISidebarState, action: ISidebarHandleVisibility): ISidebarState {
    const { type, isVisible } = action.payload;

    return {
        ...state,
        type,
        isVisible,
    };
}

function handleEnableLoadingStatusOnRequest(state: ISidebarState): ISidebarState {
    return {
        ...state,
        isLoading: true,
    };
}

function handleDisableLoadingStatus(state: ISidebarState): ISidebarState {
    return {
        ...state,
        isLoading: false,
    };
}

function handleChangeType(state: ISidebarState, action: ISidebarChangeType): ISidebarState {
    return {
        ...state,
        type: action.payload,
    };
}
