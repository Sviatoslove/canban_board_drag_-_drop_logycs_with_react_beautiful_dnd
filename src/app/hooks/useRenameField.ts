import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/createStore';
import { OnsubmitFunc } from '../context/useFormsTypes';
import { addColumn, editColumn, selectColumns } from '../store/columnsSlice';
import { EventChange, EventClick, IColumn, IColumns } from '../utils/types';
import { colorsBadge } from '../components/ui/forms/settingsForm';
import getRandomNum from '../utils/getRandomNum';
import { useForms } from '../context/useForms';

const useRenameField = () => {
  const dispatch = useAppDispatch();
  const storeColumns: IColumns = useAppSelector(selectColumns());
  const { onToast } = useForms();
  const [renameTitle, setRenameTitle] = useState<{
    title: string;
    value: boolean;
  }>({ title: '', value: false });

  const { openingForm, setCloseOnSelect } = useForms();

  const refInput = useRef<any>();
  const refSettingsColumn = useRef<any>();

  const handleAddColumn = (e: EventChange | EventClick, columnId?: string) => {
    const { target }: any = e;
    const type = target.closest('button')?.getAttribute('datatype');
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
      onToast(type);
      dispatch(addColumn(newColumn));
    }
    if (type === 'editColumn') openingForm(e, columnId);
    setCloseOnSelect((prev:any)=>({...prev, [columnId!]: false}));
  };

  const handleRename = () => {
    setTimeout(() => {
      refInput.current.focus();
      refInput.current.onblur = function () {
        setTimeout(() => setRenameTitle({ title: '', value: false }), 0);
      };
    }, 0);
    setRenameTitle((prev) => ({ title: '', value: !prev.value }));
  };

  const onSubmit: OnsubmitFunc = ({ defaultState }, columnId, taskIdx) => {
    const { columnName, taskName } = defaultState;
    let renameSettings:any = {value: false}
    let newColumn:any
    if(columnName) {
      renameSettings.title = columnName
      newColumn = { ...storeColumns[columnId!], title: columnName }
      onToast('editColumnTitle')
    }else {
      renameSettings.title = taskName
      const newState = [...storeColumns[columnId!].state]
      const newTask = {...newState[+taskIdx!], title: taskName}
      newState.splice(+taskIdx!, 1, newTask)
      newColumn = { ...storeColumns[columnId!], state: newState }
      onToast('editTaskTitle')
    }
    setRenameTitle(renameSettings);
    dispatch(editColumn(newColumn));
  };

  return {
    renameTitle,
    handleRename,
    refInput,
    onSubmit,
    handleAddColumn,
    setRenameTitle,
    refSettingsColumn,
  };
};

export default useRenameField;
