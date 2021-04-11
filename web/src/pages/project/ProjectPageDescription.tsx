import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Button from '../../components/common/Button';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
import ProjectList from '../../components/project/ProjectList';
import { IEpic } from '../../types/epicTypes';
import { IProject } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
        },
        body: {
            padding: '30px',
        },
        table: {
            marginTop: '50px',
            display: 'flex',
            flexDirection: 'row',
        },
        collectionItem: {
            marginTop: '20px',
            display: 'flex',
            alignItems: 'center',
        },
        epicName: {
            fontFamily: 'Poppins',
            fontSize: '16px',
            display: 'flex',
            alignItems: 'center',
        },
        dates: {
            fontSize: '16px',
            color: '#AFC1C4',
        },
    })
);

export interface IProjectPageDescriptionProps {
    epics: IEpic[];
    sprints: ISprint[];
    project: IProject;
    onClickUpdateProjectInfo: () => void;
    onClickCreateTeamInfo: () => void;
    onClickViewBoard: () => void;
    onClickCreateEpic: () => void;
    onClickCreateSprint: () => void;
}

const ProjectPageDescription = (props: IProjectPageDescriptionProps) => {
    const classes = useStyles();
    const {
        epics,
        sprints,
        project,
        onClickUpdateProjectInfo,
        onClickCreateTeamInfo,
        onClickViewBoard,
        onClickCreateEpic,
        onClickCreateSprint,
    } = props;

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <PageHeaderTab
                    title={project.projectName}
                    description={project.projectDescription}
                    creationDate={project.creationDate}
                    onClickUpdateInfo={onClickUpdateProjectInfo}
                >
                    <Button label="Add team" disabled={false} onClick={onClickCreateTeamInfo} />
                    <Button label="View board" disabled={false} onClick={onClickViewBoard} />
                </PageHeaderTab>
                <div className={classes.table}>
                    <ProjectList label="Epics" listItems={epics} onClickCreate={onClickCreateEpic} />
                    <ProjectList label="Sprints" listItems={sprints} onClickCreate={onClickCreateSprint} />
                </div>
            </div>
        </div>
    );
};

export default ProjectPageDescription;
