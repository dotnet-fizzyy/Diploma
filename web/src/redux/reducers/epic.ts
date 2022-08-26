import {
    EpicActions,
    IAddSimpleEpics,
    IChangeStatsEpic,
    ICreateEpicSuccess,
    IGetEpicsSuccess,
    IRemoveEpicSuccess,
    ISetSelectedEpicById,
    IUpdateEpicSuccess,
} from '../actions/epic';
import { IChangeEpicRequest, StoryActions } from '../actions/story';
import { UserActions } from '../actions/user';
import { IEpicsState } from '../store/state';

const initialState: IEpicsState = {
    epics: [],
    simpleItems: [],
    selectedEpicId: '',
};

export default function epicReducer(state = initialState, action) {
    switch (action.type) {
        case EpicActions.CREATE_EPIC_SUCCESS:
            return handleCreateEpicSuccess(state, action);
        case EpicActions.GET_EPICS_SUCCESS:
        case EpicActions.ADD_EPICS:
            return handleSetEpics(state, action);
        case EpicActions.SET_SELECTED_EPIC_BY_ID:
            return handleSetSelectedEpicById(state, action);
        case StoryActions.CHANGE_EPIC_REQUEST:
            return handleSetSelectedEpicFromSimpleModelsById(state, action);
        case EpicActions.ADD_SIMPLE_EPICS:
            return handleAddSimpleEpics(state, action);
        case EpicActions.CHANGE_STATS_EPIC:
            return handleChangeSelectedEpic(state, action);
        case EpicActions.UPDATE_EPIC_SUCCESS:
            return handleUpdateEpicSuccess(state, action);
        case EpicActions.REMOVE_EPIC_SUCCESS:
            return handleRemoveEpicSuccess(state, action);
        case UserActions.CHANGE_USER_PROJECT:
            return handleChangeUserProject(state);
        default:
            return state;
    }
}

const handleCreateEpicSuccess = (state: IEpicsState, action: ICreateEpicSuccess): IEpicsState => ({
    ...state,
    epics: [...state.epics, action.payload],
});

const handleSetEpics = (state: IEpicsState, action: IGetEpicsSuccess): IEpicsState => ({
    ...state,
    epics: action.payload,
});

const handleSetSelectedEpicById = (state: IEpicsState, action: ISetSelectedEpicById): IEpicsState => {
    const epic = state.epics.find((epic) => epic.epicId === action.payload);

    return {
        ...state,
        selectedEpicId: epic?.epicId ?? '',
    };
};

const handleSetSelectedEpicFromSimpleModelsById = (state: IEpicsState, action: IChangeEpicRequest): IEpicsState => {
    const epic = state.simpleItems.find((epic) => epic.epicId === action.payload);

    return {
        ...state,
        selectedEpicId: epic?.epicId ?? '',
    };
};

const handleAddSimpleEpics = (state: IEpicsState, action: IAddSimpleEpics): IEpicsState => ({
    ...state,
    simpleItems: action.payload,
    selectedEpicId: action.payload?.length
        ? state.selectedEpicId
            ? state.selectedEpicId
            : action.payload[0].epicId
        : '',
});

const handleChangeSelectedEpic = (state: IEpicsState, action: IChangeStatsEpic): IEpicsState => ({
    ...state,
    selectedEpicId: action.payload,
});

const handleUpdateEpicSuccess = (state: IEpicsState, action: IUpdateEpicSuccess): IEpicsState => ({
    ...state,
    epics: state.epics.map((epic) => (epic.epicId === action.payload.epicId ? { ...action.payload } : epic)),
});

const handleRemoveEpicSuccess = (state: IEpicsState, action: IRemoveEpicSuccess): IEpicsState => ({
    ...state,
    epics: state.epics.filter((epic) => epic.epicId !== action.payload),
});

const handleChangeUserProject = (state: IEpicsState): IEpicsState => ({
    ...state,
    selectedEpicId: '',
});
