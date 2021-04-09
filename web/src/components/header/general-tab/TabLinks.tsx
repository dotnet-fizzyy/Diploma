import { Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
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
            '&:hover': {
                cursor: 'pointer',
            },
        },
        disabledLink: {
            color: '#959898',
            fontWeight: 500,
        },
    })
);

export interface ITabLinks {
    teamId: string;
    projectId: string;
}

const TabLinks = (props: ITabLinks) => {
    const classes = useStyles();
    const { teamId, projectId } = props;

    const getActiveOrDisabledLink = (isActive: boolean, route: string, label: string): React.ReactNode =>
        isActive ? (
            <Link to={route} className={classes.tab}>
                {label}
            </Link>
        ) : (
            <Tooltip title="This item has not been created yet">
                <span className={classnames(classes.tab, classes.disabledLink)}>{label}</span>
            </Tooltip>
        );

    return (
        <>
            {getActiveOrDisabledLink(true, WorkspaceViewerRoute, 'Workspace')}
            {getActiveOrDisabledLink(!!projectId, `/project/${projectId}`, 'Project')}
            {getActiveOrDisabledLink(!!teamId, `/team/${teamId}`, 'Team')}
        </>
    );
};

export default TabLinks;
