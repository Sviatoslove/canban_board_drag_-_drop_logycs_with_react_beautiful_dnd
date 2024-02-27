import { extendTheme } from '@chakra-ui/react';
import { CustomSelectField } from './customSelectedFieldStyles';
import { TextField } from './textFieldStyles';

const components = {CustomSelectField, TextField}

export const theme = extendTheme({
  components
});
