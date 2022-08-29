import { createStyles, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import MainLabel, { LabelType } from '../../components/common/MainLabel';
import PageHeaderTab from '../../components/header/page-header/PageHeaderTab';
import ProjectTab from '../../components/project/ProjectTab';
import { DateFormat } from '../../constants';
import { IEpic } from '../../types/epic';
import { IProject } from '../../types/project';
import { ISprint } from '../../types/sprint';
import { ITeamSimpleModel } from '../../types/team';
import ProjectEpicExpansionPanel from './ProjectEpicExpansionPanel';
import TeamCard from './TeamCard';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
        },
        body: {
            padding: '30px',
        },
        teamsContainer: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        table: {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
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
        epicPanelContainer: {
            marginBottom: '20px',
        },
        epicsLabelContainer: {
            margin: '20px 0',
        },
        teamCardContainer: {
            marginLeft: '10px',
            '&:first-child': {
                marginLeft: 0,
            },
        },
    })
);

export interface IProjectPageDescriptionProps {
    epics: IEpic[];
    sprints: ISprint[];
    teams: ITeamSimpleModel[];
    project: IProject;
    selectedEpicId: string;
    onClickUpdateProjectInfo: () => void;
    onClickCreateTeamInfo: () => void;
    onClickViewBoard: () => void;
    onClickCreateEpic: () => void;
    onClickCreateSprint: () => void;
    onClickSelectEpic: (epicId: string) => void;
    onClickViewTeam: (teamId: string) => void;
    onClickRemoveTeam: (teamId: string) => void;
}

const ProjectPageDescription = (props: IProjectPageDescriptionProps) => {
    const classes = useStyles();
    const {
        epics,
        sprints,
        project,
        teams,
        selectedEpicId,
        onClickUpdateProjectInfo,
        onClickCreateTeamInfo,
        onClickViewBoard,
        onClickCreateEpic,
        onClickCreateSprint,
        onClickSelectEpic,
        onClickViewTeam,
        onClickRemoveTeam,
    } = props;

    return (
        <div className={classes.root}>
            <ProjectTab
                onClickUpdateProjectInfo={onClickUpdateProjectInfo}
                onClickCreateTeamInfo={onClickCreateTeamInfo}
                onClickViewBoard={onClickViewBoard}
                onClickCreateEpic={onClickCreateEpic}
            />
            <div className={classes.body}>
                <PageHeaderTab
                    title={project.projectName}
                    descriptionItems={[
                        { title: 'Description', description: project.projectDescription },
                        {
                            title: 'Project timeline',
                            description: `${moment(project.startDate).format(DateFormat)} - ${moment(
                                project.endDate
                            ).format(DateFormat)}`,
                        },
                        { title: 'Creation date', description: moment(project.creationDate).format(DateFormat) },
                    ]}
                />
                <div className={classes.epicsLabelContainer}>
                    <MainLabel title="Teams" variant={LabelType.SECONDARY} />
                </div>
                <div className={classes.teamsContainer}>
                    {teams && teams.length
                        ? teams.map((x) => (
                              <div key={x.teamId} className={classes.teamCardContainer}>
                                  <TeamCard
                                      team={x}
                                      onClickRemoveTeam={onClickRemoveTeam}
                                      onClickViewTeam={onClickViewTeam}
                                  />
                              </div>
                          ))
                        : null}
                </div>
                <div className={classes.epicsLabelContainer}>
                    <MainLabel title="Epics" variant={LabelType.SECONDARY} />
                </div>
                <div className={classes.table}>
                    {epics && epics.length
                        ? epics.map((x) => (
                              <div key={x.epicId} className={classes.epicPanelContainer}>
                                  <ProjectEpicExpansionPanel
                                      epic={x}
                                      sprints={sprints}
                                      selectedEpicId={selectedEpicId}
                                      onClickSelectEpic={onClickSelectEpic}
                                      onClickCreateSprint={onClickCreateSprint}
                                  />
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </div>
    );
};

export default ProjectPageDescription;
