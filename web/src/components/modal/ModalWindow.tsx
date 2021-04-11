import { Modal } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ModalTypes } from '../../types/modalTypes';
import EpicModalContainer from './epic/EpicModalContainer';
import ProjectModalContainer from './project/ProjectModalContainer';
import SprintModalContainer from './sprint/SprintModalContainer';
import StoryCreationContainer from './story/StoryCreationContainer';
import TeamModalContainer from './team/TeamModalContainer';
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
                return <TeamModalContainer />;
            case ModalTypes.PROJECT:
                return <ProjectModalContainer />;
            case ModalTypes.SPRINT:
                return <SprintModalContainer />;
            case ModalTypes.EPIC:
                return <EpicModalContainer />;
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
