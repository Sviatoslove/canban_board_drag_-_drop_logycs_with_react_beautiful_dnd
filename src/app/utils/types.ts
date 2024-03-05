import { Dispatch, FormEvent, SetStateAction } from 'react';
import { OnsubmitFunc, OpeningForm } from '../context/useFormsTypes';
import { IDefaultState } from '../components/ui/forms/settingsForm';

export interface IUserTask {
  id: string;
  title: string;
  colorBadge?: string;
  completed?: boolean;
  colorText?: string;
  status?: string;
}

export interface ITask extends IUserTask {
  userId: string,
  createdAt: number;
  problems: number;
  completedProblems: number; //status: string???
}

export type TasksList = ITask[];

export type HandleAddTask = (
  userTasks: IColumn[],
  typeForm?: string,
  id?: string,
) => void;
export type FuncVoid = () => void;

export interface IColumn extends IUserTask {
  state: TasksList;
  setState?: setState;
  openingForm?: OpeningForm
}

export interface ITitleColumn {
  colorBadge?: string;
  title: string;
  color?: string;
  columnId?:string
}

export interface ICard {
  task: ITask;
  index: number;
  columnId: string;
}

export interface ISource {
  droppableId: string;
  index: number;
}

export interface IColumns {
  [x: string]: IColumn;
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

export interface IEmptyTasksList {
  handleAddTask: HandleAddTask;
}

export type EventClick = React.MouseEvent<HTMLButtonElement>;

export type EventChange =
  | React.ChangeEvent
  | React.MouseEvent<HTMLInputElement | HTMLSelectElement>
  | FormEvent<HTMLDivElement>
  | FormEvent<HTMLButtonElement>;

  export interface IFieldsProps {
    name: string;
    label: string;
    placeholder?: string;
    titleList?: string;
    options: IDefaultState[];
  }
  
  export interface IFormProps {
    type: string;
    onClose: FuncVoid;
    columnId: string;
    onSubmit: OnsubmitFunc,
  }