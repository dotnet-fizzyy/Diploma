import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IProject } from '../../types/projectTypes';
import ProjectPageDescriptionContainer from './ProjectPageDescriptionContainer';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
        },
    })
);

export interface IProjectPageProps {
    project: IProject;
}

const ProjectPage = (props: IProjectPageProps) => {
    const classes = useStyles();
    const { project } = props;

    return (
        <div className={classes.root}>
            {project && project.projectId && <ProjectPageDescriptionContainer project={project} />}
        </div>
    );
};

export default ProjectPage;
