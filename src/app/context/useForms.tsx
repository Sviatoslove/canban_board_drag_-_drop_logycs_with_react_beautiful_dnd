import { useDisclosure, useToast } from '@chakra-ui/react';
import {
  IFormsContext,
  IFormsProviderProps,
  OnsubmitFunc,
  OpeningForm,
} from './useFormsTypes';
import { createContext, useContext, useState } from 'react';
import { EventClick, IColumn, IColumns } from '../utils/types';
import { toastSettings } from '../utils/toastSettings';
import {
  IDefaultState,
  formSettings,
} from '../components/ui/forms/settingsForm';
import { useAppDispatch, useAppSelector } from '../store/createStore';
import { addColumn, selectColumns } from '../store/columnsSlice';
import { IFormsState } from '../hooks/useFormsData';
import getRandomNum from '../utils/getRandomNum';

const defaultState = {
  isOpen: false,
  typeForm: {},
  onClose: () => {},
  openingForm: (e: EventClick, id?: string) => {},
  onToast: (type?: string) => {},
  onSubmit: (data:IFormsState, columnId?:string) => {},
};

const FormsContext = createContext<IFormsContext>(defaultState);

const useForms = () => useContext(FormsContext);

const FormsProvider = ({ children }: IFormsProviderProps) => {
  const dispatch = useAppDispatch();
  const storeColumns: IColumns = useAppSelector(selectColumns());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [typeForm, setTypeForm] = useState<IDefaultState>({});
  const toast = useToast();

  const openingForm: OpeningForm = (e, id) => {
    const { target }: any = e;
    const typeBtn: string = target.closest('button').getAttribute('dataType');
    onOpen();
    const settings: IDefaultState = {
      type: typeBtn,
      title: formSettings[typeBtn].title,
    };
    if (id) settings.columnId = id;
    setTypeForm(settings);
  };

  const onToast = (type?: string) => {
    if (isOpen) onClose();
    toast({
      description: 'Отлично!',
      status: 'success',
      variant: 'top-accent',
      isClosable: true,
      duration: 9000,
      ...toastSettings[type ? type : typeForm.type],
    });
  };

  const onSubmit: OnsubmitFunc = ({ defaultState }, columnId) => {
    const { columnName, colorBadge, colorText, title, completed } =
      defaultState;
    let column: IColumn;
    const newTask = {
      completed: false,
      createdAt: Date.now(),
      problems: getRandomNum(50, 67),
      completedProblems: getRandomNum(0, 45),
      status: columnName,
      id: Date.now().toString(),
      title,
      userId: '1',
    };
    switch (typeForm.type) {
      case 'addColumn': {
        column = {
          id: (Object.values(storeColumns).length + 1).toString(),
          title: columnName,
          colorBadge,
          colorText,
          completed: Boolean(completed),
          state: [newTask],
        };
        break;
      }
      case 'addTask': {
        column = {
          ...storeColumns[columnId!],
          state: [...storeColumns[columnId!].state, newTask],
        };
        break;
      }
    }
    dispatch(addColumn(column!));
    onClose();
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
      }}
    >
      {children}
    </FormsContext.Provider>
  );
};

export { useForms, FormsProvider };
