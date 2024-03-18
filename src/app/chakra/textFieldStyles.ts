import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';
import { getWithForText } from '../utils/getWithForText';

const helpers = createMultiStyleConfigHelpers([
  'input',
  'area',
  'customIconButtonArea',
]);

export const TextField = helpers.defineMultiStyleConfig({
  baseStyle: {
    input: {
      borderRadius: 10,
      boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.3)',
    },
    area: {
      borderRadius: 10,
      boxShadow: '0px 0px 6px 1px rgba(0,0,0,0.3)',
    },
  },

  variants: {
    form: {
      input: {
        mt: '4px',
      },
    },
    titleColumn: ({ value, placeholder, error }: StyleFunctionProps) => {
      const minWidth = getWithForText(placeholder, {
        fontSize: '0.75rem',
        fontWeight: 'bold',
      }).width;

      const width = getWithForText(value, {
        fontSize: '0.75rem',
        fontWeight: 'bold',
      }).width;

      return {
        input: {
          w: (width + 25) + 'px',
          maxW: '275px',
          minW: minWidth + 25 + 'px',
          ml: '3px',
          h: '22px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          px: '5px',
          transition: 'width 4ms ease-in 0s',
          _focus: !!error
            ? { borderColor: 'red', shadow: '0px 0px 4px .5px red' }
            : { borderColor: 'none', shadow: '0px 0px 4px .5px darkblue' },
        },
        area: {
          position: 'relative',
          w: (width + 25) + 'px',
          maxW: 'inherit',
          minW: minWidth + 35 + 'px',
          ml: '3px',
          mb: '10px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          px: '5px',
          transition: 'width 1ms ease-in 0s',
          resize: 'none',
          _focus: !!error
            ? { borderColor: 'red', shadow: '0px 0px 4px .5px red' }
            : { borderColor: 'none', shadow: '0px 0px 4px .5px darkblue' },
        },
        customIconButtonArea: {
          bg: 'transparent',
          w: '32px',
          h: '32px',
          alignSelf: 'end',
        },
      };
    },
  },
});
