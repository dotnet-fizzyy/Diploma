import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IProject } from '../../types/projectTypes';
import { ITeam } from '../../types/teamTypes';
import { IUser } from '../../types/userTypes';
import LaunchBackground from './LaunchBackground';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: 'calc(100% - 60px)',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FAFAFA',
        },
        mainPageContainer: {
            padding: '30px 30px 0 30px',
        },
        launchScreenContainer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        header: {
            marginTop: '20px',
            fontSize: '30px',
            fontFamily: 'Poppins',
        },
        topicLabel: {
            fontSize: '24px',
            fontFamily: 'Poppins',
        },
        topicContainer: {
            marginTop: '20px',
        },
        body: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            marginTop: '30px',
        },
        infoContainer: {
            width: '100%',
            height: '100%',
            flexGrow: 1,
            flexBasis: 0,
        },
        teamContainer: {
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Poppins',
        },
        teamName: {
            fontSize: '20px',
        },
        teamMembersLabel: {
            fontSize: '20px',
            marginTop: '20px',
        },
        teamMembersContainer: {
            marginTop: '10px',
        },
        teamAvatar: {
            width: '24px',
            height: '24px',
            fontSize: '0.9rem',
            marginRight: '5px',
        },
        user: {
            display: 'flex',
            flexDirection: 'row',
            fontSize: '20px',
            marginBottom: '10px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
        projectName: {
            fontSize: '20px',
            marginBottom: '5px',
        },
        tasksButton: {
            backgroundColor: '#75BAF7',
            color: '#FFF',
            border: 'none',
            borderRadius: '5px',
            width: '150px',
            height: '45px',
            fontSize: '16px',
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'unset',
            marginTop: '10px',
        },
    })
);

export interface IMainPageProps {
    teams: ITeam[];
    projects: IProject[];
    user: IUser;
    onSelectTeam: (value: string) => void;
    onSelectProject: (value: string) => void;
    onClickCreateProject: () => void;
    onClickCreateTeam: () => void;
}

const MainPage = (props: IMainPageProps) => {
    const classes = useStyles();
    const { projects, teams, user, onSelectProject, onSelectTeam, onClickCreateProject, onClickCreateTeam } = props;

    const renderTeamMembersForOneTeam = (team: ITeam): React.ReactNode => {
        return (
            <div className={classes.teamContainer}>
                <span className={classes.teamName}>
                    <b>{team.teamName}</b>
                </span>
                <Button className={classes.tasksButton} variant="outlined" onClick={() => onSelectTeam(team.teamId)}>
                    Manage team
                </Button>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            {projects && teams && projects.length && teams.length ? (
                <div className={classes.mainPageContainer}>
                    <span className={classes.header}>Welcome back, {user.userName}!</span>
                    <div className={classes.body}>
                        <div className={classes.infoContainer}>
                            <span className={classes.topicLabel}>My projects</span>
                            <div className={classes.topicContainer}>
                                {projects.map((x) => (
                                    <div
                                        className={classes.teamContainer}
                                        style={{ marginBottom: '20px' }}
                                        key={x.projectId}
                                    >
                                        <span className={classes.projectName}>
                                            <b>{x.projectName}</b>
                                        </span>
                                        <span>{x.projectDescription}</span>
                                        <Button
                                            variant="outlined"
                                            className={classes.tasksButton}
                                            onClick={() => onSelectProject(x.projectId)}
                                        >
                                            Manage project
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.infoContainer}>
                            <span className={classes.topicLabel}>My team{teams && teams.length === 1 ? '' : 's'}</span>
                            <div className={classes.topicContainer}>
                                {teams.map((x) => (
                                    <React.Fragment key={x.teamId}>{renderTeamMembersForOneTeam(x)}</React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={classes.launchScreenContainer}>
                    <LaunchBackground
                        teamExists={!teams.length}
                        projectExists={!projects.length}
                        onClickCreateProject={onClickCreateProject}
                        onClickCreateTeam={onClickCreateTeam}
                    />
                </div>
            )}
        </div>
    );
};

export default MainPage;
