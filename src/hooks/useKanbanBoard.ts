import { useState, useEffect } from 'react';
import {
  HandleAddTask,
  IColumns,
  IGlobalTasks,
  IGoScriptReformPreviousState,
  IGoScriptSetnewState,
  ISource,
  ITask,
  IUserColumn,
  TasksList,
  setState,
} from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';
import { tasksService } from '../services/tasks.service';
import getRandomNum from '../utils/getRandomNum';

export const useKanbanBoard = (userColumns: IUserColumn[]) => {
  const [tasks, setTasks] = useState<IColumns>({});

  useEffect(() => {
    tasksService.get().then((res) => {
      let completed: TasksList = [];
      let uncompleted: TasksList = [];

      res.forEach((item: ITask) =>
        item.completed ? completed.push(item) : uncompleted.push(item)
      );

      setTasks(
        userColumns.reduce(
          (acc: any, column: any) =>
            (acc = {
              ...acc,
              [column.id]: {
                ...column,
                state:
                  column.completed === undefined
                    ? []
                    : column.completed
                    ? completed
                    : uncompleted,
                setState: (state: TasksList) =>
                  setTasks((prevState) => ({
                    ...prevState,
                    [column.id]: {
                      ...prevState[column.id],
                      state: state,
                    },
                  })),
              },
            }),
          {}
        )
      );
    });
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) {
      if (source.index >= 0 && destination?.index !== undefined) {
        setNewState(source, 'source', destination.index);
      } else return;
      return;
    }
    // delete elem if drappble changed
    reformPreviousState(source.droppableId, draggableId, 'delete');
    //find elem in previous droppable
    const task = reformPreviousState(source.droppableId, draggableId, 'find');

    setNewState(destination, 'destination', undefined, task);
  };

  function reformPreviousState(
    sourceDroppableId: string,
    taskId: string,
    action: string
  ) {
    let goScript: any;
    if (action === 'delete') {
      goScript = ({ taskId, state, setState }: IGoScriptReformPreviousState) =>
        setState!(removeItemById(taskId, state));
    } else if (action === 'find') {
      goScript = ({ taskId, state }: IGoScriptReformPreviousState) =>
        findItemById(taskId, state);
    }
    return goScript({
      taskId,
      state: tasks[sourceDroppableId].state,
      setState: tasks[sourceDroppableId].setState,
    });
  }

  function setNewState(
    source: ISource,
    action: string,
    destinationIndex?: number,
    task?: ITask
  ) {
    let goScript: any;
    const { droppableId, index } = source;
    if (action === 'source') {
      goScript = ({ index, state, setState }: IGoScriptSetnewState) =>
        destinationReform(destinationIndex!, state, setState, index);
    } else if (action === 'destination') {
      let completed: boolean = false;
      if (tasks[droppableId].completed)
        completed = tasks[droppableId].completed!;
      goScript = ({ index, state, setState, task }: IGoScriptSetnewState) =>
        destinationReform(index, state, setState, undefined, completed, task);
    }
    goScript({
      index,
      state: tasks[droppableId].state,
      setState: tasks[droppableId].setState,
      task,
    });
  }

  function destinationReform(
    index: number,
    state: ITask[],
    setState: setState,
    sourceIndex?: number,
    completed?: boolean,
    task?: ITask
  ) {
    let updatedTask: any;
    if (sourceIndex !== undefined) {
      updatedTask = state[sourceIndex];
      state.splice(sourceIndex, 1);
    } else updatedTask = { ...task, completed }; //status?
    if (index === 0) {
      state.unshift(updatedTask);
    } else state.splice(index, 0, updatedTask);
    setState(state);
  }

  function findItemById(id: string, array: TasksList) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id: string, array: TasksList) {
    return array.filter((item) => item.id != id);
  }

  const handleAddTask: HandleAddTask = (id) => {
    const newTask = {
      completed: false,
      createdAt: Date.now(),
      problems: getRandomNum(50, 67),
      completedProblems: getRandomNum(0, 45),
      id: Date.now().toString(),
      title: 'Я новая таска',
      userId: '1',
    };
    tasks[id].setState!([...tasks[id].state, newTask]);
  };

  return {
    handleDragEnd,
    tasks,
    handleAddTask,
  };
};
