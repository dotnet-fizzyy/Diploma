import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { IState } from '../store/state';

export function getIsOpen(state: IState): boolean {
    return state.modal.isOpen;
}

export function getModalType(state: IState): ModalTypes {
    return state.modal.type;
}

export function getModalOption(state: IState): ModalOptions {
    return state.modal.option;
}

export function getModalRequestPerforming(state: IState): boolean {
    return state.modal.isPerformingRequest;
}
