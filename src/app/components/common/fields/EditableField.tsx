import { OnsubmitFunc } from '../../../context/useFormsTypes';
import { IStateProps, useFormsData } from '../../../hooks/useFormsData';
import { validatorConfig } from '../../../utils/validator';
import TextAreaField from '../../ui/forms/TextAreaField';
import TextField from '../../ui/forms/TextField';

interface IEditableField {
  title: string;
  name: string;
  columnId?: string;
  onSubmit: OnsubmitFunc;
  taskIdx?: string;
  settings?: {
    variant?: string;
    refDiv?: any;
    placeholder?: string;
  };
}

const EditableField = ({
  title,
  name,
  settings,
  columnId,
  onSubmit,
  taskIdx,
}: IEditableField) => {
  const useFormsDataProps: IStateProps = {
    state: {
      defaultState: { [name]: title },
      errors: validatorConfig,
    },
  };

  const { register, handleSubmit } = useFormsData(useFormsDataProps);

  return (
    <form onSubmit={handleSubmit(onSubmit, columnId, taskIdx)}>
      <TextField {...register(name)} {...settings} />
      {/* {name === 'columnName' ? (
        <TextField {...register(name)} {...settings} />
      ) : (
        <TextAreaField {...register(name)} {...settings} />
      )} */}
    </form>
  );
};

export default EditableField;
