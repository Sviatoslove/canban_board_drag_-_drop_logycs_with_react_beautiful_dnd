import { Dispatch, SetStateAction } from 'react';

export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  problems: number;
  completedProblems: number; //status: string???
}

export type TasksList = ITask[];

export interface IColumn {
  title: string;
  state: TasksList;
  id: string;
  colorBadge: string;
}

export interface ICard {
  task: ITask;
  index: number;
}

export interface ISource {
  droppableId: string;
  index: number;
}

export interface IColumns {
  [x: string]: {
    id: string;
    title: string;
    state: ITask[];
    setState: setState;
    colorBadge: string;
    completed?:boolean
  };
}

export type setState = Dispatch<SetStateAction<TasksList>>;

export interface IGoScriptReformPreviousState {
  taskId: string;
  state: ITask[];
  setState?: setState;
}

export interface IGoScriptSetnewState {
  index: number;
  state: ITask[];
  setState: setState;
  task?: ITask;
}
