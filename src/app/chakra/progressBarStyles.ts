import { defineStyleConfig } from '@chakra-ui/react';

export const getColors = (num: number) => {
  let res;
  if (num <= 35) {
    res = {
      bg: '#ff000026',
      colorScheme: 'red',
    };
  } else if (num >= 35 && num <= 70) {
    res = {
      bg: '#d69e2e45',
      colorScheme: 'yellow',
    };
  } else {
    res = {
      bg: '#38a1694f',
      colorScheme: 'green',
    };
  }
  return res;
};

export const getPercent = (partNum: number, totalNum: number): number =>
Math.floor((partNum * 100) / totalNum);

export const ProgressBar = defineStyleConfig({
  variants: {
    simple: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      w: '100%',
      borderBottomLeftRadius: '60px',
      borderBottomRightRadius: '60px',
    },
  },
});
