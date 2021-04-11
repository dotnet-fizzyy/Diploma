import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PageHeaderTab from '../header/page-header/PageHeaderTab';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            minHeight: '100%',
        },
        table: {
            marginTop: '50px',
        },
    })
);

const TeamDescriptionPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PageHeaderTab title="Team" description="TeamDesc" creationDate={new Date()} onClickUpdateInfo={null} />
        </div>
    );
};

export default TeamDescriptionPage;
