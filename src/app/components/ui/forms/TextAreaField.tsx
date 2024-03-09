import {
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  Textarea,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { EventChange } from '../../../utils/types';

interface ITextfieldProps {
  name: string;
  value: string;
  label?: string;
  onChange: (e: EventChange) => void;
  error?: string;
  placeholder?: string;
  variant?: string;
  refDiv?: any;
  // selectCategory: string;
}

const TextAreaField = ({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  variant,
  refDiv,
}: ITextfieldProps) => {
  const styles = useMultiStyleConfig('TextField', {
    variant,
    value,
    placeholder
  });

  const cleanInput = (e: React.MouseEvent) => {
    const target: any = e.target;
    if (value === '0') target.value = '';
  };
  return (
    <>
      <FormControl isInvalid={!!error}>
        <Text>{label}</Text>
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onClick={cleanInput}
          size="sm"
          placeholder={placeholder}
          sx={styles.area}
          ref={refDiv}
        />
        {!!error && (
          <FormErrorMessage mb={2} mt={0}>
            {error}
          </FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default TextAreaField;
