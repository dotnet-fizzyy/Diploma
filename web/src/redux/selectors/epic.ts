import { IEpic } from '../../types/epic';
import { ISelectedItem } from '../../types/story';
import { IState } from '../store/state';

export const getEpics = (state: IState): IEpic[] => state.epics.epics;

export const getEpicsDropdownItems = (state: IState): ISelectedItem[] =>
    state.epics.simpleItems.map((epicSimpleModel) => {
        return {
            key: epicSimpleModel.epicId,
            value: epicSimpleModel.epicName,
        } as ISelectedItem;
    });

export const getSelectedEpic = (state: IState): IEpic =>
    state.epics.epics.find((epic) => epic.epicId === state.epics.selectedEpicId);

export const getSelectedEpicId = (state: IState): string => state.epics.selectedEpicId;
