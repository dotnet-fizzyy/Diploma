import { IStory } from "../../types";

export interface IState {
  currentUser: ICurrentUserState;
  stories: IStoryState;
}

export interface ICurrentUserState {
  access_token: string;
}

export interface IStoryState {
  stories: IStory[];
  selectedStory: IStory | null | undefined;
}
