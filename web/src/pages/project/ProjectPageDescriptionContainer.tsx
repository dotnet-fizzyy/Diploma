import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { setSelectedEpicById } from '../../redux/actions/epic';
import { openModal } from '../../redux/actions/modal';
import { getSprintsFromEpicRequest } from '../../redux/actions/sprint';
import { setSelectedTeamById } from '../../redux/actions/team';
import { getEpics, getSelectedEpicId } from '../../redux/selectors/epic';
import { getSprints } from '../../redux/selectors/sprint';
import { getTeamSimpleItems } from '../../redux/selectors/team';
import { IEpic } from '../../types/epicTypes';
import { IProject } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';
import { ITeamSimpleModel } from '../../types/teamTypes';
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
    const teams: ITeamSimpleModel[] = useSelector(getTeamSimpleItems);
    const selectedEpicId: string = useSelector(getSelectedEpicId);

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
        epicId && dispatch(getSprintsFromEpicRequest(epicId));
    };

    const onClickCreateSprint = (): void => {
        dispatch(openModal(ModalTypes.SPRINT));
    };

    const onClickViewBoard = (): void => {
        history.push(`/board`);
    };

    const onClickViewTeam = (teamId: string): void => {
        history.push(`/team/${teamId}`);
    };

    const onClickRemoveTeam = (teamId: string): void => {
        dispatch(setSelectedTeamById(teamId));
        dispatch(openModal(ModalTypes.TEAM, ModalOptions.TEAM_REMOVE));
    };

    const pageDescriptionProps: IProjectPageDescriptionProps = {
        epics,
        project,
        sprints,
        teams,
        selectedEpicId,
        onClickUpdateProjectInfo,
        onClickCreateTeamInfo,
        onClickViewBoard,
        onClickCreateEpic,
        onClickCreateSprint,
        onClickSelectEpic,
        onClickViewTeam,
        onClickRemoveTeam,
    };

    return <ProjectPageDescription {...pageDescriptionProps} />;
};

export default ProjectPageDescriptionContainer;
