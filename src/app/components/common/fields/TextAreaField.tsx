import {
  Flex,
  FormControl,
  FormErrorMessage,
  IconButton,
  Text,
  Textarea,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { EventChange, EventClick } from '../../../utils/types';
import { DeleteIcon, OkIcon } from '../../../../assets/icons';
import CustomIconButton from '../CustomIconButton';
import useRenameField from '../../../hooks/useRenameField';

interface ITextfieldProps {
  name: string;
  value: string;
  label?: string;
  onChange: (e: EventChange) => void;
  error?: string;
  placeholder?: string;
  variant?: string;
  textAreaClassName?: string;
  refDiv?: any;
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
  textAreaClassName,
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

  const styleBtn = {
    bg: 'transparent',
    w: '32px',
    h: '32px',
    alignSelf: 'end',
  };
  const rows = Math.ceil(value.length / 21);

  return (
    <>
      <FormControl isInvalid={!!error} className={textAreaClassName}>
        <Text>{label}</Text>
        <Flex>
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
            rows={!rows ? 1 : rows}
            mr={2}
          />
          <Flex w={'63px'} justifyContent={'space-between'} ml={'auto'}>
            <CustomIconButton
              icon={DeleteIcon}
              widthIcon="24px"
              dataType="cancel"
              ariaLabel="Cancel"
              {...styleBtn}
            />
            <CustomIconButton
              icon={OkIcon}
              widthIcon="24px"
              {...styleBtn}
              dataType="changedTitle"
              ariaLabel="Save title"
              type="submit"
            />
          </Flex>
        </Flex>
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
