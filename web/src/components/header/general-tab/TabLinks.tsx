import React from 'react';
import { TabLinkItems, TabLinkOptions } from '../../../constants';
import { IUserProject, IUserTeam } from '../../../types/userTypes';
import SelectTab, { ISelectTabItem } from './SelectTab';

export interface ITabLinks {
    teams: IUserTeam[];
    projects: IUserProject[];
    selectedTeamId: string;
    selectedProjectId: string;
    onChangeTeam: (e: any) => void;
    onChangeProject: (e: any) => void;
}

const TabLinks = (props: ITabLinks) => {
    const { teams, projects, selectedTeamId, selectedProjectId, onChangeTeam, onChangeProject } = props;

    const projectItems: ISelectTabItem[] = projects.map((x) => ({ key: x.projectId, value: x.projectName }));
    const teamItems: ISelectTabItem[] = teams.map((x) => ({ key: x.teamId, value: x.teamName }));
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

    return (
        <>
            <SelectTab value={defaultItemsTab[0].key} items={defaultItemsTab} isRoute={true} />
            <SelectTab value={selectedProjectId} items={projectItems} onChange={onChangeProject} isRoute={false} />
            <SelectTab value={selectedTeamId} items={teamItems} onChange={onChangeTeam} isRoute={false} />
        </>
    );
};

export default TabLinks;
