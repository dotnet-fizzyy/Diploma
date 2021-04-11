import React from 'react';
import ProjectPageDescription from '../../components/project/ProjectPageDescription';
import { IProject } from '../../types/projectTypes';

export interface IProjectPageProps {
    project: IProject;
}

const ProjectPage = (props: IProjectPageProps) => {
    const { project } = props;

    return <ProjectPageDescription project={project} />;
};

export default ProjectPage;
