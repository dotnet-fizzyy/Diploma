import * as storyActions from "../actions/storiesActions";
import { IStoryState } from "../store/state";

const initialState: IStoryState = {
  stories: [],
  selectedStory: null,
};

export default function storiesReducer(state = initialState, action: any) {
  switch (action.type) {
    case storyActions.StoryActions.ADD_STORIES:
      return handleAddStories(state, action);
    case storyActions.StoryActions.SELECT_STORY:
      return handleSelectStory(state, action);
    case storyActions.StoryActions.MAKE_STORY_BLOCKED:
      return handleMakeStoryBlocked(state, action);
    case storyActions.StoryActions.MAKE_STORY_READY:
      return handleMakeStoryReady(state, action);
    default:
      return initialState;
  }
}

function handleAddStories(
  state: IStoryState,
  action: storyActions.IAddStories
): IStoryState {
  return {
    ...state,
    stories: action.payload,
  };
}

function handleSelectStory(
  state: IStoryState,
  action: storyActions.ISelectStory
): IStoryState {
  return {
    ...state,
    selectedStory: state.stories.find(
      (story) => story.storyId === action.payload
    ),
  };
}

function handleMakeStoryBlocked(
  state: IStoryState,
  action: storyActions.IMakeStoryBlocked
): IStoryState {
  return {
    ...state,
    stories: state.stories.map((story) => {
      return story.storyId === action.payload
        ? {
            ...story,
            isBlocked: !story.isBlocked,
          }
        : {
            ...story,
          };
    }),
  };
}

function handleMakeStoryReady(
  state: IStoryState,
  action: storyActions.IMakeStoryBlocked
): IStoryState {
  return {
    ...state,
    stories: state.stories.map((story) => {
      return story.storyId === action.payload
        ? {
            ...story,
            isReady: !story.isReady,
          }
        : {
            ...story,
          };
    }),
  };
}
