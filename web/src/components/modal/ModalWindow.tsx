import { Modal } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ModalTypes } from '../../types/modalTypes';
import EpicCreationContainer from './epic/EpicCreationContainer';
import ProjectModalContainer from './project/ProjectModalContainer';
import SprintCreationContainer from './sprint/SprintCreationContainer';
import StoryCreationContainer from './story/StoryCreationContainer';
import TeamCreationContainer from './team/TeamCreationContainer';
import UserCustomerModalContainer from './user/customer-management/UserModalContainer';
import UserSelfModalContainer from './user/self-management/UserModalContainer';
import WorkSpaceModalContainer from './workspace/WorkSpaceModalContainer';

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
            case ModalTypes.STORY:
                return <StoryCreationContainer />;
            case ModalTypes.TEAM:
                return <TeamCreationContainer />;
            case ModalTypes.PROJECT:
                return <ProjectModalContainer />;
            case ModalTypes.SPRINT:
                return <SprintCreationContainer />;
            case ModalTypes.EPIC:
                return <EpicCreationContainer />;
            case ModalTypes.USER_CUSTOMER:
                return <UserCustomerModalContainer />;
            case ModalTypes.USER_SELF:
                return <UserSelfModalContainer />;
            case ModalTypes.WORKSPACE:
                return <WorkSpaceModalContainer />;
            default:
                return <React.Fragment />;
        }
    };

    //React.Fragment is required here to avoid ref issues
    return (
        <Modal open={isOpen} onClose={handleOnClose} className={classes.root}>
            <React.Fragment>{getModalType()}</React.Fragment>
        </Modal>
    );
};

export default ModalWindow;
