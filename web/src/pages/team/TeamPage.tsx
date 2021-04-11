import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TeamDescriptionPage from '../../components/team/TeamDescriptionPage';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
            backgroundColor: '#FAFAFA',
        },
        mainContainer: {
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
        },
        body: {
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            minHeight: '100%',
        },
    })
);

const TeamPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.mainContainer}>
                <TeamDescriptionPage />
            </div>
        </div>
    );
};

export default TeamPage;
