import { Progress, useMultiStyleConfig } from '@chakra-ui/react';
import { getColors, getPercent } from '../../chakra/progressBarStyles';
import { IProgressBar } from '../../utils/types';

const ProgressBar = ({ completedProblems, problems }: IProgressBar) => {
  const value = getPercent(completedProblems, problems);
  const styles = useMultiStyleConfig('ProgressBar', {
    variant: 'simple',
  });

  return (
    <Progress
      className="progressBar"
      value={value}
      size="xs"
      sx={styles}
      {...getColors(value)}
    />
  );
};

export default ProgressBar;
