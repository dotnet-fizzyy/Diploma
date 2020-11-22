import { IProjectState } from "../store/state";

const initialState: IProjectState = {
  projects: [],
  selectedProject: null,
};

export default function projectsReducer(state = initialState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}
