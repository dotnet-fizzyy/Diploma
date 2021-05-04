import { ColumnIds } from '../../constants/boardConstants';
import { SortDirection, SortFields } from '../../constants/storyConstants';
import { IStory, IStoryColumns } from '../../types/storyTypes';
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
    selectedStoryId: '',
    wasStoryBlocked: false,
    storyTitleTerm: '',
    searchResult: [],
    storyHistory: [],
    isDragging: false,
    sortType: SortFields.PRIORITY.toUpperCase(),
    sortDirection: SortDirection.ASC,
};

export default function storiesReducer(state = initialState, action: any) {
    switch (action.type) {
        case storyActions.StoryActions.ADD_STORIES:
        case storyActions.StoryActions.SORT_STORIES_SUCCESS:
            return handleAddStories(state, action);
        case storyActions.StoryActions.SELECT_STORY:
            return handleSelectStory(state, action);
        case storyActions.StoryActions.CREATE_STORY_SUCCESS:
            return handleCreateStory(state, action);
        case storyActions.StoryActions.MAKE_STORY_BLOCKED:
            return handleMakeStoryBlocked(state, action);
        case storyActions.StoryActions.STORY_DRAG_START:
            return handleStoryDragStart(state, action);
        case storyActions.StoryActions.UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION:
            return handleStoryDragAndDrop(state, action);
        case storyActions.StoryActions.STORY_DRAG_FINISH:
            return handleStoryDragFinish(state, action);
        case storyActions.StoryActions.SET_STORY_TITLE_TERM_REQUEST:
            return handleSetStoryTitleTerm(state, action);
        case storyActions.StoryActions.SET_STORY_TITLE_TERM_SUCCESS:
            return handleSetStoriesFoundByTerm(state, action);
        case storyActions.StoryActions.BLUR_STORY_TITLE_TERM:
            return handleBlurStoryTitleTerm(state, action);
        case storyActions.StoryActions.ATTEMPT_TO_BLOCK_STORY:
            return handleAttemptToBlockStory(state, action);
        case storyActions.StoryActions.DECLINE_STORY_BLOCK:
            return handleDeclineStoryBlock(state, action);
        case storyActions.StoryActions.GET_STORY_HISTORY_SUCCESS:
            return handleGetStoryHistorySuccess(state, action);
        case storyActions.StoryActions.SORT_STORIES_REQUEST:
            return handleChangeSortType(state, action);
        case storyActions.StoryActions.STORY_UPDATE_CHANGES_SUCCESS:
        case storyActions.StoryActions.STORY_UPDATE_COLUMN_SUCCESS:
        case storyActions.StoryActions.MAKE_STORY_READY_SUCCESS:
            return handleUpdateStory(state, action);
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

function handleCreateStory(state: IStoryState, action: storyActions.ICreateStorySuccess): IStoryState {
    return {
        ...state,
        columns: state.columns.map((column) => {
            return column.key === action.payload.columnType
                ? ({
                      key: column.key,
                      value: [...column.value, action.payload],
                  } as IStoryColumns)
                : column;
        }),
    };
}

function handleSelectStory(state: IStoryState, action: storyActions.ISelectStory): IStoryState {
    const selectedStory: IStory = state.columns
        .map((column) => column.value)
        .reduce((accumulator, story) => accumulator.concat(story), [])
        .find((story) => story.storyId === action.payload);

    return {
        ...state,
        selectedStoryId: selectedStory ? selectedStory.storyId : '',
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

function handleStoryDragStart(state: IStoryState, action: storyActions.IStoryDragStart): IStoryState {
    return {
        ...state,
        isDragging: true,
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

function handleStoryDragFinish(state: IStoryState, action: storyActions.IStoryDragFinish): IStoryState {
    return {
        ...state,
        isDragging: false,
    };
}

function handleSetStoryTitleTerm(state: IStoryState, action: storyActions.ISetStoryTitleTermRequest): IStoryState {
    return {
        ...state,
        storyTitleTerm: action.payload,
    };
}

function handleSetStoriesFoundByTerm(state: IStoryState, action: storyActions.ISetStoryTitleTermSuccess): IStoryState {
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

function handleGetStoryHistorySuccess(state: IStoryState, action: storyActions.IGetStoryHistorySuccess): IStoryState {
    return {
        ...state,
        storyHistory: action.payload,
    };
}

function handleChangeSortType(state: IStoryState, action: storyActions.ISortStoriesRequest): IStoryState {
    return {
        ...state,
        sortType: action.payload,
    };
}

function handleUpdateStory(state: IStoryState, action: storyActions.IUpdateStoryColumnSuccess): IStoryState {
    return {
        ...state,
        columns: state.columns.map((column) => {
            return {
                ...column,
                value: column.value.map((story) => {
                    return story.storyId === action.payload.storyId
                        ? {
                              ...action.payload,
                          }
                        : story;
                }),
            };
        }),
    };
}
