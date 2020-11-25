import * as projectActions from '../actions/projectActions';
import { IProjectState } from '../store/state';

const initialState: IProjectState = {
    projects: [],
    currentProject: null,
};

export default function projectsReducer(state = initialState, action: projectActions.ProjectActionTypes) {
    switch (action.type) {
        case projectActions.ProjectActions.SET_PROJECTS:
            return handleSetProjects(state, action);
        case projectActions.ProjectActions.SET_CURRENT_PROJECT:
            return handleSetCurrentProject(state, action);
        default:
            return state;
    }
}

function handleSetProjects(state: IProjectState, action: projectActions.ISetProjects): IProjectState {
    return {
        ...state,
        projects: action.payload,
    };
}

function handleSetCurrentProject(state: IProjectState, action: projectActions.ISetCurrentProject): IProjectState {
    return {
        ...state,
        currentProject: action.payload,
    };
}
