import { SidebarTypes } from '../../constants';
import { IState } from '../store/state';

export const getSidebarVisibility = (state: IState): boolean => state.sidebar.isVisible;

export const getSidebarIsLoading = (state: IState): boolean => state.sidebar.isLoading;

export const getSidebarType = (state: IState): SidebarTypes => state.sidebar.type;
