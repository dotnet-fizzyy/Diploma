import * as modalActions from '../actions/modalActions';
import { IModalState } from '../store/state';

const initialState: IModalState = {
    isOpen: false,
    type: null,
};

export default function modalReducer(state = initialState, action: modalActions.ModalActionTypes) {
    switch (action.type) {
        case modalActions.ModalActions.OPEN_MODAL:
            return handleOpenModal(state, action);
        case modalActions.ModalActions.CLOSE_MODAL:
            return handleCloseModal(state, action);
        default:
            return state;
    }
}

function handleOpenModal(state: IModalState, action: modalActions.IOpenModal): IModalState {
    return {
        ...state,
        isOpen: true,
        type: action.payload,
    };
}

function handleCloseModal(state: IModalState, action: modalActions.ICloseModal): IModalState {
    return {
        ...state,
        isOpen: false,
        type: null,
    };
}
