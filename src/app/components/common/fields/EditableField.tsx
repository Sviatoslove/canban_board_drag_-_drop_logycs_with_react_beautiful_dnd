import { IStateProps, useFormsData } from '../../../hooks/useFormsData';
import { IEditableField } from '../../../utils/types';
import { validatorConfig } from '../../../utils/validator';
import TextAreaField from './TextAreaField';
import TextField from './TextField';

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
      {name === 'columnName' ? (
        <TextField {...register(name)} {...settings} />
      ) : (
        <TextAreaField {...register(name)} {...settings} />
      )}
    </form>
  );
};

export default EditableField;
