import { useDisclosure, useToast } from '@chakra-ui/react';
import {
  IFormsContext,
  IFormsProviderProps,
  OnsubmitFunc,
  OpeningForm,
} from './useFormsTypes';
import { createContext, useContext, useRef, useState } from 'react';
import {
  EventChange,
  EventClick,
  IColumn,
  IColumns,
  ITask,
} from '../utils/types';
import { toastSettings } from '../utils/toastSettings';
import {
  IDefaultState,
  formSettings,
} from '../components/ui/forms/settingsForm';
import { IFormsState } from '../hooks/useFormsData';
import getRandomNum from '../utils/getRandomNum';
import { orderingColumns } from '../utils/orderingColumns';
import localStorageService from '../services/localStorage.service';
import { updateStateAndLocalSt } from '../utils/updateStateAndLocalSt';
import { useKanbanBoard } from '../hooks/useKanbanBoard';
import { useAppSelector } from '../store/createStore';
import { selectColumns } from '../store/columnsSlice';

const defaultState = {
  isOpen: false,
  typeForm: { current: {} },
  onClose: () => {},
  openingForm: (e: EventClick | EventChange, id?: string) => {},
  onToast: (type?: string) => {},
  onSubmit: (data: IFormsState, columnId?: string) => {},
  closeOnSelect: {},
  setCloseOnSelect: () => {},
  updateColumns: {},
  setUpdateColumns: () => {},
  handleDragEnd: () => {},
};

const FormsContext = createContext<IFormsContext>(defaultState);

const useForms = () => useContext(FormsContext);

const FormsProvider = ({children }: IFormsProviderProps) => {
  const storeColumns = useAppSelector(selectColumns());
  const storageColumns: IColumns = localStorageService.getColumns();
  const [updateColumns, setUpdateColumns] = useState<IColumns>(storageColumns || storeColumns);
  const { handleDragEnd } = useKanbanBoard(updateColumns, setUpdateColumns);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [closeOnSelect, setCloseOnSelect] = useState<{ [x: string]: boolean }>(
    {}
  );

  const typeForm = useRef<IDefaultState>({});

  const toast = useToast();

  const openingForm: OpeningForm = (e, columnId, taskId) => {
    const { target }: any = e;
    const typeBtn: string = target.closest('button').getAttribute('dataType');
    onOpen();
    const settings: IDefaultState = {
      type: typeBtn,
      title: formSettings[typeBtn]?.title,
    };
    if (columnId) settings.columnId = columnId;
    if (taskId) settings.taskId = taskId;
    typeForm.current = settings;
  };

  const onToast = (type?: string) => {
    if (isOpen) onClose();
    toast({
      description: 'Попробуйте добавить ещё задач.',
      status: 'success',
      variant: 'top-accent',
      isClosable: true,
      duration: 9000,
      ...toastSettings[type ? type : typeForm.current.type],
    });
  };

  const onSubmit: OnsubmitFunc = ({ defaultState }) => {
    const { type, columnId, taskId } = typeForm.current;
    const {
      columnName,
      colorBadge,
      colorText,
      taskName,
      completed: completedStore,
    } = defaultState;
    let column: IColumn;
    let store: IColumns;
    let newTask: ITask;
    const completed = completedStore === 'false' ? false : true;
    if (type === 'addColumn') {
      newTask = {
        completed: false,
        createdAt: Date.now(),
        problems: getRandomNum(50, 67),
        completedProblems: getRandomNum(0, 45),
        status: columnName || updateColumns[columnId!]?.title,
        id: Date.now().toString(),
        title: taskName,
        userId: '1',
      };
    }
    switch (type) {
      case 'addColumn': {
        column = {
          id: (Object.values(updateColumns).length + 1).toString(),
          title: columnName,
          colorBadge,
          colorText,
          completed,
          state: [newTask!],
        };
        break;
      }
      case 'editColumn': {
        column = {
          ...updateColumns[columnId!],
          colorBadge,
          colorText,
          completed,
        };
        break;
      }
      case 'removeColumn': {
        if (Object.values(updateColumns).length === 1) {
          store = {};
        } else {
          const arr = Object.values(updateColumns).filter(
            (column) => column.id !== columnId
          );
          store = orderingColumns(arr);
        }
        break;
      }
      case 'removeTask': {
        if (updateColumns[columnId].state.length === 1) {
          column = {
            ...updateColumns[columnId],
            state: [],
          };
        } else {
          const arr = updateColumns[columnId].state.filter(
            (task) => task.id !== taskId
          );
          column = {
            ...updateColumns[columnId],
            state: [...arr],
          };
        }
        break;
      }
    }
    updateStateAndLocalSt(setUpdateColumns, column!, store!);
    onToast();
  };

  return (
    <FormsContext.Provider
      value={{
        isOpen,
        typeForm,
        onClose,
        openingForm,
        onToast,
        onSubmit,
        closeOnSelect,
        setCloseOnSelect,
        updateColumns,
        setUpdateColumns,
        handleDragEnd,
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};

export { useForms, FormsProvider };
