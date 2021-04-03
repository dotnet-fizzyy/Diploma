import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { WorkspaceViewerRoute } from '../../../constants/routeConstants';

const useStyles = makeStyles(() =>
    createStyles({
        tab: {
            marginLeft: '50px',
            textDecoration: 'none',
            fontFamily: 'Poppins, sans-serif',
            color: '#212624',
            fontSize: '18px',
            fontWeight: 'bold',
        },
    })
);

export interface ITabLinks {
    teamId: string;
}

const TabLinks = (props: ITabLinks) => {
    const classes = useStyles();
    const { teamId } = props;

    return (
        <>
            <Link to={WorkspaceViewerRoute} className={classes.tab}>
                Workspace
            </Link>
            <Link to={`/team/${teamId}`} className={classes.tab}>
                Team
            </Link>
        </>
    );
};

export default TabLinks;
