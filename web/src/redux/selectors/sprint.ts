import { ISprint } from '../../types/sprint';
import { ISelectedItem } from '../../types/story';
import { IState } from '../store/state';

export const getSprints = (state: IState): ISprint[] => state.sprints.sprints;

export const getSprintsNames = (state: IState): ISelectedItem[] =>
    state.sprints.sprints.length
        ? state.sprints.sprints.map(
              (sprint) =>
                  ({
                      key: sprint.sprintId,
                      value: sprint.sprintName,
                  } as ISelectedItem)
          )
        : [];

export const getSprintDropdownItems = (state: IState): ISelectedItem[] => {
    const sprints: ISelectedItem[] = getSprintsNames(state);

    sprints.unshift({ key: '', value: 'All' });

    return sprints;
};

export const getSelectedSprintId = (state: IState): string => state.sprints.selectedSprintId;

export const getSelectedSprint = (state: IState): ISprint =>
    state.sprints.sprints.find((sprint) => sprint.sprintId === state.sprints.selectedSprintId);
