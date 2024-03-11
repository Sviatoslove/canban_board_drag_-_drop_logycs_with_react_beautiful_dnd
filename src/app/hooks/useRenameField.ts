import { useRef, useState } from 'react';
import { OnsubmitFunc } from '../context/useFormsTypes';
import { EventChange, EventClick, IColumn, IColumns } from '../utils/types';
import { colorsBadge } from '../components/ui/forms/settingsForm';
import getRandomNum from '../utils/getRandomNum';
import { useForms } from '../context/useForms';
import localStorageService from '../services/localStorage.service';
import { updateStateAndLocalSt } from '../utils/updateStateAndLocalSt';
import { orderingColumns } from '../utils/orderingColumns';

const useRenameField = () => {
  const storeColumns: IColumns = localStorageService.getColumns();
  const { onToast, openingForm, setCloseOnSelect, setUpdateColumns } =
    useForms();
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [renameTitle, setRenameTitle] = useState<boolean>(false);

  const refInput = useRef<any>();
  const refSettingsColumn = useRef<any>();

  const handleAddColumn = (e: EventChange | EventClick, columnId?: string) => {
    const { target }: any = e;
    if(renameTitle)return
    const HTMLColumnList = target.closest('.columnList');
    const type = target.closest('button')?.getAttribute('datatype');
    if (type === 'addTask') {
      const store: IColumns = localStorageService.getColumns();
      const newTask = {
        completed: false,
        createdAt: Date.now(),
        problems: getRandomNum(50, 67),
        completedProblems: getRandomNum(0, 45),
        status: store[columnId!]?.title,
        id: Date.now().toString(),
        title: '',
        userId: '1',
      };
      const column = {
        ...store[+columnId!],
        state: [newTask!, ...store[+columnId!].state],
      };
      updateStateAndLocalSt(setUpdateColumns, column);
      onToast(type);
      return;
    }
    const completed =
      refSettingsColumn.current.getAttribute('aria-checked') === 'true'
        ? true
        : false;
    const id = (+columnId! + 1).toString();
    const newColumn: IColumn = {
      id,
      title: `column ${id}`,
      colorBadge: colorsBadge[getRandomNum(0, 11)].value,
      colorText: 'white',
      completed,
      state: [],
    };
    if (type === 'addColumnAuto') {
      let newColumns: IColumns;
      if (Object.values(storeColumns).length > +columnId!) {
        const arr = Object.values(storeColumns);
        arr.splice(+columnId!, 0, newColumn);
        newColumns = orderingColumns(arr);
      } else {
        newColumns = { ...storeColumns, [id]: newColumn };
      }
      onToast(type);
      updateStateAndLocalSt(setUpdateColumns, newColumn, newColumns);
      setTimeout(() => {
        HTMLColumnList.childNodes[+columnId!].scrollIntoView();
      }, 10);
    }
    if (type === 'editColumn' || type === 'removeColumn')
      openingForm(e, columnId);
    setCloseOnSelect((prev: any) => ({ ...prev, [columnId!]: false }));
  };

  function handleRename() {
    const getFocus = () => {
      let wrappIcon:any
      const elem = refInput.current!
      elem.focus();
      elem.selectionStart = elem.value.length;
      if(elem.name === 'taskName') wrappIcon = elem.closest('.card')
      else wrappIcon = elem.closest('form').nextElementSibling.childNodes[1]
      //Задаю атрибут для отрисовки иконки редактирования на карте
      wrappIcon.setAttribute('edit', 'true');
      if (refInput.current) {
        refInput.current.onblur = function () {
          if (refInput.current?.value.length < 2) getFocus();
          else
            setTimeout(() => {
              wrappIcon!.setAttribute('edit', 'false');
              setRenameTitle(false);
            }, 100);
        };
      }
    };
    setTimeout(() => getFocus(), 10);
    setRenameTitle(true);
  }

  const onSubmitRename: OnsubmitFunc = (
    { defaultState },
    columnId,
    taskIdx
  ) => {
    const { columnName, taskName } = defaultState;
    let title: string;
    let newColumn: IColumn;
    if (columnName) {
      title = columnName;
      newColumn = { ...storeColumns[columnId!], title: columnName };
      onToast('editColumnTitle');
    } else {
      title = taskName;
      const newState = [...storeColumns[columnId!].state];
      const newTask = { ...newState[+taskIdx!], title: taskName };
      newState.splice(+taskIdx!, 1, newTask);
      newColumn = { ...storeColumns[columnId!], state: newState };
      onToast('editTaskTitle');
    }
    setEditedTitle(title);
    updateStateAndLocalSt(setUpdateColumns, newColumn);
    setRenameTitle(false);
    setTimeout(() => setEditedTitle(''), 0);
  };

  return {
    renameTitle,
    editedTitle,
    handleRename,
    refInput,
    onSubmitRename,
    handleAddColumn,
    refSettingsColumn,
    setRenameTitle,
    openingForm,
  };
};

export default useRenameField;
