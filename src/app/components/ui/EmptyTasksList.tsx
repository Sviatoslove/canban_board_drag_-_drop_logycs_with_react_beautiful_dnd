import {
  Box,
  Button,
  Flex,
  Image,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { AddTaskIcon, AddTaskImg } from '../../../assets/icons';
import { OpeningForm } from '../../context/useFormsTypes';

const EmptyTasksList = ({ openingForm }: { openingForm: OpeningForm }) => {
  const styles = useMultiStyleConfig('Flex', {
    variant: 'emptyTasksList',
  });
  return (
    <Flex sx={styles.wrapperEmptyTasksList}>
      <Image
        src={AddTaskImg}
        alt=""
        width={'266px'}
        height={'260px'}
        mx={'auto'}
      />
      <Box as="h1" sx={styles.boxH1}>
        No tasks found?
      </Box>
      <Box as="span" sx={styles.boxSpan}>
        Try to assign more tasks to your employees or create
      </Box>
      <Box as="span" w={'fit-content'} sx={styles.boxSpan}>
        a new project from scratch
      </Box>
      <Button
        onClick={(e) => openingForm(e)}
        sx={styles.link}
        datatype="addColumn"
      >
        <Image src={AddTaskIcon} />
        <Box as="span" ml={'8px'}>
          Create a new task
        </Box>
      </Button>
    </Flex>
  );
};

export default EmptyTasksList;
