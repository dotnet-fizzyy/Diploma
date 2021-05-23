import { ISprint } from '../../types/sprintTypes';
import { ISelectedItem } from '../../types/storyTypes';
import { IState } from '../store/state';

export function getSprints(state: IState): ISprint[] {
    return state.sprints.sprints;
}

export function getSprintsNames(state: IState): ISelectedItem[] {
    return state.sprints.sprints && state.sprints.sprints.length
        ? state.sprints.sprints.map((sprint) => {
              return {
                  key: sprint.sprintId,
                  value: sprint.sprintName,
              } as ISelectedItem;
          })
        : [];
}

export function getSprintDropdownItems(state: IState): ISelectedItem[] {
    const sprints: ISelectedItem[] = getSprintsNames(state);
    sprints.unshift({ key: '', value: 'All' });

    return sprints;
}

export function getSelectedSprintId(state: IState): string {
    return state.sprints.selectedSprintId;
}

export function getSelectedSprint(state: IState): ISprint {
    return state.sprints.sprints.find((x) => x.sprintId === state.sprints.selectedSprintId);
}
