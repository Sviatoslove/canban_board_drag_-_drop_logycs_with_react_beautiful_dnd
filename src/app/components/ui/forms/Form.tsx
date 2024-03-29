import { Box, Button, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useFormsData } from '../../../hooks/useFormsData';
import { validatorConfig } from '../../../utils/validator';
import TextField from '../../common/fields/TextField';
import { IFieldsProps, IFormProps } from '../../../utils/types';
import CustomSelectField from '../../common/fields/CustomSelectField';
import { formSettings } from './settingsForm';
import { menuItemStyles } from '../../../chakra/customSelectedFieldStyles';
import localStorageService from '../../../services/localStorage.service';

const Form = ({ type, onClose, columnId, onSubmit }: IFormProps) => {
  const { fields, btnTitle, defaultState } = formSettings[type];
  const userColumns: any = localStorageService.getColumns();

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <>{fields.map((field) => Fields[field.typeField](field))}</>
        <Flex mt={4} ml={'auto'} w={'fit-content'}>
          <Button
            colorScheme="green"
            type="submit"
            isDisabled={!!Object.values(errors.fields).length}
            loadingText="Отправка запроса"
          >
            {btnTitle}
          </Button>
          <Button ml={4} onClick={onClose}>
            Назад
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default Form;
