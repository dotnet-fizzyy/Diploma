import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { IState } from '../store/state';

export const getIsOpen = (state: IState): boolean => state.modal.isOpen;

export const getModalType = (state: IState): ModalTypes => state.modal.type;

export const getModalOption = (state: IState): ModalOptions => state.modal.option;

export const getModalRequestPerforming = (state: IState): boolean => state.modal.isPerformingRequest;
