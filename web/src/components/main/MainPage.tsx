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

    return (
        <div className={classes.root}>
            {projects && teams && projects.length && teams.length ? (
                <>
                    <span className={classes.header}>Welcome back, {user.userName}!</span>
                    <div className={classes.body}>
                        <div className={classes.infoContainer}>
                            <span>My projects</span>
                        </div>
                        <div className={classes.infoContainer}>
                            <span>My Teams</span>
                        </div>
                    </div>
                </>
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
