
export interface ITask {
  id: string;
  title:string
  completed: boolean;
  //status: string???
}

export type TasksList = ITask[];

export interface IColumn {
  title:string, tasks:TasksList, id:string, colorBadge:string
}

export interface ICard {
  task: ITask, index: number 

}
