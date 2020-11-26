import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../redux/actions/modalActions';
import * as modalSelectors from '../../redux/selectors/modalSelectors';
import ModalWindow, { IModalWindowProps } from './ModalWindow';

export interface IModalWindowContainerProps {
    modalRef: React.MutableRefObject<HTMLDivElement>;
}

const ModalWindowContainer = (props: IModalWindowContainerProps) => {
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
        modalRef: props.modalRef,
    };

    return <ModalWindow {...modalProps} />;
};

export default ModalWindowContainer;
