import {
  StyleFunctionProps,
  createMultiStyleConfigHelpers,
} from '@chakra-ui/react';

export const menuItemStyles = (value: string, field: string) =>
  field !== 'completed'
    ? {
        _checked: {
          bg: value,
          color: value === 'white' ? 'black' : 'white',
        },
        color: value === 'white' ? 'black' : value,
        _focus: { bg: 'transparent' },
        _hover: {
          bg: value,
          color: value === 'white' ? 'black' : 'white',
        },
      }
    : undefined;

const menuButtonStyles = (
  colorText: string,
  colorBg: string,
  field: string
) => {
  switch (field) {
    case 'colorText': {
      return {
        bg: colorText === 'white' ? 'black' : 'initial',
        color: colorText,
      };
    }
    case 'colorBadge':
      return {
        bg: colorBg,
        color: colorBg ? 'white' : 'initial',
      };
    default:
      return {
        bg: 'initial',
        color: 'initial',
      };
  }
};

const helpers = createMultiStyleConfigHelpers(['menuButton', 'menuItem', 'optionGroup', 'menu', 'menuDivider']);

export const CustomSelectField = helpers.defineMultiStyleConfig({
  variants: {
    form: ({ color, bg, name }: StyleFunctionProps) => ({
      menuButton: {
        shadow: '0px 0px 6px 1px rgba(0,0,0,0.3)',
        maxW: '320px',
        w: '100%',
        borderRadius: 10,
        mt: '4px',
        _hover: {
          shadow:
            '0px 0px 2px 2px rgba(0,0,0,0.3), 0px 0px 4px 4px rgba(0,0,0,0.3)',
        },
        p: '5px',
        ...menuButtonStyles(color, bg, name),
      },
      menuItem: {
        borderRadius: 10,
      },
    }),
    titleColumn: ({ color, bg, name }: StyleFunctionProps) => ({
      menuButton: {
        position: 'relative',
        paddingInlineStart:0,
        paddingInlineEnd: 0,
        h: '20px',
        borderRadius:'50px',
        _hover: {
          shadow:
            '0px 0px 2px 2px rgba(0,0,0,0.3), 0px 0px 4px 4px rgba(0,0,0,0.3)',
        },
        ...menuButtonStyles(color, bg, name),
      },
      menuItem: {
        borderRadius: 10,
        bg:'transparent',
        _focus: { bg: 'transparent' },
        _hover:{bg:'#ffffff9e'}
      },
      optionGroup: {
        textShadow:'1.5px 1.5px #00000063',
        fontSize: '18px',
        whiteSpace: 'nowrap'
      },
      menu: {
        w:'fit-content',
        borderRadius: 10,
        bg:'#8080809e'
      },
      menuDivider: {
        borderWidth:'2px',
        w:'95%',
        mx:"auto",
        borderColor:'#ffffff9e',
      },
    }),
  },
});
