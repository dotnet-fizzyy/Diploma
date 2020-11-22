import { SpinnerComponent } from "../../types";
import { IProject } from "../../types/projectTypes";
import { ISprint } from "../../types/sprintTypes";
import { IStory, IStoryColumns } from "../../types/storyTypes";
import { ITeam } from "../../types/teamTypes";
import { IUser } from "../../types/userTypes";

export interface IState {
  project: IProjectState;
  currentUser: ICurrentUserState;
  stories: IStoryState;
  sidebar: ISidebarState;
  sprints: ISprintsState;
  teams: ITeamState;
  requestProcessor: IRequestProcessorState;
}

export interface ICurrentUserState {
  accessToken: string;
  refreshToken: string;
  user: IUser | null;
}

export interface IStoryState {
  columns: IStoryColumns[];
  selectedStory: IStory | null | undefined;
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
  selectedProject: IProject;
}

export interface ISprintsState {
  sprints: ISprint[];
  currentSprint: ISprint | null | undefined;
}

export interface IRequestProcessorState {
  component: SpinnerComponent | null;
  isVisible: boolean;
}
