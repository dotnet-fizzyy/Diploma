import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { SortDirection } from '../../constants/storyConstants';
import { IEpic, IEpicSimpleModel } from '../../types/epicTypes';
import { IProject } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';
import { IStory, IStoryColumns, IStoryHistory } from '../../types/storyTypes';
import { ITeam, ITeamSimpleModel } from '../../types/teamTypes';
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
    user?: IFullUser;
    isLoading: boolean;
    selectedTeam?: string;
    selectedProject?: string;
}

export interface IStoryState {
    columns: IStoryColumns[];
    selectedStoryId: string;
    wasStoryBlocked: boolean;
    storyTitleTerm: string;
    searchResult: IStory[];
    storyHistory: IStoryHistory[];
    isDragging: boolean;
    sortType: string;
    sortDirection: SortDirection;
}

export interface ISidebarState {
    isVisible: boolean;
    isLoading: boolean;
}

export interface ITeamState {
    teams: ITeam[];
    simpleItems: ITeamSimpleModel[];
    selectedTeam?: ITeam;
}

export interface IProjectState {
    projects: IProject[];
    selectedProject: IProject;
}

export interface ISprintsState {
    sprints: ISprint[];
    selectedSprintId?: string;
}

export interface IModalState {
    isOpen: boolean;
    type?: ModalTypes;
    option?: ModalOptions;
}

export interface IEpicsState {
    epics: IEpic[];
    simpleItems: IEpicSimpleModel[];
    selectedEpicId?: string;
}

export interface IWorkSpaceState {
    workSpace: IWorkSpace;
    projects: IWorkSpacePageProject[];
    isLoading: boolean;
}
