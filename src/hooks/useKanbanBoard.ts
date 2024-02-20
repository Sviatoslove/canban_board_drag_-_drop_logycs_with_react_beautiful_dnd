import { useState, useEffect } from 'react';
import {
  IColumns,
  IGoScriptReformPreviousState,
  IGoScriptSetnewState,
  ISource,
  ITask,
  TasksList,
  setState,
} from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';
import getRandomNum from '../utils/getRandomNum';

export const useKanbanBoard = () => {
  const [isPending, setIsPending] = useState<TasksList>([]);
  const [inProgress, setInProgress] = useState<TasksList>([]);
  const [isDone, setIsDone] = useState<TasksList>([]);
  // const [isWorking, setIsWorking] = useState<TasksList>([]);

  const COLUMNS: IColumns = {
    '1': {
      id: '1',
      title: 'Pending',
      state: isPending,
      setState: setIsPending,
      colorBadge: 'red',
    },
    '2': {
      id: '2',
      title: 'Progress',
      state: inProgress,
      setState: setInProgress,
      colorBadge: 'orange',
    },
    '3': {
      id: '3',
      title: 'Done',
      state: isDone,
      setState: setIsDone,
      colorBadge: 'green',
      completed: true
    },
    // '4': {
    //   id: '4',
    //   title: 'Extra Working',
    //   state: isWorking,
    //   setState: setIsWorking,
    //   colorBadge: 'pink',
    // },
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then((response) => response.json())
      .then((json) => {
        //Костыль необходимо потом удалить
        const tasks = json.reduce(
          (acc: ITask[], task: ITask) =>
            (acc = [
              ...acc,
              {
                ...task,
                createdAt: Date.now(),
                problems: getRandomNum(50, 67),
                completedProblems: getRandomNum(0, 45),
              },
            ]),
          []
        );
        //----------------------------------------------------------------
        setIsPending(tasks.filter((task: ITask) => !task.completed)); //task.status === 'isPending'//change
        // setInProgress(json.filter((task: ITask) => task.status === 'inProgress'));
        setIsDone(tasks.filter((task: ITask) => task.completed)); //task.status === 'isDone'
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
      state: COLUMNS[sourceDroppableId].state,
      setState: COLUMNS[sourceDroppableId].setState,
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
      if (COLUMNS[droppableId].completed) completed = COLUMNS[droppableId].completed!;
      goScript = ({ index, state, setState, task }: IGoScriptSetnewState) =>
        destinationReform(index, state, setState, undefined, completed, task);
    }
    goScript({
      index,
      state: COLUMNS[droppableId].state,
      setState: COLUMNS[droppableId].setState,
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

  return {
    handleDragEnd,
    COLUMNS
  };
};
