import { ColumnIds } from '../../constants/boardConstants';
import { IStoryColumns } from '../../types/storyTypes';
import * as storyActions from '../actions/storiesActions';
import { IStoryState } from '../store/state';

const initialColumnState: IStoryColumns[] = [
    { key: ColumnIds.ToDo, value: [] },
    { key: ColumnIds.InProgress, value: [] },
    { key: ColumnIds.InReview, value: [] },
    { key: ColumnIds.Testing, value: [] },
    { key: ColumnIds.Confirmed, value: [] },
    { key: ColumnIds.OnProd, value: [] },
];

const initialState: IStoryState = {
    columns: initialColumnState,
    selectedStory: null,
    wasStoryBlocked: false,
    storyTitleTerm: '',
    searchResult: [],
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
        case storyActions.StoryActions.UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION:
            return handleStoryDragAndDrop(state, action);
        case storyActions.StoryActions.SET_STORY_TITLE_TERM:
            return handleSetStoryTitleTerm(state, action);
        case storyActions.StoryActions.SET_STORIES_FOUND_BY_TERM:
            return handleSetStoriesFoundByTerm(state, action);
        case storyActions.StoryActions.BLUR_STORY_TITLE_TERM:
            return handleBlurStoryTitleTerm(state, action);
        case storyActions.StoryActions.ATTEMPT_TO_BLOCK_STORY:
            return handleAttemptToBlockStory(state, action);
        case storyActions.StoryActions.DECLINE_STORY_BLOCK:
            return handleDeclineStoryBlock(state, action);
        default:
            return state;
    }
}

function handleAddStories(state: IStoryState, action: storyActions.IAddStories): IStoryState {
    return {
        ...state,
        columns: state.columns.map((column) => {
            return {
                key: column.key,
                value: action.payload.filter((story) => story.columnType === column.key),
            } as IStoryColumns;
        }),
    };
}

function handleSelectStory(state: IStoryState, action: storyActions.ISelectStory): IStoryState {
    return {
        ...state,
        selectedStory: state.columns
            .map((column) => column.value)
            .reduce((accumulator, story) => accumulator.concat(story), [])
            .find((story) => story.storyId === action.payload),
    };
}

function handleMakeStoryBlocked(state: IStoryState, action: storyActions.IMakeStoryBlocked): IStoryState {
    return {
        ...state,
        columns: state.columns.map((column) => {
            return {
                ...column,
                value: column.value.map((story) => {
                    return story.storyId === action.payload
                        ? {
                              ...story,
                              isReady: false,
                              isBlocked: !story.isBlocked,
                          }
                        : story;
                }),
            };
        }),
    };
}

function handleMakeStoryReady(state: IStoryState, action: storyActions.IMakeStoryBlocked): IStoryState {
    return {
        ...state,
        columns: state.columns.map((column) => {
            return {
                ...column,
                value: column.value.map((story) => {
                    return story.storyId === action.payload
                        ? {
                              ...story,
                              isBlocked: false,
                              isReady: !story.isReady,
                          }
                        : story;
                }),
            };
        }),
    };
}

function handleStoryDragAndDrop(
    state: IStoryState,
    action: storyActions.IUpdateStoriesAfterDragAndDropAction
): IStoryState {
    return {
        ...state,
        columns: action.payload,
    };
}

function handleSetStoryTitleTerm(state: IStoryState, action: storyActions.ISetStoryTitleTerm): IStoryState {
    return {
        ...state,
        storyTitleTerm: action.payload,
    };
}

function handleSetStoriesFoundByTerm(state: IStoryState, action: storyActions.ISetStoriesFoundByTerm): IStoryState {
    return {
        ...state,
        searchResult: action.payload,
    };
}

function handleBlurStoryTitleTerm(state: IStoryState, action: storyActions.IBlurStoryTitleTerm): IStoryState {
    return {
        ...state,
        storyTitleTerm: '',
        searchResult: [],
    };
}

function handleAttemptToBlockStory(state: IStoryState, action: storyActions.IAttemptToBlockStory): IStoryState {
    return {
        ...state,
        wasStoryBlocked: true,
    };
}

function handleDeclineStoryBlock(state: IStoryState, action: storyActions.IDeclineStoryBlock): IStoryState {
    return {
        ...state,
        wasStoryBlocked: false,
        columns: state.columns.map((column) => {
            return {
                ...column,
                value: column.value.map((story) => {
                    return story.storyId === action.payload
                        ? {
                              ...story,
                              isBlocked: false,
                          }
                        : story;
                }),
            };
        }),
    };
}
