import { HandleSubmitFunc, OnsubmitFunc } from '../../../context/useFormsTypes';
import TextField from '../../ui/forms/TextField';

interface IEditableField {
  name: string;
  variant: string;
  refDiv: any;
  columnId?: string;
  register: any;
  handleSubmit: HandleSubmitFunc;
  onSubmit: OnsubmitFunc;
}

const EditableField = ({
  name,
  variant,
  refDiv,
  columnId,
  register,
  handleSubmit,
  onSubmit,
}: IEditableField) => {
  return (
    <form onSubmit={handleSubmit(onSubmit, columnId)}>
      <TextField {...register(name)} variant={variant} refDiv={refDiv} />
      {/* <IconButton aria-label='Save' icon={<EditIcon />}/>
        <IconButton aria-label='Cancel' icon={<NotAllowedIcon />}/> */}
    </form>
  );
};

export default EditableField;
