import { IWorkSpace } from '../../types/workSpaceTypes';
import { IState } from '../store/state';

export function getWorkSpace(state: IState): IWorkSpace {
    return state.workspace.workSpace;
}

export function getWorkSpaceId(state: IState): string {
    return state.workspace.workSpace.workSpaceId;
}

export function getWorkSpaceName(state: IState): string {
    return state.workspace.workSpace.workSpaceName;
}

export function getWorkSpaceDescription(state: IState): string {
    return state.workspace.workSpace.workSpaceDescription;
}

export function getWorkSpaceDate(state: IState): Date {
    return state.workspace.workSpace.creationDate;
}

export function getWorkSpaceIsLoading(state: IState): boolean {
    return state.workspace.isLoading;
}
