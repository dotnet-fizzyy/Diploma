import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectPageRequest } from '../../redux/actions/project';
import { getSelectedProject } from '../../redux/selectors/project';
import { IProject } from '../../types/projectTypes';
import ProjectPage, { IProjectPageProps } from './ProjectPage';

const ProjectPageContainer = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const project: IProject = useSelector(getSelectedProject);

    useEffect(() => {
        if (params && 'projectId' in params) {
            dispatch(getProjectPageRequest((params as any).projectId));
        }
    }, [dispatch, params]);

    const projectPageProps: IProjectPageProps = {
        project,
    };

    return <ProjectPage {...projectPageProps} />;
};

export default ProjectPageContainer;
