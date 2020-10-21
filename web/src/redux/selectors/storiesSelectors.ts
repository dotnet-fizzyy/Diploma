import { IState } from "../store/state";

export function getStories(state: IState) {
  return state.stories.stories;
}

export function getSelectedStories(state: IState) {
  return state.stories.selectedStory;
}
