import {
  Flex,
  FormControl,
  FormErrorMessage,
  Text,
  Textarea,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { EventChange } from '../../../utils/types';
import { DeleteIcon, OkIcon } from '../../../../assets/icons';
import CustomIconButton from '../CustomIconButton';
import localStorageService from '../../../services/localStorage.service';
import { getWithForText } from '../../../utils/getWithForText';

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

  const numOfColumns = Object.values(localStorageService.getColumns()).length;
  const rate = numOfColumns === 1 ? 880 : numOfColumns === 2 ? 374 : 190;
  const rows = Math.ceil(getWithForText(value, {fontSize: '0.75rem', fontWeight: 'bold'}).width / rate);
  
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
              {...styles.customIconButtonArea}
            />
            <CustomIconButton
              icon={OkIcon}
              widthIcon="24px"
              dataType="changedTitle"
              ariaLabel="Save title"
              type="submit"
              {...styles.customIconButtonArea}
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
