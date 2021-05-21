import { IChangeStatsEpic } from '../actions/epicActions';
import { IAddSprints, ICreateSprintSuccess, ISetSelectedSprint, SprintActions } from '../actions/sprintActions';
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
        default:
            return state;
    }
}

function handleAddSprints(state: ISprintsState, action: IAddSprints): ISprintsState {
    return {
        ...state,
        sprints: action.payload,
    };
}

function handleSetSelectedSprint(
    state: ISprintsState,
    action: ISetSelectedSprint | IChangeStorySprintRequest
): ISprintsState {
    return {
        ...state,
        selectedSprintId: state.sprints.some((x) => x.sprintId === action.payload)
            ? state.sprints.find((x) => x.sprintId === action.payload).sprintId
            : '',
    };
}

function handleCreateSprintSuccess(state: ISprintsState, action: ICreateSprintSuccess): ISprintsState {
    return {
        ...state,
        sprints: [...state.sprints, action.payload],
    };
}

function handleChangeStatsEpic(state: ISprintsState, action: IChangeStatsEpic): ISprintsState {
    return {
        ...state,
        selectedSprintId: action.payload,
    };
}
