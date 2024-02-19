import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { ITask, TasksList } from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';
import getRandomNum from '../utils/getRandomNum';

interface ISource {
  droppableId: string;
  index: number;
}

type setState = Dispatch<SetStateAction<TasksList>>;

export const useKanbanBoard = () => {
  const [isPending, setIsPending] = useState<TasksList>([]);
  const [inProgress, setInProgress] = useState<TasksList>([]);
  const [isDone, setIsDone] = useState<TasksList>([]);

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
      goScript = (taskId: string, state: ITask[], setState: setState) =>
        setState(removeItemById(taskId, state));
    } else if (action === 'find') {
      goScript = (taskId: string, state: ITask[]) =>
        findItemById(taskId, state);
    }
    switch (sourceDroppableId) {
      case '1':
        return goScript(taskId, isPending, setIsPending);
      case '2':
        return goScript(taskId, inProgress, setInProgress);
      case '3':
        return goScript(taskId, isDone, setIsDone);
    }
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
      goScript = (index: number, setState: setState, state: ITask[]) =>
        destinationReform(destinationIndex!, setState, state, index);
    } else if (action === 'destination') {
      let completed: boolean = false;
      if (droppableId === '3') completed = true;
      goScript = (
        index: number,
        setState: setState,
        state: ITask[],
        task: ITask
      ) =>
        destinationReform(index, setState, state, undefined, completed, task);
    }
    switch (droppableId) {
      case '1': // Pending
        goScript(index, setIsPending, isPending, task);
        break;
      case '2': // In progress
        goScript(index, setInProgress, inProgress, task);
        break;
      case '3': // Done
        goScript(index, setIsDone, isDone, task);
        break;
    }
  }

  function destinationReform(
    index: number,
    setState: setState,
    state: ITask[],
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
    isPending,
    inProgress,
    isDone,
  };
};
