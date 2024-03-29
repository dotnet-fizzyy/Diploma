import { RouterState } from 'connected-react-router';
import { SidebarTypes } from '../../constants';
import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { SortDirection } from '../../constants/storyConstants';
import { IEpic, IEpicSimpleModel } from '../../types/epicTypes';
import { IProject, IProjectSimpleModel } from '../../types/projectTypes';
import { ISprint } from '../../types/sprintTypes';
import { IStory, IStoryColumns, IStoryHistory, IStorySimpleModel } from '../../types/storyTypes';
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
    router: RouterState;
}

export interface IUserState {
    isAuthenticationSuccessful: boolean;
    wasCustomerCreated: boolean;
    user?: IFullUser;
    isLoading: boolean;
    selectedTeam?: string;
    selectedProject?: string;
    emailExists: boolean;
}

export interface IStoryState {
    columns: IStoryColumns[];
    simpleItems: IStorySimpleModel[];
    selectedStoryId: string;
    wasStoryBlocked: boolean;
    storyHistory: IStoryHistoryState;
    isDragging: boolean;
    sortType: string;
    sortDirection: SortDirection;
}

export interface IStoryHistoryState {
    story: IStory;
    items: IStoryHistory[];
}

export interface ISidebarState {
    isVisible: boolean;
    isLoading: boolean;
    type?: SidebarTypes;
}

export interface ITeamState {
    teams: ITeam[];
    simpleItems: ITeamSimpleModel[];
    selectedTeamId: string;
}

export interface IProjectState {
    items: IProject[];
    workSpaceItems: IWorkSpacePageProject[];
    selectedProjectId: string;
}

export interface ISprintsState {
    sprints: ISprint[];
    selectedSprintId?: string;
}

export interface IModalState {
    isOpen: boolean;
    type?: ModalTypes;
    option?: ModalOptions;
    isPerformingRequest: boolean;
}

export interface IEpicsState {
    epics: IEpic[];
    simpleItems: IEpicSimpleModel[];
    selectedEpicId?: string;
}

export interface ISearch {
    searchTerm: string;
    searching: boolean;
    projects: IProjectSimpleModel[];
    teams: ITeamSimpleModel[];
}

export interface IWorkSpaceState {
    workSpace: IWorkSpace;
    search: ISearch;
    isLoading: boolean;
}
