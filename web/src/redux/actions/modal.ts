import { ModalOptions, ModalTypes } from '../../constants/modal';
import { IBaseAction } from '../../types';

export const ModalActions = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

/**
 * Interfaces
 */

export interface IOpenModal extends IBaseAction {
    payload: {
        type: ModalTypes;
        option: ModalOptions;
    };
}

export interface ICloseModal extends IBaseAction {}

/**
 * Actions
 */

export const openModal = (type: ModalTypes, option?: ModalOptions): IOpenModal => ({
    type: ModalActions.OPEN_MODAL,
    payload: {
        type,
        option,
    },
});

export const closeModal = (): ICloseModal => ({
    type: ModalActions.CLOSE_MODAL,
});
