import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../redux/actions/modalActions';
import ModalCloseButton from './ModalCloseButton';

const ModalCloseButtonContainer = () => {
    const dispatch = useDispatch();

    const onClickCloseModal = () => {
        dispatch(closeModal());
    };

    return <ModalCloseButton onClickCloseModal={onClickCloseModal} />;
};

export default ModalCloseButtonContainer;
