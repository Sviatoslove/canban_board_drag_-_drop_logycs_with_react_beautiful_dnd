import { Dispatch, SetStateAction } from 'react';

export interface IUserColumn {
  id: string;
  title: string;
  colorBadge?: string;
  completed?: boolean;
}

export interface ITask extends IUserColumn {
  createdAt: number
  problems: number;
  completedProblems: number; //status: string???
}

export type TasksList = ITask[];

export type HandleAddTask = (id:string) => void

export interface IColumn extends IUserColumn {
  state: TasksList;
  setState?: setState;
  handleAddTask?: HandleAddTask
}

export interface ITitleColumn {
  colorBadge?: string;
  title: string;
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
  [x: string]: IColumn
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

export interface IGlobalTasks {
  [x: string]: TasksList;
}
