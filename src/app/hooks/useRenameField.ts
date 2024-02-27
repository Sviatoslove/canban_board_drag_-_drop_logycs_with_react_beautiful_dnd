import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/createStore";
import { IStateProps, useFormsData } from "./useFormsData";
import { validatorConfig } from "../utils/validator";
import { OnsubmitFunc } from "../context/useFormsTypes";
import { addColumn, renameColumn, selectColumns } from "../store/columnsSlice";
import { IColumn, IColumns } from "../utils/types";
import { colorsBadge } from "../components/ui/forms/settingsForm";
import getRandomNum from "../utils/getRandomNum";
import { useForms } from "../context/useForms";


const useRenameField = (title:string) => {

  const dispatch = useAppDispatch();
  const storeColumns: IColumns = useAppSelector(selectColumns());
  const { onToast } = useForms();
  const [renameTitle, setRenameTitle] = useState<boolean>(false);

  const refInput = useRef<any>();

  const useFormsDataProps: IStateProps = {
    state: {
      defaultState: { columnName: title },
      errors: validatorConfig,
    },
  };

  const handleAddColumn = (columnId?:string) => {
    const id = (+columnId! + 1).toString();
    const newColumn: IColumn = {
      id,
      title: `column ${id}`,
      colorBadge: colorsBadge[getRandomNum(0, 11)].value,
      colorText: 'white',
      completed: false,
      state: [],
    };
    dispatch(addColumn(newColumn));
    onToast('addColumnAuto');
  };

  const { register, data, handleSubmit, errors } =
  useFormsData(useFormsDataProps);

  const handleRename = () => {
    setTimeout(() => refInput.current.focus(), 0);
    setRenameTitle((prev) => !prev);
  };

  const onSubmit: OnsubmitFunc = ({ defaultState }, columnId) => {
    const { columnName } = defaultState;
    dispatch(renameColumn({ ...storeColumns[columnId!], title: columnName }));
    setRenameTitle(false);
  };


  return {
    renameTitle,
    handleRename,
    refInput,
    register,
    handleSubmit,
    onSubmit,
    handleAddColumn
  };
}
 
export default useRenameField;