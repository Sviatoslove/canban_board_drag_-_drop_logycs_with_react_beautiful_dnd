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
    titleColumn: ({ value, placeholder }: StyleFunctionProps) => {
      const rate = value.length === 0 ? placeholder?.length : value.length
      const widthArea = 11 * rate
      return({
      input: {
        w: `${11 * rate}px`,
        maxW: '270px',
        minW:'70px',
        ml: '3px',
        h: '22px',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        px:'5px',
        transition: 'width .2s ease-in 0s' 
      },
      area: {
        w: widthArea + 'px',
        maxW: '270px',
        minW:'70px',
        ml: '3px',
        minH: `${Math.ceil(widthArea/270)*21}px`,
        fontSize: '0.75rem',
        fontWeight: 'bold',
        px:'5px',
        transition: 'width .2s ease-in 0s' 
      },
    })},
  },
});