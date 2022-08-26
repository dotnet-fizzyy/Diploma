import { IState } from '../store/state';

export const getRouterFullPath = (state: IState): string =>
    `${state.router.location.pathname}${state.router.location.search}`;
