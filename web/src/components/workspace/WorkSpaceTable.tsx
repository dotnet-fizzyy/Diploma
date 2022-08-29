import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IWorkSpacePageProject } from '../../types/workspace';
import MainLabel, { LabelType } from '../common/MainLabel';
import ProjectAccordion from './ProjectAccordion';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            overflowY: 'auto',
        },
        text: {
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '16px',
        },
        projectContainer: {
            marginBottom: '20px',
        },
        headerContainer: {
            marginBottom: '20px',
        },
    })
);

export interface IWorkSpaceTableProps {
    selectedProjectId: string;
    workSpaceProjects: IWorkSpacePageProject[];
    onClickViewProject: (projectId: string) => void;
    onClickViewTeam: (teamId: string) => void;
    onChangeSelectedProjectId: (projectId: string) => void;
    onClickRemoveProject: () => void;
}

const WorkSpaceTable = (props: IWorkSpaceTableProps) => {
    const classes = useStyles();
    const {
        workSpaceProjects,
        selectedProjectId,
        onChangeSelectedProjectId,
        onClickViewProject,
        onClickViewTeam,
        onClickRemoveProject,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.headerContainer}>
                <MainLabel title="Projects" variant={LabelType.SECONDARY} />
            </div>
            {workSpaceProjects && workSpaceProjects.length
                ? workSpaceProjects.map((project) => (
                      <div key={project.projectId} className={classes.projectContainer}>
                          <ProjectAccordion
                              expanded={selectedProjectId === project.projectId}
                              project={project}
                              onChangeSelectedProjectId={onChangeSelectedProjectId}
                              onClickViewTeam={onClickViewTeam}
                              onClickViewProject={onClickViewProject}
                              onClickRemoveProject={onClickRemoveProject}
                          />
                      </div>
                  ))
                : null}
        </div>
    );
};

export default WorkSpaceTable;
