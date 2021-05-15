import { IState } from '../store/state';

export function getRouterFullPath(state: IState): string {
    return `${state.router.location.pathname}${state.router.location.search}`;
}
