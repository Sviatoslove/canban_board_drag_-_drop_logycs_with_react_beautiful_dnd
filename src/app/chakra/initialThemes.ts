import { extendTheme } from '@chakra-ui/react';
import { CustomSelectField } from './customSelectedFieldStyles';
import { Flex } from './containerStyles';
import { TextField } from './textFieldStyles';

const components = {CustomSelectField, Flex, TextField}

export const theme = extendTheme({
  components
});
