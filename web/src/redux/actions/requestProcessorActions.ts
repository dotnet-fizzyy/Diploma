import { SpinnerComponent } from '../../types';

export const RequestProcessorActions = {
    LAUNCH_SPINNER: 'LAUNCH_SPINNER',
    HIDE_SPINNER: 'HIDE_SPINNER',
};

//interfaces
export interface ILaunchSpinner {
    type: typeof RequestProcessorActions.LAUNCH_SPINNER;
    payload: SpinnerComponent;
}

export interface IHideSpinner {
    type: typeof RequestProcessorActions.HIDE_SPINNER;
}

//actions
export function launchSpinner(component: SpinnerComponent): ILaunchSpinner {
    return {
        type: RequestProcessorActions.LAUNCH_SPINNER,
        payload: component,
    };
}

export function hideSpinner(): IHideSpinner {
    return {
        type: RequestProcessorActions.HIDE_SPINNER,
    };
}

export type RequestProcessorActionTypes = IHideSpinner & ILaunchSpinner;
