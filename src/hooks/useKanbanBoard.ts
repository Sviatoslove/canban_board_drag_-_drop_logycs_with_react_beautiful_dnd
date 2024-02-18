import { useState, useEffect } from 'react';
import { ITask, TasksList } from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';
import getRandomNum from '../utils/getRandomNum';

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
        moveElToIndex(source, destination);
      } else return;
      return;
    }

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...inProgress,
      ...isPending,
      ...isDone,
    ])!;

    setNewState(destination, task);
  };

  function moveElToIndex(source: any, destination: any) {
    let task;
    switch (source.droppableId) {
      case '1':
        task = isPending[source.index];
        isPending.splice(source.index, 1);
        if (destination.index === 0) {
          isPending.unshift(task);
        } else isPending.splice(destination.index, 0, task);
        setIsPending(isPending);
        break;
      case '2':
        task = inProgress[source.index];
        inProgress.splice(source.index, 1);
        if (destination.index === 0) {
          inProgress.unshift(task);
        } else inProgress.splice(destination.index, 0, task);
        setInProgress(inProgress);
        break;
      case '3':
        task = isDone[source.index];
        isDone.splice(source.index, 1);
        if (destination.index === 0) {
          isDone.unshift(task);
        } else isDone.splice(destination.index, 0, task);
        setIsDone(isDone);
        break;
    }
  }

  function deletePreviousState(sourceDroppableId: string, taskId: string) {
    switch (sourceDroppableId) {
      case '1':
        setIsPending(removeItemById(taskId, isPending));
        break;
      case '2':
        setInProgress(removeItemById(taskId, inProgress));
        break;
      case '3':
        setIsDone(removeItemById(taskId, isDone));
        break;
    }
  }

  function setNewState(
    destination: { droppableId: string; index: number },
    task: ITask
  ) {
    let updatedTask;
    switch (destination.droppableId) {
      case '1': // Pending
        updatedTask = { ...task, completed: false }; //status: 'isPending'
        if (destination.index === 0) {
          isPending.unshift(updatedTask);
        } else isPending.splice(destination.index, 0, updatedTask);
        setIsPending(isPending);
        break;
      case '2': // In progress
        updatedTask = { ...task, completed: false }; //status: 'inProgress'
        if (destination.index === 0) {
          inProgress.unshift(task);
        } else inProgress.splice(destination.index, 0, updatedTask);
        setInProgress(inProgress);
        break;
      case '3': // Done
        updatedTask = { ...task, completed: true }; //status: 'isDone'
        if (destination.index === 0) {
          isDone.unshift(task);
        } else isDone.splice(destination.index, 0, updatedTask);
        setIsDone(isDone);
        break;
    }
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
