import { setState } from './../utils/types';
import { useState, useEffect } from 'react';
import {
  HandleAddTask,
  IColumn,
  IColumns,
  IGoScriptReformPreviousState,
  IGoScriptSetnewState,
  ISource,
  ITask,
  TasksList,
} from '../utils/types';
import { DropResult } from 'react-beautiful-dnd';
import { initialStateTasks } from '../utils/initialStateTasks';
import { useAppDispatch } from '../store/createStore';
import { saveColumns } from '../store/columnsSlice';

export const useKanbanBoard = (userColumns?: IColumn[]) => {
  const dispatch = useAppDispatch();
  const [columns, setColumns] = useState<IColumns>({});

  useEffect(() => {
    if (userColumns && userColumns.length) {
      // let completed: TasksList = [];
      // let uncompleted: TasksList = [];
      // tasksService.get().then((res) => {
      //   res.forEach((item: ITask) =>
      //     item.completed ? completed.push(item) : uncompleted.push(item)
      //   );

      //   setColumns(
      //     initialStateTasks(userColumns, setColumns, completed, uncompleted)
      //   );
      // });
      setColumns(initialStateTasks(userColumns, setColumns));
    }
  }, [userColumns]);

  const updateStore = () => {
    setColumns((prevState) => {
      const data = { ...prevState };
      Object.values(data).forEach((column) => {
        delete column.setState;
      });
      dispatch(saveColumns(data));
      return prevState;
    });
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || source.droppableId === destination.droppableId) {
      if (source.index >= 0 && destination?.index !== undefined) {
        setNewState(source, 'source', destination.index);
        updateStore();
      } else return;
      return;
    }
    // delete elem if drappble changed
    reformPreviousState(source.droppableId, draggableId, 'delete');
    //find elem in previous droppable
    const task = reformPreviousState(source.droppableId, draggableId, 'find');

    setNewState(destination, 'destination', undefined, task);
    updateStore();
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
      state: columns[sourceDroppableId].state,
      setState: columns[sourceDroppableId].setState,
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
      const completed: boolean = columns[droppableId].completed!;
      const status: string = columns[droppableId].title;
      goScript = ({ index, state, setState, task }: IGoScriptSetnewState) =>
        destinationReform(index, state, setState, undefined, completed, status, task);
    }
    goScript({
      index,
      state: [...columns[droppableId].state],
      setState: columns[droppableId].setState,
      task,
    });
  }

  function destinationReform(
    index: number,
    state: ITask[],
    setState: setState,
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
    columns,
  };
};
