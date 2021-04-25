import { MenuItem, Select, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { WorkspaceViewerRoute } from '../../../constants/routeConstants';
import { IUserProject, IUserTeam } from '../../../types/userTypes';

const useStyles = makeStyles(() =>
    createStyles({
        tab: {
            marginLeft: '30px',
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
        tabWithoutMargin: {
            marginLeft: 0,
            padding: '6px 16px',
        },
        dropdown: {
            marginLeft: '20px',
        },
        menuGutters: {
            padding: 0,
        },
    })
);

export interface ITabLinks {
    teams: IUserTeam[];
    projects: IUserProject[];
}

const TabLinks = (props: ITabLinks) => {
    const classes = useStyles();
    const { teams, projects } = props;

    const renderItemLinks = (items: (IUserTeam | IUserProject)[]): React.ReactNode => {
        if (items.length === 0) {
            return getActiveOrDisabledLink(false, '', '');
        }

        if (items.length === 1) {
            const isTeam: boolean = 'teamId' in items[0];

            return getActiveOrDisabledLink(
                true,
                isTeam ? `/team/${teams[0].teamId}` : `/project/${projects[0].projectId}`,
                isTeam ? 'Team' : 'Project'
            );
        }

        return (
            <Select className={classes.dropdown} value={'teamId' in items[0] ? teams[0].teamId : projects[0].projectId}>
                {items.map((x, index) => {
                    const route: string = 'teamId' in x ? `/team/${x.teamId}` : `/project/${x.projectId}`;
                    const key: string = 'teamId' in x ? x.teamId : x.projectId;
                    const label: string = 'teamId' in x ? x.teamName : x.projectName;

                    return (
                        <MenuItem key={index} value={key} classes={{ gutters: classes.menuGutters }}>
                            <Link to={route} className={classnames(classes.tab, classes.tabWithoutMargin)}>
                                {label}
                            </Link>
                        </MenuItem>
                    );
                })}
            </Select>
        );
    };

    const getActiveOrDisabledLink = (isActive: boolean, route: string, label: string): React.ReactNode => {
        return isActive ? (
            <Link to={route} className={classes.tab}>
                {label}
            </Link>
        ) : (
            <Tooltip title="This item has not been created yet">
                <span className={classnames(classes.tab, classes.disabledLink)}>{label}</span>
            </Tooltip>
        );
    };

    return (
        <>
            {getActiveOrDisabledLink(true, WorkspaceViewerRoute, 'Workspace')}
            {renderItemLinks(projects)}
            {renderItemLinks(teams)}
        </>
    );
};

export default TabLinks;
