import { IChangeStatsEpic } from '../actions/epic';
import {
    IAddSprints,
    ICreateSprintSuccess,
    IRemoveSprintSuccess,
    ISetSelectedSprint,
    IUpdateSprintSuccess,
    SprintActions,
} from '../actions/sprint';
import { IChangeStorySprintRequest, StoryActions } from '../actions/storyActions';
import { ISprintsState } from '../store/state';

const initialState: ISprintsState = {
    sprints: [],
    selectedSprintId: '',
};

export default function sprintReducer(state = initialState, action) {
    switch (action.type) {
        case SprintActions.GET_SPRINTS_FROM_EPIC_SUCCESS:
        case SprintActions.ADD_SPRINTS:
            return handleAddSprints(state, action);
        case SprintActions.SET_SELECTED_SPRINT:
        case StoryActions.CHANGE_STORIES_SPRINT_REQUEST:
            return handleSetSelectedSprint(state, action);
        case SprintActions.CREATE_SPRINT_SUCCESS:
            return handleCreateSprintSuccess(state, action);
        case SprintActions.CHANGE_STATS_SPRINT:
            return handleChangeStatsEpic(state, action);
        case SprintActions.UPDATE_SPRINT_SUCCESS:
            return handleUpdateSprintSuccess(state, action);
        case SprintActions.REMOVE_SPRINT_SUCCESS:
            return handleRemoveSprintSuccess(state, action);
        default:
            return state;
    }
}

const handleAddSprints = (state: ISprintsState, action: IAddSprints): ISprintsState => ({
    ...state,
    sprints: action.payload,
});

const handleSetSelectedSprint = (
    state: ISprintsState,
    action: ISetSelectedSprint | IChangeStorySprintRequest
): ISprintsState => {
    const sprint = state.sprints.find((sprint) => sprint.sprintId === action.payload);

    return {
        ...state,
        selectedSprintId: sprint?.sprintId ?? '',
    };
};

const handleCreateSprintSuccess = (state: ISprintsState, action: ICreateSprintSuccess): ISprintsState => ({
    ...state,
    sprints: [...state.sprints, action.payload],
});

const handleChangeStatsEpic = (state: ISprintsState, action: IChangeStatsEpic): ISprintsState => ({
    ...state,
    selectedSprintId: action.payload,
});

const handleUpdateSprintSuccess = (state: ISprintsState, action: IUpdateSprintSuccess): ISprintsState => ({
    ...state,
    sprints: state.sprints.map((sprint) =>
        sprint.sprintId === action.payload.sprintId ? { ...action.payload } : sprint
    ),
});

const handleRemoveSprintSuccess = (state: ISprintsState, action: IRemoveSprintSuccess): ISprintsState => ({
    ...state,
    sprints: state.sprints.filter((sprint) => sprint.sprintId !== action.payload),
});
