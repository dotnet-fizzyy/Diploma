import * as SprintActions from '../actions/sprintsActions';
import { ISprintsState } from '../store/state';

const initialState: ISprintsState = {
    sprints: [],
    currentSprint: null,
};

export default function sprintsReducer(state = initialState, action: SprintActions.SprintsActionTypes) {
    switch (action.type) {
        case SprintActions.SprintActions.ADD_SPRINTS:
            return handleAddSprints(state, action);
        case SprintActions.SprintActions.SET_SELECTED_SPRINT:
            return handleSetSelectedSprint(state, action);
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
