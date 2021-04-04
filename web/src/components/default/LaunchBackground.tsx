import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import StartBackground from '../../static/StartBackground.svg';

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
        body: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        },
        text: {
            fontFamily: 'Poppins',
            fontSize: '16px',
        },
        header: {
            color: 'white',
            fontSize: '26px',
            marginTop: '80px',
            fontWeight: 600,
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
            marginBottom: '30px',
            width: '100%',
            maxWidth: '500px',
            textAlign: 'center',
            fontFamily: 'Poppins',
            fontWeight: 500,
        },
    })
);

export interface ILaunchBackgroundProps {
    onClickCreateWorkSpace: () => void;
}

const LaunchBackground = (props: ILaunchBackgroundProps) => {
    const classes = useStyles();
    const { onClickCreateWorkSpace } = props;

    return (
        <div className={classes.root}>
            <span className={classnames(classes.text, classes.header)}>Welcome to the application!</span>
            <div className={classes.body}>
                <span className={classnames(classes.text, classes.infoLabel)}>
                    To start working in a moment, simple create a project and invite your team
                </span>
                <Button
                    className={classnames(classes.button, classes.text)}
                    variant="outlined"
                    onClick={onClickCreateWorkSpace}
                >
                    Create a workspace
                </Button>
            </div>
        </div>
    );
};

export default LaunchBackground;
