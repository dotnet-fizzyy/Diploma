import { Modal } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ModalTypes } from '../../types/modalTypes';
import ProjectCreationContainer from './project-creation/ProjectCreationContainer';
import StoryCreationContainer from './story-creation/StoryCreationContainer';
import TeamCreationContainer from './team-creation/TeamCreationContainer';

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
}

const ModalWindow = (props: IModalWindowProps) => {
    const classes = useStyles();
    const { isOpen, modalType, handleOnClose } = props;

    const getModalType = () => {
        switch (modalType) {
            case ModalTypes.STORY_CREATION:
                return <StoryCreationContainer />;
            case ModalTypes.TEAM_CREATION:
                return <TeamCreationContainer />;
            case ModalTypes.PROJECT_CREATION:
                return <ProjectCreationContainer />;
            default:
                return <div />;
        }
    };

    return (
        <Modal open={isOpen} onClose={handleOnClose} className={classes.root}>
            <>{getModalType()}</>
        </Modal>
    );
};

export default ModalWindow;
