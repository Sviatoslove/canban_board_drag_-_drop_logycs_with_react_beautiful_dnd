import { Dispatch, SetStateAction } from 'react';
import {
  IColumn,
  IColumns,
  ITask,
  TasksList,
  setState,
} from './types';

export const initialStateTasks = (
  userTasks: IColumn[],
  setState: setState | Dispatch<SetStateAction<IColumns>>,
  completed?: ITask[],
  uncompleted?: ITask[]
) => {
  return userTasks.reduce(
    (acc: any, column: any) =>
      (acc = {
        ...acc,
        [column.id]: {
          ...column,
          state:
            completed || uncompleted
              ? column.completed === undefined
                ? []
                : column.completed
                ? [...column.state, ...completed!]
                : [...column.state, ...uncompleted!]
              : column.state,
          setState: (state: TasksList) =>
            setState((prevState: any) => ({
              ...prevState,
              [column.id]: {
                ...prevState[column.id],
                state: state,
              },
            })),
        },
      }),
    {}
  );
};
