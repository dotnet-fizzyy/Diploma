import { IEpic } from '../../types/epicTypes';
import { ISelectedItem } from '../../types/storyTypes';
import { IState } from '../store/state';

export function getEpics(state: IState): IEpic[] {
    return state.epics.epics;
}

export function getEpicsNames(state: IState): ISelectedItem[] {
    return state.epics.epics.map((x) => {
        return {
            key: x.epicId,
            value: x.epicName,
        } as ISelectedItem;
    });
}

export function getCurrentEpic(state: IState): IEpic {
    return state.epics.selectedEpic;
}

export function getSelectedEpicId(state: IState): string {
    return state.epics.selectedEpic ? state.epics.selectedEpic.epicId : '';
}
