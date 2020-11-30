import { IState } from '../store/state';

export function getIsSpinnerVisible(state: IState): boolean {
    return state.requestProcessor.isVisible;
}
