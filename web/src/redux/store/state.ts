import { IEpic } from '../../types/epicTypes';
import { ModalOptions, ModalTypes } from '../../types/modalTypes';
import { IProject } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';
import { IStory, IStoryColumns, IStoryHistory } from '../../types/storyTypes';
import { ITeam, ITeamListItem } from '../../types/teamTypes';
import { IFullUser } from '../../types/userTypes';
import { IWorkSpace, IWorkSpacePageProject } from '../../types/workSpaceTypes';

export interface IState {
    project: IProjectState;
    currentUser: IUserState;
    stories: IStoryState;
    sidebar: ISidebarState;
    sprints: ISprintsState;
    teams: ITeamState;
    modal: IModalState;
    epics: IEpicsState;
    workspace: IWorkSpaceState;
}

export interface IUserState {
    isAuthenticationSuccessful: boolean;
    wasCustomerCreated: boolean;
    accessToken: string;
    refreshToken: string;
    user?: IFullUser;
    isLoading: boolean;
}

export interface IStoryState {
    columns: IStoryColumns[];
    selectedStory: IStory | null | undefined;
    wasStoryBlocked: boolean;
    storyTitleTerm: string;
    searchResult: IStory[];
    storyHistory: IStoryHistory[];
    isDragging: boolean;
    sortType: string;
}

export interface ISidebarState {
    isVisible: boolean;
}

export interface ITeamState {
    teams: ITeam[];
    simpleItems: ITeamListItem[];
    selectedTeam?: ITeam;
}

export interface IProjectState {
    projects: IProject[];
    selectedProject: IProject;
}

export interface ISprintsState {
    sprints: ISprint[];
    selectedSprint?: ISprint;
}

export interface IModalState {
    isOpen: boolean;
    type?: ModalTypes;
    option?: ModalOptions;
}

export interface IEpicsState {
    epics: IEpic[];
    selectedEpic: IEpic;
}

export interface IWorkSpaceState {
    workSpace: IWorkSpace;
    projects: IWorkSpacePageProject[];
    isLoading: boolean;
}
