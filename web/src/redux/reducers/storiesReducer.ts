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
