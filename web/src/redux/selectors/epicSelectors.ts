import { IEpic, IEpicSimpleModel } from '../../types/epicTypes';
import { ISelectedItem } from '../../types/storyTypes';
import { IState } from '../store/state';

export function getEpics(state: IState): IEpic[] {
    return state.epics.epics;
}

export function getEpicsDropdownItems(state: IState): ISelectedItem[] {
    return state.epics.simpleItems.map((x) => {
        return {
            key: x.epicId,
            value: x.epicName,
        } as ISelectedItem;
    });
}

export function getSelectedEpic(state: IState): IEpic {
    return state.epics.epics.find((x) => x.epicId === state.epics.selectedEpicId);
}

export function getEpicSimpleModel(state: IState): IEpicSimpleModel {
    return state.epics.simpleItems.find((x) => x.epicId === state.epics.selectedEpicId);
}

export function getEpicSimpleModels(state: IState): IEpicSimpleModel[] {
    return state.epics.simpleItems;
}

export function getSelectedEpicId(state: IState): string {
    return state.epics.selectedEpicId;
}
