import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as modalActions from '../../../redux/actions/modalActions';
import * as sprintActions from '../../../redux/actions/sprintsActions';
import * as epicSelectors from '../../../redux/selectors/epicsSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import ProjectManagement, { IProjectManagementProps } from './ProjectManagement';

const ProjectManagementContainer = () => {
    const dispatch = useDispatch();
    const epics = useSelector(epicSelectors.getEpics);

    const onSelectViewEpicSprints = (epicId: string) => {
        dispatch(sprintActions.addSprints([]));
    };

    const onClickCreateEpic = () => {
        dispatch(modalActions.openModal(ModalTypes.EPIC_CREATION));
    };

    const onClickCreateSprint = () => {
        dispatch(modalActions.openModal(ModalTypes.SPRINT_CREATION));
    };

    const projectManagementProps: IProjectManagementProps = {
        epics,
        onClickCreateEpic,
        onClickCreateSprint,
        onSelectViewEpicSprints,
    };

    return <ProjectManagement {...projectManagementProps} />;
};

export default ProjectManagementContainer;
