import { EpicActions } from '../actions/epicActions';
import { IOpenModal, ModalActions, ModalActionTypes } from '../actions/modalActions';
import { ProjectActions } from '../actions/projectActions';
import { SprintActions } from '../actions/sprintActions';
import { StoryActions } from '../actions/storyActions';
import { TeamActions } from '../actions/teamActions';
import { UserActions } from '../actions/userActions';
import { WorkSpaceActions } from '../actions/workSpaceActions';
import { IModalState } from '../store/state';

const initialState: IModalState = {
    isOpen: false,
    isPerformingRequest: false,
    type: null,
    option: null,
};

export default function modalReducer(state = initialState, action: ModalActionTypes) {
    switch (action.type) {
        case ModalActions.OPEN_MODAL:
            return handleOpenModal(state, action);
        case UserActions.CREATE_USER_REQUEST:
        case WorkSpaceActions.CREATE_WORKSPACE_REQUEST:
        case WorkSpaceActions.UPDATE_WORKSPACE_REQUEST:
        case SprintActions.CREATE_SPRINT_REQUEST:
        case SprintActions.UPDATE_SPRINT_REQUEST:
        case StoryActions.CREATE_STORY_REQUEST:
        case ProjectActions.UPDATE_PROJECT_REQUEST:
        case TeamActions.CREATE_TEAM_REQUEST:
        case TeamActions.UPDATE_TEAM_REQUEST:
        case EpicActions.CREATE_EPIC_REQUEST:
        case EpicActions.UPDATE_EPIC_REQUEST:
            return handleModalRequestProcessing(state);
        case UserActions.CREATE_USER_FAILURE:
        case WorkSpaceActions.CREATE_WORKSPACE_FAILURE:
        case WorkSpaceActions.UPDATE_WORKSPACE_FAILURE:
        case SprintActions.CREATE_SPRINT_FAILURE:
        case SprintActions.UPDATE_SPRINT_FAILURE:
        case StoryActions.CREATE_STORY_FAILURE:
        case ProjectActions.UPDATE_PROJECT_FAILURE:
        case TeamActions.CREATE_TEAM_FAILURE:
        case TeamActions.UPDATE_TEAM_FAILURE:
        case EpicActions.CREATE_EPIC_FAILURE:
        case EpicActions.UPDATE_EPIC_FAILURE:
            return handleModalRequestFailure(state);
        case ModalActions.CLOSE_MODAL:
        case UserActions.CREATE_USER_SUCCESS:
        case WorkSpaceActions.CREATE_WORKSPACE_SUCCESS:
        case WorkSpaceActions.UPDATE_WORKSPACE_SUCCESS:
        case SprintActions.CREATE_SPRINT_SUCCESS:
        case SprintActions.UPDATE_SPRINT_SUCCESS:
        case SprintActions.REMOVE_SPRINT_SUCCESS:
        case StoryActions.CREATE_STORY_SUCCESS:
        case ProjectActions.CREATE_PROJECT_SUCCESS:
        case ProjectActions.UPDATE_PROJECT_SUCCESS:
        case ProjectActions.REMOVE_PROJECT_SUCCESS:
        case TeamActions.CREATE_TEAM_SUCCESS:
        case TeamActions.UPDATE_TEAM_SUCCESS:
        case TeamActions.REMOVE_TEAM_SUCCESS:
        case EpicActions.CREATE_EPIC_SUCCESS:
        case EpicActions.UPDATE_EPIC_SUCCESS:
        case EpicActions.REMOVE_EPIC_SUCCESS:
            return handleCloseModal(state);
        default:
            return state;
    }
}

function handleModalRequestProcessing(state: IModalState): IModalState {
    return {
        ...state,
        isPerformingRequest: true,
    };
}

function handleModalRequestFailure(state: IModalState): IModalState {
    return {
        ...state,
        isPerformingRequest: false,
    };
}

function handleOpenModal(state: IModalState, action: IOpenModal): IModalState {
    return {
        ...state,
        isOpen: true,
        type: action.payload.type,
        option: action.payload.option,
    };
}

function handleCloseModal(state: IModalState): IModalState {
    return {
        ...state,
        isOpen: false,
        type: null,
        option: null,
        isPerformingRequest: false,
    };
}
