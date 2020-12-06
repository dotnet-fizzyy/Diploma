import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as modalActions from '../../../redux/actions/modalActions';
import * as projectSelectors from '../../../redux/selectors/projectSelectors';
import { ModalTypes } from '../../../types/modalTypes';
import ProjectViewer, { IProjectViewerProps } from './ProjectViewer';

const ProjectViewerContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const projects = useSelector(projectSelectors.getProjectNames);

    const onClickAddProject = () => {
        dispatch(modalActions.openModal(ModalTypes.PROJECT_CREATION));
    };

    const onProjectSelect = (value: string) => {
        history.push(`/project/${value}`);
    };

    const projectViewerProps: IProjectViewerProps = {
        projects,
        onProjectSelect,
        onClickAddProject,
    };

    return <ProjectViewer {...projectViewerProps} />;
};

export default ProjectViewerContainer;
