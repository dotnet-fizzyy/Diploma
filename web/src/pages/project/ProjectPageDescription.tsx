import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
import ProjectList from '../../components/project/ProjectList';
import ProjectTab from '../../components/project/ProjectTab';
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
        settingsHeaderPart: {
            flexGrow: 0,
            flexBasis: '180px',
            flexShrink: 0,
            '& button': {
                marginBottom: '10px',
            },
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
    onClickSelectEpic: (epicId: string) => void;
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
        onClickSelectEpic,
    } = props;

    return (
        <div className={classes.root}>
            <ProjectTab
                onClickUpdateProjectInfo={onClickUpdateProjectInfo}
                onClickCreateTeamInfo={onClickCreateTeamInfo}
                onClickViewBoard={onClickViewBoard}
            />
            <div className={classes.body}>
                <PageHeaderTab
                    title={project.projectName}
                    descriptionItems={[{ title: 'Description', description: project.projectDescription }]}
                    creationDate={project.creationDate}
                />
                <div className={classes.table}>
                    <ProjectList
                        label="Epics"
                        listItems={epics}
                        onClickSelectEpic={onClickSelectEpic}
                        onClickCreate={onClickCreateEpic}
                    />
                    <ProjectList label="Sprints" listItems={sprints} onClickCreate={onClickCreateSprint} />
                </div>
            </div>
        </div>
    );
};

export default ProjectPageDescription;
