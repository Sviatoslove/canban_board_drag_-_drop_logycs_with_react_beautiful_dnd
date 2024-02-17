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
  tasks: TasksList;
  id: string;
  colorBadge: string;
}

export interface ICard {
  task: ITask;
  index: number;
}
