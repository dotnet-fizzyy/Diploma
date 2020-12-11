import { Avatar } from '@material-ui/core';
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
            fontSize: '24px',
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
    const { projects, teams, user, onClickCreateProject, onClickCreateTeam } = props;

    const isOneTeam = teams && teams.length === 1;

    const renderTeamMembersForOneTeam = (team: ITeam): React.ReactNode => {
        return (
            <div className={classes.teamContainer}>
                <span className={classes.teamName}>{team.teamName}</span>
                {isOneTeam ? (
                    <>
                        <span className={classes.teamMembersLabel}>Team members:</span>
                        <div className={classes.teamMembersContainer}>
                            {team.users &&
                                team.users.map((x) => (
                                    <div className={classes.user} key={x.userId}>
                                        <Avatar className={classes.teamAvatar} src={x.avatarLink}>
                                            {x.userName.slice(0, 1)}
                                        </Avatar>
                                        <span>{x.userName}</span>
                                    </div>
                                ))}
                        </div>
                    </>
                ) : null}
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
                                    <div key={x.projectId}>
                                        <span>{x.projectName}</span>
                                        <span>{x.projectDescription}</span>
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
