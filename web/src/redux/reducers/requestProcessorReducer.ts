import * as requestProcessorActions from '../actions/requestProcessorActions';
import { IRequestProcessorState } from '../store/state';

const initialState: IRequestProcessorState = {
    component: null,
    isVisible: false,
};

export default function requestProcessorReducer(
    state = initialState,
    action: requestProcessorActions.RequestProcessorActionTypes
) {
    switch (action.type) {
        case requestProcessorActions.RequestProcessorActions.LAUNCH_SPINNER:
            return handleLaunchSpinner(state, action);
        case requestProcessorActions.RequestProcessorActions.HIDE_SPINNER:
            return handleHideSpinner(state, action);
        default:
            return state;
    }
}

function handleLaunchSpinner(
    state: IRequestProcessorState,
    action: requestProcessorActions.ILaunchSpinner
): IRequestProcessorState {
    return {
        ...state,
        component: action.payload,
        isVisible: true,
    };
}

function handleHideSpinner(
    state: IRequestProcessorState,
    action: requestProcessorActions.IHideSpinner
): IRequestProcessorState {
    return {
        ...state,
        component: null,
        isVisible: false,
    };
}
