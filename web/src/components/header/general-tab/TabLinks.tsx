import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { TabLinkItems, TabLinkOptions } from '../../../constants';
import { IUserProject, IUserTeam } from '../../../types/userTypes';
import SelectTab, { ISelectTabItem } from './SelectTab';

const useStyles = makeStyles(() =>
    createStyles({
        text: {
            textDecoration: 'none',
            fontFamily: 'Poppins, sans-serif',
            color: '#212624',
            fontSize: '18px',
            fontWeight: 'bold',
            marginLeft: '20px',
            '&:hover': {
                cursor: 'pointer',
            },
        },
    })
);

export interface ITabLinks {
    teams: IUserTeam[];
    projects: IUserProject[];
    selectedTeamId: string;
    selectedProjectId: string;
    onChangeTeam: (e: any) => void;
    onChangeProject: (e: any) => void;
}

const TabLinks = (props: ITabLinks) => {
    const classes = useStyles();
    const { teams, projects, selectedTeamId, selectedProjectId, onChangeTeam, onChangeProject } = props;

    const projectItems: ISelectTabItem[] = projects.map((x) => ({ key: x.projectId, value: x.projectName }));
    const teamItems: ISelectTabItem[] = teams.reduce(
        (acc, x) => (x.projectId === selectedProjectId ? [...acc, { key: x.teamId, value: x.teamName }] : acc),
        []
    );
    const defaultItemsTab: ISelectTabItem[] = TabLinkItems.map((x) => {
        switch (x.key) {
            case TabLinkOptions.WORKSPACE:
                x.link = '/workspace';
                break;
            case TabLinkOptions.BOARD:
                x.link = `/board?projectId=${selectedProjectId}&teamId=${selectedTeamId}`;
                break;
            case TabLinkOptions.PROJECT:
                x.link = `/project/${selectedProjectId}`;
                break;
            case TabLinkOptions.TEAM:
                x.link = `/team/${selectedTeamId}`;
                break;
            case TabLinkOptions.CHARTS:
                x.link = ``;
                break;
            default:
                break;
        }

        return x;
    });

    const getSelectTab = (
        items: ISelectTabItem[],
        onChange: (e: any) => void,
        isRoute: boolean,
        selectedValue: string,
        label: string
    ): React.ReactNode => {
        if (!items && !items.length) {
            return <span className={classes.text}>{label}</span>;
        }

        if (items && items.length === 1) {
            return <span className={classes.text}>{items[0].value}</span>;
        }

        return <SelectTab value={selectedValue} items={items} onChange={onChange} isRoute={isRoute} />;
    };

    return (
        <>
            <SelectTab value={defaultItemsTab[0].key} items={defaultItemsTab} isRoute={true} />
            {getSelectTab(projectItems, onChangeProject, false, selectedProjectId, 'Project')}
            {getSelectTab(teamItems, onChangeTeam, false, selectedTeamId, 'Team')}
        </>
    );
};

export default TabLinks;
