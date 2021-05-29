import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IWorkSpacePageProject } from '../../types/workSpaceTypes';
import Accordion from '../common/Accordion';
import ProjectSummaryInfo from './ProjectDetails';

const useStyles = makeStyles(() =>
    createStyles({
        text: {
            fontFamily: 'Poppins',
            fontWeight: 500,
            fontSize: '16px',
            color: '#242126',
        },
    })
);

export interface IProjectShortDescriptionProps {
    expanded: boolean;
    project: IWorkSpacePageProject;
    onChangeSelectedProjectId: (projectId: string) => void;
    onClickViewProject: (projectId: string) => void;
    onClickViewTeam: (teamId: string) => void;
    onClickRemoveProject: () => void;
}

const ProjectAccordion = (props: IProjectShortDescriptionProps) => {
    const classes = useStyles();
    const {
        project,
        expanded,
        onChangeSelectedProjectId,
        onClickViewProject,
        onClickViewTeam,
        onClickRemoveProject,
    } = props;

    const onChange = (event: React.ChangeEvent<{}>, expanded: boolean) => {
        onChangeSelectedProjectId(expanded ? project.projectId : '');
    };

    const getProjectShortInfo = (): React.ReactNode => <span className={classes.text}>{project.projectName}</span>;

    return (
        <Accordion
            expanded={expanded}
            onChange={onChange}
            summary={getProjectShortInfo()}
            details={
                <ProjectSummaryInfo
                    projectId={project.projectId}
                    teams={project.teams}
                    onClickViewProject={onClickViewProject}
                    onClickViewTeam={onClickViewTeam}
                    onClickRemoveProject={onClickRemoveProject}
                />
            }
        />
    );
};

export default ProjectAccordion;
