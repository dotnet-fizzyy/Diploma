import { IWorkSpacePageProject } from '../../types/workSpaceTypes';
import {
    IAddWorkSpaceProjects,
    ICreateProjectSuccess,
    IRemoveProjectSuccess,
    ISetSelectedProject,
    ISetSelectedProjectFromWorkSpaceById,
    ProjectActions,
} from '../actions/project';
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
        case ProjectActions.SET_SELECTED_PROJECT:
        case ProjectActions.GET_PROJECT_SUCCESS:
        case ProjectActions.GET_PROJECT_PAGE_SUCCESS:
        case ProjectActions.UPDATE_PROJECT_SUCCESS:
            return handleSetCurrentProject(state, action);
        case ProjectActions.ADD_WORKSPACE_PROJECTS:
            return handleAddWorkSpaceProject(state, action);
        case ProjectActions.SET_SELECTED_PROJECT_FROM_WORKSPACE_BY_ID:
            return handleSetSelectedProjectId(state, action);
        case ProjectActions.REMOVE_PROJECT_SUCCESS:
            return handleRemoveProjectSuccess(state, action);
        default:
            return state;
    }
}

const handleCreateProjectSuccess = (state: IProjectState, action: ICreateProjectSuccess): IProjectState => {
    const createdProject: IWorkSpacePageProject = {
        projectId: action.payload.projectId,
        projectName: action.payload.projectName,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        teams: [],
    };

    return {
        ...state,
        workSpaceItems: state.workSpaceItems?.length ? [...state.workSpaceItems, createdProject] : [createdProject],
    };
};

const handleSetCurrentProject = (state: IProjectState, action: ISetSelectedProject): IProjectState => ({
    ...state,
    items: [action.payload],
    selectedProjectId: action.payload.projectId,
});

const handleAddWorkSpaceProject = (state: IProjectState, action: IAddWorkSpaceProjects): IProjectState => ({
    ...state,
    workSpaceItems: action.payload,
});

const handleSetSelectedProjectId = (
    state: IProjectState,
    action: ISetSelectedProjectFromWorkSpaceById
): IProjectState => ({
    ...state,
    selectedProjectId: action.payload,
});

const handleRemoveProjectSuccess = (state: IProjectState, action: IRemoveProjectSuccess): IProjectState => ({
    ...state,
    workSpaceItems: state.workSpaceItems.filter((workSpaceProject) => workSpaceProject.projectId !== action.payload),
});
