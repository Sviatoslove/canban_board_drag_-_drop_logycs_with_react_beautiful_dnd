import {
  Box,
  Button,
  Flex,
  Stack,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { IStateProps, useFormsData } from '../../../hooks/useFormsData';
import { validatorConfig } from '../../../utils/validator';
import TextField from './TextField';
import { IFieldsProps, IFormProps } from '../../../utils/types';
import CustomSelectField from './CustomSelectField';
import { formSettings } from './settingsForm';
import { menuItemStyles } from '../../../chakra/customSelectedFieldStyles';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAppSelector } from '../../../store/createStore';
import { selectColumns } from '../../../store/columnsSlice';

const Form = ({ type, onClose, columnId, onSubmit }: IFormProps) => {
  const { fields, btnTitle, defaultState } = formSettings[type];
  const userColumns:any = useAppSelector(selectColumns());
  const initialState =
  typeof defaultState === 'function'
  ? defaultState(userColumns[columnId])
  : defaultState;

  const useFormsDataProps: any = {
    state: {
      defaultState: initialState,
      errors: validatorConfig,
    },
  };

  const { register, data, handleSubmit, errors } =
    useFormsData(useFormsDataProps);

  const { colorText, colorBadge } = data.defaultState;

  const Fields: any = {
    textField: ({ name, label, placeholder }: IFieldsProps) => {
      return (
        <TextField
          {...register(name, label)}
          key={label + 10}
          placeholder={placeholder}
          variant="form"
        />
      );
    },
    customSelectField: ({
      name,
      label,
      titleList,
      placeholder,
      options,
    }: IFieldsProps) => (
      <CustomSelectField
        {...register(name, label)}
        key={label}
        options={options}
        titleList={titleList}
        color={colorText}
        bg={colorBadge}
        menuItemStyles={menuItemStyles}
        placeholder={placeholder}
        variant="form"
        icon={<ChevronDownIcon />}
      />
    ),
  };

  return (
    <Box pb={5} px={10}>
      <form onSubmit={handleSubmit(onSubmit, columnId)}>
        <>{fields.map((field) => Fields[field.typeField](field))}</>
        <Flex mt={4} ml={'auto'} w={'fit-content'}>
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme="green"
              type="submit"
              isDisabled={!!Object.values(errors.fields).length}
              loadingText="Отправка запроса"
            >
              {btnTitle}
            </Button>
          </Stack>
          <Button ml={4} onClick={onClose}>
            Назад
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Form;
