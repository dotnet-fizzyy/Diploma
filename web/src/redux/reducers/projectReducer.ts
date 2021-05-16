import {
    ICreateProjectSuccess,
    ISetCurrentProjectById,
    ISetProjects,
    ISetSelectedProject,
    ProjectActions,
} from '../actions/projectActions';
import { IProjectState } from '../store/state';

const initialState: IProjectState = {
    projects: [],
    selectedProject: null,
};

export default function projectsReducer(state = initialState, action) {
    switch (action.type) {
        case ProjectActions.CREATE_PROJECT_SUCCESS:
            return handleCreateProjectSuccess(state, action);
        case ProjectActions.SET_PROJECTS:
        case ProjectActions.GET_USER_PROJECTS_SUCCESS:
            return handleSetProjects(state, action);
        case ProjectActions.SET_SELECTED_PROJECT:
        case ProjectActions.GET_PROJECT_SUCCESS:
        case ProjectActions.GET_PROJECT_PAGE_SUCCESS:
        case ProjectActions.UPDATE_PROJECT_SUCCESS:
            return handleSetCurrentProject(state, action);
        case ProjectActions.SET_CURRENT_PROJECT_BY_ID:
            return handleSetCurrentProjectById(state, action);
        default:
            return state;
    }
}

function handleCreateProjectSuccess(state: IProjectState, action: ICreateProjectSuccess): IProjectState {
    return {
        ...state,
        projects: state.projects.length ? [...state.projects, action.payload] : [action.payload],
    };
}

function handleSetProjects(state: IProjectState, action: ISetProjects): IProjectState {
    return {
        ...state,
        projects: action.payload,
    };
}

function handleSetCurrentProject(state: IProjectState, action: ISetSelectedProject): IProjectState {
    return {
        ...state,
        selectedProject: action.payload,
    };
}

function handleSetCurrentProjectById(state: IProjectState, action: ISetCurrentProjectById): IProjectState {
    return {
        ...state,
        selectedProject: state.projects.find((x) => x.projectId === action.payload),
    };
}
