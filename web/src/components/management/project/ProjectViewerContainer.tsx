import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as modalActions from '../../../redux/actions/modalActions';
import * as projectActions from '../../../redux/actions/projectActions';
import * as projectSelectors from '../../../redux/selectors/projectSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import ProjectViewer, { IProjectViewerProps } from './ProjectViewer';

const ProjectViewerContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const projects = useSelector(projectSelectors.getProjectNames);

    const onClickAddProject = () => {
        dispatch(modalActions.openModal(ModalTypes.PROJECT));
    };

    const onProjectSelect = (value: string) => {
        history.push(`/project/${value}`);
        dispatch(projectActions.setCurrentProjectById(value));
    };

    const onClickViewBoard = (value: string) => {
        history.push(`/board/${value}`);
        dispatch(projectActions.setCurrentProjectById(value));
    };

    useEffect(() => {
        dispatch(projectActions.getUserProjectsRequest());
    }, [dispatch]);

    const projectViewerProps: IProjectViewerProps = {
        projects,
        onProjectSelect,
        onClickAddProject,
        onClickViewBoard,
    };

    return <ProjectViewer {...projectViewerProps} />;
};

export default ProjectViewerContainer;
