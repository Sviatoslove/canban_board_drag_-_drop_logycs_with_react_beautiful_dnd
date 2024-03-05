import { OnsubmitFunc } from '../../../context/useFormsTypes';
import { IStateProps, useFormsData } from '../../../hooks/useFormsData';
import { validatorConfig } from '../../../utils/validator';
import TextField from '../../ui/forms/TextField';

interface IEditableField {
  title: string;
  name: string;
  variant: string;
  refDiv: any;
  columnId?: string;
  onSubmit: OnsubmitFunc;
  taskIdx?: string;
}

const EditableField = ({
  title,
  name,
  variant,
  refDiv,
  columnId,
  onSubmit,
  taskIdx
}: IEditableField) => {
  const useFormsDataProps: IStateProps = {
    state: {
      defaultState: { [name]: title },
      errors: validatorConfig,
    },
  };

  const { register, handleSubmit } =
    useFormsData(useFormsDataProps);

  return (
    <form onSubmit={handleSubmit(onSubmit, columnId, taskIdx)}>
      <TextField {...register(name)} variant={variant} refDiv={refDiv} />
    </form>
  );
};

export default EditableField;
