import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelectedEpicById } from '../../redux/actions/epicActions';
import { openModal } from '../../redux/actions/modalActions';
import { getSprintsFromEpicRequest } from '../../redux/actions/sprintsActions';
import { getEpics } from '../../redux/selectors/epicsSelectors';
import { getSprints } from '../../redux/selectors/sprintsSelectors';
import { IEpic } from '../../types/epicTypes';
import { ModalOptions, ModalTypes } from '../../types/modalTypes';
import { IProject } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';
import ProjectPageDescription, { IProjectPageDescriptionProps } from './ProjectPageDescription';

export interface IProjectPageDescriptionContainerProps {
    project: IProject;
}

const ProjectPageDescriptionContainer = (props: IProjectPageDescriptionContainerProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { project } = props;

    const sprints: ISprint[] = useSelector(getSprints);
    const epics: IEpic[] = useSelector(getEpics);

    const onClickUpdateProjectInfo = (): void => {
        dispatch(openModal(ModalTypes.PROJECT, ModalOptions.PROJECT_UPDATE));
    };

    const onClickCreateTeamInfo = (): void => {
        dispatch(openModal(ModalTypes.TEAM));
    };

    const onClickCreateEpic = (): void => {
        dispatch(openModal(ModalTypes.EPIC));
    };

    const onClickSelectEpic = (epicId: string): void => {
        dispatch(setSelectedEpicById(epicId));
        dispatch(getSprintsFromEpicRequest(epicId));
    };

    const onClickCreateSprint = (): void => {
        dispatch(openModal(ModalTypes.SPRINT));
    };

    const onClickViewBoard = (): void => {
        history.push(`/board/${project.projectId}`);
    };

    const pageDescriptionProps: IProjectPageDescriptionProps = {
        epics,
        project,
        sprints,
        onClickUpdateProjectInfo,
        onClickCreateTeamInfo,
        onClickViewBoard,
        onClickCreateEpic,
        onClickCreateSprint,
        onClickSelectEpic,
    };

    return <ProjectPageDescription {...pageDescriptionProps} />;
};

export default ProjectPageDescriptionContainer;
