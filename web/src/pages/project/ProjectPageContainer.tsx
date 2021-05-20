import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectPageRequest } from '../../redux/actions/projectActions';
import { getSelectedProject } from '../../redux/selectors/projectSelectors';
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const projectPageProps: IProjectPageProps = {
        project,
    };

    return <ProjectPage {...projectPageProps} />;
};

export default ProjectPageContainer;
