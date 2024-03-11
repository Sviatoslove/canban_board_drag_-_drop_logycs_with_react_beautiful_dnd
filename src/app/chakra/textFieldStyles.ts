import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['input', 'area']);

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
    form: (props: StyleFunctionProps) => ({
      input: {
        mt: '4px',
      },
    }),
    titleColumn: ({ value, placeholder, error }: StyleFunctionProps) => {
      const startWidth = placeholder?.length - 8
      const rate = value.length < startWidth ? startWidth : value.length;
      const widthArea = 11 * (rate + 2);
      return {
        input: {
          w: `${11 * rate}px`,
          maxW: '270px',
          minW: '70px',
          ml: '3px',
          h: '22px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          px: '5px',
          transition: 'width .2s ease-in 0s',
          _focus: !!error ? {borderColor: 'red', shadow: '0px 0px 4px .5px red'} : {borderColor: 'none', shadow: '0px 0px 4px .5px darkblue'}
        },
        area: {
          position: 'relative',
          w: widthArea + 'px',
          maxW: '270px',
          minW: '70px',
          ml: '3px',
          mb: '10px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          px: '5px',
          transition: 'width 1ms ease-in 0s',
          resize:'none',
          _focus: !!error ? {borderColor: 'red', shadow: '0px 0px 4px .5px red'} : {borderColor: 'none', shadow: '0px 0px 4px .5px darkblue'}
        },
      };
    },
  },
});
