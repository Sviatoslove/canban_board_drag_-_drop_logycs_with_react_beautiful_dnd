import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers([
  'wrapper',
  'columnList',
  'column',
  'columnContent',
  'buttonAddTask',
  'card',
  'icons',
  'badgeDate',
]);

export const Flex = helpers.defineMultiStyleConfig({
  baseStyle: {},
  variants: {
    kanbanBoard: ({ columnsLength }: StyleFunctionProps) => ({
      wrapper: {
        m: '10px auto',
        w: '100%',
        maxW: '1140px',
        minH: '703px',
        p: '22px 57px 10px 70px',
        shadow: '0px 0px 10px 10px rgba(0,0,0,0.3)',
        borderRadius: 10,
        bg: '#f5f5fa',
        overflow: columnsLength > 3 ? 'auto' : 'hidden',
      },
      columnList: {
        w: '100%',
        justifyContent: 'space-between',
        scrollBehavior: 'smooth',
      },
      column: {
        flexDirection: 'column',
        w: '100%',
        minW: '332px',
        h: '649px',
        mr: '8px',
      },
      columnContent: {
        flexDirection: 'column',
        borderRadius: '10px',
        position: 'relative',
      },
      buttonAddTask: {
        minW: '320px',
        w: '100%',
        h: '52px',
        border: 'dotted',
        borderColor: '#CFDBD5',
        borderRadius: 5,
        bg: '#fff',
        borderWidth: '2px',
        top: 0,
        left: 0,
      },
      card: {
        position: 'relative',
        w: '100%',
        minW: '320px',
        minH: '102px',
        borderRadius: '10px',
        p: '18px 23px 23px 15px',
        color: '#000',
        mb: '7px',
        cursor: 'pointer',
        justifyContent: 'space-between',
        flexDirection: 'column',
      },
      icons: {
        display: 'flex',
        justifyContent: 'space-between',
        h: '24px',
      },
      badgeDate: {
        variant: 'solid',
        bg: '#F5F5FA',
        w: '94px',
        fontSize: '12px',
        fontWeight: 'bold',
        alignItems: 'center',
        borderRadius: 10,
        color: '#5F646D',
        justifyContent: 'center',
        display: 'flex',
      },
    }),
  },
});
