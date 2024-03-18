import { extendTheme } from '@chakra-ui/react';
import { CustomSelectField } from './customSelectedFieldStyles';
import { Flex } from './containerStyles';
import { TextField } from './textFieldStyles';
import { ProgressBar } from './progressBarStyles';

const components = {CustomSelectField, Flex, TextField, ProgressBar}

export const theme = extendTheme({
  components
});
