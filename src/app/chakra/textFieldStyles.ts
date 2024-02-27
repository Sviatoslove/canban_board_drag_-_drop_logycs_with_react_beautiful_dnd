import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['input']);

export const TextField = helpers.defineMultiStyleConfig({
  baseStyle: {
    input: {
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
    titleColumn: ({ value }: StyleFunctionProps) => ({
      input: {
        w: `${11 * value.length}px`,
        maxW: '200px',
        minW:'70px',
        ml: '3px',
        h: '22px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        px:'5px'
      },
    }),
  },
});
