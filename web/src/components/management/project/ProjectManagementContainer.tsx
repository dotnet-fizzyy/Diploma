import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as epicActions from '../../../redux/actions/epicActions';
import * as modalActions from '../../../redux/actions/modalActions';
import * as sprintActions from '../../../redux/actions/sprintsActions';
import * as epicSelectors from '../../../redux/selectors/epicsSelectors';
import * as sprintSelectors from '../../../redux/selectors/sprintsSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import ProjectManagement, { IProjectManagementProps } from './ProjectManagement';

const ProjectManagementContainer = () => {
    const dispatch = useDispatch();
    const { projectId }: any = useParams();

    const epics = useSelector(epicSelectors.getEpics);
    const sprints = useSelector(sprintSelectors.getSprints);
    const selectedEpic = useSelector(epicSelectors.getCurrentEpic);

    const onSelectViewEpicSprints = (epicId: string) => {
        dispatch(epicActions.setCurrentEpicById(epicId));
    };

    const onClickCreateEpic = () => {
        dispatch(modalActions.openModal(ModalTypes.EPIC));
    };

    const onClickCreateSprint = () => {
        dispatch(modalActions.openModal(ModalTypes.SPRINT));
    };

    const projectManagementProps: IProjectManagementProps = {
        epics,
        sprints,
        selectedEpic: selectedEpic ? selectedEpic.epicId : '',
        onClickCreateEpic,
        onClickCreateSprint,
        onSelectViewEpicSprints,
    };

    useEffect(() => {
        if (selectedEpic) {
            dispatch(sprintActions.getSprintsRequest(selectedEpic.epicId));
        }
    }, [dispatch, selectedEpic]);

    useEffect(() => {
        dispatch(epicActions.getEpicsRequest(projectId));
    }, [dispatch, projectId]);

    return <ProjectManagement {...projectManagementProps} />;
};

export default ProjectManagementContainer;
