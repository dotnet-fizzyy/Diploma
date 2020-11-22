import { IState } from '../store/state';

export function getSidebarVisibility(state: IState): boolean {
    return state.sidebar.isVisible;
}
