import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        },
        header: {
            marginTop: '20px',
            fontSize: '26px',
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
        },
        teamLink: {
            fontSize: '18px',
            color: 'lightBlue',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    })
);

const TeamManagement = () => {
    const classes = useStyles();

    return <div className={classes.root} />;
};

export default TeamManagement;
