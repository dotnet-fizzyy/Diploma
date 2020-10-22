import { IStory, IStoryColumns } from "../../types/storyTypes";
import { IState } from "../store/state";

export function getColumns(state: IState): IStoryColumns[] {
  return state.stories.columns;
}

export function getSelectedStory(state: IState): IStory | null | undefined {
  return state.stories.selectedStory;
}
