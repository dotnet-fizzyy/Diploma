import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../redux/actions/modal';
import * as modalSelectors from '../../redux/selectors/modal';
import ModalWindow, { IModalWindowProps } from './ModalWindow';

const ModalWindowContainer = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(modalSelectors.getIsOpen);
    const modalType = useSelector(modalSelectors.getModalType);

    const handleOnClose = () => {
        dispatch(modalActions.closeModal());
    };

    const modalProps: IModalWindowProps = {
        isOpen,
        modalType,
        handleOnClose,
    };

    return <ModalWindow {...modalProps} />;
};

export default ModalWindowContainer;
