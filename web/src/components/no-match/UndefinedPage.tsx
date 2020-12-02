import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        header: {
            fontSize: '40px',
            marginBottom: '30px',
        },
        route: {
            fontStyle: 'italic',
            fontSize: '20px',
        },
        description: {
            display: 'block',
            fontSize: '22px',
            marginBottom: '30px',
            '&:last-child': {
                margin: '30px 0 0 0',
            },
        },
    })
);

const UndefinedPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1 className={classes.header}>404 | Unknown route</h1>
            <span className={classes.description}>Unfortunately, the route</span>
            <span className={classes.route}>{window.location.href}</span>
            <span className={classes.description}>Does not exist</span>
        </div>
    );
};

export default UndefinedPage;
