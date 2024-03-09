import Form from '../components/ui/forms/Form';
import ModalWindow from '../components/ui/ModalWindow';
import { useForms } from '../context/useForms';

const FormsLayout = () => {
  const { typeForm, isOpen, onClose, onSubmit } = useForms();
  const { title, type, columnId } = typeForm.current;

  return (
    <ModalWindow {...{ title, isOpen, onClose }}>
      <Form
        {...{
          type,
          onClose,
          columnId,
          onSubmit,
        }}
      />
    </ModalWindow>
  );
};

export default FormsLayout;
