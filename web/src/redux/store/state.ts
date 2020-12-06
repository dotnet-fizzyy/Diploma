import { SpinnerComponent } from '../../types';
import { IEpic } from '../../types/epicTypes';
import { ModalTypes } from '../../types/modalTypes';
import { IProject } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';
import { IStory, IStoryColumns, IStoryHistory } from '../../types/storyTypes';
import { ITeam } from '../../types/teamTypes';
import { IUser } from '../../types/userTypes';

export interface IState {
    project: IProjectState;
    currentUser: ICurrentUserState;
    stories: IStoryState;
    sidebar: ISidebarState;
    sprints: ISprintsState;
    teams: ITeamState;
    requestProcessor: IRequestProcessorState;
    modal: IModalState;
    epics: IEpicsState;
}

export interface ICurrentUserState {
    isAuthenticationSuccessful: boolean;
    wasCustomerCreated: boolean;
    accessToken: string;
    refreshToken: string;
    user: IUser | null;
}

export interface IStoryState {
    columns: IStoryColumns[];
    selectedStory: IStory | null | undefined;
    wasStoryBlocked: boolean;
    storyTitleTerm: string;
    searchResult: IStory[];
    storyHistory: IStoryHistory[];
    isDragging: boolean;
}

export interface ISidebarState {
    isVisible: boolean;
}

export interface ITeamState {
    teams: ITeam[];
    currentTeam: ITeam | null;
}

export interface IProjectState {
    projects: IProject[];
    currentProject: IProject;
}

export interface ISprintsState {
    sprints: ISprint[];
    currentSprint: ISprint | null | undefined;
}

export interface IRequestProcessorState {
    component: SpinnerComponent | null;
    isVisible: boolean;
}

export interface IModalState {
    isOpen: boolean;
    type?: ModalTypes;
}

export interface IEpicsState {
    epics: IEpic[];
    currentEpic: IEpic;
}
