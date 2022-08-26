import { ISidebarChangeType, ISidebarHandleVisibility, SidebarActions } from '../actions/sidebar';
import { StoryActions } from '../actions/story';
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

const handleSidebarVisibility = (
    state: ISidebarState,
    { payload: { type, isVisible } }: ISidebarHandleVisibility
): ISidebarState => ({
    ...state,
    type,
    isVisible,
});

const handleEnableLoadingStatusOnRequest = (state: ISidebarState): ISidebarState => ({
    ...state,
    isLoading: true,
});

const handleDisableLoadingStatus = (state: ISidebarState): ISidebarState => ({
    ...state,
    isLoading: false,
});

const handleChangeType = (state: ISidebarState, action: ISidebarChangeType): ISidebarState => ({
    ...state,
    type: action.payload,
});
