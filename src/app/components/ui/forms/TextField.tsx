import {
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  useMultiStyleConfig,
} from '@chakra-ui/react';

interface ITextfieldProps {
  name: string;
  value: string;
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  variant?: string;
  refDiv?: any
  // selectCategory: string;
}

const TextField = ({
  name,
  label,
  value,
  onChange,
  error,
  placeholder,
  variant,refDiv
}: ITextfieldProps) => {
  const styles = useMultiStyleConfig('TextField', {
    variant,
    value
  });

  const cleanInput = (e: React.MouseEvent) => {
    const target: any = e.target;
    if (value === '0') target.value = '';
  };
  return (
    <>
      <FormControl isInvalid={!!error}>
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
