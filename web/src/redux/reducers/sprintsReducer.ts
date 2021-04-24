import * as SprintActions from '../actions/sprintsActions';
import { ISprintsState } from '../store/state';

const initialState: ISprintsState = {
    sprints: [],
    currentSprint: null,
};

export default function sprintsReducer(state = initialState, action: SprintActions.SprintsActionTypes) {
    switch (action.type) {
        case SprintActions.SprintActions.GET_SPRINTS_FROM_EPIC_SUCCESS:
        case SprintActions.SprintActions.ADD_SPRINTS:
            return handleAddSprints(state, action);
        case SprintActions.SprintActions.SET_SELECTED_SPRINT:
            return handleSetSelectedSprint(state, action);
        case SprintActions.SprintActions.CREATE_SPRINT_SUCCESS:
            return handleCreateSprintSuccess(state, action);
        default:
            return state;
    }
}

function handleAddSprints(state: ISprintsState, action: SprintActions.IAddSprints): ISprintsState {
    return {
        ...state,
        sprints: action.payload,
    };
}

function handleSetSelectedSprint(state: ISprintsState, action: SprintActions.ISetSelectedSprint): ISprintsState {
    return {
        ...state,
        currentSprint: state.sprints.find((x) => x.sprintId === action.payload),
    };
}

function handleCreateSprintSuccess(state: ISprintsState, action: SprintActions.ICreateSprintSuccess): ISprintsState {
    return {
        ...state,
        sprints: [...state.sprints, action.payload],
    };
}
