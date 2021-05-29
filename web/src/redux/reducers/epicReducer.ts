import {
    EpicActions,
    IAddSimpleEpics,
    IChangeStatsEpic,
    ICreateEpicSuccess,
    IGetEpicsSuccess,
    IRemoveEpicSuccess,
    ISetSelectedEpic,
    ISetSelectedEpicById,
    IUpdateEpicSuccess,
} from '../actions/epicActions';
import { IChangeEpicRequest, StoryActions } from '../actions/storyActions';
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
        case EpicActions.SET_SELECTED_EPIC:
            return handleSetCurrentEpic(state, action);
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
        default:
            return state;
    }
}

function handleCreateEpicSuccess(state: IEpicsState, action: ICreateEpicSuccess): IEpicsState {
    return {
        ...state,
        epics: [...state.epics, action.payload],
    };
}

function handleSetEpics(state: IEpicsState, action: IGetEpicsSuccess): IEpicsState {
    return {
        ...state,
        epics: action.payload,
    };
}

function handleSetCurrentEpic(state: IEpicsState, action: ISetSelectedEpic): IEpicsState {
    return {
        ...state,
        selectedEpicId: action.payload.epicId,
    };
}

function handleSetSelectedEpicById(state: IEpicsState, action: ISetSelectedEpicById): IEpicsState {
    return {
        ...state,
        selectedEpicId: state.epics.some((x) => x.epicId === action.payload)
            ? state.epics.find((x) => x.epicId === action.payload).epicId
            : '',
    };
}

function handleSetSelectedEpicFromSimpleModelsById(state: IEpicsState, action: IChangeEpicRequest): IEpicsState {
    return {
        ...state,
        selectedEpicId: state.simpleItems.some((x) => x.epicId === action.payload)
            ? state.simpleItems.find((x) => x.epicId === action.payload).epicId
            : '',
    };
}

function handleAddSimpleEpics(state: IEpicsState, action: IAddSimpleEpics): IEpicsState {
    return {
        ...state,
        simpleItems: action.payload,
        selectedEpicId: action.payload && action.payload.length ? action.payload[0].epicId : '',
    };
}

function handleChangeSelectedEpic(state: IEpicsState, action: IChangeStatsEpic): IEpicsState {
    return {
        ...state,
        selectedEpicId: action.payload,
    };
}

function handleUpdateEpicSuccess(state: IEpicsState, action: IUpdateEpicSuccess): IEpicsState {
    return {
        ...state,
        epics: state.epics.map((x) => (x.epicId === action.payload.epicId ? { ...action.payload } : x)),
    };
}

function handleRemoveEpicSuccess(state: IEpicsState, action: IRemoveEpicSuccess): IEpicsState {
    return {
        ...state,
        epics: state.epics.filter((x) => x.epicId !== action.payload),
    };
}
