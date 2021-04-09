import { ModalOptions, ModalTypes } from '../../types/modalTypes';

export const ModalActions = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

//interfaces
export interface IOpenModal {
    type: typeof ModalActions.OPEN_MODAL;
    payload: {
        type: ModalTypes;
        option: ModalOptions;
    };
}

export interface ICloseModal {
    type: typeof ModalActions.CLOSE_MODAL;
}

//actions
export function openModal(type: ModalTypes, option?: ModalOptions): IOpenModal {
    return {
        type: ModalActions.OPEN_MODAL,
        payload: {
            type,
            option,
        },
    };
}

export function closeModal(): ICloseModal {
    return {
        type: ModalActions.CLOSE_MODAL,
    };
}

export type ModalActionTypes = IOpenModal & ICloseModal;
