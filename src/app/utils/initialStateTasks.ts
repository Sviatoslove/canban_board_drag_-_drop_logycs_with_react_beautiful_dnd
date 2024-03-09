import {
  TasksList,
  SetStateColumns,
} from './types';

export const setState = (
  state: TasksList,
  id:string,
  setState: SetStateColumns,
) => setState((prevState: any) => ({
  ...prevState,
  [id]: {
    ...prevState[id],
    state: state,
  },
}))
