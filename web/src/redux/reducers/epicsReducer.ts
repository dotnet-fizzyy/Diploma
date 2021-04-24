import * as epicActions from '../actions/epicActions';
import { IEpicsState } from '../store/state';

const initialState: IEpicsState = {
    epics: [],
    currentEpic: null,
};

export default function epicReducer(state = initialState, action: epicActions.EpicActionTypes) {
    switch (action.type) {
        case epicActions.EpicActions.CREATE_EPIC_SUCCESS:
            return handleCreateEpicSuccess(state, action);
        case epicActions.EpicActions.GET_EPICS_SUCCESS:
        case epicActions.EpicActions.ADD_EPICS:
            return handleSetEpics(state, action);
        case epicActions.EpicActions.SET_SELECTED_EPIC:
            return handleSetCurrentEpic(state, action);
        case epicActions.EpicActions.SET_SELECTED_EPIC_BY_ID:
            return handleSetCurrentEpicById(state, action);
        default:
            return state;
    }
}

function handleCreateEpicSuccess(state: IEpicsState, action: epicActions.ICreateEpicSuccess): IEpicsState {
    return {
        ...state,
        epics: [...state.epics, action.payload],
    };
}

function handleSetEpics(state: IEpicsState, action: epicActions.IGetEpicsSuccess): IEpicsState {
    return {
        ...state,
        epics: action.payload,
    };
}

function handleSetCurrentEpic(state: IEpicsState, action: epicActions.ISetSelectedEpic): IEpicsState {
    return {
        ...state,
        currentEpic: action.payload,
    };
}

function handleSetCurrentEpicById(state: IEpicsState, action: epicActions.ISetSelectedEpicById): IEpicsState {
    return {
        ...state,
        currentEpic: state.epics.find((x) => x.epicId === action.payload),
    };
}
