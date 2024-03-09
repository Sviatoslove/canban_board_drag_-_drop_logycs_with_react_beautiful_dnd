import { SetStateColumns, SetStateTasks } from './../utils/types';
import {
  IColumns,
  IGoScriptReformPreviousState,
  IGoScriptSetnewState,
  ISource,
  ITask,
  TasksList,
} from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';
import { setState } from '../utils/initialStateTasks';
import localStorageService from '../services/localStorage.service';

export const useKanbanBoard = (updateColumns:IColumns, setUpdateColumns:SetStateColumns) => {

  const updateLocalStorage = () => {
    setUpdateColumns((prevState) => {
      localStorageService.setColumns(prevState);
      return prevState;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) {
      if (source.index >= 0 && destination?.index !== undefined) {
        setNewState(source, 'source', destination.index);
        setTimeout(() => updateLocalStorage(), 10);
      } else return;
      return;
    }
    // delete elem if drappble changed
    reformPreviousState(source.droppableId, draggableId, 'delete');
    //find elem in previous droppable
    const task = reformPreviousState(source.droppableId, draggableId, 'find');

    setNewState(destination, 'destination', undefined, task);
    setTimeout(() => updateLocalStorage(), 10);
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
      state: updateColumns[sourceDroppableId].state,
      setState: (state: TasksList) => setState(state, sourceDroppableId, setUpdateColumns)
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
      const completed: boolean = updateColumns[droppableId].completed!;
      const status: string = updateColumns[droppableId].title;
      goScript = ({ index, state, setState, task }: IGoScriptSetnewState) =>
        destinationReform(
          index,
          state,
          setState,
          undefined,
          completed,
          status,
          task
        );
    }
    goScript({
      index,
      state: [...updateColumns[droppableId].state],
      setState: (state: TasksList) => setState(state, droppableId, setUpdateColumns),
      task,
    });
  }

  function destinationReform(
    index: number,
    state: ITask[],
    setState: SetStateTasks,
    sourceIndex?: number,
    completed?: boolean,
    status?: string,
    task?: ITask
  ) {
    let updatedTask: any;
    if (sourceIndex !== undefined) {
      updatedTask = state[sourceIndex];
      state.splice(sourceIndex, 1);
    } else updatedTask = { ...task, completed, status }; //status?
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
  };
};
