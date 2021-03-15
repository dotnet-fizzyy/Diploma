import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import StartBackground from '../../static/StartBackground.svg';
import { LaunchModalType } from '../../types/projectTypes';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '600px',
            height: '450px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 50px',
            backgroundImage: `url(${StartBackground})`,
            borderRadius: '15px',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
        },
        header: {
            color: 'white',
            fontSize: '26px',
            marginTop: '50px',
        },
        button: {
            width: '215px',
            backgroundColor: '#FFF',
            color: '#242126',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            textTransform: 'none',
            fontWeight: 'bold',
        },
        infoLabel: {
            color: 'white',
            fontSize: '20px',
            margin: '60px 0 30px 0',
        },
    })
);

export interface ILaunchBackgroundProps {
    teamExists: boolean;
    projectExists: boolean;
    onClickCreateProject: () => void;
    onClickCreateTeam: () => void;
}

const LaunchBackground = (props: ILaunchBackgroundProps) => {
    const classes = useStyles();
    const { teamExists, projectExists, onClickCreateProject, onClickCreateTeam } = props;

    const displayTitle = (type: LaunchModalType, onClick: () => void) => {
        const isTeam: boolean = type === LaunchModalType.Team;

        return (
            <>
                <span className={classnames(classes.text, classes.infoLabel)}>
                    To start working in a moment, simple create a {isTeam ? 'team' : 'project'}
                </span>
                <Button className={classnames(classes.button, classes.text)} variant="outlined" onClick={onClick}>
                    Create a {isTeam ? 'team' : 'project'}
                </Button>
            </>
        );
    };

    return (
        <div className={classes.root}>
            <span className={classnames(classes.text, classes.header)}>Welcome to the board!</span>
            {projectExists && displayTitle(LaunchModalType.Project, onClickCreateProject)}
            {teamExists && displayTitle(LaunchModalType.Team, onClickCreateTeam)}
        </div>
    );
};

export default LaunchBackground;
