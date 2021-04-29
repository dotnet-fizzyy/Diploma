import {
    EpicActions,
    IAddSimpleEpics,
    ICreateEpicSuccess,
    IGetEpicsSuccess,
    ISetSelectedEpic,
    ISetSelectedEpicById,
} from '../actions/epicActions';
import { IEpicsState } from '../store/state';

const initialState: IEpicsState = {
    epics: [],
    simpleItems: [],
    selectedEpicId: null,
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
            return handleSetCurrentEpicById(state, action);
        case EpicActions.ADD_SIMPLE_EPICS:
            return handleAddSimpleEpics(state, action);
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

function handleSetCurrentEpicById(state: IEpicsState, action: ISetSelectedEpicById): IEpicsState {
    return {
        ...state,
        selectedEpicId: state.epics.find((x) => x.epicId === action.payload).epicId,
    };
}

function handleAddSimpleEpics(state: IEpicsState, action: IAddSimpleEpics): IEpicsState {
    return {
        ...state,
        simpleItems: action.payload,
        selectedEpicId: action.payload && action.payload.length ? action.payload[0].epicId : '',
    };
}
