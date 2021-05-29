import { IWorkSpacePageProject } from '../../types/workSpaceTypes';
import {
    IAddWorkSpaceProjects,
    ICreateProjectSuccess,
    IRemoveProjectSuccess,
    ISetCurrentProjectById,
    ISetProjects,
    ISetSelectedProject,
    ISetSelectedProjectFromWorkSpaceById,
    ProjectActions,
} from '../actions/projectActions';
import { IProjectState } from '../store/state';

const initialState: IProjectState = {
    items: [],
    workSpaceItems: [],
    selectedProjectId: '',
};

export default function projectsReducer(state = initialState, action) {
    switch (action.type) {
        case ProjectActions.CREATE_PROJECT_SUCCESS:
            return handleCreateProjectSuccess(state, action);
        case ProjectActions.SET_PROJECTS:
            return handleSetProjects(state, action);
        case ProjectActions.SET_SELECTED_PROJECT:
        case ProjectActions.GET_PROJECT_SUCCESS:
        case ProjectActions.GET_PROJECT_PAGE_SUCCESS:
        case ProjectActions.UPDATE_PROJECT_SUCCESS:
            return handleSetCurrentProject(state, action);
        case ProjectActions.ADD_WORKSPACE_PROJECTS:
            return handleAddWorkSpaceProject(state, action);
        case ProjectActions.SET_SELECTED_PROJECT_BY_ID:
        case ProjectActions.SET_SELECTED_PROJECT_FROM_WORKSPACE_BY_ID:
            return handleSetSelectedProjectId(state, action);
        case ProjectActions.REMOVE_PROJECT_SUCCESS:
            return handleRemoveProjectSuccess(state, action);
        default:
            return state;
    }
}

function handleCreateProjectSuccess(state: IProjectState, action: ICreateProjectSuccess): IProjectState {
    const createdProject: IWorkSpacePageProject = {
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        teams: [],
    };

    return {
        ...state,
        workSpaceItems:
            state.workSpaceItems && state.workSpaceItems.length
                ? [...state.workSpaceItems, createdProject]
                : [createdProject],
    };
}

function handleSetProjects(state: IProjectState, action: ISetProjects): IProjectState {
    return {
        ...state,
        items: action.payload,
    };
}

function handleSetCurrentProject(state: IProjectState, action: ISetSelectedProject): IProjectState {
    return {
        ...state,
        items: [action.payload],
    };
}

function handleAddWorkSpaceProject(state: IProjectState, action: IAddWorkSpaceProjects): IProjectState {
    return {
        ...state,
        workSpaceItems: action.payload,
    };
}

function handleSetSelectedProjectId(
    state: IProjectState,
    action: ISetSelectedProjectFromWorkSpaceById | ISetCurrentProjectById
): IProjectState {
    return {
        ...state,
        selectedProjectId: action.payload,
    };
}

function handleRemoveProjectSuccess(state: IProjectState, action: IRemoveProjectSuccess): IProjectState {
    return {
        ...state,
        workSpaceItems: state.workSpaceItems.filter((x) => x.projectId !== action.payload),
    };
}
