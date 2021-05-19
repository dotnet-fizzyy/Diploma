import { RouterState } from 'connected-react-router';
import { SidebarTypes } from '../../constants';
import { ModalOptions, ModalTypes } from '../../constants/modalConstants';
import { SortDirection } from '../../constants/storyConstants';
import { IEpic, IEpicSimpleModel } from '../../types/epicTypes';
import { IProject } from '../../types/projectTypes';
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
    searchTerm?: string;
    isLoading: boolean;
}
