import { SidebarTypes } from '../../constants';
import { IState } from '../store/state';

export function getSidebarVisibility(state: IState): boolean {
    return state.sidebar.isVisible;
}

export function getSidebarIsLoading(state: IState): boolean {
    return state.sidebar.isLoading;
}

export function getSidebarType(state: IState): SidebarTypes {
    return state.sidebar.type;
}
