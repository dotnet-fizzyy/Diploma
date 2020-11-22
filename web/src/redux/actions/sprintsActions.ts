import { ISprint } from "../../types/sprintTypes";

export const SprintActions = {
  ADD_SPRINTS: "ADD_SPRINTS",
  SET_SELECTED_SPRINT: "SET_SELECTED_SPRINT",
};

//interfaces
export interface IAddSprints {
  type: typeof SprintActions.ADD_SPRINTS;
  payload: ISprint[];
}

export interface ISetSelectedSprint {
  type: typeof SprintActions.SET_SELECTED_SPRINT;
  payload: string;
}

//actions
export function addSprints(sprints: ISprint[]): IAddSprints {
  return {
    type: SprintActions.ADD_SPRINTS,
    payload: sprints,
  };
}

export function setSelectedSprint(sprintId: string): ISetSelectedSprint {
  return {
    type: SprintActions.SET_SELECTED_SPRINT,
    payload: sprintId,
  };
}

export type SprintsActionTypes = IAddSprints & ISetSelectedSprint;
