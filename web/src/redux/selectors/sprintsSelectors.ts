import { ISprint } from '../../types/sprintTypes';
import { ISelectedItem } from '../../types/storyTypes';
import { IState } from '../store/state';

export function getSprints(state: IState): ISprint[] {
    return state.sprints.sprints;
}

export function getSprintsNames(state: IState): ISelectedItem[] {
    return state.sprints.sprints
        ? state.sprints.sprints.map((project) => {
              return {
                  key: project.sprintId,
                  value: project.sprintName,
              } as ISelectedItem;
          })
        : [];
}

export function getCurrentSprint(state: IState): ISprint {
    return state.sprints.selectedSprint;
}
