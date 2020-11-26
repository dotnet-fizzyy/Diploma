import { Modal } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ModalTypes } from '../../types/modalTypes';
import StoryCreationContainer from './story-creation/StoryCreationContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })
);

export interface IModalWindowProps {
    isOpen: boolean;
    modalType: ModalTypes;
    handleOnClose: () => void;
    modalRef: React.MutableRefObject<HTMLDivElement>;
}

const ModalWindow = (props: IModalWindowProps) => {
    const classes = useStyles();
    const { isOpen, modalType, modalRef, handleOnClose } = props;

    const getModalType = () => {
        switch (modalType) {
            case ModalTypes.STORY_CREATION:
                return <StoryCreationContainer />;
            default:
                return <div />;
        }
    };

    return (
        <Modal open={isOpen} onClose={handleOnClose} container={() => modalRef.current} className={classes.root}>
            <>{getModalType()}</>
        </Modal>
    );
};

export default ModalWindow;
