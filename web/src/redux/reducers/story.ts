import { ColumnIds } from '../../constants/boardConstants';
import { SortDirection, SortFields } from '../../constants/storyConstants';
import { mapFullStoryToStory } from '../../mappers/storyMappers';
import { IStory, IStoryColumns } from '../../types/storyTypes';
import {
    IAddStories,
    IChangeSortDirectionRequest,
    ICreateStorySuccess,
    IDeclineStoryBlock,
    IGetStoryHistorySuccess,
    IMakeStoryBlocked,
    IRemoveStorySuccess,
    ISelectStory,
    ISetStoriesSimpleItems,
    ISortStoriesRequest,
    IUpdateStoriesAfterDragAndDropAction,
    IUpdateStoryColumnSuccess,
    StoryActions,
} from '../actions/story';
import { IStoryHistoryState, IStoryState } from '../store/state';

const initialColumnState: IStoryColumns[] = [
    { key: ColumnIds.ToDo, value: [] },
    { key: ColumnIds.InProgress, value: [] },
    { key: ColumnIds.InReview, value: [] },
    { key: ColumnIds.Testing, value: [] },
    { key: ColumnIds.Confirmed, value: [] },
    { key: ColumnIds.OnProd, value: [] },
];

const initialStoryHistoryState: IStoryHistoryState = {
    story: null,
    items: [],
};

const initialState: IStoryState = {
    columns: initialColumnState,
    simpleItems: [],
    selectedStoryId: '',
    wasStoryBlocked: false,
    storyHistory: initialStoryHistoryState,
    isDragging: false,
    sortType: SortFields.PRIORITY.toUpperCase(),
    sortDirection: SortDirection.ASC,
};

export default function storyReducer(state = initialState, action: any) {
    switch (action.type) {
        case StoryActions.ADD_STORIES:
        case StoryActions.SORT_STORIES_SUCCESS:
            return handleAddStories(state, action);
        case StoryActions.SET_STORIES_SIMPLE_ITEMS:
            return handleSetStoriesSimpleItems(state, action);
        case StoryActions.SELECT_STORY:
            return handleSelectStory(state, action);
        case StoryActions.CREATE_STORY_SUCCESS:
            return handleCreateStory(state, action);
        case StoryActions.MAKE_STORY_BLOCKED:
            return handleMakeStoryBlocked(state, action);
        case StoryActions.STORY_DRAG_START:
            return handleStoryDragStart(state);
        case StoryActions.UPDATE_STORIES_AFTER_DRAG_AND_DROP_ACTION:
            return handleStoryDragAndDrop(state, action);
        case StoryActions.STORY_DRAG_FINISH:
            return handleStoryDragFinish(state);
        case StoryActions.ATTEMPT_TO_BLOCK_STORY:
            return handleAttemptToBlockStory(state);
        case StoryActions.DECLINE_STORY_BLOCK:
            return handleDeclineStoryBlock(state, action);
        case StoryActions.GET_STORY_HISTORY_SUCCESS:
            return handleGetStoryHistorySuccess(state, action);
        case StoryActions.SORT_STORIES_REQUEST:
        case StoryActions.CHANGE_SORT_TYPE:
            return handleChangeSortType(state, action);
        case StoryActions.STORY_UPDATE_CHANGES_SUCCESS:
        case StoryActions.STORY_UPDATE_COLUMN_SUCCESS:
        case StoryActions.MAKE_STORY_READY_SUCCESS:
            return handleUpdateStory(state, action);
        case StoryActions.REMOVE_STORY_SUCCESS:
            return handleRemoveStory(state, action);
        case StoryActions.CHANGE_SORT_DIRECTION_REQUEST:
            return handleChangeSortDirection(state, action);
        default:
            return state;
    }
}

const handleAddStories = (state: IStoryState, action: IAddStories): IStoryState => ({
    ...state,
    columns: state.columns.map(
        (column) =>
            ({
                key: column.key,
                value: action.payload.filter((story) => story.columnType === column.key),
            } as IStoryColumns)
    ),
});

const handleSetStoriesSimpleItems = (state: IStoryState, action: ISetStoriesSimpleItems): IStoryState => ({
    ...state,
    simpleItems: action.payload,
});

const handleCreateStory = (state: IStoryState, action: ICreateStorySuccess): IStoryState => ({
    ...state,
    columns: state.columns.map((column) =>
        column.key === action.payload.columnType
            ? ({
                  key: column.key,
                  value: [...column.value, action.payload],
              } as IStoryColumns)
            : column
    ),
});

const handleSelectStory = (state: IStoryState, action: ISelectStory): IStoryState => {
    const selectedStory: IStory = state.columns
        .map((column) => column.value)
        .reduce((accumulator, story) => accumulator.concat(story), [])
        .find((story) => story.storyId === action.payload);

    return {
        ...state,
        selectedStoryId: selectedStory ? selectedStory.storyId : '',
    };
};

const handleMakeStoryBlocked = (state: IStoryState, action: IMakeStoryBlocked): IStoryState => ({
    ...state,
    columns: state.columns.map((column) => ({
        ...column,
        value: column.value.map((story) =>
            story.storyId === action.payload
                ? {
                      ...story,
                      isReady: false,
                      isBlocked: !story.isBlocked,
                  }
                : story
        ),
    })),
});

const handleStoryDragStart = (state: IStoryState): IStoryState => ({
    ...state,
    isDragging: true,
});

const handleStoryDragAndDrop = (state: IStoryState, action: IUpdateStoriesAfterDragAndDropAction): IStoryState => ({
    ...state,
    columns: action.payload,
});

const handleStoryDragFinish = (state: IStoryState): IStoryState => ({
    ...state,
    isDragging: false,
});

const handleAttemptToBlockStory = (state: IStoryState): IStoryState => ({
    ...state,
    wasStoryBlocked: true,
});

const handleDeclineStoryBlock = (state: IStoryState, action: IDeclineStoryBlock): IStoryState => ({
    ...state,
    wasStoryBlocked: false,
    columns: state.columns.map((column) => ({
        ...column,
        value: column.value.map((story) =>
            story.storyId === action.payload
                ? {
                      ...story,
                      isBlocked: false,
                  }
                : story
        ),
    })),
});

const handleGetStoryHistorySuccess = (state: IStoryState, action: IGetStoryHistorySuccess): IStoryState => ({
    ...state,
    storyHistory: {
        story: mapFullStoryToStory(action.payload),
        items: action.payload.storyHistory,
    },
});

const handleChangeSortType = (state: IStoryState, action: ISortStoriesRequest): IStoryState => ({
    ...state,
    sortType: action.payload,
});

const handleChangeSortDirection = (state: IStoryState, action: IChangeSortDirectionRequest): IStoryState => ({
    ...state,
    sortDirection: action.payload,
});

const handleUpdateStory = (state: IStoryState, action: IUpdateStoryColumnSuccess): IStoryState => ({
    ...state,
    columns: state.columns.map((column) => ({
        ...column,
        value: column.value.map((story) =>
            story.storyId === action.payload.storyId
                ? {
                      ...action.payload,
                  }
                : story
        ),
    })),
});

const handleRemoveStory = (state: IStoryState, action: IRemoveStorySuccess): IStoryState => ({
    ...state,
    columns: state.columns.map((column) => ({
        ...column,
        value: column.value.filter((story) => story.storyId !== action.payload),
    })),
});
