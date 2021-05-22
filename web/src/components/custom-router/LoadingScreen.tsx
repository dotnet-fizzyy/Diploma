import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Spinner from '../common/Spinner';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        },
        title: {
            fontSize: '24px',
            fontFamily: 'Poppins',
            color: '#242126',
            marginTop: '30px',
        },
    })
);

const LoadingScreen = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Spinner size={80} />
            <span className={classes.title}>Redirecting...</span>
        </div>
    );
};

export default LoadingScreen;
