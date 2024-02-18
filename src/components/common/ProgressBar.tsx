import { Progress } from '@chakra-ui/react';

interface IProgressBar {
  completedProblems: number;
  problems: number;
}

const ProgressBar = ({ completedProblems, problems }: IProgressBar) => {
  const getPercent = (partNum: number, totalNum: number): number =>
    Math.floor((partNum * 100) / totalNum);
  const value = getPercent(completedProblems, problems);

  const getColors = (num: number) => {
    let res;
    if (num <= 35) {
      res = {
        colorScheme: 'red',
        bg: '#ff000026',
      };
    } else if (num >= 35 && num <= 70) {
      res = {
        colorScheme: 'yellow',
        bg: '#d69e2e45',
      };
    } else {
      res = {
        colorScheme: 'green',
        bg: '#38a1694f',
      };
    }
    return res;
  };

  return (
    <Progress
      value={value}
      size="xs"
      position={'absolute'}
      bottom={0}
      left={0}
      w={'100%'}
      borderBottomLeftRadius={'60px'}
      borderBottomRightRadius={'60px'}
      {...getColors(value)}
    />
  );
};

export default ProgressBar;
