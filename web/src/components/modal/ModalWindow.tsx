import { Modal } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ModalTypes } from '../../types/modalTypes';
import EpicCreationContainer from './epic/EpicCreationContainer';
import ProjectManagementModalContainer from './project/ProjectManagementModalContainer';
import SprintCreationContainer from './sprint/SprintCreationContainer';
import StoryCreationContainer from './story/StoryCreationContainer';
import TeamCreationContainer from './team/TeamCreationContainer';
import UserCreationContainer from './user/UserCreationContainer';

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
                return <ProjectManagementModalContainer />;
            case ModalTypes.SPRINT_CREATION:
                return <SprintCreationContainer />;
            case ModalTypes.EPIC_CREATION:
                return <EpicCreationContainer />;
            case ModalTypes.USER_CREATION:
                return <UserCreationContainer />;
            default:
                return <React.Fragment />;
        }
    };

    return (
        <Modal open={isOpen} onClose={handleOnClose} className={classes.root}>
            <>{getModalType()}</>
        </Modal>
    );
};

export default ModalWindow;
