import * as modalActions from '../actions/modalActions';
import { ProjectActions } from '../actions/projectActions';
import { SprintActions } from '../actions/sprintsActions';
import { StoryActions } from '../actions/storiesActions';
import { UserActions } from '../actions/userActions';
import { WorkSpaceActions } from '../actions/workSpaceActions';
import { IModalState } from '../store/state';

const initialState: IModalState = {
    isOpen: false,
    type: null,
    option: null,
};

export default function modalReducer(state = initialState, action: modalActions.ModalActionTypes) {
    switch (action.type) {
        case modalActions.ModalActions.OPEN_MODAL:
            return handleOpenModal(state, action);
        case modalActions.ModalActions.CLOSE_MODAL:
        case UserActions.CREATE_USER_SUCCESS:
        case ProjectActions.CREATE_PROJECT_SUCCESS:
        case WorkSpaceActions.CREATE_WORKSPACE_SUCCESS:
        case WorkSpaceActions.UPDATE_WORKSPACE_SUCCESS:
        case SprintActions.CREATE_SPRINT_SUCCESS:
        case StoryActions.CREATE_STORY_SUCCESS:
            return handleCloseModal(state);
        default:
            return state;
    }
}

function handleOpenModal(state: IModalState, action: modalActions.IOpenModal): IModalState {
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
    };
}
