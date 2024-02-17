import { useState, useEffect } from 'react';
import { ITask, TasksList } from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';

export const useKanbanBoard = () => {
  const [isPending, setIsPending] = useState<TasksList>([]);
  const [inProgress, setInProgress] = useState<TasksList>([]);
  const [isDone, setIsDone] = useState<TasksList>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        setIsPending(json.filter((task: ITask) => !task.completed)); //task.status === 'isPending'//change
        // setInProgress(json.filter((task: ITask) => task.status === 'inProgress'));
        setIsDone(json.filter((task: ITask) => task.completed)); //task.status === 'isDone'
      });
  }, []);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...inProgress,
      ...isPending,
      ...isDone,
    ])!;

    setNewState(destination.droppableId, task);
  };

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

  function setNewState(destinationDroppableId: string, task: ITask) {
    let updatedTask;
    switch (destinationDroppableId) {
      case '1': // Pending
        updatedTask = { ...task, completed: false }; //status: 'isPending'
        setIsPending([updatedTask, ...isPending]);
        break;
      case '2': // In progress
        updatedTask = { ...task, completed: false }; //status: 'inProgress'
        setInProgress([updatedTask, ...inProgress]);
        break;
      case '3': // Done
        updatedTask = { ...task, completed: true }; //status: 'isDone'
        setIsDone([updatedTask, ...isDone]);
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
