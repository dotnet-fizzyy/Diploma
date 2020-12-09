import * as projectActions from '../actions/projectActions';
import { IProjectState } from '../store/state';

const initialState: IProjectState = {
    projects: [],
    currentProject: null,
};

export default function projectsReducer(state = initialState, action: projectActions.ProjectActionTypes) {
    switch (action.type) {
        case projectActions.ProjectActions.CREATE_PROJECT_SUCCESS:
            return handleCreateProjectSuccess(state, action);
        case projectActions.ProjectActions.SET_PROJECTS:
        case projectActions.ProjectActions.GET_USER_PROJECTS_SUCCESS:
            return handleSetProjects(state, action);
        case projectActions.ProjectActions.SET_CURRENT_PROJECT:
            return handleSetCurrentProject(state, action);
        default:
            return state;
    }
}

function handleCreateProjectSuccess(state: IProjectState, action: projectActions.ICreateProjectSuccess): IProjectState {
    return {
        ...state,
        projects: state.projects.length ? [...state.projects, action.payload] : [action.payload],
    };
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
