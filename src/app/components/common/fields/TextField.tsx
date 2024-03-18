import {
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { ITextfieldProps } from '../../../utils/types';

const TextField = ({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  variant,
  refDiv,
  inputClassName,
}: ITextfieldProps) => {
  const styles = useMultiStyleConfig('TextField', {
    variant,
    value,
    placeholder,
    error,
  });

  const cleanInput = (e: React.MouseEvent) => {
    const target: any = e.target;
    if (value === '0') target.value = '';
  };
  return (
    <>
      <FormControl isInvalid={!!error} className={inputClassName}>
        <Text>{label}</Text>
        <Input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onClick={cleanInput}
          size="sm"
          placeholder={placeholder}
          sx={styles.input}
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

export default TextField;
