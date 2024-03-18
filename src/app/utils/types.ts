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
  setState?: SetStateTasks;
  openingForm?: any
  // openingForm?: OpeningForm
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

export type SetStateTasks = Dispatch<SetStateAction<TasksList>> 

export type SetStateColumns = Dispatch<SetStateAction<IColumns>> ;

export interface IGoScriptReformPreviousState {
  taskId: string;
  state: ITask[];
  setState?: SetStateTasks;
}

export interface IGoScriptSetnewState {
  index: number;
  state: ITask[];
  setState: SetStateTasks;
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
  | FormEvent<HTMLButtonElement>
  | React.ChangeEventHandler<HTMLTextAreaElement>;

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

  export interface ModalWindowProps {
    title?: string;
    isOpen: boolean;
    onClose: FuncVoid;
    children?: React.ReactNode;
  }

  export interface IProgressBar {
    completedProblems: number;
    problems: number;
  }

  export interface IEditableField {
    title: string;
    name: string;
    columnId?: string;
    onSubmit: OnsubmitFunc;
    taskIdx?: string;
    settings?: {
      variant?: string;
      refDiv?: any;
      placeholder?: string;
      textAreaClassName?: string;
      inputClassName?: string;
    };
  }

  export interface ITextfieldProps {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    error?: string;
    placeholder?: string;
    variant?: string;
    refDiv?: any;
    inputClassName?: string;
  }